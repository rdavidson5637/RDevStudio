export const SITE_NAME = "RDev Studio";
export const SITE_URL = "https://rdevstudio.co.uk";
export const SITE_TITLE = "RDev Studio — Portfolio of Ryan Davidson";
export const SITE_DESCRIPTION =
  "The portfolio of Ryan Davidson — websites, web apps, side projects, and small games. Based in Carrickfergus, Northern Ireland.";
export const EMAIL = "ryan@rdevstudio.co.uk";
export const CONTACT_EMAIL = "ryan@rdevstudio.co.uk";
export const WHATSAPP_NUMBER = "+447378420418";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "")}?text=${encodeURIComponent("Hi, I'd like to talk about a project.")}`;
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
  { href: "/champions-draft", label: "Champions Draft", highlight: true },
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
      "Client work and demo sites — from volunteer platforms to local business websites across Northern Ireland.",
    href: "/work",
    cta: "Browse work",
  },
  {
    title: "Champions Draft",
    description:
      "My latest game — spin iconic squads, draft your XI, and compete in league, Champions League, and World Cup modes.",
    href: "/champions-draft",
    cta: "Play free",
  },
  {
    title: "About me",
    description:
      "Who I am, what I use, and how I like to work — one person behind everything here.",
    href: "/about",
    cta: "Read more",
  },
] as const;

export const STUDIO_STATEMENT =
  "I like making things that look sharp and work properly — on the web, on mobile, and in the small gaps between projects.";

export const ABOUT_BLURB =
  "I'm Ryan Davidson, a developer and designer based in Carrickfergus, Northern Ireland. This site is my portfolio — client websites, demo projects, side experiments, and the odd game when I'm bored. I care about clean design, fast builds, and work that actually gets finished.";

export const SOCIAL_PROOF_ITEMS = [
  "5+ projects live",
  "Next.js & Tailwind",
  "Games & experiments",
  "Based in NI",
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
  | "Client Work"
  | "Trades"
  | "Restaurant"
  | "Salon"
  | "Food & Drink";

export const PROJECTS = [
  {
    id: "shelterlink",
    title: "ShelterLink",
    category: "Client Work" as const,
    type: "Volunteer Management App",
    summary: "Assisi Animal Sanctuary, Belfast",
    description:
      "A full volunteer management platform for a busy animal sanctuary. Staff schedule shifts, manage roles, and track attendance from one dashboard — replacing manual spreadsheets.",
    highlights: ["Shift scheduling", "Admin dashboard", "Role management"],
    tags: ["Node.js", "Express", "MySQL"],
    buttonLabel: "View on GitHub",
    href: "https://github.com/rdavidson5637/ShelterLink",
    image: "/images/work/shelterlink.png",
    imageAlt:
      "ShelterLink landing page — volunteer management platform for Assisi Animal Sanctuary",
    outcome: "Replacing manual spreadsheets — saves staff hours every week",
  },
  {
    id: "carrick-plumbing",
    title: "Carrick Plumbing Co",
    category: "Trades" as const,
    type: "Trades Website",
    summary: "Local plumbing business, NI",
    description:
      "A 5-page site built to show how a trades business should look online — clear services, fast contact form, Google Maps, and a layout that works on mobile.",
    highlights: ["5-page layout", "Contact form", "Google Maps"],
    tags: ["Next.js", "Tailwind", "Vercel"],
    buttonLabel: "View live site",
    href: "https://carrick-plumbing-co.vercel.app/",
    image: "/images/work/carrick-plumbing.png",
    imageAlt: "Carrick Plumbing Co homepage — local plumbing services in Northern Ireland",
    outcome: "Full 5-page trades site, built and deployed in under a week",
  },
  {
    id: "anchor-restaurant",
    title: "The Anchor Restaurant",
    category: "Restaurant" as const,
    type: "Restaurant Website",
    summary: "Coastal restaurant concept",
    description:
      "A restaurant site with menu display, opening hours, and a booking enquiry form. Designed so diners can find what they need quickly on any device.",
    highlights: ["Menu display", "Enquiry form", "Opening hours"],
    tags: ["Next.js", "Tailwind", "Vercel"],
    buttonLabel: "View live site",
    href: "https://the-anchor-restaurant.vercel.app/",
    image: "/images/work/anchor-restaurant.png",
    imageAlt: "The Anchor Restaurant website with menu and booking enquiry",
    outcome: "Booking enquiries and menu display — all on mobile",
  },
  {
    id: "harbour-hair",
    title: "Harbour Hair Studio",
    category: "Salon" as const,
    type: "Salon Website",
    summary: "Local hair salon, NI",
    description:
      "A clean salon site with services, pricing, and a gallery — giving potential clients a clear picture of the business before they book.",
    highlights: ["Services & pricing", "Gallery", "Booking enquiry"],
    tags: ["Next.js", "Tailwind", "Vercel"],
    buttonLabel: "View live site",
    href: "https://harbour-hair-studio11.vercel.app/",
    image: "/images/work/harbour-hair.png",
    imageAlt: "Harbour Hair Studio website with services list and gallery",
    outcome: "Services, pricing and gallery — ready for new clients to find",
  },
  {
    id: "rvs-coldbrew",
    title: "RVS Cold Brew",
    category: "Food & Drink" as const,
    type: "Coffee Brand Website",
    summary: "Specialty cold brew brand",
    description:
      "A brand-led site for a cold brew coffee company — product focus, strong visuals, and a layout built to tell the story behind the product.",
    highlights: ["Product pages", "Brand storytelling", "Mobile-first"],
    tags: ["Next.js", "Tailwind", "Vercel"],
    buttonLabel: "View live site",
    href: "https://rvscoldbrew.vercel.app",
    image: "/images/work/rvs-coldbrew.png",
    imageAlt: "RVS Cold Brew logo — circular badge with cream typography on dark teal",
    previewFit: "contain" as const,
    previewBg: "#0a1a1f",
    outcome: "Brand-first site for a specialty cold brew launch",
  },
] as const;
