import type { MetadataRoute } from "next";
import { BUSINESS_TOOLS } from "@/lib/business-toolkit/catalog";
import { INTERACTIVE_TOOLS } from "@/lib/interactive-tools/catalog";
import { SITE_URL } from "@/lib/constants";
import { getAllPubSlugs, getStoutFinderStats } from "@/lib/stout-finder/queries";

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
  "/stout-finder",
  "/guitar-lab",
  "/gig-radar",
] as const;

const STOUT_ROUTES = [
  "/stout-finder/beamish",
  "/stout-finder/kilkenny",
  "/stout-finder/murphys",
  "/stout-finder/guinness",
  "/stout-finder/add",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const stats = await getStoutFinderStats();
  const pubPaths = stats.ready
    ? [
        ...STOUT_ROUTES,
        ...(await getAllPubSlugs()).map((slug) => `/stout-finder/${slug}`),
      ]
    : [];

  return [...ROUTES, ...pubPaths].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
