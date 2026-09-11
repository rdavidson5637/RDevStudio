/** BBC Sport team slugs keyed by FPL short_name. Unknown / newly promoted
 * clubs fall back to the general football feed, filtered by club name. */
export const BBC_SLUG_BY_SHORT_NAME: Record<string, string> = {
  ARS: "arsenal",
  AVL: "aston-villa",
  BOU: "bournemouth",
  BRE: "brentford",
  BHA: "brighton",
  BUR: "burnley",
  CHE: "chelsea",
  CRY: "crystal-palace",
  EVE: "everton",
  FUL: "fulham",
  LEE: "leeds-united",
  LEI: "leicester-city",
  LIV: "liverpool",
  MCI: "manchester-city",
  MUN: "manchester-united",
  NEW: "newcastle-united",
  NFO: "nottingham-forest",
  SOU: "southampton",
  SUN: "sunderland",
  TOT: "tottenham-hotspur",
  WHU: "west-ham-united",
  WOL: "wolverhampton-wanderers",
  IPS: "ipswich-town",
  LUT: "luton-town",
  SHU: "sheffield-united",
};

export const SHARED_FEEDS = [
  { url: "https://feeds.bbci.co.uk/sport/football/rss.xml", sourceName: "BBC Sport" },
  { url: "https://www.theguardian.com/football/rss", sourceName: "The Guardian" },
] as const;

export function clubFeed(shortName: string): { url: string; sourceName: string } | null {
  const slug = BBC_SLUG_BY_SHORT_NAME[shortName.toUpperCase()];
  if (!slug) return null;
  return {
    url: `https://feeds.bbci.co.uk/sport/football/teams/${slug}/rss.xml`,
    sourceName: "BBC Sport",
  };
}
