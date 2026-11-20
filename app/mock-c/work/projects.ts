// Facts-only project data for mock C case studies.
// Every line below is taken from the repo (lib/hire-data.ts, lib/content/redesign-draft.ts,
// app/(site)/work/shelterlink and app/(site)/work/assisi) or from Ryan's lane brief (links).
// Anything not documented is a `todo` string so the page shows a visible "TODO for Ryan" marker.

export type Fact = { text: string } | { todo: string };

export type Shot = { src: string; alt: string; caption: string; width: number; height: number };

export type MockCProject = {
  slug: string;
  name: string;
  type: Fact;
  role: Fact;
  year: Fact;
  status: Fact;
  summary: Fact;
  problem: Fact[];
  built: Fact[];
  features?: string[];
  stack: Fact;
  link: { href: string; label: string } | { todo: string };
  shots?: Shot[];
};

export const projects: MockCProject[] = [
  {
    slug: "shelterlink",
    name: "ShelterLink",
    type: { text: "Web app for a charity" },
    role: { text: "Design and development, solo" },
    year: { todo: "Confirm the year to show." },
    status: { text: "Ready for live use" },
    summary: { text: "Volunteer rotas, roles and an admin dashboard for Assisi Animal Sanctuary." },
    problem: [
      { text: "Assisi Animal Sanctuary runs on volunteers. Who was in, who was trained for which jobs and who was covering Sunday lived in paper rotas, phone calls and whoever happened to remember." },
      { text: "Staff spent time chasing people when that time should have gone to the animals. It worked for a smaller list. It did not work once the list got long." },
    ],
    built: [
      { text: "Volunteers sign up, fill in a profile and pick shifts they can do. Staff assign roles, plan the week from an admin dashboard and export records to CSV when they need them elsewhere." },
      { text: "The stack is plain on purpose, with no framework and no build step, so it still makes sense to whoever opens the folder next. Authentication, rate limiting and a strict content security policy are in, because a charity holding volunteer details cannot be casual about that." },
      { text: "ShelterLink started as an MSc dissertation project at Queen's University Belfast." },
    ],
    features: [
      "Volunteer registration and profiles",
      "Shift scheduling",
      "Role management",
      "Admin dashboards",
      "CSV exports",
      "Auth and security middleware",
    ],
    stack: { text: "Node.js, Express, MySQL, vanilla JavaScript, PicoCSS" },
    link: { href: "https://shelterlink.online", label: "shelterlink.online" },
    shots: [
      { src: "/images/work/shelterlink-admin-dashboard.png", alt: "ShelterLink admin dashboard with volunteer stats and application review", caption: "Admin dashboard", width: 1024, height: 640 },
      { src: "/images/work/shelterlink-browse-shifts.png", alt: "ShelterLink volunteer browse shifts page showing available opportunities", caption: "Browse shifts", width: 1024, height: 640 },
      { src: "/images/work/shelterlink.png", alt: "ShelterLink volunteer list and profile detail", caption: "Volunteer list and profile", width: 1024, height: 546 },
    ],
  },
  {
    slug: "assisi",
    name: "Assisi",
    type: { text: "Website and brand for a charity" },
    role: { todo: "Confirm the role line (design, build, brand)." },
    year: { todo: "Confirm the year to show." },
    status: { text: "Built, awaiting the sanctuary's sign-off" },
    summary: { text: "A rebuilt website and brand for Assisi Animal Sanctuary in Belfast." },
    problem: [
      { todo: "Describe what was wrong with the old site in the sanctuary's terms. The repo only records what was built." },
    ],
    built: [
      { text: "A full rebuild of the public website for Assisi Animal Sanctuary, with a new brand to go with it." },
      { text: "Laid out so adopters, donors and supporters can find animals and ways to help without hunting through menus." },
      { text: "Designed for phone and desktop from the start." },
    ],
    stack: { todo: "Confirm the stack. It is not recorded in the repo." },
    link: { href: "/work/assisi", label: "Case study on the live site" },
    // Screenshots and a public link go up once the sanctuary has approved them (per app/(site)/work/assisi).
  },
  {
    slug: "rondo",
    name: "Rondo",
    type: { todo: "Confirm the project type." },
    role: { todo: "Confirm the role." },
    year: { todo: "Confirm the year." },
    status: { todo: "Confirm the status." },
    summary: { todo: "Add a one-line description. Rondo is not described anywhere in this repo." },
    problem: [{ todo: "Describe the problem Rondo solves." }],
    built: [{ todo: "Describe what was built." }],
    stack: { todo: "Confirm the stack." },
    link: { todo: "Add Rondo's real public URL. None was found in this repo." },
  },
  {
    slug: "crosskennan",
    name: "Crosskennan",
    type: { todo: "Confirm the project type." },
    role: { todo: "Confirm the role." },
    year: { todo: "Confirm the year." },
    status: { todo: "Confirm the status." },
    summary: { todo: "Add a one-line description. Crosskennan is not described in this repo." },
    problem: [{ todo: "Describe the problem the site solves." }],
    built: [{ todo: "Describe what was built." }],
    stack: { todo: "Confirm the stack." },
    link: { href: "https://crosskennan.vercel.app", label: "crosskennan.vercel.app" },
  },
  {
    slug: "mgsl-hub",
    name: "MGSL hub",
    type: { todo: "Confirm the project type." },
    role: { todo: "Confirm the role." },
    year: { todo: "Confirm the year." },
    status: { todo: "Confirm the status to show publicly." },
    summary: { todo: "Add a one-line description. MGSL hub is not described in this repo." },
    problem: [{ todo: "Describe the problem the hub solves." }],
    built: [{ todo: "Describe what was built." }],
    stack: { todo: "Confirm the stack." },
    link: { href: "https://mgsl-hq-black.vercel.app", label: "mgsl-hq-black.vercel.app" },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
