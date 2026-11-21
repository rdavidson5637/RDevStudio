import {
  PRICE_CARE_PLAN_GBP,
  PRICE_CONTENT_GBP,
  PRICE_SOCIAL_GBP,
  PRICE_WEBSITE_GBP,
} from "@/lib/constants";

/**
 * DRAFT COPY (EPAM-inspired redesign concept / preview)
 * Edit these strings before any live release.
 * All copy follows .claude/rules/copy.md (no em dashes, no banned words, no invented figures).
 */

export const DRAFT_CTAS = {
  primary: "Get a fixed quote",
  secondary: "See the work",
  charity: "Registered charity? Ask about free packages",
  lowCommitment: "Message me on WhatsApp",
  lab: "Play something I built",
} as const;

export const DRAFT_HERO = {
  h1: "Websites for Northern Ireland businesses and rescues, built by one person.",
  altH1: "Your site, built and looked after from Carrickfergus.",
  support:
    "Clear from-prices, direct contact with me from first note to launch, and free packages for registered charities.",
} as const;

export const DRAFT_PROOF_ITEMS = [
  {
    name: "RV's Cold Brew",
    role: "Belfast cold brew and matcha counter, Great Northern Mall",
    status: "Live site - Square is linked and the last details are being finished",
    href: "/work/rvs-cold-brew",
  },
  {
    name: "ShelterLink - Assisi Animal Sanctuary",
    role: "Volunteer rotas, roles, and admin dashboard",
    status: "Ready for live use",
    href: "/work/shelterlink",
  },
  {
    name: "Assisi site and brand",
    role: "Rebuilt website and brand for Assisi Animal Sanctuary",
    status: "Built - awaiting their sign-off",
    href: "/work/assisi",
  },
  {
    name: "Crosskennan Lane Animal Sanctuary",
    role: "Charity site: adoption, volunteering, donate and ways to help",
    status: "Preview online - forms and listings still being finished",
    href: "/work/crosskennan",
  },
  {
    name: "Rondo",
    role: "Grassroots football coaching app (NIFD pilot)",
    status: "Live pilot - Grove United 3rds",
    href: "/work/rondo",
  },
] as const;

/** Slugs shown on the homepage showcase. Full list lives on /work. */
export const DRAFT_FEATURED_CASE_SLUGS = [
  "shelterlink",
  "assisi",
  "crosskennan",
  "rondo",
] as const;

/** Ordered showcase set for /work (charity + Rondo). No MGSL case page exists. */
export const DRAFT_SHOWCASE_CASE_SLUGS = [
  "shelterlink",
  "assisi",
  "crosskennan",
  "rondo",
] as const;

/**
 * Local-services niches. Positioning only - no invented clients, reviews or results.
 * Concept demos exist for trades and a salon; HVAC and dentists are niches I quote for, not live client case studies.
 */
export const DRAFT_LOCAL_NICHES = [
  {
    slug: "plumbers",
    title: "Plumbers",
    line: "Emergency call number first, service area clear, and a form that lands in your inbox - not a buried contact page.",
  },
  {
    slug: "hvac",
    title: "HVAC and heating",
    line: "Boiler, heat pump or air-con work listed plainly, with call-out and area covered so people know you take the job.",
  },
  {
    slug: "dentists",
    title: "Dentists",
    line: "New-patient path, treatments and hours easy to find on a phone. Booking links only if you already have a system live.",
  },
  {
    slug: "salons",
    title: "Salons",
    line: "Services, prices and hours up front, with a clear way to get in touch. No fake reviews or invented wait-lists.",
  },
] as const;

export const DRAFT_SERVICES_CARDS = [
  {
    slug: "websites",
    title: "Websites",
    price: `£${PRICE_WEBSITE_GBP}`,
    pricePrefix: "from",
    priceSuffix: "one-off",
    summary:
      "Up to five pages built for a phone first. Clear copy, contact form in your inbox, basic SEO, and Vercel hosting.",
    href: "/services#websites",
  },
  {
    slug: "care",
    title: "Care plan",
    price: `£${PRICE_CARE_PLAN_GBP}`,
    pricePrefix: "",
    priceSuffix: "/month",
    summary:
      "Optional monthly cover after launch. Hosting, security updates, and small text or photo edits when you need them.",
    href: "/services#care",
  },
  {
    slug: "social",
    title: "Social media",
    price: `£${PRICE_SOCIAL_GBP}`,
    pricePrefix: "from",
    priceSuffix: "/month",
    summary:
      "A month's calendar agreed up front, captions in your voice, matching graphics, and scheduled posts.",
    href: "/services#social",
  },
  {
    slug: "content",
    title: "Content",
    price: `£${PRICE_CONTENT_GBP}`,
    pricePrefix: "from",
    priceSuffix: "/project",
    summary:
      "A one-off batch of posts or campaign graphics written from a brief and delivered ready for you to publish.",
    href: "/services#content",
  },
] as const;

