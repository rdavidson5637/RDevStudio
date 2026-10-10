export type Project = {
  slug: string;
  name: string;
  tagline: string;
  href: string;
  kind: "game" | "app";
  status: "live" | "soon";
  image?: string;
  accent?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "champions-draft",
    name: "Champions Draft",
    tagline: "Spin squads. Draft your XI. Conquer Europe.",
    href: "/champions-draft",
    kind: "game",
    status: "live",
    image: "/images/games/champions-draft.jpg",
  },
  {
    slug: "rugby-draft",
    name: "Rugby Draft",
    tagline: "Spin squads. Draft your XV. Win it all.",
    href: "/rugby-draft",
    kind: "game",
    status: "live",
    image: "/images/games/rugby-draft.jpg",
  },
  {
    slug: "pub-quiz",
    name: "Pub Quiz",
    tagline: "Host a quiz night or join with a code.",
    href: "/pub-quiz",
    kind: "game",
    status: "live",
    image: "/images/games/pub-quiz.jpg",
  },
  {
    slug: "longest-word",
    name: "Longest Word",
    tagline: "Daily 4x4 grid. Same letters for everyone.",
    href: "/games/longest-word",
    kind: "game",
    status: "live",
  },
  {
    slug: "draft-analyser",
    name: "Draft Analyser",
    tagline: "FPL Draft squad board, projections and a start/sit optimiser.",
    href: "/draft",
    kind: "app",
    status: "live",
  },
  {
    slug: "wardrobe-ai",
    name: "Wardrobe AI",
    tagline: "Outfits from a real wardrobe. An honest verdict.",
    href: "/wardrobe-ai",
    kind: "app",
    status: "live",
  },
  {
    slug: "stout-finder",
    name: "Stout Finder",
    tagline: "Which pubs have stout on, and when someone last checked. Lives at stoutfinder.com.",
    href: "https://stoutfinder.com",
    kind: "app",
    status: "live",
  },
  {
    slug: "gig-radar",
    name: "Gig Radar",
    tagline:
      "A weekly email of who you listen to, playing in Belfast or Dublin, before the tickets go.",
    href: "/gig-radar",
    kind: "app",
    status: "soon",
  },
  {
    slug: "guitar-lab",
    name: "Guitar Lab",
    tagline:
      "Scales, chords and progressions on a real fretboard. Alternate tunings, a capo, and a link that opens on exactly what you were looking at.",
    href: "/guitar-lab",
    kind: "app",
    status: "soon",
  },
];

export const liveProjects = PROJECTS.filter((project) => project.status === "live");
export const soonProjects = PROJECTS.filter((project) => project.status === "soon");
export const games = PROJECTS.filter((project) => project.kind === "game");
export const apps = PROJECTS.filter((project) => project.kind === "app");
