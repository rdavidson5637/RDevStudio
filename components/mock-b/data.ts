import { WHATSAPP_URL } from "@/lib/constants";

/**
 * Shared WhatsApp CTA URL built directly from lib/constants.ts WHATSAPP_URL.
 * TODO: Ryan to confirm preferred pre-filled WhatsApp greeting text.
 */
export const STUDIO_WHATSAPP_URL = `${WHATSAPP_URL}?text=${encodeURIComponent(
  "Hi RDev Studio, we'd like to chat about a project.",
)}`;

export type MockBProject = {
  id: "shelterlink" | "rondo" | "crosskennan" | "assisi" | "mgsl-hub";
  name: string;
  type: string;
  year: string;
  statusLabel: string;
  summary: string;
  details: readonly string[];
  stack: readonly string[];
  href: string;
  external: boolean;
  linkLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  accent: "seaglass" | "terracotta" | "butter";
  screenshot?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  extraScreenshots?: readonly {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  }[];
};

/**
 * Five featured studio projects.
 * Strictly facts-only from the existing repo (lib/, app/(site)/work/**) and Ryan's brief.
 * TODO comments mark items where Ryan should confirm extra copy or live URLs.
 */
export const MOCK_B_PROJECTS: readonly MockBProject[] = [
  {
    id: "shelterlink",
    name: "ShelterLink",
    type: "Volunteer web app",
    year: "2025-26",
    statusLabel: "Live app",
    summary:
      "Volunteer rotas, shift scheduling, role allocation, and an admin dashboard built for Assisi Animal Sanctuary.",
    details: [
      "Volunteer registration and profiles so staff can see who is trained for each role.",
      "Shift planner with role allocation and CSV exports for day-to-day sanctuary admin.",
      "Built on a plain, dependable stack with authentication, rate limiting, and a strict content security policy.",
    ],
    stack: ["Node.js", "Express", "MySQL", "Vanilla JS", "PicoCSS"],
    href: "https://shelterlink.online",
    external: true,
    linkLabel: "Open shelterlink.online",
    secondaryHref: "/work/shelterlink",
    secondaryLabel: "Read full case study",
    accent: "seaglass",
    screenshot: {
      src: "/images/work/shelterlink-admin-dashboard.png",
      alt: "ShelterLink admin dashboard showing volunteer overview and activity",
      width: 1024,
      height: 640,
    },
    extraScreenshots: [
      {
        src: "/images/work/shelterlink.png",
        alt: "ShelterLink landing page with volunteer sign-up call to action",
        caption: "ShelterLink volunteer landing page",
        width: 1024,
        height: 546,
      },
      {
        src: "/images/work/shelterlink-browse-shifts.png",
        alt: "ShelterLink shift browsing screen for volunteers",
        caption: "Browse shifts and role availability",
        width: 1024,
        height: 640,
      },
    ],
  },
  {
    id: "assisi",
    name: "Assisi Animal Sanctuary",
    type: "Charity site & brand rebuild",
    year: "2026",
    statusLabel: "Awaiting sign-off",
    summary:
      "A full rebuild of the public website and visual identity for Assisi Animal Sanctuary, designed for phone and desktop from the start.",
    details: [
      "Laid out so adopters, donors, and supporters can find animals and ways to help without hunting through menus.",
      "Built alongside a refreshed visual brand tailored for a calm, readable experience on mobile.",
      "Public screenshots and live link are held until the sanctuary signs them off.",
    ],
    stack: ["Website rebuild", "Brand identity", "Phone-first"],
    href: "/work/assisi",
    external: false,
    linkLabel: "Read case study",
    accent: "terracotta",
  },
  {
    id: "crosskennan",
    name: "Crosskennan",
    type: "Charity website",
    year: "2026",
    statusLabel: "Live preview",
    // TODO: Ryan to confirm exact Crosskennan project summary, stack, and year.
    summary:
      "A clear, phone-friendly website build for Crosskennan, focused on straightforward navigation and easy contact.",
    details: [
      "Clean structure built to read comfortably on a phone screen first.",
      "Hosted preview live at crosskennan.vercel.app.",
      "Copy and photography details are confirmed directly with the organisation before public launch.",
    ],
    stack: ["Web build", "Phone-first", "Vercel"],
    href: "https://crosskennan.vercel.app",
    external: true,
    linkLabel: "Open crosskennan.vercel.app",
    accent: "butter",
  },
  {
    id: "rondo",
    name: "Rondo",
    type: "Studio web app",
    year: "2026",
    statusLabel: "Studio build",
    // TODO: No live Rondo URL exists in this repo yet. Ryan to add the real Rondo URL and confirmed project summary.
    summary:
      "An in-house web application built by RDev Studio. Live link and detailed write-up will be added once published by the studio.",
    details: [
      "Designed and engineered inside RDev Studio with a focus on fast, focused everyday use.",
      "No live public URL is stored in this repository yet (linked here on the studio showcase).",
      "Full feature notes will be published after studio review.",
    ],
    stack: ["Web app", "RDev Studio build"],
    href: "/mock-b/work#rondo",
    external: false,
    linkLabel: "View project card",
    accent: "terracotta",
  },
  {
    id: "mgsl-hub",
    name: "MGSL Hub",
    type: "Web application",
    year: "2026",
    statusLabel: "Live preview",
    // TODO: Ryan to confirm MGSL Hub project description, stack, and year (note: MGSL Supabase backend is paused; do not query it).
    summary:
      "A dedicated web hub built by RDev Studio, hosted online as a live preview.",
    details: [
      "Custom hub interface designed for clear reading on mobile and desktop.",
      "Live preview available at mgsl-hq-black.vercel.app.",
      "Additional studio notes can be added here once confirmed.",
    ],
    stack: ["Web app", "Responsive UI", "Vercel"],
    href: "https://mgsl-hq-black.vercel.app",
    external: true,
    linkLabel: "Open mgsl-hq-black.vercel.app",
    accent: "seaglass",
  },
] as const;

