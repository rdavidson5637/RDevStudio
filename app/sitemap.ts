import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

const ROUTES = [
  "",
  "/work",
  "/work/shelterlink",
  "/work/rvs-cold-brew",
  "/work/concept-builds",
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