export const DRAFT_CASE_STUDIES = [
  {
    slug: "rvs-cold-brew",
    name: "RV's Cold Brew",
    category: "Client work - Belfast",
    status: "Live site - nearly finished",
    href: "/work/rvs-cold-brew",
    siteUrl: "https://rvscoldbrew.vercel.app",
    image: "/work/rvs-cold-brew-desktop.webp",
    imageAlt: "RV's Cold Brew website showing cold brew and Okumidori matcha at Great Northern Mall",
    challenge:
      "RV's pours cold brew and ceremonial Okumidori matcha from Unit 11 in Great Northern Mall, beside Grand Central. Customers on a phone needed to see the menu, opening hours, and how to find the unit fast.",
    solution:
      "A phone-first brand site built in Next.js and Tailwind that leads with the drinks, menu, hours, and directions to Unit 11.",
    result:
      "Live preview online. Square is linked and the last details are being finished.",
  },
  {
    slug: "shelterlink",
    name: "ShelterLink",
    category: "Client work - Charity",
    status: "Ready for live use",
    href: "/work/shelterlink",
    image: "/images/work/shelterlink-admin-dashboard.webp",
    imageAlt: "ShelterLink admin dashboard for Assisi Animal Sanctuary",
    challenge:
      "Assisi Animal Sanctuary runs on volunteers. Shift cover, training roles, and Sunday rotas lived in paper lists and phone calls, taking staff time away from the animals.",
    solution:
      "A custom web application (Node.js, Express, MySQL, PicoCSS) with volunteer profiles, shift picking, role assignment, CSV exports, and strict security middleware.",
    result:
      "Graduated with MSc Commendation at Queen's University Belfast. Ready for live use.",
  },
  {
    slug: "assisi",
    name: "Assisi site and brand",
    category: "Client work - Charity",
    status: "Built - awaiting sign-off",
    href: "/work/assisi",
    challenge:
      "A sanctuary needs a clear, calm public site where adopters, donors, and supporters can find animals and help without hunting through menus.",
    solution:
      "A full website and brand rebuild designed for clarity on mobile and desktop.",
    result:
      "Built and awaiting their sign-off before public preview.",
  },
  {
    slug: "crosskennan",
    name: "Crosskennan Lane Animal Sanctuary",
    category: "Client work - Charity",
    status: "Preview online",
    href: "/work/crosskennan",
    siteUrl: "https://crosskennan.vercel.app",
    challenge:
      "A volunteer-run sanctuary near Antrim needed one clear place for adoption, volunteering, donate and ways to help, usable on a phone.",
    solution:
      "A Next.js charity site with adoption listings, dog/cat/equine rehoming forms, adult and under-18 volunteer paths, and support pages. Forms use Formspree when IDs are set, otherwise mailto.",
    result:
      "Preview online and in review with the sanctuary. Forms, listings and horse profiles are being finished before it moves to the sanctuary's own domain.",
  },
  {
    slug: "rondo",
    name: "Rondo",
    category: "Studio product - Football",
    status: "Live pilot",
    href: "/work/rondo",
    siteUrl: "https://rondo-cyan.vercel.app",
    challenge:
      "Grassroots coaches juggle availability, training plans, line-ups, match reports and fees across WhatsApp and spreadsheets.",
    solution:
      "A free phone-first coaching app: team link for players, session planner, line-up builder, live match tracker, fee ledger and a public drill library. Next.js and Supabase.",
    result:
      "Live pilot with Grove United 3rds as part of NIFD. Further clubs wait on review.",
  },
] as const;

export const DRAFT_CONCEPT_STUDIES = [
  {
    slug: "concept-builds",
    name: "Local business concept builds",
    category: "Concept build - Set of 3",
    status: "Concept builds demonstrating design range",
    href: "/work/concept-builds",
    image: "/images/work/carrick-plumbing.png",
    imageAlt: "Carrick Plumbing Co homepage - concept trades website",
    challenge:
      "A trades firm, a restaurant, and a hair salon each need different things from a homepage in the first ten seconds.",
    solution:
      "Three standalone concept builds - Carrick Plumbing Co, The Anchor Restaurant, and Harbour Hair Studio - tailored to how real customers use them on a phone.",
    result:
      "Three live concept demos showing layout and visual range across local trades and hospitality.",
  },
  {
    slug: "uc-caseworker-tool",
    name: "UC Caseworker Assistant",
    category: "Personal project - Portfolio prototype",
    status: "Portfolio prototype - synthetic data only",
    href: "/work/uc-caseworker-tool",
    image: "/images/work/uc-caseworker-journal.jpg",
    imageAlt: "UC Caseworker Assistant journal response tool with a synthetic example loaded",
    challenge:
      "Caseworkers handle high volumes of journal messages, case notes, and standard letters where policy accuracy and safeguarding checks are critical.",
    solution:
      "A human-in-the-loop assistant that flags safeguarding risks first, grounds drafts strictly in provided guidance, and uses deterministic code for letters.",
    result:
      "Working prototype built entirely with synthetic data to demonstrate safe, compliant engineering.",
  },
] as const;
