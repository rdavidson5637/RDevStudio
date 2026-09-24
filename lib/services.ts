import {
  CONTENT_CREATION_FEATURES,
  PRICING_FEATURES,
  SERVICES,
  SOCIAL_MEDIA_FEATURES,
} from "@/lib/constants";

/**
 * Everything the services overview and the /services/[slug] pages say about
 * each package. Prices live in SERVICES (lib/constants.ts) so the homepage,
 * services page and structured data never disagree.
 */

export type ServiceSlug = (typeof SERVICES)[number]["slug"];

export type ServiceDetail = {
  slug: ServiceSlug;
  /** Page <h1> and <title> for /services/[slug]. */
  pageTitle: string;
  metaDescription: string;
  /** Numeric price for structured data. */
  schemaPrice: number;
  schemaPriceUnit?: string;
  intro: string[];
  features: readonly string[];
  notIncluded: readonly string[];
  timeline: string;
  revisions: string;
  ideal: string;
  process: readonly string[];
  cta: string;
};

export const SERVICE_DETAILS: readonly ServiceDetail[] = [
  {
    slug: "websites",
    pageTitle: "Website design for NI small businesses",
    metaDescription:
      "A five-page website for a Northern Ireland small business or charity. £650 fixed, live in about a week, built phone-first in Carrickfergus. You own it.",
    schemaPrice: 650,
    intro: [
      "A proper site for a shop, a trades firm, a cafe, a club or a charity. Who you are, what you do, what it costs, and how to get in touch, on a phone first.",
      "No template and no page builder. I design it and build it myself, and you deal with me from the first message to launch day.",
    ],
    features: PRICING_FEATURES,
    notIncluded: [
      "An online shop or card payments - that is a separate quote",
      "Pages beyond five - extra pages are priced before I build them",
      "A photoshoot or a new logo",
      "Writing the whole site from nothing if you send no details",
      "Monthly posting (that is the social package)",
    ],
    timeline:
      "About a week for a five-page site, once I have your text, photos, and contact details. If those arrive late, the date moves.",
    revisions:
      "One round after you see the first full draft. Send a list; I make the changes. Extra rounds are quoted first.",
    ideal:
      "A shop, a trades firm, a charity, or anyone who needs a proper site without an agency quote.",
    process: [
      "Short call, WhatsApp or email to agree the pages and the date",
      "You pay half to book the build in, and send text, photos, and contact details",
      "I build it, you see a draft, one round of notes",
      "It goes live, you pay the other half, and I show you how to make simple edits",
    ],
    cta: "Start a project",
  },
  {
    slug: "social-media",
    pageTitle: "Social media management for NI small businesses",
    metaDescription:
      "Monthly social media for Northern Ireland small businesses: a content calendar, captions in your voice, and graphics that match your brand. From £150 a month.",
    schemaPrice: 150,
    schemaPriceUnit: "month",
    intro: [
      "You know you should be posting. You do not have a free hour every Monday to work out what. I plan the month, write the captions, make the graphics, and schedule it.",
      "Nothing goes out until you have seen the calendar and said yes.",
    ],
    features: SOCIAL_MEDIA_FEATURES,
    notIncluded: [
      "Paid ads or boosting posts",
      "Filming or a photoshoot",
      "Answering comments and DMs all day",
      "Buying followers or fake engagement",
    ],
    timeline:
      "First month's calendar in the first week. Posting starts once you sign the calendar off.",
    revisions:
      "One round of notes on each month's batch - captions and graphics - before anything is scheduled.",
    ideal:
      "You know you should be posting and you do not have a free hour every week to do it.",
    process: [
      "Look at what you already post, if anything",
      "Agree the month's calendar with you",
      "Write, design, and schedule the posts",
      "A short note at the end of the month on what went out",
    ],
    cta: "Get in touch",
  },
  {
    slug: "content",
    pageTitle: "Content creation for NI small businesses",
    metaDescription:
      "One-off social posts and campaign sets for Northern Ireland small businesses. Copy in your voice, graphics in your brand, delivered ready to post. From £200.",
    schemaPrice: 200,
    schemaPriceUnit: "project",
    intro: [
      "A launch, an event, a new menu, or a batch of posts to see you through a busy month. Written to sound like you, designed to match what you already have.",
      "No retainer. You get the files, ready to post.",
    ],
    features: CONTENT_CREATION_FEATURES,
    notIncluded: [
      "Video production",
      "A photoshoot",
      "Ongoing posting and scheduling (that is the social package)",
      "A new brand identity",
    ],
    timeline:
      "A small set in a few days. A bigger batch about a week, once the brief and any photos are in.",
    revisions:
      "One round included after you see the set. Extra rounds are quoted before I start them.",
    ideal:
      "A product launch, a campaign, or a batch of posts without a monthly retainer.",
    process: [
      "Brief: what it is for, who it is for, what you already have",
      "I write and design the set",
      "One round of notes",
      "Files delivered ready to post",
    ],
    cta: "Start a project",
  },
];

export function getService(slug: string) {
  const service = SERVICES.find((item) => item.slug === slug);
  const detail = SERVICE_DETAILS.find((item) => item.slug === slug);
  return service && detail ? { ...service, ...detail } : undefined;
}

export const PAYMENT_TERMS = [
  { label: "To book", value: "50% up front" },
  { label: "At launch", value: "The other 50%" },
  { label: "Care plan", value: "£30 a month, optional" },
] as const;

export const OWNERSHIP_POINTS = [
  "The domain is registered in your name",
  "The words, photos and code are yours",
  "Want to move it one day? I hand it all over",
] as const;

export const CARE_PLAN = {
  price: "£30/mo",
  title: "Care plan",
  summary:
    "Keeps the site online, up to date, and correct after launch, without you having to think about it.",
  includes: [
    "Hosting and the security certificate (the padlock)",
    "Security and software updates",
    "Small changes: prices, opening hours, a new photo, a line of text",
    "Someone to message when something looks wrong",
  ],
  note: "Optional. Without it, I move the site onto a hosting account in your name and quote changes as they come up.",
} as const;

/** "What £650 gets you" comparison. Only claims that hold for the category. */
export const COMPARISON = {
  columns: ["DIY builder", "Typical agency", "RDev Studio"],
  rows: [
    {
      label: "Who builds it",
      values: ["You, in the evenings", "A team you mostly won't meet", "Me, start to finish"],
    },
    {
      label: "Cost",
      values: [
        "A monthly subscription for as long as it is up",
        "Often four figures",
        "£650, then £30 a month if you want the care plan",
      ],
    },
    {
      label: "Time to launch",
      values: ["However long it takes you", "Often several weeks", "About a week"],
    },
    {
      label: "Who you talk to",
      values: ["A support chat", "An account manager", "The person building it"],
    },
    {
      label: "Who owns it",
      values: [
        "Tied to the platform",
        "Depends on the contract",
        "You: domain, content and code",
      ],
    },
  ],
} as const;
