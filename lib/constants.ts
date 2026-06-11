export const SITE_NAME = "RDev Studio";
export const SITE_URL = "https://rdevstudio.co.uk";
export const SITE_TITLE = "RDev Studio — Portfolio of Ryan Davidson";
export const SITE_DESCRIPTION =
  "The portfolio of Ryan Davidson — websites, web apps, side projects, and small games.";
export const EMAIL = "ryan@rdevstudio.co.uk";
export const CONTACT_EMAIL = "ryan@rdevstudio.co.uk";
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
  { href: "/coming-soon", label: "Coming Soon" },
  { href: "/champions-draft", label: "Champions Draft", highlight: true },
  { href: "/rugby-draft", label: "Rugby Draft", highlight: true },
  { href: "/pub-quiz", label: "Pub Quiz", highlight: true },
  { href: "/bored", label: "I'm Bored" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/rdevstudio_", label: "Instagram", icon: "instagram" as const },
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
      "Real projects and demo builds — a university dissertation app, a free site for RVS Cold Brew, and fictional business sites to show what's possible.",
    href: "/work",
    cta: "Browse work",
    accent: "amber" as const,
  },
  {
    title: "Free games",
    description:
      "Champions Draft, Rugby Draft, and Pub Quiz — squad builders and real-time multiplayer trivia.",
    href: "/bored",
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
  "I'm Ryan Davidson — I design and build things for the web. I recently finished my MSc in Software Development at Queen's, work full time in Belfast, and build side projects in my spare time. This site is my portfolio: university projects, demo sites, side experiments, and the odd game when I'm bored.";

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
  | "Demo Site"
  | "Food & Drink";

export const PROJECTS = [
  {
    id: "shelterlink",
    title: "ShelterLink",
    category: "University Project" as const,
    type: "Volunteer Management App",
    summary: "University dissertation — work in progress",
    description:
      "My university dissertation project: a volunteer management platform built for Assisi Animal Sanctuary. It covers shift scheduling, role management, and an admin dashboard — but it's not finished yet. I'm still actively developing and improving it.",
    highlights: ["Shift scheduling", "Admin dashboard", "Role management"],
    tags: ["Node.js", "Express", "MySQL"],
    buttonLabel: "View on GitHub",
    href: "https://github.com/rdavidson5637/ShelterLink",
    image: "/images/work/shelterlink.png",
    imageAlt:
      "ShelterLink landing page — volunteer management platform for Assisi Animal Sanctuary",
    outcome: "Dissertation project — ongoing development",
  },
  {
    id: "carrick-plumbing",
    title: "Carrick Plumbing Co",
    category: "Demo Site" as const,
    type: "Trades Website",
    summary: "Demo site — fictional business",
    description:
      "A demo site for a made-up plumbing business. Built to show how a trades company could look online — clear services, contact form, Google Maps, and a mobile-first layout.",
    highlights: ["5-page layout", "Contact form", "Google Maps"],
    tags: ["Next.js", "Tailwind", "Vercel"],
    buttonLabel: "View live site",
    href: "https://carrick-plumbing-co.vercel.app/",
    image: "/images/work/carrick-plumbing.png",
    imageAlt: "Carrick Plumbing Co homepage — demo trades website",
    outcome: "Portfolio demo — not a real business",
  },
  {
    id: "anchor-restaurant",
    title: "The Anchor Restaurant",
    category: "Demo Site" as const,
    type: "Restaurant Website",
    summary: "Demo site — fictional business",
    description:
      "A demo site for a made-up coastal restaurant. Menu display, opening hours, and a booking enquiry form — designed to show what a real restaurant site could look like.",
    highlights: ["Menu display", "Enquiry form", "Opening hours"],
    tags: ["Next.js", "Tailwind", "Vercel"],
    buttonLabel: "View live site",
    href: "https://the-anchor-restaurant.vercel.app/",
    image: "/images/work/anchor-restaurant.png",
    imageAlt: "The Anchor Restaurant website — demo restaurant site",
    outcome: "Portfolio demo — not a real business",
  },
  {
    id: "harbour-hair",
    title: "Harbour Hair Studio",
    category: "Demo Site" as const,
    type: "Salon Website",
    summary: "Demo site — fictional business",
    description:
      "A demo site for a made-up hair salon. Services, pricing, and a gallery — built to showcase how a salon could present itself online.",
    highlights: ["Services & pricing", "Gallery", "Booking enquiry"],
    tags: ["Next.js", "Tailwind", "Vercel"],
    buttonLabel: "View live site",
    href: "https://harbour-hair-studio11.vercel.app/",
    image: "/images/work/harbour-hair.png",
    imageAlt: "Harbour Hair Studio website — demo salon site",
    outcome: "Portfolio demo — not a real business",
  },
  {
    id: "rvs-coldbrew",
    title: "RVS Cold Brew",
    category: "Client Work" as const,
    type: "Coffee Brand Website",
    summary: "Free site for RVS Cold Brew",
    description:
      "I'm building this website for free for RVS Cold Brew — a local cold brew coffee business I genuinely love. Brand-led design with product focus, strong visuals, and a layout that tells the story behind the product.",
    highlights: ["Product pages", "Brand storytelling", "Mobile-first"],
    tags: ["Next.js", "Tailwind", "Vercel"],
    buttonLabel: "View live site",
    href: "https://rvscoldbrew.vercel.app",
    image: "/images/work/rvs-coldbrew.png",
    imageAlt: "RVS Cold Brew logo — circular badge with cream typography on dark teal",
    previewFit: "contain" as const,
    previewBg: "#0a1a1f",
    outcome: "Passion project — built for free, still in development",
  },
] as const;
