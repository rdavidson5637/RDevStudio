-- Covering indexes for common FPL Draft Analyser queries.

create index fpl_players_team_id_idx on public.fpl_players (team_id);
create index fpl_players_element_type_idx on public.fpl_players (element_type);
create index fpl_players_status_idx on public.fpl_players (status);

create index fpl_fixtures_event_idx on public.fpl_fixtures (event);
create index fpl_fixtures_team_h_idx on public.fpl_fixtures (team_h);
create index fpl_fixtures_team_a_idx on public.fpl_fixtures (team_a);

create index fpl_projections_event_points_desc_idx
  on public.fpl_projections (event, projected_points desc);

create index fpl_news_items_player_published_desc_idx
  on public.fpl_news_items (player_id, published_at desc);

create index fpl_ownership_owner_entry_id_idx on public.fpl_ownership (owner_entry_id);
