/**
 * Engineering write-ups ("How it's built") for the live products.
 * One file per product in this folder, rendered by app/(site)/build/[slug].
 *
 * Rules for the content:
 * - Everything must be true of the code in this repo. No invented numbers,
 *   users, latencies or quotes. If a number is not known, leave it out.
 * - First person, plain NI English, active voice, no em dashes.
 */

export type BuildLink = {
  label: string;
  href: string;
};

export type BuildFact = {
  label: string;
  value: string;
};

export type BuildPart = {
  /** e.g. "Next.js route handlers", "Pusher channel", "Supabase Postgres" */
  name: string;
  /** One sentence on what it does in this system. */
  role: string;
};

export type BuildFlowStep = {
  from: string;
  to: string;
  /** What happens on this hop, e.g. "POST /api/quiz/buzz with playerId". */
  action: string;
};

export type BuildDecision = {
  title: string;
  context: string;
  decision: string;
  alternatives: string;
  consequences: string;
};

export type BuildIncident = {
  title: string;
  symptom: string;
  cause: string;
  fix: string;
  /** Short commit sha from this repo, if there is one. */
  commit?: string;
};

export type BuildCodeLink = {
  label: string;
  /** Repo-relative path, e.g. "lib/quiz/engine.ts" */
  path: string;
};

export type BuildNote = {
  slug: string;
  title: string;
  /** Short label, e.g. "Real-time multiplayer" */
  kicker: string;
  /** One sentence: what it is and who uses it. */
  summary: string;
  stack: string[];
  /** Play / open links. Internal paths start with "/". */
  links: BuildLink[];
  /** 3-5 short facts, e.g. { label: "Status", value: "Live" }. */
  facts: BuildFact[];
  tldr: {
    problem: string;
    built: string;
    hardPart: string;
  };
  /** 1-3 short paragraphs: users, constraints, the setting. */
  context: string[];
  goals: string[];
  nonGoals: string[];
  architecture: {
    summary: string;
    parts: BuildPart[];
    flowTitle: string;
    flow: BuildFlowStep[];
  };
  decisions: BuildDecision[];
  incidents: BuildIncident[];
  testing: string[];
  /** Only for products that call an AI model at runtime. */
  ai?: string[];
  /** Known gaps and next steps, stated as facts about the code. */
  gaps: string[];
  codeLinks: BuildCodeLink[];
};
