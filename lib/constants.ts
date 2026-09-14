export const SITE_NAME = "RDev Studio";
export const SITE_URL = "https://rdevstudio.co.uk";
export const SITE_TITLE =
  "RDev Studio, websites for NI businesses and charities";
export const SITE_DESCRIPTION =
  "Websites, social media, and content for Northern Ireland small businesses and charities. Designed and built in Carrickfergus.";
export const EMAIL = "ryan@rdevstudio.co.uk";
export const CONTACT_EMAIL = "ryan@rdevstudio.co.uk";
export const GITHUB_URL = "https://github.com/rdavidson5637";
export const FORMSPREE_FORM_ID = "mgoqjqve";

export const CONTACT_SERVICE_OPTIONS = [
  "Website",
  "Social media",
  "Content",
  "Something else",
] as const;

export const SITE_TAGLINE =
  "Websites, social, and content for NI businesses and charities.";

export const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/hire", label: "Hire Ryan" },
  { href: "/games", label: "Games", highlight: true },
  { href: "/champions-draft", label: "Champions Draft", highlight: true },
  { href: "/rugby-draft", label: "Rugby Draft", highlight: true },
  { href: "/pub-quiz", label: "Pub Quiz", highlight: true },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const WARDROBE_AI = {
  href: "/wardrobe-ai",
  label: "Wardrobe AI",
  description:
    "Generate outfits from a real wardrobe. AI-tagged clothes, every valid line-up, an honest verdict.",
} as const;

export const DRAFT_ANALYSER = {
  href: "/draft",
  label: "Draft Analyser",
  description:
    "A live FPL Draft analyser: squad board, availability, projected points, and a start/sit optimiser.",
} as const;

export const SHELL_NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const SECONDARY_NAV_LINKS = [
  { href: "/toolkit", label: "Toolkit" },
  { href: "/interactive", label: "Interactive" },
  { href: "/games", label: "Games" },
] as const;

export const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/rdevstudio_",
    label: "Instagram",
    icon: "instagram" as const,
  },
  {
    href: "https://www.linkedin.com/in/ryan-davidson-462bb221b",
    label: "LinkedIn",
    icon: "linkedin" as const,
  },
] as const;

export const PORTFOLIO_AREAS = [
  {
    title: "Websites & apps",
    description:
      "Real projects and concept builds — a university dissertation app, a client site for RV's Cold Brew, and three local-business concepts showing range.",
    href: "/work",
    cta: "Browse work",
    accent: "amber" as const,
  },
  {
    title: "Free games",
    description:
      "Champions Draft, Rugby Draft, and Pub Quiz — squad builders and real-time multiplayer trivia.",
    href: "/games",
    cta: "Play free",
    accent: "emerald" as const,
  },
  {
    title: "About me",
    description:
      "Who I am, what I use, and how I like to work — one person behind everything here.",
    href: "/about",
    cta: "Read more",
    accent: "violet" as const,
  },
] as const;

export const STUDIO_STATEMENT =
  "I like making things that look sharp and work properly — on the web, on mobile, and in the small gaps between projects.";

export const ABOUT_BLURB =
  "I'm Ryan Davidson — I design and build things for the web. I recently finished my MSc in Software Development at Queen's and this site is my portfolio of case studies, concept builds, and browser games.";

export const SOCIAL_PROOF_ITEMS = [
  {
    title: "Assisi Animal Sanctuary",
    detail: "Volunteer platform. Ready for live use.",
  },
  {
    title: "RV's Cold Brew",
    detail: "Live collection site for a Belfast cold brew and matcha counter.",
  },
  {
    title: "Paintball Wales",
    detail: "Live park site. Built so groups can enquire on their phones.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery",
    description:
      "A short call or email. What you need, who it is for, and what done looks like.",
  },
  {
    number: "02",
    title: "Proposal",
    description:
      "A clear quote with scope, timeline, and price. No surprises.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "I make the thing. You see progress and give notes before anything goes live.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "It goes live. I handle the technical setup and check it works on a phone.",
  },
] as const;

export const SERVICES = [
  {
    number: "01",
    slug: "websites",
    title: "Websites",
    price: "from £650",
    priceNote: "one-off",
    description:
      "A site that says who you are, what you do, and how to get in touch. Phones first. No template.",
  },
  {
    number: "02",
    slug: "social",
    title: "Social media",
    price: "from £150/mo",
    priceNote: "",
    description:
      "A plan, captions, and graphics so you are not making it up every Monday.",
  },
  {
    number: "03",
    slug: "content",
    title: "Content",
    price: "from £200/project",
    priceNote: "",
    description:
      "A batch of posts or a one-off set. Written to sound like you, not like an agency.",
  },
] as const;

export const HOME_PROJECT_IDS = [
  "shelterlink",
  "rvs-coldbrew",
  "paintball-wales",
] as const;

export const PRICING_FEATURES = [
  "5-page website",
  "Mobile responsive",
  "Contact form",
  "Basic SEO setup",
  "Google Maps embed",
  "1 round of revisions",
  "Vercel hosting setup included",
] as const;

