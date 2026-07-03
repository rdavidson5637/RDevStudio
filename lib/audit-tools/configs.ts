import type { UrlAuditResult } from "@/types/url-audit-tool";
import { getHostname } from "@/lib/toolkit-audit/utils";

function baseResult(
  url: string,
  categories: UrlAuditResult["categories"],
  overallSummary: string,
): UrlAuditResult {
  const average = Math.round(
    categories.reduce((sum, c) => sum + c.score, 0) / categories.length,
  );
  const host = getHostname(url);
  return {
    url,
    scannedAt: new Date().toISOString(),
    overall: {
      id: "overall",
      title: "Overall Score",
      score: average,
      summary: overallSummary.replace("{host}", host),
      highlights: categories.flatMap((c) => c.highlights).slice(0, 3),
      issues: categories.flatMap((c) => c.issues).slice(0, 3),
    },
    categories,
  };
}

export const SEO_CHECKER_CONFIG = {
  toolSlug: "seo-checker",
  category: "Audit & analysis",
  title: "SEO Checker",
  description:
    "Quick on-page SEO scan - titles, meta tags, headings, and the basics that actually matter.",
  steps: [
    { id: "fetch", label: "Fetching page" },
    { id: "meta", label: "Checking meta tags" },
    { id: "headings", label: "Analysing headings" },
    { id: "links", label: "Reviewing internal links" },
    { id: "schema", label: "Looking for structured data" },
    { id: "report", label: "Building SEO report" },
  ],
  submitLabel: "Check SEO",
  hint: "We'll review titles, meta descriptions, headings, links, and structured data.",
  resetLabel: "Check another site",
  loadingSubtitle: "Running on-page SEO checks and metadata review.",
  progressLabel: "SEO scan progress",
  getResult: (url: string): UrlAuditResult =>
    baseResult(
      url,
      [
        {
          id: "meta",
          title: "Meta Tags",
          score: 74,
          summary:
            "Core meta tags are present but descriptions could be stronger.",
          highlights: ["Title tag found", "Viewport meta configured"],
          issues: [
            "Meta description missing or too short",
            "Open Graph tags incomplete",
          ],
        },
        {
          id: "headings",
          title: "Headings",
          score: 81,
          summary:
            "Heading hierarchy is mostly logical with one skipped level.",
          highlights: ["Single H1 detected", "Section headings use H2"],
          issues: ["H3 appears before H2 in one section"],
        },
        {
          id: "content",
          title: "Content & Keywords",
          score: 69,
          summary: "Copy is readable but keyword focus is inconsistent.",
          highlights: ["Sufficient word count on landing page"],
          issues: [
            "Target keyword absent from first paragraph",
            "Thin content on /about",
          ],
        },
        {
          id: "technical",
          title: "Technical SEO",
          score: 77,
          summary:
            "Crawlability looks fine; a few indexation signals need attention.",
          highlights: ["Canonical tag present", "Robots.txt allows crawling"],
          issues: [
            "No XML sitemap referenced in robots.txt",
            "Hreflang not configured",
          ],
        },
      ],
      "{host} has solid SEO foundations - tighten metadata and heading structure for quick wins.",
    ),
};

