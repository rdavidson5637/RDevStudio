-- FPL Draft Analyser tables. Public read, server-only write via service role (RLS enabled, SELECT-only policies).

create table public.fpl_teams (
  id int primary key,
  code int,
  name text,
  short_name text,
  strength int,
  strength_overall_home int,
  strength_overall_away int,
  strength_attack_home int,
  strength_attack_away int,
  strength_defence_home int,
  strength_defence_away int,
  updated_at timestamptz default now()
);

comment on table public.fpl_teams is 'Premier League teams from FPL bootstrap. Public read; writes via service role only.';

create table public.fpl_players (
  id int primary key,
  code int,
  web_name text,
  first_name text,
  second_name text,
  team_id int references public.fpl_teams (id),
  element_type int,
  status text,
  news text,
  news_added timestamptz,
  news_return date,
  chance_of_playing_this_round int,
  chance_of_playing_next_round int,
  draft_rank int,
  total_points int,
  event_points int,
  points_per_game numeric,
  form numeric,
  ep_this numeric,
  ep_next numeric,
  minutes int,
  starts int,
  goals_scored int,
  assists int,
  clean_sheets int,
  goals_conceded int,
  own_goals int,
  penalties_saved int,
  penalties_missed int,
  yellow_cards int,
  red_cards int,
  saves int,
  bonus int,
  bps int,
  influence numeric,
  creativity numeric,
  threat numeric,
  ict_index numeric,
  expected_goals numeric,
  expected_assists numeric,
  expected_goal_involvements numeric,
  expected_goals_conceded numeric,
  defensive_contribution int,
  tackles int,
  recoveries int,
  clearances_blocks_interceptions int,
  expected_goals_per_90 numeric,
  expected_assists_per_90 numeric,
  defensive_contribution_per_90 numeric,
  starts_per_90 numeric,
  expected_goals_conceded_per_90 numeric,
  selected_by_percent numeric,
  penalties_order int,
  penalties_text text,
  corners_and_indirect_freekicks_order int,
  direct_freekicks_order int,
  updated_at timestamptz default now()
);

comment on table public.fpl_players is 'Player pool from draft + main FPL APIs. Public read; writes via service role only.';

create table public.fpl_player_snapshots (
  id bigserial primary key,
  player_id int references public.fpl_players (id),
  captured_at timestamptz default now(),
  status text,
  news text,
  news_added timestamptz,
  news_return date,
  chance_of_playing_this_round int,
  chance_of_playing_next_round int,
  availability_score int
);

comment on table public.fpl_player_snapshots is 'Append-only availability history for status change timeline. Public read; writes via service role only.';

create unique index fpl_player_snapshots_player_captured_idx
  on public.fpl_player_snapshots (player_id, captured_at);

create index fpl_player_snapshots_player_captured_desc_idx
  on public.fpl_player_snapshots (player_id, captured_at desc);

create table public.fpl_fixtures (
  id int primary key,
  event int,
  kickoff_time timestamptz,
  team_h int references public.fpl_teams (id),
  team_a int references public.fpl_teams (id),
  team_h_score int,
  team_a_score int,
  team_h_difficulty int,
  team_a_difficulty int,
  started bool,
  finished bool,
  finished_provisional bool,
  minutes int
);

comment on table public.fpl_fixtures is 'Fixtures from main FPL API. Public read; writes via service role only.';

create table public.fpl_events (
  id int primary key,
  name text,
  deadline_time timestamptz,
  finished bool,
  is_current bool,
  is_next bool,
  waivers_time timestamptz
);

comment on table public.fpl_events is 'Gameweeks from draft bootstrap. Public read; writes via service role only.';

create table public.fpl_league_entries (
  entry_id int primary key,
  entry_name text,
  player_first_name text,
  player_last_name text,
  short_name text,
  waiver_pick int
);

comment on table public.fpl_league_entries is 'Draft league managers. Public read; writes via service role only.';

create table public.fpl_league_matches (
  id bigserial primary key,
  event int,
  entry_1_entry int,
  entry_1_points int,
  entry_2_entry int,
  entry_2_points int,
  finished bool
);

comment on table public.fpl_league_matches is 'Head-to-head league matches. Public read; writes via service role only.';

create unique index fpl_league_matches_event_entries_idx
  on public.fpl_league_matches (event, entry_1_entry, entry_2_entry);

