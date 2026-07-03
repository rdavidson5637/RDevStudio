const FAVOURITES_KEY = "rdev_toolkit_favourites";
const RECENT_KEY = "rdev_toolkit_recent";
const MAX_RECENT = 6;

function readJsonArray(key: string): string[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

function writeJsonArray(key: string, values: string[]) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(key, JSON.stringify(values));
  } catch {
    // ignore quota / privacy errors
  }
}

export function getFavouriteSlugs(): string[] {
  return readJsonArray(FAVOURITES_KEY);
}

export function setFavouriteSlugs(slugs: string[]) {
  writeJsonArray(FAVOURITES_KEY, slugs);
}

export function toggleFavouriteSlug(slug: string): string[] {
  const current = getFavouriteSlugs();
  const next = current.includes(slug)
    ? current.filter((entry) => entry !== slug)
    : [slug, ...current];
  setFavouriteSlugs(next);
  return next;
}

export function getRecentSlugs(): string[] {
  return readJsonArray(RECENT_KEY);
}

export function recordRecentSlug(slug: string): string[] {
  const current = getRecentSlugs().filter((entry) => entry !== slug);
  const next = [slug, ...current].slice(0, MAX_RECENT);
  writeJsonArray(RECENT_KEY, next);
  return next;
}
