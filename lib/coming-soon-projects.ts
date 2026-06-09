export type ComingSoonProject = {
  id: string;
  emoji: string;
  name: string;
  description: string;
  features: string[];
  tagline?: string;
  progress: number;
};

export const COMING_SOON_PROJECTS: ComingSoonProject[] = [
  {
    id: "tonight",
    emoji: "🍔🎬",
    name: "Tonight",
    description:
      "Can't decide what to eat or watch? Tonight helps you choose instantly using preferences, ingredients, and mood-based suggestions.",
    features: [
      "Enter ingredients you already have",
      "AI-powered recipe generation",
      "Takeaway suggestions",
      "Quick meal ideas",
      "Movie recommendations",
      "TV show suggestions",
      "Mood-based suggestions",
      "Personalised watch lists",
    ],
    tagline: "Your evening, decided.",
    progress: 35,
  },
  {
    id: "workout-planner",
    emoji: "💪",
    name: "Workout Planner",
    description:
      "Generate personalised workout plans based on your goals, schedule, and equipment.",
    features: [
      "Muscle gain / fat loss plans",
      "Home or gym workouts",
      "Weekly schedule generator",
      "Progress tracking",
      "Workout history and consistency tracking",
    ],
    progress: 20,
  },
  {
    id: "guitar-lab",
    emoji: "🎸",
    name: "Guitar Lab",
    description:
      "Learn guitar through interactive practice instead of traditional tutorials.",
    features: [
      "Interactive fretboard trainer",
      "Chord explorer",
      "Scale practice tools",
      "Daily challenges",
      "Progress tracking system",
      "Gamified learning loops",
    ],
    tagline: "Practice smarter. Play better.",
    progress: 15,
  },
  {
    id: "gaa-draft",
    emoji: "🏐",
    name: "GAA Draft",
    description:
      "Build your ultimate Gaelic Football team from players across counties and eras. Create dream teams and simulate matches between legendary squads.",
    features: [
      "County legends system",
      "Historical eras",
      "All-Ireland mode",
      "Team rating system",
      "Match simulation engine",
    ],
    progress: 10,
  },
] as const;
