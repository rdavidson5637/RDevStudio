import {
  CONTENT_CREATION_FEATURES,
  FAQ_ITEMS,
  PRICING_FEATURES,
  SOCIAL_MEDIA_FEATURES,
  WHATSAPP_URL,
} from "@/lib/constants";

/**
 * Shared copy for the studio pages (home, services, contact, case studies).
 * Facts come from the live site copy in lib/constants.ts and lib/content/redesign-draft.ts.
 * Voice: first person ("I"), one person behind the studio. No prices on the site.
 */

export const STUDIO_WHATSAPP_URL = `${WHATSAPP_URL}?text=${encodeURIComponent(
  "Hi Ryan, I'd like to chat about a project.",
)}`;

export const QUOTE_TOPICS = [
  "New website",
  "Social media",
  "Content",
  "Care plan",
  "Charity or rescue",
  "Something else",
] as const;

export type QuoteTopic = (typeof QUOTE_TOPICS)[number];

export function quoteHref(topic?: QuoteTopic) {
  return topic ? `/contact?topic=${encodeURIComponent(topic)}` : "/contact";
}

export type StudioService = {
  id: string;
  title: string;
  tag: string;
  summary: string;
  bullets: readonly string[];
  quoteTopic: QuoteTopic;
};

/** Short service rows for the home page. */
export const STUDIO_SERVICES: readonly StudioService[] = [
  {
    id: "websites",
    title: "Websites",
    tag: "Phone first",
    summary:
      "A site that says who you are, what you do, and how to get in touch. Up to five pages, built for a phone first. No template.",
    bullets: [
      "Checked on a real handset before launch",
      "Contact form that lands in your inbox",
      "You own the domain, content and code",
    ],
    quoteTopic: "New website",
  },
  {
    id: "social",
    title: "Social media",
    tag: "Monthly",
    summary:
      "A plan, captions, and graphics so you are not making it up every Monday.",
    bullets: [
      "A month's calendar agreed before anything goes out",
      "Captions written to sound like you",
      "Posts scheduled to the accounts you already have",
    ],
    quoteTopic: "Social media",
  },
  {
    id: "content",
    title: "Content",
    tag: "One-off",
    summary:
      "A batch of posts or a one-off set. Written to sound like you, not like an agency.",
    bullets: [
      "Copy written from a brief, in your voice",
      "Graphics that match the brand you already have",
      "Files delivered ready to post",
    ],
    quoteTopic: "Content",
  },
  {
    id: "charities",
    title: "Charities and rescues",
    tag: "Free for registered charities",
    summary:
      "Registered charities get the same website, social and content packages free. Other rescues and community groups: get in touch and we will talk it through.",
    bullets: [
      "Clear paths for adopters, volunteers and donors",
      "Say you are registered when you get in touch",
      "Calm layouts anyone can find their way around",
    ],
    quoteTopic: "Charity or rescue",
  },
] as const;

export type ServiceGuide = {
  id: string;
  number: string;
  title: string;
  tag: string;
  quoteTopic: QuoteTopic;
  lead: string;
  included: readonly string[];
  notIncluded?: readonly string[];
  goodFit: string;
  notes: readonly string[];
  exampleHref?: string;
  exampleLabel?: string;
};

