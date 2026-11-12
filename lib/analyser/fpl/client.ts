export class FplApiError extends Error {
  constructor(
    message: string,
    readonly endpoint: string,
    readonly status: number | null,
    readonly attempts: number,
  ) {
    super(message);
    this.name = "FplApiError";
  }
}

const DRAFT = "https://draft.premierleague.com/api";
const MAIN = "https://fantasy.premierleague.com/api";
const UA = "RDevDraftAnalyser/1.0 (+https://rdevstudio.co.uk)";

type CacheEntry = { at: number; value: unknown };
const memo = new Map<string, CacheEntry>();

async function fetchJson<T>(url: string): Promise<T> {
  const hit = memo.get(url);
  if (hit && Date.now() - hit.at < 15_000) return hit.value as T;

  let lastError: unknown;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": UA, Accept: "application/json" },
        signal: controller.signal,
        cache: "no-store",
      });
      if (response.status >= 400 && response.status < 500) {
        throw new FplApiError(`FPL responded ${response.status} for ${url}`, url, response.status, attempt);
      }
      if (!response.ok) {
        throw new FplApiError(`FPL responded ${response.status} for ${url}`, url, response.status, attempt);
      }
      const value = (await response.json()) as T;
      memo.set(url, { at: Date.now(), value });
      return value;
    } catch (error) {
      lastError = error;
      if (error instanceof FplApiError && error.status != null && error.status < 500) throw error;
      if (attempt === 3) break;
      await new Promise((resolve) => setTimeout(resolve, 250 * 2 ** (attempt - 1)));
    } finally {
      clearTimeout(timer);
    }
  }
  if (lastError instanceof FplApiError) throw lastError;
  throw new FplApiError(`FPL request failed for ${url}`, url, null, 3);
}

export function getDraftBootstrap() {
  return fetchJson<DraftBootstrap>(`${DRAFT}/bootstrap-static`);
}
export function getGameState() {
  return fetchJson<GameState>(`${DRAFT}/game`);
}
export function getLeagueDetails(leagueId: number) {
  return fetchJson<LeagueDetails>(`${DRAFT}/league/${leagueId}/details`);
}
export function getElementStatus(leagueId: number) {
  return fetchJson<{ element_status: ElementStatus[] }>(`${DRAFT}/league/${leagueId}/element-status`);
}
export function getTransactions(leagueId: number) {
  return fetchJson<Transaction[]>(`${DRAFT}/draft/league/${leagueId}/transactions`);
}
export function getEntryPicks(entryId: number, event: number) {
  return fetchJson<{ picks: PickRow[] }>(`${DRAFT}/entry/${entryId}/event/${event}`);
}
export function getDraftLive(event: number) {
  return fetchJson<LivePayload>(`${DRAFT}/event/${event}/live`);
}
export function getFplBootstrap() {
  return fetchJson<MainBootstrap>(`${MAIN}/bootstrap-static/`);
}
export function getFixtures() {
  return fetchJson<Fixture[]>(`${MAIN}/fixtures/`);
}

export type GameState = {
  current_event: number;
  next_event: number | null;
  waivers_processed: boolean;
};

export type DraftElement = {
  id: number;
  code: number;
  web_name: string;
  first_name: string;
  second_name: string;
  team: number;
  element_type: number;
  status: string;
  news: string;
  news_added: string | null;
  news_return: string | null;
  chance_of_playing_this_round: number | null;
  chance_of_playing_next_round: number | null;
  draft_rank: number | null;
  total_points: number;
  event_points: number;
  points_per_game: string | null;
  form: string | null;
  ep_this: string | null;
  ep_next: string | null;
  minutes: number;
  starts: number;
  goals_scored: number;
  assists: number;
  clean_sheets: number;
  goals_conceded: number;
  own_goals: number;
  penalties_saved: number;
  penalties_missed: number;
  yellow_cards: number;
  red_cards: number;
  saves: number;
  bonus: number;
  bps: number;
  influence: string | null;
  creativity: string | null;
  threat: string | null;
  ict_index: string | null;
  expected_goals: string | null;
  expected_assists: string | null;
  expected_goal_involvements: string | null;
  expected_goals_conceded: string | null;
  defensive_contribution: number;
  tackles: number;
  recoveries: number;
  clearances_blocks_interceptions: number;
  penalties_order: number | null;
  penalties_text: string | null;
  corners_and_indirect_freekicks_order: number | null;
  direct_freekicks_order: number | null;
};

export type DraftBootstrap = {
  elements: DraftElement[];
  teams: {
    id: number;
    code: number;
    name: string;
    short_name: string;
    strength: number;
    strength_overall_home: number;
    strength_overall_away: number;
    strength_attack_home: number;
    strength_attack_away: number;
    strength_defence_home: number;
    strength_defence_away: number;
  }[];
  events: {
    current?: number;
    next?: number | null;
    data?: {
      id: number;
      name: string;
      deadline_time: string;
      finished: boolean;
      waivers_time?: string | null;
    }[];
  } | {
    id: number;
    name: string;
    deadline_time: string;
    finished: boolean;
    is_current?: boolean;
    is_next?: boolean;
    waivers_time?: string | null;
  }[];
  settings?: { scoring?: Record<string, number>; squad?: Record<string, number> };
};

export type LeagueEntry = {
  id: number;
  entry_id: number;
  entry_name: string;
  player_first_name: string;
  player_last_name: string;
  short_name: string;
  waiver_pick: number | null;
};

export type Standing = {
  league_entry: number;
  rank: number;
  last_rank: number | null;
  total: number;
  event_total: number;
};

export type LeagueDetails = {
  league: { id: number; name: string; scoring: string };
  league_entries: LeagueEntry[];
  standings: Standing[];
  matches?: {
    event: number;
    entry_1_entry: number;
    entry_1_points: number;
    entry_2_entry: number;
    entry_2_points: number;
    finished: boolean;
  }[];
};

export type ElementStatus = {
  element: number;
  owner: number | null;
  status: string;
  in_accepted_trade: boolean;
};

export type Transaction = {
  id: number;
  entry: number;
  event: number;
  element_in: number | null;
  element_out: number | null;
  kind: string;
  priority: number | null;
  result: string;
  added: string;
};

export type PickRow = { element: number; position: number; multiplier: number };

export type LiveElement = {
  stats: {
    total_points: number;
    minutes: number;
    bps: number;
    bonus: number;
    defensive_contribution?: number;
  };
};

export type LivePayload = { elements: Record<string, LiveElement> };

export type Fixture = {
  id: number;
  event: number | null;
  kickoff_time: string | null;
  team_h: number;
  team_a: number;
  team_h_score: number | null;
  team_a_score: number | null;
  team_h_difficulty: number;
  team_a_difficulty: number;
  started: boolean;
  finished: boolean;
  finished_provisional: boolean;
  minutes: number;
};

export type MainElement = {
  id: number;
  code: number;
  selected_by_percent: string | null;
  expected_goals_per_90: number | null;
  expected_assists_per_90: number | null;
  defensive_contribution_per_90: number | null;
  starts_per_90: number | null;
  expected_goals_conceded_per_90: number | null;
};

export type MainBootstrap = { elements: MainElement[] };

export function eventList(events: DraftBootstrap["events"]) {
  if (Array.isArray(events)) return events;
  return events.data ?? [];
}
