export const BORED_GAMES = [
  {
    slug: "longest-word",
    title: "Longest Word",
    description:
      "Spell the longest word you can from today's 4×4 letter grid. Same grid for everyone — resets at midnight.",
    tag: "Daily",
  },
] as const;

export type BoredGame = (typeof BORED_GAMES)[number];
export type BoredGameSlug = BoredGame["slug"];

export function getBoredGame(slug: string) {
  return BORED_GAMES.find((game) => game.slug === slug);
}
