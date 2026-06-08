export const SITE_NAME = "RDev Studio";
export const SITE_URL = "https://rdevstudio.co.uk";
export const SITE_TITLE =
  "RDev Studio — Web Design & Social Media for Small Businesses";
export const SITE_DESCRIPTION =
  "RDev Studio builds websites, manages social media, and creates content for small businesses. Based in Carrickfergus, Northern Ireland.";
export const EMAIL = "ryan@rdevstudio.co.uk";
export const CONTACT_EMAIL = "ryan@rdevstudio.co.uk";
export const WHATSAPP_NUMBER = "+447378420418";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "")}?text=${encodeURIComponent("Hi, I'd like to talk about a project.")}`;
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
  { href: "https://www.instagram.com/rdevstudio_", label: "Instagram", icon: "instagram" as const },
  {
    href: "https://www.linkedin.com/in/ryan-davidson-462bb221b",
    label: "LinkedIn",
    icon: "linkedin" as const,
  },
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

export const SOCIAL_PROOF_ITEMS = [
  "5-page sites from £650",
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
  },
  {
    id: "carrick-plumbing",
    title: "Carrick Plumbing Co",
    category: "Demo" as const,
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
    // previewVideo: "/images/work/carrick-plumbing-preview.mp4",
  },
  {
    id: "anchor-restaurant",
    title: "The Anchor Restaurant",
    category: "Demo" as const,
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
    // previewVideo: "/images/work/anchor-restaurant-preview.mp4",
  },
  {
    id: "harbour-hair",
    title: "Harbour Hair Studio",
    category: "Demo" as const,
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
    // previewVideo: "/images/work/harbour-hair-preview.mp4",
  },
  {
    id: "rvs-coldbrew",
    title: "RVS Cold Brew",
    category: "Demo" as const,
    type: "Coffee Brand Website",
    summary: "Specialty cold brew brand",
    description:
      "A brand-led site for a cold brew coffee company — product focus, strong visuals, and a layout built to tell the story behind the product.",
    highlights: ["Product pages", "Brand storytelling", "Mobile-first"],
    tags: ["Next.js", "Tailwind", "Vercel"],
    buttonLabel: "View live site",
    href: "https://rvscoldbrew.vercel.app",
    // image: "/images/work/rvs-coldbrew.png",
    // imageAlt: "RVS Cold Brew website homepage showcasing specialty cold brew products",
  },
] as const;
