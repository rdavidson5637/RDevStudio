import type { MetadataRoute } from "next";
import { BUSINESS_TOOLS } from "@/lib/business-toolkit/catalog";
import { INTERACTIVE_TOOLS } from "@/lib/interactive-tools/catalog";
import { SITE_URL } from "@/lib/constants";

const ROUTES = [
  "",
  "/services",
  "/work",
  "/work/shelterlink",
  "/work/rvs-cold-brew",
  "/work/paintball-wales",
  "/work/concept-builds",
  "/toolkit",
  ...BUSINESS_TOOLS.map((tool) => tool.href),
  "/interactive",
  ...INTERACTIVE_TOOLS.map((tool) => tool.href),
  "/wardrobe-ai",
  "/draft",
  "/draft/squad",
  "/draft/waivers",
  "/draft/league",
  "/draft/live",
  "/draft/how-it-works",
  "/games",
  "/games/longest-word",
  "/projects",
  "/about",
  "/contact",
  "/champions-draft",
  "/rugby-draft",
  "/pub-quiz",
  // Coming soon. The built Stout Finder routes live in
  // app/(site)/stout-finder/_wip until it has real pub data.
  "/stout-finder",
  "/guitar-lab",
  "/gig-radar",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
