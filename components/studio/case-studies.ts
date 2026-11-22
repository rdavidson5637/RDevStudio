import type { QuoteTopic } from "@/components/studio/content";

/**
 * Case studies for /work and /work/[slug].
 * Every fact comes from the live case study pages and lib/content/redesign-draft.ts.
 * Written for visitors: no internal build notes, no placeholders.
 */

export type Shot = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

/** Typographic panel for projects without approved screenshots. */
export type PreviewPanel = {
  label: string;
  title: string;
  lede: string;
  items: readonly string[];
  footer: string;
};

export type CaseLink = {
  href: string;
  label: string;
  external?: boolean;
};

export type CaseSection = {
  kicker: string;
  heading: string;
  paragraphs?: readonly string[];
  list?: readonly string[];
  listHeading?: string;
  subsections?: readonly { heading: string; paragraphs: readonly string[] }[];
  shots?: readonly Shot[];
  link?: CaseLink;
};

export type CaseStudyGroup = "showcase" | "client" | "concept";

export type CaseStudy = {
  slug: string;
  name: string;
  type: string;
  group: CaseStudyGroup;
  context: string;
  role: string;
  year: string;
  status: string;
  statusDetail: string;
  summary: string;
  stack: readonly string[];
  link?: CaseLink;
  shots?: readonly Shot[];
  panel?: PreviewPanel;
  visualNote: string;
  sections: readonly CaseSection[];
  related?: { slug: string; name: string; relation: string };
  quoteTopic: QuoteTopic;
  closing?: { heading: string; body: string; cta: string };
};

const SHELTERLINK_SHOTS: readonly Shot[] = [
  {
    src: "/images/work/shelterlink-admin-dashboard.webp",
    alt: "ShelterLink admin dashboard with volunteer metrics and recent activity",
    caption: "Admin dashboard",
    width: 1024,
    height: 640,
  },
  {
    src: "/images/work/shelterlink.png",
    alt: "ShelterLink volunteer landing page with a sign-up call to action",
    caption: "Volunteer landing page",
    width: 1024,
    height: 546,
  },
  {
    src: "/images/work/shelterlink-browse-shifts.png",
    alt: "ShelterLink browse shifts page showing available opportunities",
    caption: "Shift planner with role allocation",
    width: 1024,
    height: 640,
  },
];

const RVS_SHOTS: readonly Shot[] = [
  {
    src: "/images/work/rvs-coldbrew-hero.jpg",
    alt: "RV's Cold Brew landing page hero",
    caption: "Landing page, Great Northern Mall",
    width: 1440,
    height: 900,
  },
  {
    src: "/images/work/rvs-coldbrew-product-row.jpg",
    alt: "RV's Cold Brew homepage cards for the menu, visit details, and brewing process",
    caption: "Menu, visit, and process",
    width: 1440,
    height: 900,
  },
  {
    src: "/images/work/rvs-coldbrew-matcha-story.jpg",
    alt: "RV's Cold Brew product story section on the Okumidori matcha",
    caption: "Okumidori matcha story",
    width: 1440,
    height: 900,
  },
];

const CONCEPT_SHOTS: readonly Shot[] = [
  {
    src: "/images/work/carrick-plumbing.png",
    alt: "Carrick Plumbing Co homepage - trades firm concept site",
    caption: "Carrick Plumbing Co homepage",
    width: 1024,
    height: 576,
  },
  {
    src: "/images/work/anchor-restaurant.png",
    alt: "The Anchor Restaurant landing page - restaurant concept site",
    caption: "The Anchor Restaurant landing page",
    width: 1024,
    height: 580,
  },
  {
    src: "/images/work/harbour-hair.png",
    alt: "Harbour Hair Studio hero and services - salon concept site",
    caption: "Harbour Hair Studio hero and services",
    width: 1024,
    height: 581,
  },
];

