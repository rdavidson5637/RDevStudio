export const SITE_NAME = "RDev Studio";
export const SITE_URL = "https://rdevstudio.co.uk";
export const EMAIL = "ryan@rdevstudio.com";
export const CONTACT_EMAIL = "ryan@rdevstudio.com";
export const WHATSAPP_NUMBER = "+447378420418";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
] as const;

export const SOCIAL_PROOF_ITEMS = [
  "5-page sites from £500",
  "Live in 7 days",
  "Free hosting setup",
  "Local to Carrickfergus",
] as const;

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Quick call",
    description:
      "We learn about your business, goals, and what you need from your website.",
  },
  {
    step: 2,
    title: "We build",
    description:
      "Your site is designed and built mobile-first, with your branding and content.",
  },
  {
    step: 3,
    title: "You go live",
    description:
      "We launch on fast hosting, set up your domain, and hand everything over.",
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

export const FAQ_ITEMS = [
  {
    question: "How long does it take?",
    answer:
      "Most sites go live within 7 days from our first call. We keep the process simple so you're not waiting weeks for results.",
  },
  {
    question: "Do I need to provide content?",
    answer:
      "Ideally yes — photos, text about your services, and contact details. If you're stuck, we can help write copy and suggest what to include.",
  },
  {
    question: "Will it work on mobile?",
    answer:
      "Yes. Every site we build is fully responsive and tested on phones and tablets before launch.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Your site stays live on fast hosting. Optional £30/month support covers hosting, security updates, and minor content changes.",
  },
  {
    question: "Can I update it myself?",
    answer:
      "Yes. We can show you how to make simple text and image changes, or you can use our monthly support plan and we'll handle it for you.",
  },
] as const;

/**
 * Portfolio projects. To add previews:
 * - Screenshot: public/images/work/{id}.png (or .jpg / .webp)
 * - Animated loop (recommended): public/images/work/{id}-preview.mp4
 *   Short MP4 loops look sharper and load faster than GIFs.
 */
export const PROJECTS = [
  {
    id: "shelterlink",
    title: "ShelterLink",
    type: "Volunteer Management Web App",
    description:
      "Custom web application built for Assisi Animal Sanctuary in Belfast. Features volunteer scheduling, role management, shift tracking and a full admin dashboard.",
    tags: ["Node.js", "Express", "MySQL", "JavaScript"],
    buttonLabel: "View Project",
    href: "https://github.com/rdavidson5637/ShelterLink",
    image: "/images/work/shelterlink.png",
    imageAlt:
      "ShelterLink landing page — animal shelter volunteer management platform with register and login options",
  },
  {
    id: "carrick-plumbing",
    title: "Carrick Plumbing Co",
    type: "Local Trades Website",
    description:
      "5-page website for a local plumbing business. Includes service pages, contact form, Google Maps integration and mobile-first design.",
    tags: ["Next.js", "Tailwind", "Vercel"],
    buttonLabel: "View Site",
    href: "https://carrick-plumbing-co.vercel.app/",
    demo: true,
    image: "/images/work/carrick-plumbing.png",
    imageAlt: "Carrick Plumbing Co website homepage for a local plumbing business",
    // previewVideo: "/images/work/carrick-plumbing-preview.mp4",
  },
  {
    id: "anchor-restaurant",
    title: "The Anchor Restaurant",
    type: "Restaurant Website",
    description:
      "Modern restaurant website with menu display, online enquiry form, opening hours and Google Maps embed.",
    tags: ["Next.js", "Tailwind", "Vercel"],
    buttonLabel: "View Site",
    href: "https://the-anchor-restaurant.vercel.app/",
    demo: true,
    image: "/images/work/anchor-restaurant.png",
    imageAlt: "The Anchor Restaurant website with menu and booking enquiry",
    // previewVideo: "/images/work/anchor-restaurant-preview.mp4",
  },
  {
    id: "harbour-hair",
    title: "Harbour Hair Studio",
    type: "Salon Website",
    description:
      "Clean, elegant website for a local hair salon. Includes services list, pricing, gallery placeholder and booking enquiry form.",
    tags: ["Next.js", "Tailwind", "Vercel"],
    buttonLabel: "View Site",
    href: "https://harbour-hair-studio11.vercel.app/",
    demo: true,
    image: "/images/work/harbour-hair.png",
    imageAlt: "Harbour Hair Studio salon website with services and gallery",
    // previewVideo: "/images/work/harbour-hair-preview.mp4",
  },
] as const;
