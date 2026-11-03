import type { LandingPageAuditResult } from "@/types/landing-page-auditor";
import type { AuditCategoryScore } from "@/types/toolkit-audit";
import type { UrlAuditResult } from "@/types/url-audit-tool";
import { SITE_URL } from "@/lib/site";

/**
 * Real server-side site analysis. Fetches the URL (server-side, so no CORS),
 * reads the response headers + HTML, and scores what can be honestly measured
 * from a single fetch: HTTPS/security headers, on-page SEO signals, response
 * speed + page weight, mobile viewport, accessibility basics, and a few
 * best-practice checks.
 *
 * Deliberately not a Lighthouse clone. Contrast, keyboard use, and
 * real performance (LCP, CLS) are not scored from this fetch.
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
  h1Text: string;
  hasForm: boolean;
  hasContactMethod: boolean;
  hasPrivacyLink: boolean;
  ctaCount: number;
};

export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

function isBlockedHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    host === "0.0.0.0" ||
    host === "::1" ||
    host === "metadata.google.internal"
  ) {
    return true;
  }
  if (host.startsWith("127.") || host.startsWith("10.") || host.startsWith("192.168.") || host.startsWith("169.254.")) {
    return true;
  }
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(host)) return true;
  if (/^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./.test(host)) return true;
  if (host.includes(":")) {
    const bare = host.split("%")[0];
    if (bare === "::1" || bare.startsWith("fc") || bare.startsWith("fd") || bare.startsWith("fe80")) return true;
  }
  return false;
}

/** Returns an error message when a grader URL is not a public http(s) address. */
export function scanUrlError(input: string): string | null {
  let url: URL;
  try {
    url = new URL(normalizeUrl(input));
  } catch {
    return "That doesn't look like a valid URL.";
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return "That doesn't look like a valid URL.";
  }
  if (url.username || url.password || isBlockedHost(url.hostname)) {
    return "That host can't be scanned.";
  }
  return null;
}

const MAX_HTML_BYTES = 1_500_000;

async function readCappedText(response: Response): Promise<string> {
  const declared = Number(response.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > MAX_HTML_BYTES) {
    await response.body?.cancel();
    throw new Error("That page is too large to check.");
  }
  if (!response.body) {
    const text = await response.text();
    if (new TextEncoder().encode(text).byteLength > MAX_HTML_BYTES) {
      throw new Error("That page is too large to check.");
    }
    return text;
  }

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_HTML_BYTES) {
      await reader.cancel();
      throw new Error("That page is too large to check.");
    }
    chunks.push(value);
  }

  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(merged);
}

function titleLengthIssue(title: string, min: number, max: number): string {
  if (!title) return "No title tag";
  if (title.length < min) return `The title is very short (${title.length} characters)`;
  if (title.length > max) return `The title is very long (${title.length} characters)`;
  return "The title length is off";
}

async function fetchPublic(start: URL): Promise<{ response: Response; finalUrl: string }> {
  let current = start;

  for (let hop = 0; hop < 5; hop += 1) {
    const response = await fetch(current, {
      redirect: "manual",
      headers: { "User-Agent": `RDevStudioGrader/1.0 (+${SITE_URL})` },
      signal: AbortSignal.timeout(12_000),
    });
    if (response.status < 300 || response.status >= 400) {
      return { response, finalUrl: current.toString() };
    }
    const location = response.headers.get("location");
    if (!location) break;
    const next = new URL(location, current);
    if (scanUrlError(next.toString())) {
      throw new Error("That host can't be scanned.");
    }
    current = next;
  }

  throw new Error("Couldn't reach that site.");
}

