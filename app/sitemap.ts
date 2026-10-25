import type { MetadataRoute } from "next";
import { BUSINESS_TOOLS } from "@/lib/business-toolkit/catalog";
import { SITE_URL } from "@/lib/site";

/**
 * Hand-set dates. Bump a page's date when its content changes.
 * Do not stamp these with the build time.
 */
const LAST_MODIFIED: Record<string, string> = {
  "/": "2026-10-22",
  "/services": "2026-10-25",
  "/work": "2026-10-25",
  "/work/rvs-cold-brew": "2026-10-22",
  "/work/shelterlink": "2026-10-22",
  "/work/concept-builds": "2026-10-22",
  "/work/uc-caseworker-tool": "2026-10-22",
  "/about": "2026-10-25",
  "/contact": "2026-10-22",
  "/privacy": "2026-10-25",
  "/projects": "2026-10-25",
  "/toolkit": "2026-10-25",
  "/toolkit/website-grader": "2026-10-22",
  "/toolkit/ai-landing-page-auditor": "2026-10-25",
  "/toolkit/seo-checker": "2026-10-25",
  "/toolkit/accessibility-checker": "2026-10-25",
  "/toolkit/google-business-profile-audit": "2026-10-25",
  "/toolkit/qr-code-generator": "2026-10-22",
  "/toolkit/invoice-generator": "2026-10-22",
  "/toolkit/review-response-generator": "2026-10-22",
  "/toolkit/business-name-generator": "2026-10-22",
  "/toolkit/logo-roast": "2026-10-25",
  "/toolkit/sitemap-generator": "2026-10-25",
  "/toolkit/robots-txt-generator": "2026-10-22",
  "/toolkit/favicon-generator": "2026-10-22",
  "/toolkit/colour-palette-generator": "2026-10-22",
  "/toolkit/gradient-generator": "2026-10-22",
};

const STATIC_PATHS = [
  "/",
  "/services",
  "/work",
  "/work/rvs-cold-brew",
  "/work/shelterlink",
  "/work/concept-builds",
  "/work/uc-caseworker-tool",
  "/about",
  "/contact",
  "/privacy",
  "/projects",
  "/toolkit",
] as const;

function entry(path: string): MetadataRoute.Sitemap[number] {
  const lastModified = LAST_MODIFIED[path] ?? "2026-10-22";
  return {
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    lastModified,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const toolkitPaths = BUSINESS_TOOLS.map((tool) => tool.href);
  const paths = [...STATIC_PATHS, ...toolkitPaths];
  return paths.map((path) => entry(path));
}
