export type ProductKind = "game" | "project";
export type ProductStatus = "live" | "soon";

export type Product = {
  slug: string;
  name: string;
  href: string;
  external?: boolean;
  kind: ProductKind;
  status: ProductStatus;
  tagline: string;
  stack: string[];
  featured?: boolean;
  cover: string;
  image?: string;
};

export type ClientWork = {
  slug: string;
  name: string;
  href?: string;
  siteUrl?: string;
  statusLabel: string;
  summary: string;
  image?: string;
  mobileImage?: string;
  stack?: string[];
};

export const products: Product[] = [
  {
    slug: "champions-draft",
    name: "Champions Draft",
    href: "/champions-draft",
    kind: "game",
    status: "live",
    tagline: "Spin squads. Draft your XI. Conquer Europe.",
    stack: ["Next.js", "Squad JSON"],
    featured: true,
    cover: "champions-draft",
    image: "/images/games/champions-draft.jpg",
  },
  {
    slug: "rugby-draft",
    name: "Rugby Draft",
    href: "/rugby-draft",
    kind: "game",
    status: "live",
    tagline: "Spin squads. Draft your XV. Win it all.",
    stack: ["Next.js", "Squad JSON"],
    cover: "rugby-draft",
    image: "/images/games/rugby-draft.jpg",
  },
  {
    slug: "pub-quiz",
    name: "Pub Quiz",
    href: "/pub-quiz",
    kind: "game",
    status: "live",
    tagline: "Host a quiz night or join with a code.",
    stack: ["Pusher", "Upstash Redis"],
    cover: "pub-quiz",
    image: "/images/games/pub-quiz.jpg",
  },
  {
    slug: "longest-word",
    name: "Longest Word",
    href: "/games/longest-word",
    kind: "game",
    status: "live",
    tagline: "Daily 4x4 grid. Same letters for everyone.",
    stack: ["Daily seed", "localStorage"],
    cover: "longest-word",
  },
  {
    slug: "draft-analyser",
    name: "Draft Analyser",
    href: "/draft",
    kind: "project",
    status: "live",
    tagline: "FPL Draft squad board, projections and a start/sit optimiser.",
    stack: ["Supabase", "Pusher", "FPL API"],
    cover: "draft-analyser",
  },
  {
    slug: "wardrobe-ai",
    name: "Wardrobe AI",
    href: "/wardrobe-ai",
    kind: "project",
    status: "live",
    tagline: "Outfits from a real wardrobe. An honest verdict.",
    stack: ["Supabase", "Anthropic"],
    cover: "wardrobe-ai",
  },
  {
    slug: "stout-finder",
    name: "Stout Finder",
    href: "https://stoutfinder.com",
    external: true,
    kind: "project",
    status: "live",
    tagline: "Which pubs have stout on, and when someone last checked. Lives at stoutfinder.com.",
    stack: [],
    featured: true,
    cover: "stout-finder",
  },
  {
    slug: "gig-radar",
    name: "Gig Radar",
    href: "/gig-radar",
    kind: "project",
    status: "soon",
    tagline: "A weekly email of who you listen to, playing in Belfast or Dublin, before the tickets go.",
    stack: [],
    cover: "gig-radar",
  },
  {
    slug: "guitar-lab",
    name: "Guitar Lab",
    href: "/guitar-lab",
    kind: "project",
    status: "soon",
    tagline:
      "Scales, chords and progressions on a real fretboard. Alternate tunings, a capo, and a link that opens on exactly what you were looking at.",
    stack: [],
    cover: "guitar-lab",
  },
];

export const clientWork: ClientWork[] = [
  {
    slug: "assisi",
    name: "Assisi Animal Sanctuary",
    href: "/work",
    statusLabel: "Built - awaiting sign-off",
    summary:
      "A rebuilt site and brand for Assisi Animal Sanctuary in Belfast. Built and ready for their feedback.",
  },
  {
    slug: "shelterlink",
    name: "ShelterLink",
    href: "/work/shelterlink",
    statusLabel: "Ready for live use",
    summary: "Volunteer rotas, roles and an admin dashboard for Assisi Animal Sanctuary.",
    image: "/images/work/shelterlink.png",
    stack: ["Node.js", "Express", "MySQL"],
  },
  {
    slug: "rvs-cold-brew",
    name: "RV's Cold Brew",
    href: "/work/rvs-cold-brew",
    siteUrl: "https://rvscoldbrew.vercel.app",
    statusLabel: "Live site - nearly finished",
    summary:
      "A Belfast cold brew and matcha counter. Menu, hours and where to find Unit 11. Square is linked and the last details are being finished.",
    stack: ["Next.js", "Tailwind", "Vercel"],
  },
];

/**
 * Sites built on spec. Not client jobs. Each one is labelled as a concept
 * wherever it appears, and never described as the organisation's own site.
 */
export const conceptWork: ClientWork[] = [
  {
    slug: "crosskennan",
    name: "Crosskennan Lane Animal Sanctuary",
    siteUrl: "https://crosskennan.vercel.app",
    statusLabel: "Concept - not a client job",
    summary:
      "A rebuilt front door for a real animal sanctuary near Antrim. Adopt, Donate and Volunteer sit in the top bar, and because visits are by appointment only, the phone number comes first. I built it on spec. It is not their site, and the demo says so in its footer.",
  },
];

export function conceptBySlug(slug: string) {
  return conceptWork.find((job) => job.slug === slug);
}

export const liveProducts =products.filter((product) => product.status === "live");
export const soonProducts = products.filter((product) => product.status === "soon");
export const games = products.filter((product) => product.kind === "game");
export const projects = products.filter((product) => product.kind === "project");

export function productBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function clientBySlug(slug: string) {
  return clientWork.find((job) => job.slug === slug);
}
