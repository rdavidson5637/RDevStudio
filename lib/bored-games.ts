export const BORED_GAMES = [
  {
    slug: "champions-draft",
    title: "Champions Draft",
    description:
      "Spin iconic squads, draft your ultimate XI, and compete in league, Champions League, and World Cup modes.",
    tag: "Football",
    href: "/champions-draft",
  },
  {
    slug: "rugby-draft",
    title: "Rugby Draft",
    description:
      "Spin nation and club squads, draft your XV, and compete in Six Nations, World Cup, and Champions Cup modes.",
    tag: "Rugby",
    href: "/rugby-draft",
  },
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

export function getBoredGameHref(game: BoredGame) {
  return "href" in game && game.href ? game.href : `/bored/${game.slug}`;
}

export function getOtherBoredGames() {
  return BORED_GAMES.filter((game) => game.slug !== "champions-draft");
}