export type StudioService = {
  id: string;
  title: string;
  tag: string;
  summary: string;
  bullets: readonly string[];
  icon: "website" | "webapp" | "gbp" | "charity";
  tint: "terracotta" | "seaglass" | "butter" | "cream";
};

export const MOCK_B_SERVICES: readonly StudioService[] = [
  {
    id: "websites",
    title: "Websites for small businesses",
    tag: "Phone-first",
    summary:
      "Clear, fast sites that say who you are, what you do, and how to get in touch. Built from scratch with no bloated templates.",
    bullets: [
      "Checked on real phones before launch",
      "Contact form wired straight to your inbox",
      "You own your domain, copy, and code",
    ],
    icon: "website",
    tint: "terracotta",
  },
  {
    id: "web-apps",
    title: "Web apps & handy tools",
    tag: "Custom builds",
    summary:
      "When a spreadsheet or paper rota stops keeping up, we build straightforward web apps around how your team actually works.",
    bullets: [
      "Volunteer rotas, hubs, and practical dashboards",
      "Plain, maintainable code without fragile bloat",
      "Sensible security and privacy built in",
    ],
    icon: "webapp",
    tint: "seaglass",
  },
  {
    id: "google-business-profile",
    title: "Google Business Profile help",
    tag: "Local search",
    summary:
      "Practical setup and tidy-ups so local customers in Carrickfergus, Belfast, and across Northern Ireland can find your hours, map pin, and contact details.",
    bullets: [
      "Category, services, and description review",
      "Consistent contact details between site and Google",
      "Plain-English checklist with no invented scores",
    ],
    icon: "gbp",
    tint: "butter",
  },
  {
    id: "charities",
    title: "Charity & rescue builds",
    tag: "Community",
    summary:
      "We love backing local charities, animal rescues, and community groups with the same care and craft as any commercial build.",
    bullets: [
      "Easy routes for adopters, volunteers, and donors",
      "Registered charities: mention it in your quote note",
      "Calm, readable layouts that anyone can navigate",
    ],
    icon: "charity",
    tint: "cream",
  },
] as const;

export const STUDIO_RHYTHM = [
  {
    step: "01",
    title: "A plain-English chat",
    body: "Tell us what you need via the quote form or WhatsApp. No jargon, no sales script.",
  },
  {
    step: "02",
    title: "Clear scope & quote",
    body: "We send back what we will build, roughly how long it takes, and a straight quote before anything starts.",
  },
  {
    step: "03",
    title: "Build & check together",
    body: "You see real progress on a preview link, test it on your own phone, and send your notes.",
  },
  {
    step: "04",
    title: "Launch & handover",
    body: "We point your domain, test the forms, and hand over a site that is properly yours.",
  },
] as const;

export const QUOTE_TOPICS = [
  "New website",
  "Web app / custom tool",
  "Google Business Profile help",
  "Charity / rescue build",
  "Something else",
] as const;
