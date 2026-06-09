// CV PDF lives at public/Ryan_Davidson_CV.pdf — replace with updated version as needed.
export const HIRE_CV_PATH = "/Ryan_Davidson_CV.pdf";

export const HIRE_CHAOS_TRANSITION = "Still here? Fine. Here's the rest.";

export const HIRE_MILESTONES_TITLE = "Milestones";

export const HIRE_TAGLINE =
  "Software Developer & Product Designer";

export const HIRE_PROFILE =
  "Software developer graduating Summer 2026 with an MSc in Software Development — and a genuine interest in product design, particularly where technology meets real human behaviour. I've built ShelterLink in close collaboration with Assisi Animal Sanctuary, making every UX decision myself. I also run RDev Studio, serving local NI businesses. I work extensively with AI tools including Cursor and Claude to stay focused on what actually matters: solving the right problem well.";

export const HIRE_STATS = [
  "Graduating Summer 2026 — MSc, Queen's",
  "BSc Forensic Science (LJMU)",
  "Full-stack product builder",
  "ShelterLink dissertation project",
  "RDev Studio founder",
] as const;

export const HIRE_ABOUT_POINTS = [
  "Completing MSc while working full time — graduating Summer 2026",
  "End-to-end UX and product ownership",
  "Real client work through RDev Studio",
  "Strong communication under pressure",
  "Evidence-based problem solving",
  "AI-assisted development in production workflows",
] as const;

export const HIRE_QUALIFICATIONS = [
  {
    year: "2024 — 2026",
    title: "MSc Software Development",
    institution: "Queen's University Belfast",
    detail:
      "Graduating Summer 2026. Modules in relational databases, web development, cloud computing, Agile, and data analytics. Individual project: ShelterLink — built end-to-end as a real-world product for a Belfast charity.",
  },
  {
    year: "2020 — 2024",
    title: "BSc Forensic Science",
    institution: "Liverpool John Moores University",
    detail:
      "Graduated June 2024. Analytical, evidence-based degree developing rigorous problem-solving and attention to detail.",
  },
] as const;

export const HIRE_EXPERIENCE = [
  {
    title: "Admin Officer — Civil Service (DWP)",
    period: "August 2025 — Present",
    summary:
      "Manage correspondence and communications across a busy department, balancing accuracy, sensitivity, and speed. Handle sensitive personal data with discretion and support process improvement.",
    skills: [
      "Communication",
      "Data protection",
      "Process improvement",
      "Working under pressure",
    ],
  },
  {
    title: "Tesco Colleague",
    period: "October 2024 — February 2025",
    summary:
      "Customer-facing role requiring clear communication and problem-solving under pressure.",
    skills: ["Customer service", "Teamwork", "Problem solving"],
  },
  {
    title: "Warehouse Operative — Amazon",
    period: "August 2021 — October 2021",
    summary:
      "Picked, packed, and processed customer orders accurately and efficiently at pace.",
    skills: ["Accuracy", "Teamwork", "Operational targets"],
  },
  {
    title: "Poll Clerk — Liverpool City Council",
    period: "May 2021",
    summary:
      "Verified voter identification, managed check-in, and guided members of the public.",
    skills: ["Public-facing", "Attention to detail", "Guidance"],
  },
  {
    title: "Dot Com Department — Tesco Carrickfergus",
    period: "March 2020 — September 2020",
    summary:
      "Processed online orders, managed inventory, and coordinated with delivery teams.",
    skills: ["Operations", "Inventory", "Coordination"],
  },
] as const;