create table public.fpl_ownership (
  player_id int primary key references public.fpl_players (id),
  owner_entry_id int,
  status text,
  in_accepted_trade bool,
  updated_at timestamptz default now()
);

comment on table public.fpl_ownership is 'League ownership snapshot. Public read; writes via service role only.';

create table public.fpl_transactions (
  id bigint primary key,
  entry_id int,
  event int,
  element_in int,
  element_out int,
  kind text,
  priority int,
  result text,
  added timestamptz
);

comment on table public.fpl_transactions is 'Waiver and trade transactions. Public read; writes via service role only.';

create table public.fpl_picks (
  id bigserial primary key,
  entry_id int,
  event int,
  player_id int,
  position int,
  multiplier int
);

comment on table public.fpl_picks is 'Squad picks per entry and gameweek. Public read; writes via service role only.';

create unique index fpl_picks_entry_event_player_idx
  on public.fpl_picks (entry_id, event, player_id);

create table public.fpl_projections (
  id bigserial primary key,
  player_id int references public.fpl_players (id),
  event int,
  projected_points numeric,
  p_start numeric,
  components jsonb,
  computed_at timestamptz default now()
);

comment on table public.fpl_projections is 'Modelled projected points per player per gameweek. Public read; writes via service role only.';

create unique index fpl_projections_player_event_idx
  on public.fpl_projections (player_id, event);

create table public.fpl_news_items (
  id bigserial primary key,
  player_id int references public.fpl_players (id),
  team_id int,
  signal text,
  confidence numeric,
  quote text,
  source_url text,
  source_name text,
  published_at timestamptz,
  created_at timestamptz default now()
);

comment on table public.fpl_news_items is 'External news signals for availability. Public read; writes via service role only.';

create unique index fpl_news_items_player_source_published_idx
  on public.fpl_news_items (player_id, source_url, published_at);

create table public.fpl_live_stats (
  id bigserial primary key,
  event int,
  player_id int,
  total_points int,
  minutes int,
  bps int,
  provisional_bonus int,
  stats jsonb,
  updated_at timestamptz default now()
);

comment on table public.fpl_live_stats is 'Live gameweek stats from draft API. Public read; writes via service role only.';

create unique index fpl_live_stats_event_player_idx
  on public.fpl_live_stats (event, player_id);

-- Row level security: public read, no client writes.

alter table public.fpl_teams enable row level security;
alter table public.fpl_players enable row level security;
alter table public.fpl_player_snapshots enable row level security;
alter table public.fpl_fixtures enable row level security;
alter table public.fpl_events enable row level security;
alter table public.fpl_league_entries enable row level security;
alter table public.fpl_league_matches enable row level security;
alter table public.fpl_ownership enable row level security;
alter table public.fpl_transactions enable row level security;
alter table public.fpl_picks enable row level security;
alter table public.fpl_projections enable row level security;
alter table public.fpl_news_items enable row level security;
alter table public.fpl_live_stats enable row level security;

create policy "Public read fpl_teams"
  on public.fpl_teams for select
  to anon, authenticated
  using (true);

create policy "Public read fpl_players"
  on public.fpl_players for select
  to anon, authenticated
  using (true);

create policy "Public read fpl_player_snapshots"
  on public.fpl_player_snapshots for select
  to anon, authenticated
  using (true);

create policy "Public read fpl_fixtures"
  on public.fpl_fixtures for select
  to anon, authenticated
  using (true);

create policy "Public read fpl_events"
  on public.fpl_events for select
  to anon, authenticated
  using (true);

create policy "Public read fpl_league_entries"
  on public.fpl_league_entries for select
  to anon, authenticated
  using (true);

create policy "Public read fpl_league_matches"
  on public.fpl_league_matches for select
  to anon, authenticated
  using (true);

create policy "Public read fpl_ownership"
  on public.fpl_ownership for select
  to anon, authenticated
  using (true);

create policy "Public read fpl_transactions"
  on public.fpl_transactions for select
  to anon, authenticated
  using (true);

create policy "Public read fpl_picks"
  on public.fpl_picks for select
  to anon, authenticated
  using (true);

create policy "Public read fpl_projections"
  on public.fpl_projections for select
  to anon, authenticated
  using (true);

create policy "Public read fpl_news_items"
  on public.fpl_news_items for select
  to anon, authenticated
  using (true);

create policy "Public read fpl_live_stats"
  on public.fpl_live_stats for select
  to anon, authenticated
  using (true);
