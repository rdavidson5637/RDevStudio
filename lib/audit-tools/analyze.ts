import type { AuditCategoryScore } from "@/types/toolkit-audit";
import type { UrlAuditResult } from "@/types/url-audit-tool";

/**
 * Real server-side site analysis. Fetches the URL (server-side, so no CORS),
 * reads the response headers + HTML, and scores what can be honestly measured
 * from a single fetch: HTTPS/security headers, on-page SEO signals, response
 * speed + page weight, mobile viewport, accessibility basics, and a few
 * best-practice checks.
 *
 * Deliberately NOT a Lighthouse clone - deep accessibility (contrast, focus
 * order) and real performance (LCP/CLS) need headless Chrome. Those remain
 * honest estimates and should be labelled as such in the UI.
 *
 * `buildGraderResult` matches the Website Grader UI (5 categories).
 * `buildSeoResult` matches the SEO Checker UI (meta / headings / technical).
 */

export type SiteSignals = {
  finalUrl: string;
  https: boolean;
  statusOk: boolean;
  status: number;
  responseTimeMs: number;
  htmlBytes: number;
  headers: Record<string, string>;
  hasViewport: boolean;
  title: string;
  hasMetaDescription: boolean;
  hasCanonical: boolean;
  hasH1: boolean;
  hasLang: boolean;
  hasOpenGraph: boolean;
  imgCount: number;
  imgMissingAlt: number;
  hasDoctype: boolean;
  hasCharset: boolean;
  hasFavicon: boolean;
  usesDocumentWrite: boolean;
  mixedContent: boolean;
};

export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

