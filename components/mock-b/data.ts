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

export type QuoteTopic = (typeof QUOTE_TOPICS)[number];

export type ServiceGuide = {
  id: string;
  number: string;
  title: string;
  tag: string;
  icon: "website" | "webapp" | "gbp" | "charity";
  tint: "terracotta" | "seaglass" | "butter" | "cream";
  quoteTopic: QuoteTopic;
  lead: string;
  included: readonly string[];
  goodFit: string;
  notes: readonly string[];
  exampleHref?: string;
  exampleLabel?: string;
};

/**
 * Expanded facts-only service guides for /mock-b/services.
 * Strictly studio voice ("we" / "RDev Studio"), zero prices, no invented stats or claims.
 * TODO: Ryan to review wording for Google Business Profile help and charity support.
 */
export const MOCK_B_SERVICE_GUIDES: readonly ServiceGuide[] = [
  {
    id: "websites",
    number: "01",
    title: "Websites",
    tag: "Phone-first builds",
    icon: "website",
    tint: "terracotta",
    quoteTopic: "New website",
    lead: "Clear, fast websites built from scratch for Northern Ireland businesses and community organisations. No bloated templates and no lock-in.",
    included: [
      "Core pages shaped around what visitors actually look for: what you do, examples of your work, opening details, and easy contact",
      "Phone-first layout checked on real mobile screens before anything goes live",
      "Contact or quote form wired straight to your inbox, plus direct WhatsApp links if you use it",
      "Clean page titles, descriptions, and a Google Maps embed if you have a physical premises",
      "Hosting setup and domain pointing so you keep full ownership of your domain, copy, and code",
    ],
    goodFit:
      "Shops, cafes, trades firms, salons, independent services, and local organisations that want a dependable site without agency jargon.",
    notes: [
      "We help put your existing details into plain English — no invented testimonials or filler copy.",
      "One round of revisions is built into the handover after you review the first full draft.",
      "Need extra pages, an online shop, or ongoing updates later? We quote those clearly before starting.",
    ],
    exampleHref: "/mock-b/work#crosskennan",
    exampleLabel: "See Crosskennan & Assisi builds",
  },
  {
    id: "web-apps",
    number: "02",
    title: "Web apps & handy tools",
    tag: "Custom workflows",
    icon: "webapp",
    tint: "seaglass",
    quoteTopic: "Web app / custom tool",
    lead: "Practical browser-based tools built around how your team actually works — especially when spreadsheets, messages, or paper rotas stop keeping up.",
    included: [
      "Volunteer rotas, shift scheduling, role allocation, and straightforward admin dashboards",
      "Focused hubs and internal web tools designed to read clearly on both phones and desktops",
      "Clean data exports (such as CSV) so your records stay portable and useful day to day",
      "Plain, maintainable code stacks chosen for long-term reliability rather than fragile hype",
      "Sensible security basics: authentication, rate limiting, and privacy-aware data handling",
    ],
    goodFit:
      "Charities managing volunteers, local teams coordinating schedules, or small organisations needing one reliable place for day-to-day workflows.",
    notes: [
      "We scope the smallest useful first version so you can test it with real people quickly.",
      "You see working preview links as features come together, not just static slides.",
    ],
    exampleHref: "/mock-b/work#shelterlink",
    exampleLabel: "See ShelterLink & MGSL Hub",
  },
  {
    id: "google-business-profile",
    number: "03",
    title: "Google Business Profile help",
    tag: "Local visibility",
    icon: "gbp",
    tint: "butter",
    quoteTopic: "Google Business Profile help",
    lead: "Straightforward setup and tidy-ups so local customers in Carrickfergus, Belfast, and across Northern Ireland can quickly find your hours, map pin, and contact details.",
    included: [
      "Review of your business categories, service list, opening hours, and plain-English description",
      "Checking that your name, address, phone, and website match cleanly between your site and Google",
      "Guidance on choosing clear, honest photos and keeping seasonal hours accurate",
      "A practical written checklist you can follow yourself afterwards — no invented scores or mystery jargon",
    ],
    goodFit:
      "Local shops, trades, and venues whose Google listing is half-finished, out of date, or showing the wrong hours or links.",
    notes: [
      "We focus on accurate, helpful local information rather than gimmicks or guarantees nobody can honestly make.",
      "Works nicely alongside a new website build or as a standalone tidy-up.",
    ],
  },
  {
    id: "charities-and-small-businesses",
    number: "04",
    title: "Charity & small-business builds",
    tag: "Local roots",
    icon: "charity",
    tint: "cream",
    quoteTopic: "Charity / rescue build",
    lead: "RDev Studio works directly with Northern Ireland small businesses, animal rescues, registered charities, and community groups from first sketch to launch.",
    included: [
      "For small businesses: written scope agreed before work starts, direct studio communication, and full ownership of your site at launch",
      "For registered charities: the same website care and craft without a build fee — mention your charity registration when you get in touch",
      "For animal rescues and unregistered community groups: get in touch for a plain-English conversation about how we can help",
      "Calm, accessible layouts that help adopters, donors, volunteers, and local customers find what they need on a phone",
    ],
    goodFit:
      "Independent businesses across County Antrim and Belfast, plus registered charities, sanctuaries, and community projects across NI.",
    notes: [
      "Every project — commercial or charity — gets the same attention to phone usability, accessibility, and handover.",
      "No compulsory monthly retainers; we can show you how to make simple edits yourself or handle them when asked.",
    ],
    exampleHref: "/mock-b/work#assisi",
    exampleLabel: "See Assisi Animal Sanctuary",
  },
] as const;

export const STUDIO_FAQ_ITEMS = [
  {
    question: "How long does a website usually take?",
    answer:
      "Most straightforward small-business sites go live in about a week once we have your text, photos, and contact details. Larger web apps or custom rebuilds are mapped out with clear milestones in your quote.",
  },
  {
    question: "Who writes the copy for the site?",
    answer:
      "You know your business or charity best; we turn your notes, hours, services, and photos into clear plain English. We never invent testimonials, fake reviews, or made-up statistics.",
  },
  {
    question: "How do charity builds work?",
    answer:
      "Registered charities can ask for the same website build care without a fee. If you are an animal rescue or community group that is not yet registered, send a note anyway and we will talk through what you need.",
  },
  {
    question: "Will we own the finished website?",
    answer:
      "Yes. Your domain name, text, photos, and code belong to you. We can show you how to make simple updates or take care of occasional edits whenever you need a hand.",
  },
] as const;
