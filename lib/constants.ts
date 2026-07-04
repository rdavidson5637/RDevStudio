export const SITE_NAME = "RDev Studio";
export const SITE_URL = "https://rdevstudio.co.uk";
export const SITE_TITLE = "Ryan Davidson, designer & developer, Belfast";
export const SITE_DESCRIPTION =
  "Ryan Davidson — web designer and developer in Northern Ireland. Websites, web apps, free tools, and browser games from RDev Studio.";
export const EMAIL = "ryan@rdevstudio.co.uk";
export const CONTACT_EMAIL = "ryan@rdevstudio.co.uk";
export const GITHUB_URL = "https://github.com/rdavidson5637";
export const FORMSPREE_FORM_ID = "mgoqjqve";

export const CONTACT_SERVICE_OPTIONS = [
  "Website or web app",
  "Collaboration",
  "Just saying hello",
  "Something else",
] as const;

export const SITE_TAGLINE =
  "Websites, projects, and experiments by Ryan Davidson.";

export const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/hire", label: "Hire Ryan" },
  { href: "/games", label: "Games", highlight: true },
  { href: "/champions-draft", label: "Champions Draft", highlight: true },
  { href: "/rugby-draft", label: "Rugby Draft", highlight: true },
  { href: "/pub-quiz", label: "Pub Quiz", highlight: true },
  { href: "/games", label: "Games" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const SHELL_NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/toolkit", label: "Toolkit" },
  { href: "/interactive", label: "Interactive" },
  { href: "/games", label: "Games" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
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
      "Real projects and concept builds — a university dissertation app, a client site for RVS Cold Brew, and three local-business concepts showing range.",
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
  "Websites & web apps",
  "Next.js & Tailwind",
  "Games & experiments",
  "Side projects",
] as const;

export const SERVICES = [
  {
    number: "01",
    title: "Website Design & Build",
    price: "from £650",
    priceNote: "one-off",
    description:
      "Custom websites — sharp, responsive, and built with modern tools.",
  },
  {
    number: "02",
    title: "Social Media Management",
    price: "from £150/mo",
    priceNote: "",
    description:
      "Strategy, scheduling, and content for businesses who want a consistent presence.",
  },
  {
    number: "03",
    title: "Content Creation",
    price: "from £200/project",
    priceNote: "",
    description:
      "Posts, graphics, and copy that sound and look like your brand.",
  },
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
      "Most sites go live within a week. I keep the process simple so you're not waiting weeks for results.",
  },
  {
    question: "Do I need to provide content?",
    answer:
      "Ideally yes — photos, text, and contact details. If you're stuck, I can help write copy and suggest what to include.",
  },
  {
    question: "Will it work on mobile?",
    answer:
      "Yes. Every site I build is fully responsive and tested on phones and tablets before launch.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Your site stays live on fast hosting. I'm happy to help with updates when you need them.",
  },
  {
    question: "Can I update it myself?",
    answer:
      "Yes. I can show you how to make simple changes, or handle updates for you if you prefer.",
  },
] as const;

/**
 * Portfolio projects. To add previews:
 * - Screenshot: public/images/work/{id}.png (or .jpg / .webp)
 * - Animated loop (recommended): public/images/work/{id}-preview.mp4
 */
export type ProjectCategory =
  | "University Project"
  | "Client Work"
  | "Concept Build"
  | "Food & Drink";

export const PROJECTS = [
  {
    id: "shelterlink",
    title: "ShelterLink",
    category: "University Project" as const,
    type: "Volunteer Management App",
    summary: "Real client · charity",
    description:
      "Volunteer management platform for Assisi Animal Sanctuary — shift scheduling, role management, and an admin dashboard, now being prepared for live rollout.",
    highlights: ["Shift scheduling", "Admin dashboard", "Role management"],
    tags: ["Node.js", "Express", "MySQL"],
    buttonLabel: "Read the case study",
    href: "/work/shelterlink",
    image: "/images/work/shelterlink.png",
    imageAlt:
      "ShelterLink landing page — volunteer management platform for Assisi Animal Sanctuary",
    outcome: "Dissertation project — active rollout phase",
  },
  {
    id: "rvs-coldbrew",
    title: "RVS Cold Brew",
    category: "Client Work" as const,
    type: "Brand Site",
    summary: "Client · brand site",
    description:
      "Brand-led site for a Northern Irish cold brew company — product-first layout, tight palette, and fast loads on mobile.",
    highlights: ["Product-led design", "Brand palette", "Mobile-first"],
    tags: ["Next.js", "Tailwind", "Vercel"],
    buttonLabel: "Read the case study",
    href: "/work/rvs-cold-brew",
    image: "/images/work/rvs-coldbrew.png",
    imageAlt:
      "RVS Cold Brew logo — circular badge with cream typography on dark teal",
    previewFit: "contain" as const,
    previewBg: "#0a1a1f",
    outcome: "Client project — active build",
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
] as const;
