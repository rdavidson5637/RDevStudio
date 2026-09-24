import type { MetadataRoute } from "next";
import { BUSINESS_TOOLS } from "@/lib/business-toolkit/catalog";
import { INTERACTIVE_TOOLS } from "@/lib/interactive-tools/catalog";
import { SITE_URL } from "@/lib/constants";

type Entry = {
  path: string;
  priority: number;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
};

// No lastModified: stamping every URL with the build time tells search
// engines nothing. Add one per entry only where there is a real date.
const SALES: Entry[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9 },
  { path: "/services/websites", priority: 0.9 },
  { path: "/services/social-media", priority: 0.8 },
  { path: "/services/content", priority: 0.8 },
  { path: "/web-design-carrickfergus", priority: 0.8 },
  { path: "/web-design-belfast", priority: 0.8 },
  { path: "/contact", priority: 0.8 },
];

const WORK: Entry[] = [
  { path: "/work", priority: 0.8 },
  { path: "/work/shelterlink", priority: 0.7 },
  { path: "/work/rvs-cold-brew", priority: 0.7 },
  { path: "/work/paintball-wales", priority: 0.7 },
  { path: "/work/concept-builds", priority: 0.7 },
  { path: "/work/uc-caseworker-tool", priority: 0.7 },
  { path: "/about", priority: 0.7 },
  { path: "/hire", priority: 0.6 },
  { path: "/build/pub-quiz", priority: 0.6 },
  { path: "/build/champions-draft", priority: 0.6 },
  { path: "/build/draft-analyser", priority: 0.6 },
];

const PRODUCTS: Entry[] = [
  { path: "/champions-draft", priority: 0.6 },
  { path: "/rugby-draft", priority: 0.6 },
  { path: "/pub-quiz", priority: 0.6 },
  { path: "/games", priority: 0.5 },
  { path: "/games/longest-word", priority: 0.4 },
  { path: "/projects", priority: 0.5 },
  { path: "/wardrobe-ai", priority: 0.4 },
  { path: "/draft", priority: 0.4 },
  { path: "/draft/squad", priority: 0.3 },
  { path: "/draft/waivers", priority: 0.3 },
  { path: "/draft/league", priority: 0.3 },
  { path: "/draft/live", priority: 0.3 },
  { path: "/draft/how-it-works", priority: 0.4 },
];

const TOOLS: Entry[] = [
  { path: "/toolkit", priority: 0.5 },
  ...BUSINESS_TOOLS.filter((tool) => tool.status !== "soon").map((tool) => ({
    path: tool.href,
    priority: 0.4,
  })),
  { path: "/interactive", priority: 0.4 },
  ...INTERACTIVE_TOOLS.filter((tool) => tool.status !== "soon").map(
    (tool) => ({ path: tool.href, priority: 0.3 }),
  ),
];

const LEGAL: Entry[] = [
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...SALES, ...WORK, ...PRODUCTS, ...TOOLS, ...LEGAL].map(
    ({ path, priority, changeFrequency = "monthly" }) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency,
      priority,
    }),
  );
}
