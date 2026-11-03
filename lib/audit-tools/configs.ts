import { fetchAuditResult } from "@/lib/audit-tools/fetch-audit";

export const SEO_CHECKER_CONFIG = {
  toolSlug: "seo-checker",
  category: "Audit & analysis",
  title: "SEO Checker",
  description:
    "Checks the page HTML for a title, a meta description, a heading, a canonical, and HTTPS.",
  steps: [
    { id: "fetch", label: "Fetching page" },
    { id: "meta", label: "Checking the title and description" },
    { id: "headings", label: "Looking for a heading" },
    { id: "technical", label: "Checking canonical and HTTPS" },
    { id: "report", label: "Writing the report" },
  ],
  submitLabel: "Check SEO",
  hint: "This reads the HTML. It does not crawl the rest of the site.",
  resetLabel: "Check another site",
  loadingSubtitle: "Reading the page HTML.",
  progressLabel: "SEO scan progress",
  getResult: (url: string) => fetchAuditResult(url, "seo"),
};

export const ACCESSIBILITY_CHECKER_CONFIG = {
  toolSlug: "accessibility-checker",
  category: "Audit & analysis",
  title: "Accessibility Checker",
  description:
    "Checks the page HTML for a language, a title, a heading, a viewport, and image alt text.",
  steps: [
    { id: "fetch", label: "Loading page" },
    { id: "images", label: "Checking image alt text" },
    { id: "page", label: "Checking language, title, and heading" },
    { id: "report", label: "Writing the report" },
  ],
  submitLabel: "Check accessibility",
  hint: "This reads the HTML. It does not measure colour contrast or keyboard use.",
  resetLabel: "Check another site",
  loadingSubtitle: "Reading the page HTML.",
  progressLabel: "Accessibility scan progress",
  getResult: (url: string) => fetchAuditResult(url, "a11y"),
};
