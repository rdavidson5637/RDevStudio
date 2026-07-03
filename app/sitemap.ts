import type { MetadataRoute } from "next";
import { BUSINESS_TOOLS } from "@/lib/business-toolkit/catalog";
import { INTERACTIVE_TOOLS } from "@/lib/interactive-tools/catalog";
import { SITE_URL } from "@/lib/constants";

const ROUTES = [
  "",
  "/work",
  "/work/shelterlink",
  "/work/rvs-cold-brew",
  "/work/concept-builds",
  "/toolkit",
  ...BUSINESS_TOOLS.map((tool) => tool.href),
  "/interactive",
  ...INTERACTIVE_TOOLS.map((tool) => tool.href),
  "/games",
  "/about",
  "/contact",
  "/champions-draft",
  "/rugby-draft",
  "/pub-quiz",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
