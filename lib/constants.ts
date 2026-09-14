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
    detail: "Live site for a Belfast cold brew and matcha counter. Menu, hours, and directions.",
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
  "Up to 5 pages — usually home, about, what you do, a gallery or work list, and contact",
  "Built for a phone first, checked on a real handset before launch",
  "Contact form that lands in your inbox",
  "Basic SEO: page titles, descriptions, and a Google Maps embed if you have a premises",
  "Hosting set up on Vercel. If you already own a domain, I point it",
  "One round of revisions after you see the first full draft",
] as const;

export const SOCIAL_MEDIA_FEATURES = [
  "A month's content calendar before anything goes out",
  "Captions written to sound like you, not like a template",
  "Simple graphics that match your colours",
  "Posts scheduled to the accounts you already have",
  "A short monthly note on what went out",
] as const;

export const CONTENT_CREATION_FEATURES = [
  "A one-off batch of posts or a small campaign set",
  "Copy written from a brief, in your voice",
  "Graphics that match the brand you already have",
  "Files delivered ready to post — you hit publish",
] as const;

export const FAQ_ITEMS = [
  {
    question: "How long does a website take?",
    answer:
      "Most five-page sites go live in about a week once I have your text, photos, and contact details. If those arrive late, the date moves. Social and content jobs are usually a few days to a week, depending on the size of the batch.",
  },
  {
    question: "Who writes the content?",
    answer:
      "You know the business; I put it into plain English. Send me what you have — prices, hours, a few photos, the sentences you already say to customers. If you are stuck, I will draft the copy and tell you what still needs a photo. I do not invent testimonials or made-up numbers.",
  },
  {
    question: "How do revisions work?",
    answer:
      "One round is in the price. You send a list after you have seen the first full draft (or the month's social batch), and I make those changes. Extra rounds are extra — I quote before I start them, so there are no surprises.",
  },
  {
    question: "Who hosts the site, and what does that cost?",
    answer:
      "I set the site up on Vercel. For a normal small-business site that stays within the free tier, you are not paying me a monthly hosting fee. Domain names are yours — buy it (or keep the one you have) and I point it. If the site outgrows free hosting, we talk before anything is charged.",
  },
  {
    question: "Will it work on mobile?",
    answer:
      "Yes. I build for a phone first and check it on a real handset before launch.",
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
      "Live site for a Belfast cold brew and matcha counter. Menu, hours, and where to find Unit 11.",
    highlights: ["Menu and location", "Mall hours", "Phone-first"],
    tags: ["Next.js", "Tailwind", "Vercel"],
    buttonLabel: "Read the case study",
    href: "/work/rvs-cold-brew",
    image: "/images/work/rvs-coldbrew.png",
    imageAlt:
      "RV's Cold Brew logo — circular badge with cream typography on dark teal",
    previewFit: "contain" as const,
    previewBg: "#0a1a1f",
    outcome: "Live site",
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