export async function fetchSignals(rawUrl: string): Promise<SiteSignals> {
  const url = normalizeUrl(rawUrl);
  const started = Date.now();
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": "RDevStudioGrader/1.0 (+https://rdevstudio.co.uk)" },
    signal: AbortSignal.timeout(12_000),
  });
  const responseTimeMs = Date.now() - started;
  const html = await res.text();
  const finalUrl = res.url || url;
  const isHttps = finalUrl.startsWith("https://");

  const headers: Record<string, string> = {};
  res.headers.forEach((value, key) => {
    headers[key.toLowerCase()] = value;
  });

  const has = (re: RegExp) => re.test(html);
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const imgTags = html.match(/<img\b[^>]*>/gi) ?? [];
  const imgMissingAlt = imgTags.filter(
    (tag) => !/\balt\s*=\s*["'][^"']*["']/i.test(tag)
  ).length;

  return {
    finalUrl,
    https: isHttps,
    statusOk: res.ok,
    status: res.status,
    responseTimeMs,
    htmlBytes: new TextEncoder().encode(html).length,
    headers,
    hasViewport: has(/<meta[^>]+name=["']viewport["']/i),
    title: titleMatch ? titleMatch[1].trim() : "",
    hasMetaDescription: has(
      /<meta[^>]+name=["']description["'][^>]*content=["'][^"']+["']/i
    ),
    hasCanonical: has(/<link[^>]+rel=["']canonical["']/i),
    hasH1: has(/<h1[\s>]/i),
    hasLang: has(/<html[^>]+lang=["'][^"']+["']/i),
    hasOpenGraph: has(/<meta[^>]+property=["']og:/i),
    imgCount: imgTags.length,
    imgMissingAlt,
    hasDoctype: /^\s*<!doctype html>/i.test(html),
    hasCharset: has(/<meta[^>]+charset=/i),
    hasFavicon: has(/<link[^>]+rel=["'][^"']*icon[^"']*["']/i),
    usesDocumentWrite: has(/document\.write\s*\(/i),
    // On an https page, any http:// asset reference is mixed content.
    mixedContent: isHttps && /(?:src|href)=["']http:\/\//i.test(html),
  };
}

type Check = { pass: boolean; good: string; bad: string; weight: number };

function scoreCategory(
  id: string,
  title: string,
  checks: Check[],
  summaryPass: string,
  summaryFail: string
): AuditCategoryScore {
  const total = checks.reduce((s, c) => s + c.weight, 0);
  const earned = checks.reduce((s, c) => s + (c.pass ? c.weight : 0), 0);
  const score = total === 0 ? 0 : Math.round((earned / total) * 100);
  return {
    id,
    title,
    score,
    summary: score >= 75 ? summaryPass : summaryFail,
    highlights: checks.filter((c) => c.pass).map((c) => c.good),
    issues: checks.filter((c) => !c.pass).map((c) => c.bad),
  };
}

function makeResult(
  rawUrl: string,
  s: SiteSignals,
  categories: AuditCategoryScore[],
  overallSummary: string
): UrlAuditResult {
  const average = Math.round(
    categories.reduce((sum, c) => sum + c.score, 0) / categories.length
  );
  return {
    url: s.finalUrl || normalizeUrl(rawUrl),
    scannedAt: new Date().toISOString(),
    overall: {
      id: "overall",
      title: "Overall Score",
      score: average,
      summary: !s.statusOk
        ? `The site returned HTTP ${s.status}, so some checks may be incomplete.`
        : overallSummary,
      highlights: categories.flatMap((c) => c.highlights).slice(0, 3),
      issues: categories.flatMap((c) => c.issues).slice(0, 3),
    },
    categories,
    recommendations: categories.flatMap((c) => c.issues).slice(0, 5),
  };
}

/** Website Grader shape: SEO, Accessibility, Performance, Security, Best Practices. */
export function buildGraderResult(rawUrl: string, s: SiteSignals): UrlAuditResult {
  const titleOk = s.title.length >= 10 && s.title.length <= 65;

  const seo = scoreCategory(
    "seo",
    "SEO",
    [
      { pass: s.title.length > 0, weight: 2, good: "Page title present", bad: "No <title> tag found" },
      { pass: titleOk, weight: 1, good: "Title length is in a good range", bad: "Title is too short or too long" },
      { pass: s.hasMetaDescription, weight: 2, good: "Meta description set", bad: "Meta description missing" },
      { pass: s.hasCanonical, weight: 1, good: "Canonical URL declared", bad: "No canonical tag" },
      { pass: s.hasH1, weight: 1, good: "H1 heading present", bad: "No H1 heading found" },
      { pass: s.hasOpenGraph, weight: 1, good: "Open Graph tags for social sharing", bad: "No Open Graph tags - links look bare when shared" },
    ],
    "Solid on-page SEO foundations.",
    "On-page SEO has clear gaps holding back search visibility."
  );

  const accessibility = scoreCategory(
    "accessibility",
    "Accessibility",
    [
      { pass: s.hasLang, weight: 2, good: "Page language declared", bad: "No lang attribute on <html>" },
      {
        pass: s.imgCount === 0 || s.imgMissingAlt === 0,
        weight: 2,
        good: s.imgCount === 0 ? "No images needing alt text" : "All images have alt text",
        bad: `${s.imgMissingAlt} of ${s.imgCount} images missing alt text`,
      },
      { pass: s.hasViewport, weight: 1, good: "Responsive viewport set", bad: "No viewport tag" },
    ],
    "Accessibility basics are in place (deep contrast/focus checks need a manual review).",
    "Accessibility basics need attention - and a deeper manual review is recommended."
  );

  const performance = scoreCategory(
    "performance",
    "Performance",
    [
      { pass: s.responseTimeMs <= 800, weight: 3, good: `Fast server response (${s.responseTimeMs}ms)`, bad: `Slow server response (${s.responseTimeMs}ms)` },
      { pass: s.htmlBytes <= 150_000, weight: 2, good: `Lightweight HTML (${Math.round(s.htmlBytes / 1024)}KB)`, bad: `Heavy HTML (${Math.round(s.htmlBytes / 1024)}KB)` },
    ],
    "First response is quick and lightweight.",
    "Response time or page weight could be improved."
  );

  const security = scoreCategory(
    "security",
    "Security",
    [
      { pass: s.https, weight: 3, good: "Served over HTTPS", bad: "Not served over HTTPS" },
      { pass: Boolean(s.headers["strict-transport-security"]), weight: 1, good: "HSTS header set", bad: "No Strict-Transport-Security header" },
      { pass: Boolean(s.headers["content-security-policy"]), weight: 1, good: "Content-Security-Policy set", bad: "No Content-Security-Policy header" },
      { pass: Boolean(s.headers["x-content-type-options"]), weight: 1, good: "X-Content-Type-Options set", bad: "No X-Content-Type-Options header" },
    ],
    "HTTPS and headers are in reasonable shape.",
    "Some security headers are missing."
  );

  const bestPractices = scoreCategory(
    "best-practices",
    "Best Practices",
    [
      { pass: s.hasDoctype, weight: 1, good: "Valid HTML5 doctype", bad: "Missing <!doctype html>" },
      { pass: s.hasCharset, weight: 1, good: "Character encoding declared", bad: "No charset meta tag" },
      { pass: s.hasFavicon, weight: 1, good: "Favicon linked", bad: "No favicon link found" },
      { pass: !s.usesDocumentWrite, weight: 1, good: "No document.write usage", bad: "Uses document.write (blocks rendering)" },
      { pass: !s.mixedContent, weight: 1, good: "No mixed-content references", bad: "Mixed content: http:// assets on an https page" },
    ],
    "Follows modern web best practices.",
    "A few best-practice issues to tidy up."
  );

  return makeResult(
    rawUrl,
    s,
    [seo, accessibility, performance, security, bestPractices],
    "A real scan of the fetchable signals - SEO, accessibility basics, speed, security, and best practices."
  );
}

/** SEO Checker shape: Meta Tags, Headings & Content, Technical SEO. */
export function buildSeoResult(rawUrl: string, s: SiteSignals): UrlAuditResult {
  const titleOk = s.title.length >= 10 && s.title.length <= 65;

  const meta = scoreCategory(
    "meta",
    "Meta Tags",
    [
      { pass: s.title.length > 0, weight: 2, good: "Title tag found", bad: "No <title> tag" },
      { pass: titleOk, weight: 1, good: "Title length is sensible", bad: "Title too short or too long" },
      { pass: s.hasMetaDescription, weight: 2, good: "Meta description set", bad: "Meta description missing or empty" },
      { pass: s.hasOpenGraph, weight: 1, good: "Open Graph tags present", bad: "Open Graph tags incomplete" },
    ],
    "Core meta tags are present.",
    "Core meta tags need work."
  );

  const headings = scoreCategory(
    "headings",
    "Headings & Content",
    [
      { pass: s.hasH1, weight: 2, good: "H1 heading detected", bad: "No H1 heading found" },
    ],
    "Heading structure looks reasonable.",
    "Heading structure needs attention."
  );

  const technical = scoreCategory(
    "technical",
    "Technical SEO",
    [
      { pass: s.hasCanonical, weight: 1, good: "Canonical tag present", bad: "No canonical tag" },
      { pass: s.https, weight: 1, good: "Served over HTTPS", bad: "Not served over HTTPS" },
      { pass: s.hasViewport, weight: 1, good: "Mobile viewport configured", bad: "No viewport meta tag" },
      { pass: s.hasLang, weight: 1, good: "Language declared", bad: "No lang attribute" },
    ],
    "Crawlability and technical signals look fine.",
    "A few technical SEO signals need attention."
  );

  return makeResult(
    rawUrl,
    s,
    [meta, headings, technical],
    "A real on-page SEO scan - meta tags, headings, and technical signals."
  );
}
