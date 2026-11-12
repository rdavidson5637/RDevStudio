import type { FormationConstraints } from "@/lib/analyser/draft/optimise";
import type { ScoringSettings } from "@/lib/analyser/draft/projection";

export type Pos = 1 | 2 | 3 | 4;

export type Chip = {
  event: number;
  opponent: string;
  side: "H" | "A";
  fdr: number;
  provisional: boolean;
  open: boolean;
};

export type Cell = { event: number; chips: Chip[] };

export type Player = {
  id: number;
  name: string;
  teamId: number;
  team: string;
  teamCode: number;
  position: Pos;
  status: string;
  news: string | null;
  availability: number;
  band: "green" | "amber" | "red";
  summary: string;
  parts: { label: string; value: string }[];
  returnInDays: number | null;
  form: number | null;
  pointsPerGame: number | null;
  minutesLast4: number[];
  defconHits: number;
  defconOf: number;
  xp1: number;
  xp3: number;
  xp6: number;
  xp1Fit: number;
  draftRank: number | null;
  totalPoints: number;
  selected: number | null;
  penaltiesOrder: number | null;
  cornersOrder: number | null;
  fkOrder: number | null;
  epNext: number | null;
  pStart: number;
  confidence: "high" | "medium" | "low";
  xpParts: { label: string; value: number }[];
  history: { text: string; at: string }[];
  reports: {
    signal: string;
    quote: string | null;
    sourceName: string | null;
    sourceUrl: string | null;
    at: string | null;
  }[];
  moves: number;
  livePoints: number | null;
  liveMinutes: number | null;
  provisionalBonus: number;
  cells: Cell[];
  currentOpen: boolean;
  ownerId: number | null;
};

export type Slot = Player & { pick: number };

export type Side = {
  entryId: number;
  name: string;
  manager: string;
  waiver: number | null;
  rank: number | null;
  lastRank: number | null;
  total: number;
  eventPoints: number;
  squad: Slot[];
  projected: number;
  live: number;
  subs: string[];
  thin: string[];
  reds: number;
};

export type Move = { add: Player; drop: Slot; net: number; coverRisk: boolean };

export type PostRow = {
  id: number;
  name: string;
  owner: string;
  draftRank: number;
  points: number;
  value: number;
};

export type Analyser = {
  leagueName: string;
  classic: boolean;
  updatedAt: string | null;
  current: { id: number; name: string; deadline: string; finished: boolean };
  next: { id: number; name: string; deadline: string; waivers: string | null } | null;
  decisionEventId: number;
  deadlinePassed: boolean;
  horizon: number[];
  headline: string;
  standfirst: string;
  primary: { href: string; label: string };
  me: Side;
  table: Side[];
  leaderGap: number;
  flagged: Slot[];
  optimised: {
    formation: string;
    total: number;
    gain: number;
    close: boolean;
    risks: string[];
    xi: { id: number; name: string; team: string; position: Pos; xp: number; availability: number }[];
    swaps: { out: string; in: string; gain: number }[];
  };
  moves: Move[];
  gapPlayers: Player[];
  rising: Player[];
  freeAgents: Player[];
  timeline: { id: number; name: string; text: string; at: string }[];
  reported: {
    id: number;
    name: string;
    signal: string;
    quote: string | null;
    sourceName: string | null;
    sourceUrl: string | null;
    at: string | null;
  }[];
  season: { entryId: number; name: string; titlePct: number; topFourPct: number; projectedTotal: number; meanRank: number }[];
  seasonWeeks: number;
  postBest: PostRow[];
  postWorst: PostRow[];
  tradePool: { id: number; name: string; entryId: number; owner: string; position: Pos; xp6: number }[];
};

export type Bundle = {
  leagueName: string;
  scoring: string;
  updatedAt: string | null;
  myEntryId: number;
  events: {
    id: number;
    name: string;
    deadline: string;
    finished: boolean;
    current: boolean;
    next: boolean;
    waivers: string | null;
  }[];
  teams: { id: number; code: number; name: string; short: string }[];
  players: {
    id: number;
    teamId: number;
    name: string;
    position: Pos;
    status: string;
    news: string | null;
    newsAdded: string | null;
    newsReturn: string | null;
    chanceThis: number | null;
    chanceNext: number | null;
    draftRank: number | null;
    totalPoints: number;
    form: number | null;
    ppg: number | null;
    epNext: number | null;
    minutes: number;
    starts: number;
    yellows: number;
    reds: number;
    bps: number;
    xg90: number | null;
    xa90: number | null;
    defcon90: number | null;
    xgc90: number | null;
    selected: number | null;
    penaltiesOrder: number | null;
    cornersOrder: number | null;
    fkOrder: number | null;
  }[];
  fixtures: {
    event: number | null;
    kickoff: string | null;
    teamH: number;
    teamA: number;
    fdrH: number;
    fdrA: number;
    started: boolean;
    finished: boolean;
  }[];
  entries: {
    entryId: number;
    name: string;
    manager: string;
    waiver: number | null;
    rank: number | null;
    lastRank: number | null;
    total: number;
    eventPoints: number;
  }[];
  picks: { entryId: number; playerId: number; position: number }[];
  ownership: { playerId: number; ownerId: number | null }[];
  live: { event: number; playerId: number; points: number; minutes: number; bps: number; bonus: number; defcon: number }[];
  transactions: { elementIn: number | null; elementOut: number | null }[];
  snapshots: {
    playerId: number;
    at: string;
    status: string | null;
    news: string | null;
    chanceThis: number | null;
    chanceNext: number | null;
    score: number | null;
  }[];
  news: {
    playerId: number;
    signal: string;
    confidence: number | null;
    quote: string | null;
    sourceName: string | null;
    sourceUrl: string | null;
    at: string | null;
  }[];
  rules: Partial<ScoringSettings> | null;
  squadRules: Partial<FormationConstraints> | null;
};