export const SOCIAL_MEDIA_FEATURES = [
  "Content calendar",
  "Post scheduling",
  "Caption writing",
  "Basic graphics",
  "Monthly performance summary",
] as const;

export const CONTENT_CREATION_FEATURES = [
  "Social graphics",
  "Copywriting",
  "Brand-consistent visuals",
  "Delivered ready to post",
] as const;

export const FAQ_ITEMS = [
  {
    question: "How long does it take?",
    answer:
      "Most sites go live within a week. I keep the list of pages short so you are not waiting around for a 20-page brochure.",
  },
  {
    question: "Do I need to provide content?",
    answer:
      "Photos, text, and contact details help. If you are stuck, I can write the copy and tell you what to photograph.",
  },
  {
    question: "Will it work on mobile?",
    answer:
      "Yes. I build for a phone first and check it on a real handset before launch.",
  },
  {
    question: "What happens after launch?",
    answer:
      "The site stays up on fast hosting. I am happy to change things when you need it.",
  },
  {
    question: "Can I update it myself?",
    answer:
      "Yes. I can show you the simple edits, or do them for you if you would rather not.",
  },
] as const;

/**
 * Portfolio projects. To add previews:
 * - Screenshot: public/images/work/{id}.png (or .jpg / .webp)
 * - Animated loop (recommended): public/images/work/{id}-preview.mp4
 */
export type ProjectCategory =
  | "Client Work"
  | "Concept Build"
  | "Food & Drink"
  | "Personal Project";

export const PROJECTS = [
  {
    id: "shelterlink",
    title: "ShelterLink",
    category: "Client Work" as const,
    type: "Volunteer Management App",
    summary: "Real client · charity",
    description:
      "Volunteer rotas, roles, and an admin dashboard for Assisi Animal Sanctuary.",
    highlights: ["Shift scheduling", "Admin dashboard", "Role management"],
    tags: ["Node.js", "Express", "MySQL"],
    buttonLabel: "Read the case study",
    href: "/work/shelterlink",
    image: "/images/work/shelterlink.png",
    imageAlt:
      "ShelterLink admin dashboard for Assisi Animal Sanctuary",
    outcome: "Ready for live use",
  },
  {
    id: "rvs-coldbrew",
    title: "RV's Cold Brew",
    category: "Client Work" as const,
    type: "Brand Site",
    summary: "Client · brand site",
    description:
      "Collection site for a Belfast cold brew and matcha counter. Menu, orders, and where to find Unit 11.",
    highlights: ["Menu and collection", "Mall location", "Phone-first"],
    tags: ["Next.js", "Tailwind", "Vercel"],
    buttonLabel: "Read the case study",
    href: "/work/rvs-cold-brew",
    image: "/images/work/rvs-coldbrew.png",
    imageAlt:
      "RV's Cold Brew logo — circular badge with cream typography on dark teal",
    previewFit: "contain" as const,
    previewBg: "#0a1a1f",
    outcome: "Live collection site",
  },
  {
    id: "paintball-wales",
    title: "Paintball Wales",
    category: "Client Work" as const,
    type: "Marketing Site",
    summary: "Client · bookings-focused site",
    description:
      "Phone-first site for a Snowdonia paintball park. Replaced a cluttered banner so groups can enquire on their phones.",
    highlights: ["A page per group type", "Enquire on every screen", "Fast on a phone"],
    tags: ["Next.js", "Tailwind", "Vercel"],
    buttonLabel: "Read the case study",
    href: "/work/paintball-wales",
    image: "/images/work/paintball-wales-hero.jpg",
    imageAlt:
      "Paintball Wales hero scene with players in masks and camouflage gear",
    outcome: "Live park site",
  },
  {
    id: "concept-builds",
    title: "Concept builds",
    category: "Concept Build" as const,
    type: "Set of 3",
    summary: "Concept · set of 3",
    description:
      "Three local-business sites — trades, restaurant, and salon — showing range across different brands and audiences.",
    highlights: ["Trades firm", "Restaurant", "Salon"],
    tags: ["Next.js", "Tailwind", "Vercel"],
    buttonLabel: "Read the case study",
    href: "/work/concept-builds",
    image: "/images/work/carrick-plumbing.png",
    imageAlt: "Carrick Plumbing Co homepage — concept trades website",
    outcome: "Concept builds demonstrating design range",
  },
  {
    id: "uc-caseworker-tool",
    title: "UC Caseworker Assistant",
    category: "Personal Project" as const,
    type: "AI Assistant",
    summary: "Portfolio · responsible AI",
    description:
      "An AI assistant for Universal Credit caseworkers — journal responses, letter population, and case notes, built around safeguarding and human-in-the-loop review.",
    highlights: ["Safeguarding-first design", "Deterministic letters", "Synthetic data only"],
    tags: ["Node.js", "Express", "Claude API"],
    buttonLabel: "Read the case study",
    href: "/work/uc-caseworker-tool",
    image: "/images/work/uc-caseworker-journal.jpg",
    imageAlt: "UC Caseworker Assistant journal response tool with a synthetic example loaded",
    outcome: "Portfolio prototype — domain expertise meets responsible AI engineering",
  },
] as const;
