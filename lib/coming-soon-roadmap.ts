export type RoadmapPhase = {
  number: number;
  name: string;
  sublabel: string;
  active?: boolean;
};

export const COMING_SOON_ROADMAP: RoadmapPhase[] = [
  {
    number: 1,
    name: "Tonight",
    sublabel: "Decision Engine",
    active: true,
  },
  {
    number: 2,
    name: "Workout Planner",
    sublabel: "Fitness System",
  },
  {
    number: 3,
    name: "Guitar Lab",
    sublabel: "Learning Platform",
  },
  {
    number: 4,
    name: "GAA Draft",
    sublabel: "Sports Game Expansion",
  },
] as const;
