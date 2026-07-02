export type GameCatalogEntry = {
  id: string;
  title: string;
  href: string;
  description: string;
  meta: string;
  screenshotCaption: string;
  screenshotSrc: string;
  /** When set, renders "ATTENDANCE — {n} PLAYERS" in Space Mono */
  attendance?: number;
};

export const GAMES_CATALOG: GameCatalogEntry[] = [
  {
    id: "champions-draft",
    title: "CHAMPIONS DRAFT",
    href: "/champions-draft",
    description:
      "Draft your dream squad, live with your choices. Harder than it sounds.",
    meta: "FOOTBALL · BROWSER · FREE",
    screenshotCaption: "CHAMPIONS DRAFT SCREENSHOT",
    screenshotSrc: "/images/games/champions-draft.jpg",
  },
  {
    id: "rugby-draft",
    title: "RUGBY DRAFT",
    href: "/rugby-draft",
    description:
      "Same idea, more shoulders. Build a rugby squad that would actually win something.",
    meta: "RUGBY · BROWSER · FREE",
    screenshotCaption: "RUGBY DRAFT SCREENSHOT",
    screenshotSrc: "/images/games/rugby-draft.jpg",
  },
  {
    id: "pub-quiz",
    title: "PUB QUIZ",
    href: "/pub-quiz",
    description:
      "A quiz you can run from one phone. Settles arguments, starts new ones.",
    meta: "TRIVIA · PASS-AND-PLAY · FREE",
    screenshotCaption: "PUB QUIZ SCREENSHOT",
    screenshotSrc: "/images/games/pub-quiz.jpg",
  },
];
