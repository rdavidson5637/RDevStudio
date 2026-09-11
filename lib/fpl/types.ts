/** Draft API bootstrap-static element. Numeric stats arrive as strings. */
export interface DraftElement {
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
  news_updated: string | null;
  chance_of_playing_this_round: number | null;
  chance_of_playing_next_round: number | null;
  draft_rank: number;
  squad_number: number | null;
  added: boolean;
  total_points: number;
  event_points: number;
  points_per_game: string;
  form: string;
  ep_this: string;
  ep_next: string;
  in_dreamteam: boolean;
  dreamteam_count: number;
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
  influence: string;
  creativity: string;
  threat: string;
  ict_index: string;
  expected_goals: string;
  expected_assists: string;
  expected_goal_involvements: string;
  expected_goals_conceded: string;
  clearances_blocks_interceptions: number;
  recoveries: number;
  tackles: number;
  defensive_contribution: number;
  influence_rank: number;
  influence_rank_type: number;
  creativity_rank: number;
  creativity_rank_type: number;
  threat_rank: number;
  threat_rank_type: number;
  ict_index_rank: number;
  ict_index_rank_type: number;
  form_rank: number;
  form_rank_type: number;
  points_per_game_rank: number;
  points_per_game_rank_type: number;
  corners_and_indirect_freekicks_order: number | null;
  corners_and_indirect_freekicks_text: string;
  direct_freekicks_order: number | null;
  direct_freekicks_text: string;
  penalties_order: number | null;
  penalties_text: string;
}

/** Main FPL API bootstrap-static element (extends draft fields). */
export interface FplElement extends DraftElement {
  selected_by_percent: string;
  now_cost: number;
  expected_goals_per_90: string;
  expected_assists_per_90: string;
  expected_goal_involvements_per_90: string;
  expected_goals_conceded_per_90: string;
  defensive_contribution_per_90: string;
  starts_per_90: string;
  clean_sheets_per_90: string;
  saves_per_90: string;
  goals_conceded_per_90: string;
  scout_risks: string[];
  scout_news_link: string | null;
}

export interface FplTeam {
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
}

export interface FplEvent {
  id: number;
  name: string;
  deadline_time: string;
  finished: boolean;
  is_current: boolean;
  is_next: boolean;
  waivers_time: string | null;
}

/** The draft API's events don't carry is_current/is_next per-item - only
 * the wrapper's `current` field says which gameweek is live. */
export interface DraftEvent {
  id: number;
  name: string;
  deadline_time: string;
  finished: boolean;
  waivers_time: string | null;
}

export interface DraftScoringSettings {
  goals_scored_GKP: number;
  goals_scored_DEF: number;
  goals_scored_MID: number;
  goals_scored_FWD: number;
  assists: number;
  clean_sheets_GKP: number;
  clean_sheets_DEF: number;
  clean_sheets_MID: number;
  clean_sheets_FWD: number;
  defensive_contribution_limit_DEF: number;
  defensive_contribution_limit_MID: number;
  defensive_contribution_limit_FWD: number;
  defensive_contribution_DEF: number;
  defensive_contribution_MID: number;
  defensive_contribution_FWD: number;
  long_play: number;
  short_play: number;
  long_play_limit: number;
  bonus: number;
}

export interface DraftBootstrap {
  elements: DraftElement[];
  teams: FplTeam[];
  events: { current: number; data: DraftEvent[] };
  // Real field is `settings.scoring` - not `game_settings`, which doesn't
  // exist on the live API despite the original spec assuming it did.
  settings?: { scoring?: Partial<DraftScoringSettings> };
}

export interface FplBootstrap {
  elements: FplElement[];
  teams: FplTeam[];
  events: FplEvent[];
}

export interface GameState {
  current_event: number;
  next_event: number;
}

export interface LeagueEntry {
  entry_id: number;
  entry_name: string;
  player_first_name: string;
  player_last_name: string;
  short_name: string;
  waiver_pick: number;
}

export interface LeagueMatch {
  event: number;
  entry_1_entry: number;
  entry_1_points: number;
  entry_2_entry: number;
  entry_2_points: number;
  finished: boolean;
}

export interface LeagueDetails {
  league_entries: LeagueEntry[];
  // Absent entirely for classic-scoring leagues - only head-to-head leagues
  // get a fixture schedule here.
  matches?: LeagueMatch[];
}

export interface ElementStatusRow {
  element: number;
  owner: number | null;
  status: string;
  in_accepted_trade: boolean;
}

export interface ElementStatusResponse {
  element_status: ElementStatusRow[];
}

export interface Transaction {
  id: number;
  entry: number;
  event: number;
  element_in: number | null;
  element_out: number | null;
  kind: string;
  priority: number;
  result: string;
  added: string;
}

export interface Pick {
  element: number;
  position: number;
  multiplier: number;
}

export interface EntryPicks {
  picks: Pick[];
}

export interface EntryPublic {
  id: number;
  name: string;
}

export interface Fixture {
  id: number;
  code: number;
  event: number;
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
  stats: unknown[];
  pulse_id: number;
}

export interface ElementSummary {
  fixtures: Fixture[];
  history: unknown[];
  history_past: unknown[];
}

export interface SetPieceNotes {
  notes: unknown[];
}

export interface DraftLiveElement {
  id: number;
  stats: {
    total_points: number;
    minutes: number;
    bps: number;
    bonus: number;
    [key: string]: unknown;
  };
  explain: unknown[];
}

export interface DraftLive {
  elements: DraftLiveElement[];
}
