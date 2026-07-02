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
    slug: "pub-quiz",
    title: "Pub Quiz",
    description:
      "Host a quiz night or join with a code. Picture rounds, music clips, buzzer rounds, and team mode.",
    tag: "Live",
    href: "/pub-quiz",
  },
  {
    slug: "longest-word",
    title: "Longest Word",
    description:
      "Spell the longest word you can from today's 4×4 letter grid. Same grid for everyone — resets at midnight.",
    tag: "Daily",
    href: "/games",
  },
] as const;

export type BoredGame = (typeof BORED_GAMES)[number];
export type BoredGameSlug = BoredGame["slug"];

export function getBoredGame(slug: string) {
  return BORED_GAMES.find((game) => game.slug === slug);
}

export function getBoredGameHref(game: BoredGame) {
  return game.href;
}

const FEATURED_GAME_SLUGS = ["champions-draft", "rugby-draft"] as const;

export function getOtherBoredGames() {
  return BORED_GAMES.filter(
    (game) => !FEATURED_GAME_SLUGS.includes(game.slug as (typeof FEATURED_GAME_SLUGS)[number])
  );
}
