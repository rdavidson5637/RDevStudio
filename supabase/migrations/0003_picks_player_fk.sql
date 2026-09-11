-- fpl_picks.player_id was left without a foreign key in 0001 (every other
-- player_id column has one) - add it for the same integrity guarantee and so
-- PostgREST can embed fpl_players from fpl_picks if a future query wants to.

alter table public.fpl_picks
  add constraint fpl_picks_player_id_fkey
  foreign key (player_id) references public.fpl_players (id);