/** Full service guides for /services. Facts from the live services page, prices removed. */
export const SERVICE_GUIDES: readonly ServiceGuide[] = [
  {
    id: "websites",
    number: "01",
    title: "Websites",
    tag: "Phone-first builds",
    quoteTopic: "New website",
    lead: "A site that says who you are, what you do, and how to get in touch. Phone first. No template. Fixed quote agreed in writing before work starts.",
    included: PRICING_FEATURES,
    notIncluded: [
      "An online shop or card payments - that is a separate quote",
      "Pages beyond five - extra pages are quoted before I build them",
      "A photoshoot or a new logo",
      "Writing the whole site from nothing if you send no details",
      "Monthly posting (that is the social package)",
    ],
    goodFit:
      "A shop, a trades firm, a counter, a charity, or anyone who needs a proper site without an agency quote.",
    notes: [
      "About a week for a five-page site, once I have your text, photos, and contact details. If those arrive late, the date moves.",
      "One round of revisions after you see the first full draft. Send a list; I make the changes. Extra rounds are quoted first.",
    ],
    exampleHref: "/work/rvs-cold-brew",
    exampleLabel: "See RV's Cold Brew",
  },
  {
    id: "social",
    number: "02",
    title: "Social media",
    tag: "Monthly",
    quoteTopic: "Social media",
    lead: "A plan, captions, and graphics so you are not making it up every Monday. You know you should be posting and you do not have a free hour every week to do it.",
    included: SOCIAL_MEDIA_FEATURES,
    notIncluded: [
      "Paid ads or boosting posts",
      "Filming or a photoshoot",
      "Answering comments and DMs all day",
      "Buying followers or fake engagement",
    ],
    goodFit:
      "Small businesses and charities that want to post regularly without it eating their week.",
    notes: [
      "First month's calendar in the first week. Posting starts once you sign the calendar off.",
      "One round of notes on each month's batch - captions and graphics - before anything is scheduled.",
    ],
  },
  {
    id: "content",
    number: "03",
    title: "Content",
    tag: "One-off sets",
    quoteTopic: "Content",
    lead: "A batch of posts or a one-off set. Written to sound like you, not like an agency.",
    included: CONTENT_CREATION_FEATURES,
    notIncluded: [
      "Video production",
      "A photoshoot",
      "Ongoing posting and scheduling (that is the social package)",
      "A new brand identity",
    ],
    goodFit:
      "A product launch, a campaign, or a batch of posts without a monthly commitment.",
    notes: [
      "A small set in a few days. A bigger batch about a week, once the brief and any photos are in.",
      "One round included after you see the set. Extra rounds are quoted before I start them.",
    ],
  },
  {
    id: "care",
    number: "04",
    title: "Care plan",
    tag: "Optional, after launch",
    quoteTopic: "Care plan",
    lead: "Optional monthly cover after your site launches. You never have to take it - the site is yours either way - but it is there if you want me looking after updates and small changes.",
    included: [
      "Managed hosting and domain renewal reminders",
      "Routine security and dependency updates",
      "Small text, opening-hour, or photo updates when you send them over",
      "Direct contact with me by email or WhatsApp if something needs checked",
    ],
    goodFit:
      "Anyone who would rather send a quick message than log in and change things themselves.",
    notes: [
      "Entirely optional. I can also show you how to make the simple edits yourself.",
    ],
  },
  {
    id: "charities",
    number: "05",
    title: "Charities and rescues",
    tag: "Free for registered charities",
    quoteTopic: "Charity or rescue",
    lead: "Registered charities get the same packages free - website, social, and content. Say you are registered when you get in touch.",
    included: [
      "The same website, social and content packages as any paid job",
      "Clear paths for adopters, volunteers, donors and supporters",
      "Calm, phone-first layouts anyone can find their way around",
    ],
    goodFit:
      "Registered charities, animal rescues, sanctuaries and community groups across Northern Ireland.",
    notes: [
      "Not registered yet? Other animal rescues and community groups: get in touch and we will talk it through.",
    ],
    exampleHref: "/services/charities",
    exampleLabel: "How charity sites work",
  },
] as const;

/** How a project runs. Same four steps as the live site, written for the studio pages. */
export const STUDIO_RHYTHM = [
  {
    step: "01",
    title: "A short chat",
    body: "A call, an email or a WhatsApp. What you need, who it is for, and what done looks like.",
  },
  {
    step: "02",
    title: "A clear quote",
    body: "Scope, timeline and a fixed quote in writing. 50% upfront, 50% at launch.",
  },
  {
    step: "03",
    title: "Build and notes",
    body: "I make the thing. You see progress on a preview link, try it on your own phone, and send notes.",
  },
  {
    step: "04",
    title: "Launch and handover",
    body: "It goes live. I handle the technical setup, check it on a phone, and hand over a site that is yours.",
  },
] as const;

export const STUDIO_FAQ_ITEMS = FAQ_ITEMS;

/**
 * Local-services niches. Positioning only - no invented clients, reviews or results.
 * Concept demos exist for trades and a salon; HVAC and dentists are niches I quote for, not live client case studies.
 */
export const LOCAL_NICHES = [
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
