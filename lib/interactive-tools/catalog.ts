import type {
  InteractiveTool,
  InteractiveToolCategoryMeta,
} from "@/types/interactive-tools";

export const INTERACTIVE_BASE_PATH = "/interactive";

export const INTERACTIVE_CATEGORIES: InteractiveToolCategoryMeta[] = [
  {
    id: "all",
    label: "All tools",
    description: "Every interactive tool in the collection",
  },
  {
    id: "events",
    label: "Events & timers",
    description: "Countdowns, bingo nights, and shared moments",
  },
  {
    id: "rankings",
    label: "Rankings & brackets",
    description: "Tier lists, knockout draws, and debate settlers",
  },
  {
    id: "pickers",
    label: "Pickers & wheels",
    description: "Spin, shuffle, and let chance decide",
  },
  {
    id: "quizzes",
    label: "Quizzes & games",
    description: "Build quizzes and group activities in the browser",
  },
];

export const INTERACTIVE_TOOLS: InteractiveTool[] = [
  {
    id: "countdown",
    slug: "countdown",
    title: "Countdown Timer",
    description:
      "Set a live countdown for launches, kick-offs, or pub quiz start times - fullscreen-ready and shareable.",
    category: "events",
    href: `${INTERACTIVE_BASE_PATH}/countdown`,
    featured: true,
    trending: true,
    badge: "new",
    keywords: ["countdown", "timer", "launch", "event", "fullscreen"],
  },
  {
    id: "countdown-game",
    slug: "countdown-game",
    title: "Countdown Game",
    description:
      "Play the Countdown letters and numbers rounds solo. Beat the clock, then see the best the solver could find.",
    category: "quizzes",
    href: `${INTERACTIVE_BASE_PATH}/countdown-game`,
    featured: true,
    trending: true,
    badge: "new",
    status: "live",
    keywords: ["countdown", "letters", "numbers", "anagram", "game", "word game"],
  },
  {
    id: "tier-list-builder",
    slug: "tier-list-builder",
    title: "Tier List Builder",
    description:
      "Drag items into S-through-F tiers, export your rankings, and settle the group chat once and for all.",
    category: "rankings",
    href: `${INTERACTIVE_BASE_PATH}/tier-list-builder`,
    featured: true,
    trending: true,
    badge: "new",
    keywords: ["tier list", "ranking", "drag", "debate", "export"],
  },
  {
    id: "bracket-builder",
    slug: "bracket-builder",
    title: "Bracket Builder",
    description:
      "Create single- or double-elimination brackets, fill in winners round by round, and crown a champion.",
    category: "rankings",
    href: `${INTERACTIVE_BASE_PATH}/bracket-builder`,
    featured: true,
    trending: false,
    badge: "new",
    keywords: ["bracket", "tournament", "knockout", "elimination", "sports"],
  },
  {
    id: "tournament-builder",
    slug: "tournament-builder",
    title: "Tournament Builder",
    description:
      "Split 8 teams into groups and plan your knockout stage - ideal for local leagues and pub tournaments.",
    category: "rankings",
    href: `${INTERACTIVE_BASE_PATH}/tournament-builder`,
    featured: false,
    trending: false,
    badge: "new",
    keywords: ["tournament", "groups", "knockout", "league", "teams"],
  },
  {
    id: "random-wheel",
    slug: "random-wheel",
    title: "Random Wheel",
    description:
      "Add names or options, spin the wheel, and let physics pick the winner - perfect for raffles and forfeits.",
    category: "pickers",
    href: `${INTERACTIVE_BASE_PATH}/random-wheel`,
    featured: true,
    trending: true,
    badge: "new",
    keywords: ["wheel", "spin", "random", "raffle", "picker"],
  },
  {
    id: "quiz-builder",
    slug: "quiz-builder",
    title: "Quiz Builder",
    description:
      "Write rounds, add picture and music questions, then host from one screen while players join on their phones.",
    category: "quizzes",
    href: `${INTERACTIVE_BASE_PATH}/quiz-builder`,
    featured: false,
    trending: true,
    badge: "new",
    keywords: ["quiz", "trivia", "host", "questions", "multiplayer"],
  },
  {
    id: "bingo-card-generator",
    slug: "bingo-card-generator",
    title: "Bingo Card Generator",
    description:
      "Generate unique bingo cards from your word list - meetings, watch parties, or classroom icebreakers.",
    category: "events",
    href: `${INTERACTIVE_BASE_PATH}/bingo-card-generator`,
    featured: false,
    trending: false,
    badge: "new",
    keywords: ["bingo", "cards", "generator", "party", "print"],
  },
];

export function getInteractiveToolBySlug(
  slug: string,
): InteractiveTool | undefined {
  return INTERACTIVE_TOOLS.find((tool) => tool.slug === slug);
}

export function isInteractiveToolSoon(tool: InteractiveTool): boolean {
  return tool.status === "soon";
}

export function getLiveInteractiveTools(): InteractiveTool[] {
  return INTERACTIVE_TOOLS.filter((tool) => tool.status !== "soon");
}

export function getComingSoonInteractiveTools(): InteractiveTool[] {
  return INTERACTIVE_TOOLS.filter((tool) => tool.status === "soon");
}

export function getFeaturedInteractiveTools(): InteractiveTool[] {
  return getLiveInteractiveTools().filter((tool) => tool.featured);
}

export function getDefaultTrendingTools(): InteractiveTool[] {
  return INTERACTIVE_TOOLS.filter((tool) => tool.trending);
}

export function getInteractiveCategoryLabel(
  category: InteractiveTool["category"],
): string {
  return (
    INTERACTIVE_CATEGORIES.find((entry) => entry.id === category)?.label ??
    category
  );
}
