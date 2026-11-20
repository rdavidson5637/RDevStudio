import type { MockBProject, QuoteTopic } from "@/components/mock-b/data";
import { MOCK_B_PROJECTS } from "@/components/mock-b/data";

export type MockBProjectSlug = MockBProject["id"];

export type CaseStudyTodoItem = {
  field: string;
  note: string;
};

export type MockBCaseStudy = {
  slug: MockBProjectSlug;
  number: string;
  clientOrContext: string;
  yearDisplay: string;
  yearIsTodo: boolean;
  statusHeadline: string;
  statusDetail: string;
  problemIntro?: string;
  problemParagraphs: readonly string[];
  problemTodo?: string;
  builtParagraphs: readonly string[];
  builtHighlights: readonly string[];
  builtTodo?: string;
  architectureNote?: {
    heading: string;
    paragraphs: readonly string[];
  };
  stackConfirmed: readonly string[];
  stackNote: string;
  stackTodo?: string;
  visualNote: string;
  outcomeConfirmed: string;
  todosForRyan: readonly CaseStudyTodoItem[];
  quoteTopic: QuoteTopic;
  repoCaseStudyHref?: string;
  repoCaseStudyLabel?: string;
  relatedProject?: {
    slug: MockBProjectSlug;
    name: string;
    relation: string;
  };
};

/**
 * Facts-only case study entries for /mock-b/work/[slug].
 * Every factual claim below comes strictly from existing repo files
 * (app/(site)/work/shelterlink/page.tsx, app/(site)/work/assisi/page.tsx,
 * lib/content/redesign-draft.ts, lib/content/products.ts, lib/constants.ts)
 * and Ryan's brief.
 *
 * Anything not confirmed in this repository is explicitly marked as a
 * "TODO for Ryan" instead of being invented.
 */