export const HIRE_PROJECTS = [
  {
    id: "assisi",
    tag: "ShelterLink — University Dissertation",
    title: "Assisi Volunteering Platform",
    description:
      "A volunteer management platform with real-world impact. Shift scheduling, role management, and an admin dashboard built for Assisi Animal Sanctuary.",
    highlight: "Dissertation project",
    highlights: ["Real-world impact", "Volunteer management", "Platform development"],
    image: "/images/work/shelterlink.png",
    href: "https://github.com/rdavidson19/ShelterLink",
    external: true,
    github: "https://github.com/rdavidson19/ShelterLink",
  },
  {
    id: "rvs",
    tag: "RDev Studio client — Belfast",
    title: "RV's Cold Brew",
    description:
      "Confirmed RDev Studio client. Website built and social media management ongoing for a Belfast cold brew coffee business.",
    highlight: "Client work",
    highlights: ["Business website", "Design & implementation", "Social media"],
    image: "/images/work/rvs-coldbrew.png",
    imageFit: "contain" as const,
    imageBg: "#0a1a1f",
    href: "https://rvscoldbrew.vercel.app",
    external: true,
  },
  {
    id: "rdev",
    tag: "Personal Brand & Portfolio",
    title: "RDev Studio",
    description:
      "One-person studio targeting NI small businesses with website design/build, social media, and content creation. Home to Champions Draft and ongoing experiments.",
    highlight: "Freelance studio",
    highlights: ["NI small businesses", "Websites & content"],
    image: "/images/logo/rdevstudio-logo.png",
    imageFit: "contain" as const,
    imageBg: "#0f172a",
    href: "/",
    external: false,
  },
  {
    id: "champions-draft",
    tag: "Personal Project",
    title: "Champions Draft",
    description:
      "A football draft game where players pick squads from a pool of international players and compete across a tournament. Built and shipped to real users.",
    highlight: "Live & played",
    highlights: ["Football", "Tournament modes", "Free to play"],
    href: "https://rdevstudio.co.uk/champions-draft",
    external: true,
    links: [
      {
        label: "Play",
        href: "https://rdevstudio.co.uk/champions-draft",
        external: true,
      },
    ],
    github: "https://github.com/rdavidson5637/Champions-draft",
  },
  {
    id: "rugby-draft",
    tag: "Personal Project",
    title: "Rugby Draft",
    description:
      "A rugby-specific draft game extending the Champions Draft concept — World Cup, Six Nations, and Champions Cup modes. 15 positions, full stats system, bonus point scoring.",
    highlight: "Live & played",
    highlights: ["World Cup", "Six Nations", "Champions Cup"],
    links: [
      { label: "Play", href: "/rugby-draft", external: false },
    ],
    github: "https://github.com/rdavidson5637",
  },
] as const;

export const HIRE_SKILLS = {
  "Product & Design": [
    "UX design",
    "User research",
    "Onboarding flows",
    "Figma",
    "Information architecture",
  ],
  "AI Tooling": ["Cursor", "Claude"],
  Frontend: ["HTML5", "CSS3", "JavaScript", "React", "Responsive design"],
  Backend: ["Node.js", "Express", "REST APIs", "MySQL", "Session management"],
  Other: ["Git", "Agile", "AWS", "Docker", "Python", "SQL"],
} as const;

export const HIRE_TESTIMONIALS = [
  {
    quote: "",
    author: "Client",
    role: "Business website project",
    real: true,
    pending: true,
  },
  {
    quote: "A clever cookie and good with all that tech stuff.",
    author: "Nanny",
    role: "Family reference",
    real: false,
  },
  {
    quote:
      "10/10 ear scratches. Would recommend. Has treats.",
    author: "Rudi",
    role: "Chief Morale Officer",
    real: false,
    rudi: true,
  },
  {
    quote: "A great ponderer.",
    author: "Plato",
    role: "Possibly",
    real: false,
  },
  {
    quote:
      "Stop emailing me. I don't know who you are and I refuse to give you a testimonial.",
    author: "Mark Zuckerberg",
    role: "Definitely not verified",
    real: false,
  },
] as const;

export const ACHIEVEMENTS = [
  {
    id: "qualifications",
    title: "Read the Qualifications",
    description: "MSc and everything.",
    sectionId: "qualifications",
  },
  {
    id: "experience",
    title: "Survived the Work Experience Section",
    description: "Yes, there was a Tesco stint. It builds character.",
    sectionId: "experience",
  },
  {
    id: "full-cv",
    title: "Actually Read the Entire CV",
    description: "You are now legally obligated to consider hiring Ryan.",
    sectionId: "testimonials",
  },
  {
    id: "the-end",
    title: "You Made It To The End",
    description: "A truly historic moment.",
    sectionId: "final-cta",
  },
] as const;

export const HIRE_STRENGTHS = [
  "Good communicator",
  "Creative",
  "Problem solver",
  "Good with clients",
] as const;

export const HIRE_WEAKNESSES = [
  { text: "Makes spelling misteaks", code: "WARN_SPELL_CHECK" },
  { text: "Occasionally talks too much", code: "WARN_VERBOSITY" },
  { text: "Starts new projects before finishing old ones", code: "WARN_SCOPE_CREEP" },
  { text: "Can spend excessive time perfecting tiny details", code: "WARN_PERFECTIONISM" },
  {
    id: "cat-warning",
    code: "FELINE_DISTRACTION_DETECTED",
    description:
      "Occasionally distracted by cats. Trigger unknown. Frequency: unpredictable.",
  },
] as const;

export const HIRE_FINAL_REASONS = [
  "Built real projects",
  "Graduating Summer 2026 while working full time",
  "Works well with clients",
  "Solves problems",
  "Apparently dog approved",
] as const;

export const RUDI_ACHIEVEMENTS = [
  "Chief Morale Officer",
  "Professional Ball Chaser",
  "Approved All Pull Requests",
  "10/10 Good Boy Energy",
] as const;