const UC_SHOTS: readonly Shot[] = [
  {
    src: "/images/work/uc-caseworker-journal.jpg",
    alt: "UC Caseworker Assistant journal response tool with a synthetic overpayment example loaded",
    caption: "Journal response assistant, synthetic example",
    width: 1280,
    height: 900,
  },
];

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: "shelterlink",
    name: "ShelterLink",
    type: "Volunteer web app",
    group: "showcase",
    context: "Assisi Animal Sanctuary, Belfast (charity)",
    role: "Design and development, solo",
    year: "2025-26",
    status: "Ready for live use",
    statusDetail:
      "Started as my MSc dissertation at Queen's University Belfast, where I graduated with Commendation. The platform is ready for live use. Assisi is not running it day to day yet.",
    summary:
      "Volunteer rotas, roles, and an admin dashboard for Assisi Animal Sanctuary.",
    stack: ["Node.js", "Express", "MySQL", "Vanilla JS", "PicoCSS"],
    link: { href: "https://shelterlink.online", label: "Open shelterlink.online", external: true },
    shots: SHELTERLINK_SHOTS,
    visualNote: "Screens from the built platform.",
    sections: [
      {
        kicker: "Context",
        heading: "How they were running it",
        paragraphs: [
          "Assisi runs on volunteers. Who was in, who was trained for which jobs, and who was covering Sunday all lived in paper rotas, phone calls, and whoever happened to remember.",
          "Staff spent time chasing people when that time should have gone to the animals. It worked for a smaller list. It did not work once the list got long.",
        ],
      },
      {
        kicker: "Delivery",
        heading: "What I built",
        paragraphs: [
          "ShelterLink is the system they asked for. Volunteers sign up, fill in a profile, and pick shifts they can actually do. Staff assign roles, plan the week from an admin dashboard, and export records to CSV when they need them elsewhere.",
          "Authentication, rate limiting, and a strict content security policy are in because a charity holding volunteer details cannot be casual about that.",
        ],
        listHeading: "What is in it",
        list: [
          "Volunteer registration and profiles",
          "Shift scheduling",
          "Role management",
          "Admin dashboards",
          "CSV exports",
          "Auth and security middleware",
        ],
      },
      {
        kicker: "Decisions",
        heading: "Why it is plain",
        paragraphs: [
          "The sanctuary does not have a developer on staff. Whatever I left them had to still make sense in a few years, to whoever opens the folder next. Plain JavaScript with no build step means nothing to update, nothing to break, nothing to relearn.",
          "PicoCSS kept the front end small and readable without a pile of classes. The design budget went on the rota, not on chrome.",
        ],
      },
    ],
    related: {
      slug: "assisi",
      name: "Assisi site and brand",
      relation: "Also for Assisi: a rebuilt public website and brand.",
    },
    quoteTopic: "Charity or rescue",
  },
  {
    slug: "assisi",
    name: "Assisi site and brand",
    type: "Charity site and brand",
    group: "showcase",
    context: "Assisi Animal Sanctuary, Belfast (charity)",
    role: "Design and development, solo",
    year: "2025-26",
    status: "Built - awaiting sign-off",
    statusDetail:
      "Built and awaiting the sanctuary's sign-off. Screenshots and a public link go up once they have approved them.",
    summary:
      "A rebuilt website and brand for Assisi Animal Sanctuary in Belfast, designed for phone and desktop from the start.",
    stack: ["Website rebuild", "Brand", "Phone first"],
    panel: {
      label: "Assisi Animal Sanctuary",
      title: "Website and brand rebuild",
      lede: "Calm, clear paths for adopters, donors and supporters on a phone as easily as on a desktop.",
      items: ["Meet the animals", "Ways to help", "Get in touch"],
      footer: "Screens shared once the sanctuary signs off",
    },
    visualNote: "Screenshots stay off this site until the sanctuary approves them.",
    sections: [
      {
        kicker: "Context",
        heading: "What they needed",
        paragraphs: [
          "A sanctuary site has to stay calm and clear. Adopters, donors and supporters should find animals and ways to help without hunting through menus, on a phone as easily as on a desktop.",
        ],
      },
      {
        kicker: "Delivery",
        heading: "What I built",
        paragraphs: [
          "A full rebuild of the public website and a new brand to go with it. Layout and copy aim at the jobs people actually come to do: meet animals, learn how to help, and get in touch.",
        ],
        listHeading: "What is in it",
        list: [
          "Full rebuild of the public website",
          "New brand to go with the site",
          "Phone and desktop layouts from the start",
          "Clear paths for adopters, donors and supporters",
          "Animals and ways to help without deep menus",
        ],
      },
    ],
    related: {
      slug: "shelterlink",
      name: "ShelterLink",
      relation: "Also for Assisi: ShelterLink, their volunteer rota platform.",
    },
    quoteTopic: "Charity or rescue",
    closing: {
      heading: "Run a rescue or a charity?",
      body: "Registered charities get their site free. Tell me what you need and I will walk you through how this one was put together.",
      cta: "Ask for a walkthrough",
    },
  },
  {
    slug: "crosskennan",
    name: "Crosskennan Lane Animal Sanctuary",
    type: "Charity website",
    group: "showcase",
    context: "Crosskennan Lane Animal Sanctuary, near Antrim (charity)",
    role: "Design and development, solo",
    year: "2026",
    status: "Preview online",
    statusDetail:
      "A preview is online and in review with the sanctuary. Listings, horse profiles and forms are being finished before it moves to the sanctuary's own domain.",
    summary:
      "A charity site for a volunteer-run sanctuary near Antrim. Adoption, volunteering, donate and support pages, built so people can find an animal or a way to help on a phone.",
    stack: ["Next.js", "Tailwind", "TypeScript"],
    link: { href: "https://crosskennan.vercel.app", label: "Open the preview", external: true },
    panel: {
      label: "crosskennan.vercel.app",
      title: "Adopt, volunteer, donate",
      lede: "One clear place to meet animals and find a way to help, on a phone.",
      items: ["Adoption listings", "Volunteer forms", "Donate and sponsor"],
      footer: "Preview online, in review with the sanctuary",
    },
    visualNote: "The preview is online. Screens go up here once the sanctuary is happy with them.",
    sections: [
      {
        kicker: "Context",
        heading: "What they needed",
        paragraphs: [
          "Crosskennan Lane Animal Sanctuary rescues and rehomes horses, dogs, cats and other animals. Supporters needed one clear place to meet animals, apply to rehome, volunteer (including under-18s with a guardian), donate, sponsor and find other ways to help - without hunting through an old site.",
        ],
      },
      {
        kicker: "Delivery",
        heading: "What I built",
        paragraphs: [
          "A phone-first Next.js site: adoption listings, species rehoming applications, volunteer forms with a separate under-18 path, donate and support pages, and the sanctuary's ways to help.",
          "Forms are built to fall back to email rather than fail silently, so no application gets lost.",
        ],
        listHeading: "What is in it",
        list: [
          "Adoption listings for dogs, cats and horses",
          "Rehoming applications (dog, cat, equine)",
          "Adult and under-18 volunteer forms",
          "Donate, sponsor and ways-to-help pages",
          "Phone-first layout throughout",
        ],
      },
    ],
    related: {
      slug: "assisi",
      name: "Assisi site and brand",
      relation: "Related charity work: the Assisi site and brand rebuild.",
    },
    quoteTopic: "Charity or rescue",
  },
  {
    slug: "rondo",
    name: "Rondo",
    type: "Coaching app",
    group: "showcase",
    context: "Grassroots football, NIFD pilot with Grove United 3rds",
    role: "Design and development, solo",
    year: "2026",
    status: "Live pilot",
    statusDetail:
      "Live as a pilot with Grove United 3rds as part of NIFD. Further clubs wait on review.",
    summary:
      "A free coaching app for grassroots football. Players tap in from WhatsApp. Coaches plan training, share line-ups, run the match and track fees.",
    stack: ["Next.js", "Tailwind", "Supabase"],
    link: { href: "https://rondo-cyan.vercel.app", label: "Open the pilot", external: true },
    panel: {
      label: "rondo-cyan.vercel.app",
      title: "Coaching app for grassroots football",
      lede: "Availability, training, line-ups, match day and fees in one phone-first app.",
      items: ["Player availability", "Training planner", "Line-ups and match day", "Subs and fees"],
      footer: "Live pilot: Grove United 3rds",
    },
    visualNote: "Open the pilot to see the player and coach views.",
    sections: [
      {
        kicker: "Context",
        heading: "The problem on a Tuesday night",
        paragraphs: [
          "Grassroots coaches run availability, training, line-ups, match reports and fees across WhatsApp threads and spreadsheets. Players need a simple way to say if they are in, see where they are playing, and know what they owe - without another account to remember.",
        ],
      },
      {
        kicker: "Delivery",
        heading: "What I built",
        paragraphs: [
          "Rondo is a phone-first app. Players open a team link, tap their name, set availability, see match details, offer or grab lifts, and check fees. Coaches add the week in one go, plan sessions around who is actually coming, build a line-up, run the match from the touchline, and track subs.",
          "There are no traditional accounts. A device token in an httpOnly cookie identifies a player; the coach uses a private link. Data sits in Supabase behind checked server functions. Anyone can browse the public drill library.",
        ],
        listHeading: "What is in it",
        list: [
          "Player availability from a WhatsApp team link",
          "Training planner that fits who is coming",
          "Line-up builder and live match tracker",
          "Subs and match fee tracking",
          "Public drill library",
          "Push reminders for unanswered availability",
        ],
      },
    ],
    quoteTopic: "Something else",
  },
  {
    slug: "rvs-cold-brew",
    name: "RV's Cold Brew",
    type: "Brand site",
    group: "client",
    context: "RV's Cold Brew, Great Northern Mall, Belfast",
    role: "Design and development",
    year: "2026",
    status: "Live site - nearly finished",
    statusDetail:
      "Nearly finished. Square is linked and the last details are being finished.",
    summary:
      "A Belfast cold brew and matcha counter. Menu, hours and where to find Unit 11.",
    stack: ["Next.js", "Tailwind"],
    link: { href: "https://rvscoldbrew.vercel.app", label: "Open the site", external: true },
    shots: RVS_SHOTS,
    visualNote: "Screens from the live site.",
    sections: [
      {
        kicker: "Context",
        heading: "The counter",
        paragraphs: [
          "RV's pours cold brew and ceremonial Okumidori matcha from Unit 11 in Great Northern Mall, beside Grand Central. They needed a site that shows the drinks properly and how to get there, not a template with a logo swapped in.",
        ],
      },
      {
        kicker: "Delivery",
        heading: "The site",
        paragraphs: [
          "It leads with the product, then the menu, opening hours, the unit number, and directions. Copy stays short. Built to load quickly on a phone.",
        ],
      },
    ],
    quoteTopic: "New website",
  },
  {
    slug: "concept-builds",
    name: "Local business concept builds",
    type: "Concept builds - set of 3",
    group: "concept",
    context: "Speculative demos: a trades firm, a restaurant, and a salon",
    role: "Design and development, solo",
    year: "2026",
    status: "Concept builds",
    statusDetail:
      "Three live concept demos showing layout and visual range across local trades and hospitality. These are not client sites.",
    summary:
      "Three sites exploring how local businesses could look online. Three different brands, three different audiences, one standard.",
    stack: ["Next.js", "Vercel"],
    shots: CONCEPT_SHOTS,
    visualNote: "Concept builds, not client sites.",
    sections: [
      {
        kicker: "Context",
        heading: "Why build them",
        paragraphs: [
          "Not every business I want to design for has hired me yet. These three concept builds - a trades firm, a restaurant, and a salon - are how I show range.",
        ],
      },
      {
        kicker: "Build 01",
        heading: "Carrick Plumbing Co",
        paragraphs: [
          "Homeowners need to know what the firm does, where it covers, and how to get a quote - before anything else. The layout puts services and contact above the fold, with a restrained palette that reads as dependable rather than flashy.",
        ],
        link: { href: "https://carrick-plumbing-co.vercel.app/", label: "Visit the build", external: true },
      },
      {
        kicker: "Build 02",
        heading: "The Anchor Restaurant",
        paragraphs: [
          "Diners want the menu, opening hours, and a way to book - fast, on a phone, often one-handed. Photography carries the atmosphere; type stays large and legible so the essentials never compete with the mood.",
        ],
        link: { href: "https://the-anchor-restaurant.vercel.app/", label: "Visit the build", external: true },
      },
      {
        kicker: "Build 03",
        heading: "Harbour Hair Studio",
        paragraphs: [
          "Salon visitors need services, pricing direction, and booking options without hunting through a gallery first. A single-column flow with clear treatment blocks and one prominent booking path keeps the brand polished without slowing the decision.",
        ],
        link: { href: "https://harbour-hair-studio11.vercel.app/", label: "Visit the build", external: true },
      },
    ],
    quoteTopic: "New website",
  },
  {
    slug: "uc-caseworker-tool",
    name: "UC Caseworker Assistant",
    type: "Portfolio prototype",
    group: "concept",
    context: "Personal project, built by a working caseworker",
    role: "Design and development, solo",
    year: "2026",
    status: "Portfolio prototype - synthetic data only",
    statusDetail:
      "A working prototype built entirely with synthetic data. Not an official DWP product - a demonstration of how one would be built responsibly.",
    summary:
      "An AI assistant for Universal Credit caseworkers, built around safeguarding and human-in-the-loop review.",
    stack: ["Node.js", "Express", "Claude API"],
    shots: UC_SHOTS,
    visualNote: "Synthetic example data throughout.",
    sections: [
      {
        kicker: "Context",
        heading: "The problem",
        paragraphs: [
          "Caseworkers answer a high volume of claimant journal messages, write handover case notes, and populate repetitive standard letters every day. Each task carries real weight: a journal response has to be accurate against policy and right in tone, a case note has to be factual for the next person on the case, and a letter has to be populated without transposition errors.",
          "A message that looks routine can also be a safeguarding risk - suicide, domestic abuse, a child protection concern - and those cannot be answered with a generic policy reply.",
        ],
      },
      {
        kicker: "Delivery",
        heading: "The build",
        paragraphs: [
          "Three tools, one principle throughout: the AI drafts, the caseworker decides. The journal assistant classifies a pasted message for safeguarding and topic first, loads only the matching GOV.UK guidance, then returns a claimant-facing draft, a guidance reference, a review checklist and a suggested case note - grounded only in the guidance it was given, never invented.",
          "The letter tool lets a caseworker paste a case to-do and has the AI extract values into a form; generating the actual letter is deterministic string replacement, not a model rewriting legal wording. The case note assistant turns a situation summary into a factual, third-person internal note.",
          "Every output lands in an editable review area, not an outbox - nothing is ever sent or posted automatically. All example data shipped with the project, including a labelled safeguarding demo, is fabricated for the purpose.",
        ],
        listHeading: "What is in it",
        list: [
          "Journal response assistant",
          "Safeguarding classification",
          "Deterministic letter generation",
          "Case note assistant",
          "GOV.UK Design System frontend",
          "Synthetic data only",
        ],
        shots: [
          {
            src: "/images/work/uc-caseworker-letter.jpg",
            alt: "UC Caseworker Assistant letter population tool with a synthetic hardship payment case pasted in",
            caption: "Letter population, demonstration template",
            width: 1280,
            height: 1920,
          },
        ],
      },
      {
        kicker: "Decisions",
        heading: "Decisions",
        subsections: [
          {
            heading: "Synthetic data, from the first commit",
            paragraphs: [
              "This tool never uses, contains or assumes real claimant data. Every example message, name and case detail is fabricated, and operational values - account numbers, sort codes, references - are obvious placeholders. A portfolio project that handled real benefit data, even by accident, would be a serious data protection failure. Building the constraint in from the start was the point, not an afterthought.",
            ],
          },
          {
            heading: "The AI never invents policy",
            paragraphs: [
              "Classification picks the relevant guidance files so the model is never asked to search a dump of every policy area, and its system prompt constrains it to draft only from the guidance it was handed. If that guidance does not clearly cover a topic, the tool says so rather than guessing at figures, dates or amounts.",
            ],
          },
          {
            heading: "Letters are code, not a model",
            paragraphs: [
              "The AI may extract values from pasted text into a form; it never drafts the letter itself. Generating the letter is deterministic string replacement, so fixed legal wording and rights information cannot drift between runs. Dates and amounts are formatted in code, and inconsistencies - an end date before a start date, a zero amount - are flagged above the letter rather than silently written into it.",
            ],
          },
          {
            heading: "Safeguarding is flagged, not delegated",
            paragraphs: [
              "A message that reads as suicide risk, domestic abuse, child safeguarding, homelessness or a fraud admission surfaces a banner before any draft is shown, pointing the caseworker to the Six Point Plan or the relevant local procedure. The model is constrained to flag, not to counsel, investigate or invent next steps - that judgement stays with the caseworker.",
            ],
          },
        ],
      },
      {
        kicker: "Result",
        heading: "The result",
        paragraphs: [
          "A working prototype that argues two things at once: real understanding of the caseworker workflow it was built for, and the discipline to build safe, compliant software around an LLM rather than just a wrapper around a chat API.",
        ],
      },
    ],
    quoteTopic: "Something else",
  },
] as const;

export function getCaseStudy(slug: string): CaseStudy {
  const study = CASE_STUDIES.find((item) => item.slug === slug);
  if (!study) {
    throw new Error(`Unknown case study: ${slug}`);
  }
  return study;
}

export function getAdjacentCaseStudies(slug: string) {
  const index = CASE_STUDIES.findIndex((item) => item.slug === slug);
  const count = CASE_STUDIES.length;
  return {
    previous: CASE_STUDIES[(index - 1 + count) % count],
    next: CASE_STUDIES[(index + 1) % count],
    position: index + 1,
    count,
  };
}

/** Projects shown on the home page, in order. */
export const HOME_CASE_SLUGS = [
  "shelterlink",
  "rvs-cold-brew",
  "assisi",
  "crosskennan",
  "rondo",
] as const;