export const MOCK_B_CASE_STUDIES: Record<MockBProjectSlug, MockBCaseStudy> = {
  shelterlink: {
    slug: "shelterlink",
    number: "01",
    clientOrContext: "Assisi Animal Sanctuary (Charity)",
    yearDisplay: "2025-26",
    yearIsTodo: false,
    statusHeadline: "Ready for live use",
    statusDetail:
      "Live web application at shelterlink.online, ready for day-to-day volunteer coordination at Assisi Animal Sanctuary.",
    problemParagraphs: [
      "Assisi Animal Sanctuary runs on volunteers. Knowing who was in, who was trained for which jobs, and who was covering Sunday shifts lived across paper rotas, phone calls, and staff memory.",
      "Staff spent time chasing cover when that time needed to go to caring for the animals. Informal tracking worked when the volunteer list was small, but stopped keeping up once the list grew.",
    ],
    builtParagraphs: [
      "RDev Studio designed and built ShelterLink as a dedicated volunteer web application shaped around how the sanctuary actually runs its week. Volunteers register, complete a profile, and browse or pick shifts they are trained to cover.",
      "Staff manage roles, plan weekly cover from an admin dashboard, and export records to CSV whenever they need them outside the app. Authentication, rate limiting, and a strict Content Security Policy were built in from the start so volunteer records are handled responsibly.",
    ],
    builtHighlights: [
      "Volunteer registration and individual profiles",
      "Shift browsing and self-service shift scheduling",
      "Role management so trained volunteers match the right tasks",
      "Admin dashboard with volunteer overview and recent activity",
      "CSV exports for offline sanctuary admin",
      "Authentication, rate limiting, and strict Content Security Policy",
    ],
    architectureNote: {
      heading: "Why we kept the stack plain",
      paragraphs: [
        "The sanctuary does not have an in-house developer. Whatever RDev Studio handed over needed to still make sense years from now to whoever opens the codebase next.",
        "Node.js, Express, MySQL, vanilla JavaScript with no build step, and PicoCSS kept the front end light and readable so the effort went into the rota workflow rather than framework churn.",
      ],
    },
    stackConfirmed: ["Node.js", "Express", "MySQL", "Vanilla JS", "PicoCSS"],
    stackNote:
      "Confirmed in this repository: Node.js, Express, MySQL, Vanilla JavaScript (no build step), and PicoCSS with auth, rate limiting, and a strict CSP.",
    visualNote:
      "Real screenshots from public/images/work/ showing the admin dashboard, volunteer landing screen, and shift browser.",
    outcomeConfirmed:
      "Built for Assisi Animal Sanctuary and ready for live use at shelterlink.online. No usage metrics or client quotes are stored in this repository yet.",
    todosForRyan: [
      {
        field: "Client quote",
        note: "Add an approved quote from Assisi Animal Sanctuary once staff have used ShelterLink in regular weekly rotas.",
      },
      {
        field: "Verified results / metrics",
        note: "Add real volunteer numbers or admin time saved only after Assisi confirms live usage figures.",
      },
      {
        field: "Exact go-live date",
        note: "Confirm the specific live launch date if you want more detail than 2025-26.",
      },
    ],
    quoteTopic: "Web app / custom tool",
    repoCaseStudyHref: "/work/shelterlink",
    repoCaseStudyLabel: "View existing /work/shelterlink page",
    relatedProject: {
      slug: "assisi",
      name: "Assisi Animal Sanctuary",
      relation: "Also built for Assisi: the public website and brand rebuild.",
    },
  },

  assisi: {
    slug: "assisi",
    number: "02",
    clientOrContext: "Assisi Animal Sanctuary (Charity)",
    yearDisplay: "Date TBC",
    yearIsTodo: true,
    statusHeadline: "Built — awaiting sign-off",
    statusDetail:
      "The rebuilt public website and refreshed visual identity are built and held pending the sanctuary's final sign-off before public preview.",
    problemParagraphs: [
      "An animal sanctuary needs a calm, straightforward public website where adopters, donors, and supporters can find animals and ways to help without hunting through complicated menus.",
      "Because most supporters check in from a phone, the layout and brand needed to feel clear and effortless on small screens as well as desktop.",
    ],
    builtParagraphs: [
      "RDev Studio completed a full rebuild of the public website for Assisi Animal Sanctuary alongside a refreshed visual brand.",
      "Pages were structured from the start for phone and desktop so key paths — finding animals, supporting the sanctuary, and getting in touch — stay obvious without clutter.",
    ],
    builtHighlights: [
      "Full rebuild of the public website for Assisi Animal Sanctuary",
      "Refreshed visual brand created to sit alongside the new site",
      "Clear pathways for adopters, donors, and supporters without deep menus",
      "Designed phone-first and checked for both mobile and desktop reading",
    ],
    stackConfirmed: ["Website rebuild", "Brand identity", "Phone-first"],
    stackNote:
      "Scope items above are confirmed in app/(site)/work/assisi/page.tsx. The exact technical stack (framework, CMS, hosting) is not listed in this repository yet.",
    stackTodo:
      "TODO for Ryan: Confirm the exact frameworks, hosting, and tools used on the Assisi rebuild.",
    visualNote:
      "Illustrative studio layout mockup — real screenshots and the live link are intentionally held until Assisi Animal Sanctuary signs them off.",
    outcomeConfirmed:
      "Built and awaiting Assisi Animal Sanctuary's sign-off. Public screenshots, live URL, and post-launch results are intentionally held until approved.",
    todosForRyan: [
      {
        field: "Public screenshots & live URL",
        note: "Swap out the sign-off placeholder and add the live URL once Assisi Animal Sanctuary approves public previews.",
      },
      {
        field: "Technical stack & completion date",
        note: "Confirm the exact stack tags and build/launch year (not recorded in app/(site)/work/assisi/page.tsx).",
      },
      {
        field: "Client quote & outcome",
        note: "Add an approved quote or verified launch outcome from the sanctuary after go-live.",
      },
    ],
    quoteTopic: "Charity / rescue build",
    repoCaseStudyHref: "/work/assisi",
    repoCaseStudyLabel: "View existing /work/assisi page",
    relatedProject: {
      slug: "shelterlink",
      name: "ShelterLink",
      relation: "Also built for Assisi: the volunteer rota and shift scheduling web app.",
    },
  },

  crosskennan: {
    slug: "crosskennan",
    number: "03",
    clientOrContext: "Crosskennan (Charity / local organisation)",
    yearDisplay: "Date TBC",
    yearIsTodo: true,
    statusHeadline: "Live preview online",
    statusDetail:
      "Hosted preview is live at crosskennan.vercel.app. Detailed case-study copy is awaiting confirmation from Ryan.",
    problemParagraphs: [],
    problemTodo:
      "TODO for Ryan: Add the confirmed problem statement and brief for Crosskennan (what needed fixing on their existing web presence, who visits the site, and what goals mattered most). None of these details are stored in this repository yet.",
    builtParagraphs: [
      "A web build for Crosskennan, currently published as a live preview at crosskennan.vercel.app.",
    ],
    builtHighlights: [
      "Hosted live preview accessible at crosskennan.vercel.app",
    ],
    builtTodo:
      "TODO for Ryan: List the specific pages, content structure, accessibility work, and features built for Crosskennan once confirmed.",
    stackConfirmed: ["Vercel"],
    stackNote:
      "Only the live Vercel preview host (crosskennan.vercel.app) is confirmed from Ryan's brief. Framework and styling stack details are not in this repository.",
    stackTodo:
      "TODO for Ryan: Confirm the exact tech stack (for example Next.js, Tailwind, forms, or CMS) used for Crosskennan.",
    visualNote:
      "Studio CSS/SVG wireframe preview — no Crosskennan screenshots exist in public/ yet.",
    outcomeConfirmed:
      "Live preview is reachable at crosskennan.vercel.app. Launch status, adoption outcomes, and client feedback are not stored in this repository.",
    todosForRyan: [
      {
        field: "Problem & project brief",
        note: "Write 2-3 confirmed sentences explaining what Crosskennan needed and how the site helps visitors.",
      },
      {
        field: "What was built & tech stack",
        note: "Confirm the pages/features delivered and exact technologies used beyond Vercel hosting.",
      },
      {
        field: "Build year / launch date",
        note: "Confirm the year or launch milestone to replace 'Date TBC'.",
      },
      {
        field: "Screenshots, quote & results",
        note: "Add approved desktop/mobile screenshots from crosskennan.vercel.app plus any confirmed quote or real result.",
      },
    ],
    quoteTopic: "Charity / rescue build",
  },

  rondo: {
    slug: "rondo",
    number: "04",
    clientOrContext: "RDev Studio product build",
    yearDisplay: "Date TBC",
    yearIsTodo: true,
    statusHeadline: "Studio build — live URL TODO",
    statusDetail:
      "An RDev Studio web application. No live URL or public write-up is stored in this repository yet.",
    problemParagraphs: [],
    problemTodo:
      "TODO for Ryan: Add the confirmed problem statement for Rondo — who it is for and the specific everyday headache it solves. No Rondo copy or domain facts are stored in this repository.",
    builtParagraphs: [
      "Rondo is an in-house web application built by RDev Studio. Because its repository details and live link are not in this website repo, only confirmed placeholder notes are shown here so nothing is guessed or invented.",
    ],
    builtHighlights: [
      "In-house RDev Studio web application (feature list awaiting studio confirmation)",
    ],
    builtTodo:
      "TODO for Ryan: Add the confirmed feature breakdown and public walkthrough notes for Rondo once ready to publish.",
    stackConfirmed: ["RDev Studio web app"],
    stackNote:
      "No technical stack details for Rondo are stored in this repository yet.",
    stackTodo:
      "TODO for Ryan: Confirm the exact Rondo tech stack (framework, database, hosting, auth) to show here.",
    visualNote:
      "Studio CSS/SVG placeholder graphic — no Rondo screenshots exist in public/ yet.",
    outcomeConfirmed:
      "No public URL, launch date, usage metrics, or quotes for Rondo exist in this repository yet.",
    todosForRyan: [
      {
        field: "Real live URL",
        note: "Add the real public Rondo URL (currently links inside Mock B to /mock-b/work/rondo because no URL exists in this repo).",
      },
      {
        field: "Problem & what was built",
        note: "Confirm the plain-English overview, audience, and core features (keeping any specialist claims strictly verified by Ryan).",
      },
      {
        field: "Tech stack & build date",
        note: "Confirm the stack tags and build/release year to replace 'Date TBC'.",
      },
      {
        field: "Screenshots, feedback & outcomes",
        note: "Add approved screenshots and any confirmed outcomes once Rondo is ready for public showcase.",
      },
    ],
    quoteTopic: "Web app / custom tool",
  },

  "mgsl-hub": {
    slug: "mgsl-hub",
    number: "05",
    clientOrContext: "MGSL Hub (Web application)",
    yearDisplay: "Date TBC",
    yearIsTodo: true,
    statusHeadline: "Live preview online",
    statusDetail:
      "Hosted preview is live at mgsl-hq-black.vercel.app. Detailed feature notes and stack details await confirmation from Ryan.",
    problemParagraphs: [],
    problemTodo:
      "TODO for Ryan: Add the confirmed problem statement explaining who uses MGSL Hub and what problem it was built to solve. No project notes exist in this repository yet.",
    builtParagraphs: [
      "A dedicated web hub built by RDev Studio and hosted online as a preview at mgsl-hq-black.vercel.app.",
    ],
    builtHighlights: [
      "Hosted web hub preview live at mgsl-hq-black.vercel.app",
    ],
    builtTodo:
      "TODO for Ryan: Confirm the key screens, workflows, and features built inside MGSL Hub.",
    stackConfirmed: ["Vercel"],
    stackNote:
      "Only the Vercel preview URL (mgsl-hq-black.vercel.app) is confirmed from Ryan's brief. Note: do not query or depend on paused backend services.",
    stackTodo:
      "TODO for Ryan: Confirm the exact tech stack and current backend status you want listed publicly for MGSL Hub.",
    visualNote:
      "Studio CSS/SVG wireframe preview — no MGSL Hub screenshots exist in public/ yet.",
    outcomeConfirmed:
      "Live preview is reachable at mgsl-hq-black.vercel.app. No metrics, quotes, or dates are stored in this repository.",
    todosForRyan: [
      {
        field: "Problem & audience",
        note: "Confirm who MGSL Hub serves and what day-to-day problem it solves.",
      },
      {
        field: "What was built & tech stack",
        note: "Confirm the features and stack tags beyond Vercel hosting (without exposing private infrastructure IDs).",
      },
      {
        field: "Build year / status note",
        note: "Confirm the year/date to replace 'Date TBC' and whether the preview status should stay as listed.",
      },
      {
        field: "Screenshots, quote & outcome",
        note: "Add approved screenshots from mgsl-hq-black.vercel.app plus any confirmed quote or real result.",
      },
    ],
    quoteTopic: "Web app / custom tool",
  },
};

export const MOCK_B_CASE_STUDY_SLUGS: readonly MockBProjectSlug[] =
  MOCK_B_PROJECTS.map((project) => project.id);

export function getCaseStudyEntry(slug: string): {
  project: MockBProject;
  study: MockBCaseStudy;
  index: number;
} | null {
  const index = MOCK_B_PROJECTS.findIndex((project) => project.id === slug);
  if (index === -1) return null;
  const project = MOCK_B_PROJECTS[index];
  return {
    project,
    study: MOCK_B_CASE_STUDIES[project.id],
    index,
  };
}

export function getAdjacentProjects(index: number): {
  previous: MockBProject;
  next: MockBProject;
} {
  const count = MOCK_B_PROJECTS.length;
  const previous = MOCK_B_PROJECTS[(index - 1 + count) % count];
  const next = MOCK_B_PROJECTS[(index + 1) % count];
  return { previous, next };
}
