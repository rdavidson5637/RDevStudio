import type { WebsiteGraderResult } from "@/types/website-grader";
import { getHostname } from "@/lib/toolkit-audit/utils";

function buildPlaceholderScores(url: string): WebsiteGraderResult {
  const host = getHostname(url);

  const categories: WebsiteGraderResult["categories"] = [
    {
      id: "seo",
      title: "SEO",
      score: 78,
      summary: `Solid foundations for ${host}, with room to sharpen metadata and internal linking.`,
      highlights: [
        "Title tag present and descriptive",
        "Mobile viewport configured",
        "Canonical URL detected",
      ],
      issues: [
        "Meta description is missing on key pages",
        "Several images lack descriptive alt text",
        "H1 heading could be more keyword-focused",
      ],
    },
    {
      id: "accessibility",
      title: "Accessibility",
      score: 71,
      summary:
        "Most content is readable, but contrast and form labelling need attention.",
      highlights: [
        "Page language attribute is set",
        "Skip link or logical heading order detected",
        "Buttons use accessible names",
      ],
      issues: [
        "Low colour contrast on secondary text",
        "Some form fields missing associated labels",
        "Focus styles are inconsistent on navigation",
      ],
    },
    {
      id: "performance",
      title: "Performance",
      score: 64,
      summary:
        "First load is acceptable on fast connections but heavy assets slow mobile users.",
      highlights: [
        "Text content renders without long blocking scripts",
        "Fonts use display swap",
        "Server response time is reasonable",
      ],
      issues: [
        "Large hero images are not optimally compressed",
        "Unused JavaScript could be deferred",
        "Largest Contentful Paint may exceed 2.5s on 4G",
      ],
    },
    {
      id: "security",
      title: "Security",
      score: 82,
      summary:
        "HTTPS and basic headers are in place; a few hardening tweaks remain.",
      highlights: [
        "Site loads over HTTPS",
        "No mixed-content warnings detected",
        "Cookies use secure attributes where expected",
      ],
      issues: [
        "Content-Security-Policy header not detected",
        "HSTS preload not configured",
        "Some third-party scripts load without integrity checks",
      ],
    },
    {
      id: "best-practices",
      title: "Best Practices",
      score: 75,
      summary:
        "Modern stack choices with minor issues around console errors and deprecated APIs.",
      highlights: [
        "No document.write usage detected",
        "Images use appropriate aspect ratios",
        "Touch targets are generally large enough",
      ],
      issues: [
        "Browser console reports JavaScript errors",
        "Deprecated APIs referenced in a bundled library",
        "Favicon and app icons could be consolidated",
      ],
    },
  ];

  const average = Math.round(
    categories.reduce((sum, category) => sum + category.score, 0) /
      categories.length,
  );

  return {
    url,
    scannedAt: new Date().toISOString(),
    overall: {
      id: "overall",
      title: "Overall Score",
      score: average,
      summary: `${host} scores ${average}/100 overall — a good starting point with clear wins in SEO and security.`,
      highlights: [
        "HTTPS enabled across the site",
        "Mobile-friendly layout detected",
        "Core content is crawlable",
      ],
      issues: [
        "Performance optimizations would lift the overall grade fastest",
        "Accessibility fixes are mostly quick wins",
        "Metadata gaps are holding back search visibility",
      ],
    },
    categories,
  };
}

export function getPlaceholderGraderResult(url: string): WebsiteGraderResult {
  return buildPlaceholderScores(url);
}
