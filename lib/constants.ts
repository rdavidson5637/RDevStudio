export const SITE_NAME = "RDev Studio";
export const SITE_URL = "https://rdevstudio.co.uk";
export const SITE_TITLE =
  "RDev Studio — Web Design & Social Media for Small Businesses";
export const SITE_DESCRIPTION =
  "RDev Studio builds websites, manages social media, and creates content for small businesses. Based in Carrickfergus, Northern Ireland.";
export const EMAIL = "ryan@rdevstudio.co.uk";
export const CONTACT_EMAIL = "ryan@rdevstudio.co.uk";
export const WHATSAPP_NUMBER = "+447378420418";
export const FORMSPREE_FORM_ID = "mgoqjqve";

export const CONTACT_SERVICE_OPTIONS = [
  "Website",
  "Social Media",
  "Content Creation",
  "Not sure yet",
] as const;

export const SITE_TAGLINE =
  "Websites, social media & content for small businesses.";

export const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const SOCIAL_LINKS = [
  { href: "#", label: "Instagram", icon: "instagram" as const },
  { href: "#", label: "LinkedIn", icon: "linkedin" as const },
] as const;

export const SERVICES = [
  {
    number: "01",
    title: "Website Design & Build",
    description:
      "Custom sites built fast with modern tools — sharp, responsive, and ready to launch.",
  },
  {
    number: "02",
    title: "Social Media Management",
    description:
      "Strategy, scheduling, content, and growth — your channels handled properly.",
  },
  {
    number: "03",
    title: "Content Creation",
    description:
      "Posts, copy, graphics, and branded visuals that sound and look like you.",
  },
] as const;

export const STUDIO_STATEMENT =
  "We build brands that feel intentional — websites, social, and content for businesses across Northern Ireland and beyond.";

export const ABOUT_BLURB =
  "RDev Studio is a one-person creative studio based in Carrickfergus, Northern Ireland. I build websites, manage social media, and create content for small businesses who want to look brilliant online — without agency prices.";

export const HOW_WE_WORK = [
  {
    title: "Discover",
    description:
      "I learn about your business, audience, and goals — what you do, who you serve, and what you need to stand out.",
  },
  {
    title: "Create",
    description:
      "I design, write, and build with your brand at the centre. Every detail considered, nothing generic.",
  },
  {
    title: "Launch",
    description:
      "You go live with everything set up and ready to work. Hosting, domains, and handover handled properly.",
  },
  {
    title: "Support",
    description:
      "Ongoing help when you need it — updates, content, and advice without the agency runaround.",
  },
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
export type ProjectCategory = "Client Work" | "Demo";

export const PROJECTS = [
  {
    id: "shelterlink",
    title: "ShelterLink",
    category: "Client Work" as const,
    type: "Volunteer Management Web App",
    description:
      "Volunteer management web app built for Assisi Animal Sanctuary, Belfast — scheduling, roles, shifts, and admin dashboard.",
    tags: ["Node.js", "Express", "MySQL", "JavaScript"],
    buttonLabel: "View project",
    href: "https://github.com/rdavidson5637/ShelterLink",
    image: "/images/work/shelterlink.png",
    imageAlt:
      "ShelterLink landing page — animal shelter volunteer management platform with register and login options",
  },
  {
    id: "carrick-plumbing",
    title: "Carrick Plumbing Co",
    category: "Demo" as const,
    type: "Local Trades Website",
    description:
      "Demo site for a local plumbing business — service pages, contact form, and mobile-first design.",
    tags: ["Next.js", "Tailwind", "Vercel"],
    buttonLabel: "View site",
    href: "https://carrick-plumbing-co.vercel.app/",
    image: "/images/work/carrick-plumbing.png",
    imageAlt: "Carrick Plumbing Co website homepage for a local plumbing business",
    // previewVideo: "/images/work/carrick-plumbing-preview.mp4",
  },
  {
    id: "anchor-restaurant",
    title: "The Anchor Restaurant",
    category: "Demo" as const,
    type: "Restaurant Website",
    description:
      "Demo restaurant site with menu display, enquiry form, opening hours, and maps integration.",
    tags: ["Next.js", "Tailwind", "Vercel"],
    buttonLabel: "View site",
    href: "https://the-anchor-restaurant.vercel.app/",
    image: "/images/work/anchor-restaurant.png",
    imageAlt: "The Anchor Restaurant website with menu and booking enquiry",
    // previewVideo: "/images/work/anchor-restaurant-preview.mp4",
  },
  {
    id: "harbour-hair",
    title: "Harbour Hair Studio",
    category: "Demo" as const,
    type: "Salon Website",
    description:
      "Demo salon site with services, pricing, gallery, and booking enquiry form.",
    tags: ["Next.js", "Tailwind", "Vercel"],
    buttonLabel: "View site",
    href: "https://harbour-hair-studio11.vercel.app/",
    image: "/images/work/harbour-hair.png",
    imageAlt: "Harbour Hair Studio salon website with services and gallery",
    // previewVideo: "/images/work/harbour-hair-preview.mp4",
  },
  {
    id: "rvs-coldbrew",
    title: "RVS Cold Brew",
    category: "Demo" as const,
    type: "Coffee Brand Website",
    description:
      "Demo site for a specialty cold brew brand — product storytelling, bold branding, and mobile-first design.",
    tags: ["Next.js", "Tailwind", "Vercel"],
    buttonLabel: "View site",
    href: "https://rvscoldbrew-1yeugreuh-ryan-davidson-s-projects.vercel.app",
    // image: "/images/work/rvs-coldbrew.png",
    // imageAlt: "RVS Cold Brew website homepage showcasing specialty cold brew products and brand",
  },
] as const;