export async function fetchSignals(rawUrl: string): Promise<SiteSignals> {
  const blocked = scanUrlError(rawUrl);
  if (blocked) throw new Error(blocked);
  const started = Date.now();
  const { response: res, finalUrl } = await fetchPublic(new URL(normalizeUrl(rawUrl)));
  const responseTimeMs = Date.now() - started;
  const html = await readCappedText(res);
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
    h1Text: stripTags(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? ""),
    hasForm: /<form\b/i.test(html),
    hasContactMethod: /href=["'](?:mailto:|tel:)/i.test(html),
    hasPrivacyLink: /href=["'][^"']*privacy/i.test(html),
    ctaCount: countCtas(html),
  };
}

function stripTags(value: string): string {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function countCtas(html: string): number {
  const tags = html.match(/<(?:a|button)\b[^>]*>[\s\S]*?<\/(?:a|button)>/gi) ?? [];
  return tags.filter((tag) =>
    /\b(contact|quote|book|call|email|get in touch|order|buy|sign up|register)\b/i.test(stripTags(tag)),
  ).length;
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
      { pass: titleOk, weight: 1, good: "Title length is in a good range", bad: titleLengthIssue(s.title, 10, 65) },
      { pass: s.hasMetaDescription, weight: 2, good: "Meta description set", bad: "Meta description missing" },
      { pass: s.hasCanonical, weight: 1, good: "Canonical URL declared", bad: "No canonical tag" },
      { pass: s.hasH1, weight: 1, good: "H1 heading present", bad: "No H1 heading found" },
      { pass: s.hasOpenGraph, weight: 1, good: "Open Graph tags for social sharing", bad: "No Open Graph tags - links look bare when shared" },
    ],
    "Solid on-page SEO foundations.",
    "On-page SEO has gaps."
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
    "Server response",
    [
      { pass: s.responseTimeMs <= 800, weight: 3, good: `Fast server response (${s.responseTimeMs}ms)`, bad: `Slow server response (${s.responseTimeMs}ms)` },
      { pass: s.htmlBytes <= 150_000, weight: 2, good: `Lightweight HTML (${Math.round(s.htmlBytes / 1024)}KB)`, bad: `Heavy HTML (${Math.round(s.htmlBytes / 1024)}KB)` },
    ],
    "The server answered quickly and the HTML is light. This is not a phone speed test.",
    "The server was slow, or the HTML is heavy. This is not a phone speed test."
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
    "Checked the HTML, the server response, HTTPS, and a few headers. This is not a phone speed test."
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
      { pass: titleOk, weight: 1, good: "Title length is sensible", bad: titleLengthIssue(s.title, 10, 65) },
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
    "An h1 is present.",
    "No h1 was found."
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
    "Canonical, HTTPS, viewport, and language are in place.",
    "Canonical, HTTPS, viewport, or language is missing."
  );

  return makeResult(
    rawUrl,
    s,
    [meta, headings, technical],
    "A real on-page SEO scan - meta tags, headings, and technical signals."
  );
}

/** What a single HTML fetch can actually say about accessibility. */
export function buildAccessibilityResult(rawUrl: string, s: SiteSignals): UrlAuditResult {
  const images = scoreCategory(
    "images",
    "Images",
    [
      {
        pass: s.imgCount === 0 || s.imgMissingAlt === 0,
        weight: 2,
        good: s.imgCount === 0 ? "No images on the page" : "Every image has alt text",
        bad: `${s.imgMissingAlt} of ${s.imgCount} images have no alt text`,
      },
    ],
    "Image text alternatives are in place.",
    "Some images have no alt text.",
  );

  const page = scoreCategory(
    "page",
    "Page basics",
    [
      { pass: s.hasLang, weight: 2, good: "Page language is declared", bad: "No lang attribute on the html element" },
      { pass: s.hasViewport, weight: 1, good: "Viewport tag is set", bad: "No viewport tag" },
      { pass: s.hasH1, weight: 1, good: "An h1 is present", bad: "No h1 heading" },
      { pass: s.title.length > 0, weight: 1, good: "The page has a title", bad: "No title tag" },
    ],
    "The page basics a screen reader needs are present.",
    "A few page basics are missing.",
  );

  return makeResult(
    rawUrl,
    s,
    [images, page],
    "Checked from the page HTML: language, title, heading, viewport, and image alt text. Contrast and keyboard behaviour are not in this scan.",
  );
}

/** Checks a landing page from the HTML. Not a model, and it does not invent findings. */
export function buildLandingResult(rawUrl: string, s: SiteSignals): LandingPageAuditResult {
  const hero = scoreCategory(
    "hero",
    "First screen",
    [
      { pass: s.h1Text.length > 0, weight: 2, good: "The page has an h1", bad: "No h1 heading" },
      { pass: s.title.length >= 10 && s.title.length <= 70, weight: 1, good: "The title is a usable length", bad: titleLengthIssue(s.title, 10, 70) },
      { pass: s.hasMetaDescription, weight: 1, good: "A meta description is set", bad: "No meta description" },
    ],
    "The page says what it is in the title and the heading.",
    "The title, heading, or description is missing.",
  );

  const cta = scoreCategory(
    "cta",
    "A way to respond",
    [
      { pass: s.ctaCount > 0 || s.hasForm || s.hasContactMethod, weight: 2, good: "There is a contact link, a form, or a clear action", bad: "No contact link, form, or clear action in the HTML" },
      { pass: s.hasContactMethod || s.hasForm, weight: 1, good: "A form, email, or phone link is in the page", bad: "No form, email link, or phone link" },
    ],
    "A visitor can see how to respond.",
    "A visitor may not see how to respond.",
  );

  const trust = scoreCategory(
    "trust",
    "Trust",
    [
      { pass: s.hasPrivacyLink, weight: 1, good: "A privacy link is in the HTML", bad: "No privacy link found in the HTML" },
      { pass: s.hasContactMethod, weight: 1, good: "An email or phone link is on the page", bad: "No email or phone link" },
    ],
    "Contact and a privacy link are on the page.",
    "Contact details or a privacy link are missing from the HTML.",
  );

  const sections = [cta, trust];
  return {
    url: s.finalUrl || normalizeUrl(rawUrl),
    scannedAt: new Date().toISOString(),
    hero,
    sections,
    recommendations: [hero, ...sections].flatMap((category) => category.issues).slice(0, 5),
  };
}
