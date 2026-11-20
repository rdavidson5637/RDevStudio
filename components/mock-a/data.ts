import { WHATSAPP_URL } from "@/lib/constants";

/**
 * MOCK A content. Facts only, taken from lib/constants.ts, lib/content/redesign-draft.ts,
 * app/(site)/work/** and the lane brief. Anything not in those sources is left blank
 * and marked TODO for Ryan. Agent-written and unverified.
 */

export const MOCK_A_BASE = "/mock-a";

/** Prefilled WhatsApp message. Number comes only from WHATSAPP_URL in lib/constants.ts. */
export const MOCK_A_WHATSAPP_HREF = `${WHATSAPP_URL}?text=${encodeURIComponent(
  "Hi RDev Studio, I have a project I want to talk about.",
)}`;

export const MOCK_A_QUOTE_HREF = `${MOCK_A_BASE}#quote`;

export type MockArt =
  | { kind: "image"; src: string; alt: string; secondary?: { src: string; alt: string } }
  | { kind: "illustration"; tone: "lime" | "blue" | "white"; layout: "dashboard" | "site" | "hub" | "app" };

export type MockProject = {
  slug: string;
  name: string;
  type: string;
  /** Only where the repo states it. */
  year?: string;
  status?: string;
  /** One-line description from the repo. Undefined means Ryan still has to supply it. */
  summary?: string;
  facts: readonly string[];
  stack?: readonly string[];
  link?: { href: string; label: string; external: boolean };
  caseStudy?: { href: string; label: string };
  art: MockArt;
  todo?: string;
};

export const MOCK_A_PROJECTS: readonly MockProject[] = [
  {
    slug: "shelterlink",
    name: "ShelterLink",
    type: "Web app",
    year: "2025-26",
    status: "Ready for live use",
    summary: "Volunteer rotas, roles, and an admin dashboard for Assisi Animal Sanctuary.",
    facts: [
      "Volunteer registration and profiles",
      "Shift scheduling",
      "Role management",
      "Admin dashboards",
      "CSV exports",
      "Auth and security middleware",
    ],
    stack: ["Node.js", "Express", "MySQL", "Vanilla JS", "PicoCSS"],
    link: { href: "https://shelterlink.online", label: "shelterlink.online", external: true },
    caseStudy: { href: "/work/shelterlink", label: "Read the case study" },
    art: {
      kind: "image",
      src: "/images/work/shelterlink-admin-dashboard.png",
      alt: "ShelterLink admin dashboard with volunteer metrics and recent activity",
      secondary: {
        src: "/images/work/shelterlink-browse-shifts.png",
        alt: "ShelterLink volunteer browse shifts page showing available opportunities",
      },
    },
  },
  {
    slug: "assisi",
    name: "Assisi",
    type: "Website and brand",
    status: "Built, waiting on the sanctuary's sign-off",
    summary: "A full rebuild of the public website for Assisi Animal Sanctuary, and a new brand to go with it.",
    facts: [
      "A full rebuild of the public website",
      "A new brand to go with it",
      "Laid out so adopters, donors and supporters can find animals and ways to help",
      "Designed for phone and desktop from the start",
    ],
    caseStudy: { href: "/work/assisi", label: "Read the case study" },
    art: { kind: "illustration", tone: "white", layout: "site" },
    todo: "Screenshots go up only after the sanctuary signs off. Illustration used until then.",
  },
  {
    slug: "rondo",
    name: "Rondo",
    type: "Studio product",
    facts: [],
    // TODO(Ryan): no public Rondo link exists in the repo. Add the real URL and a one-line description.
    link: { href: `${MOCK_A_BASE}/work#rondo`, label: "Link to come", external: false },
    art: { kind: "illustration", tone: "lime", layout: "app" },
    todo: "Needs a real link, a one-line description and a year from Ryan.",
  },
  {
    slug: "crosskennan",
    name: "Crosskennan",
    type: "Build",
    facts: [],
    link: { href: "https://crosskennan.vercel.app", label: "crosskennan.vercel.app", external: true },
    art: { kind: "illustration", tone: "blue", layout: "site" },
    // TODO(Ryan): what Crosskennan is, who it is for, and the year. Nothing in the repo describes it.
    todo: "Needs a one-line description, type and year from Ryan.",
  },
  {
    slug: "mgsl-hub",
    name: "MGSL hub",
    type: "Hub",
    facts: [],
    link: { href: "https://mgsl-hq-black.vercel.app", label: "mgsl-hq-black.vercel.app", external: true },
    art: { kind: "illustration", tone: "white", layout: "hub" },
    // TODO(Ryan): one-line description and year. Nothing in the repo describes it.
    todo: "Needs a one-line description and year from Ryan.",
  },
] as const;

export const MOCK_A_SERVICES = [
  {
    number: "01",
    title: "Websites",
    body: "A site that says who you are, what you do, and how to get in touch. Built for a phone first and checked on a real handset before launch.",
    points: ["Contact form to your inbox", "Page titles and descriptions", "Hosting set up on Vercel"],
  },
  {
    number: "02",
    title: "Web apps",
    body: "Logins, rotas, dashboards and exports for the jobs a spreadsheet stopped handling. ShelterLink is one.",
    points: ["Accounts and roles", "Admin dashboards", "CSV exports"],
  },
  {
    number: "03",
    title: "Google Business Profile",
    body: "Help setting up or tidying the profile people see on Maps and in search before they ever reach your site.",
    points: ["Set-up or clean-up", "Hours, photos and links", "Matches your website"],
  },
  {
    number: "04",
    title: "Charity and small-business builds",
    body: "Sites and tools for rescues, charities and local firms. Registered charity? Say so when you get in touch.",
    points: ["Assisi and ShelterLink", "Plain English copy", "You own the domain and code"],
  },
] as const;

export const MOCK_A_STEPS = [
  { number: "01", title: "Talk", body: "A short call, email or WhatsApp. What you need, who it is for, and what done looks like." },
  { number: "02", title: "Quote", body: "A written quote with scope and timeline before anything starts." },
  { number: "03", title: "Build", body: "You see progress and give notes before anything goes live." },
  { number: "04", title: "Launch", body: "The studio handles the technical set-up and checks it on a phone." },
] as const;

export const MOCK_A_ENQUIRY_OPTIONS = [
  "Website",
  "Web app",
  "Google Business Profile",
  "Charity build",
  "Something else",
] as const;
