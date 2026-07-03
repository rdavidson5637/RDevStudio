import { getDefaultTrendingTools, getInteractiveToolBySlug } from "./catalog";

const TRENDING_KEY = "rdev_interactive_trending";
const MAX_TRENDING = 4;

type VisitCounts = Record<string, number>;

function readVisitCounts(): VisitCounts {
  if (typeof window === "undefined") return {};

  try {
    const raw = localStorage.getItem(TRENDING_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};

    return Object.fromEntries(
      Object.entries(parsed).filter(
        (entry): entry is [string, number] =>
          typeof entry[0] === "string" && typeof entry[1] === "number",
      ),
    );
  } catch {
    return {};
  }
}

function writeVisitCounts(counts: VisitCounts) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(TRENDING_KEY, JSON.stringify(counts));
  } catch {
    // ignore quota / privacy errors
  }
}

export function recordInteractiveToolVisit(slug: string): VisitCounts {
  const counts = readVisitCounts();
  counts[slug] = (counts[slug] ?? 0) + 1;
  writeVisitCounts(counts);
  return counts;
}

export function getTrendingSlugs(limit = MAX_TRENDING): string[] {
  const counts = readVisitCounts();
  const ranked = Object.entries(counts)
    .filter(([slug]) => getInteractiveToolBySlug(slug) !== undefined)
    .sort((a, b) => b[1] - a[1])
    .map(([slug]) => slug);

  if (ranked.length >= limit) {
    return ranked.slice(0, limit);
  }

  const defaults = getDefaultTrendingTools().map((tool) => tool.slug);
  const merged = [...ranked];

  for (const slug of defaults) {
    if (merged.length >= limit) break;
    if (!merged.includes(slug)) {
      merged.push(slug);
    }
  }

  return merged.slice(0, limit);
}