export const ACCESSIBILITY_CHECKER_CONFIG = {
  toolSlug: "accessibility-checker",
  category: "Audit & analysis",
  title: "Accessibility Checker",
  description:
    "Spot common a11y issues - contrast, alt text, labels, and keyboard traps - before your users do.",
  steps: [
    { id: "fetch", label: "Loading page" },
    { id: "contrast", label: "Checking colour contrast" },
    { id: "images", label: "Reviewing images" },
    { id: "forms", label: "Testing forms" },
    { id: "keyboard", label: "Simulating keyboard navigation" },
    { id: "report", label: "Compiling accessibility report" },
  ],
  submitLabel: "Check accessibility",
  hint: "We'll check contrast, alt text, forms, ARIA usage, and keyboard navigation.",
  resetLabel: "Check another site",
  loadingSubtitle: "Evaluating WCAG-oriented checks across the page.",
  progressLabel: "Accessibility scan progress",
  getResult: (url: string): UrlAuditResult =>
    baseResult(
      url,
      [
        {
          id: "contrast",
          title: "Colour Contrast",
          score: 68,
          summary:
            "Several text/background pairs fall below WCAG AA for normal text.",
          highlights: ["Body text on white passes AA"],
          issues: [
            "Muted grey text on cream background fails AA",
            "Button hover state low contrast",
          ],
        },
        {
          id: "images",
          title: "Images & Media",
          score: 72,
          summary:
            "Most images have alt text; decorative images need empty alt attributes.",
          highlights: ["Hero image has descriptive alt"],
          issues: [
            "Three product thumbnails use filename as alt",
            "Video lacks captions",
          ],
        },
        {
          id: "forms",
          title: "Forms & Labels",
          score: 65,
          summary:
            "Contact form fields need explicit labels and error associations.",
          highlights: ["Required fields marked visually"],
          issues: [
            "Email field missing label element",
            "Error messages not linked with aria-describedby",
          ],
        },
        {
          id: "keyboard",
          title: "Keyboard & Focus",
          score: 70,
          summary:
            "Most interactive elements are reachable; focus visibility is inconsistent.",
          highlights: ["Skip link present", "Modal traps focus correctly"],
          issues: [
            "Dropdown menu not operable via keyboard",
            "Focus ring removed on nav links",
          ],
        },
      ],
      "{host} is usable for many visitors - fixing contrast and form labels would help the most people.",
    ),
};

export const GBP_AUDIT_CONFIG = {
  toolSlug: "google-business-profile-audit",
  category: "Audit & analysis",
  title: "Google Business Profile Audit",
  description:
    "Review your GBP listing for completeness, consistency, and the details local customers notice.",
  steps: [
    { id: "profile", label: "Loading business profile" },
    { id: "info", label: "Checking business information" },
    { id: "photos", label: "Reviewing photos" },
    { id: "reviews", label: "Analysing reviews" },
    { id: "posts", label: "Checking Google posts" },
    { id: "report", label: "Preparing audit summary" },
  ],
  submitLabel: "Audit profile",
  hint: "Paste your website URL - we'll simulate a local listing audit (GBP API not connected yet).",
  resetLabel: "Audit another business",
  loadingSubtitle:
    "Reviewing listing completeness, photos, reviews, and local signals.",
  progressLabel: "GBP audit progress",
  getResult: (url: string): UrlAuditResult => {
    const result = baseResult(
      url,
      [
        {
          id: "info",
          title: "Business Information",
          score: 76,
          summary:
            "Core NAP details look consistent; hours and categories need refinement.",
          highlights: ["Business name matches website", "Phone number listed"],
          issues: [
            "Saturday hours missing",
            "Primary category could be more specific",
          ],
        },
        {
          id: "photos",
          title: "Photos & Media",
          score: 62,
          summary: "Photo count is low compared to competitors in the area.",
          highlights: ["Logo uploaded", "Exterior photo present"],
          issues: [
            "No team photos",
            "Last photo upload over 6 months ago",
            "No short video",
          ],
        },
        {
          id: "reviews",
          title: "Reviews & Responses",
          score: 71,
          summary:
            "Good rating volume; response rate to recent reviews is low.",
          highlights: ["4.6 average rating", "Steady review velocity"],
          issues: [
            "Three recent reviews unanswered",
            "No responses mention services by name",
          ],
        },
        {
          id: "posts",
          title: "Posts & Updates",
          score: 58,
          summary:
            "Google posts are infrequent - missed opportunity for local visibility.",
          highlights: ["One offer post still active"],
          issues: [
            "No posts in the last 30 days",
            "Q&A section has unanswered questions",
          ],
        },
      ],
      "{host} has a workable local presence - more photos and regular posts would strengthen it.",
    );
    return {
      ...result,
      recommendations: [
        "Upload 5–10 fresh photos: team, interior, products, and before/after shots.",
        "Reply to every review from the last 90 days with a personal, on-brand message.",
        "Post weekly updates - offers, events, or tips - to stay visible in local search.",
        "Complete all business hours including holidays and special opening times.",
        "Add secondary categories that match your most profitable services.",
      ],
    };
  },
};
