import { unstable_cache } from "next/cache";
import { supabasePublic } from "@/lib/supabase/public";

export type SquadPlayer = {
  id: number;
  webName: string;
  teamId: number;
  teamShortName: string;
  position: number; // 1 GK, 2 DEF, 3 MID, 4 FWD
  pickPosition: number; // 1..15, formation slot from fpl_picks
  multiplier: number;
  status: string;
  availabilityScore: number;
  form: number | null;
  projectedPoints: number | null;
  epNext: number | null;
  nextFixture: { opponent: string; isHome: boolean; difficulty: number } | null;
};

const STATUS_BASE: Record<string, number> = { a: 100, d: 55, i: 5, s: 0, u: 0, n: 15 };

// Approximate stand-in for lib/draft/availability.ts's real model (prompt 07,
// not built yet) - close enough to colour dots and sort correctly today.
function estimateAvailability(status: string, chanceNext: number | null): number {
  const base = STATUS_BASE[status] ?? 50;
  return chanceNext != null ? Math.round(0.55 * base + 0.45 * chanceNext) : base;
}

function toNumber(v: string | number | null): number | null {
  if (v == null || v === "") return null;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isNaN(n) ? null : n;
}

type TeamRow = { id: number; short_name: string };
type PlayerRow = {
  id: number;
  web_name: string;
  element_type: number;
  status: string;
  chance_of_playing_next_round: number | null;
  form: string | number | null;
  ep_next: string | number | null;
  team_id: number;
  fpl_teams: TeamRow | TeamRow[] | null;
};

/**
 * fpl_picks.player_id has no FK to fpl_players (unlike every other player_id
 * column in this schema - see migration 0003), so this deliberately queries
 * picks and players separately and joins in JS rather than relying on a
 * PostgREST embed that may not resolve.
 */
async function fetchSquad(entryId: number, event: number): Promise<SquadPlayer[]> {
  const { data: picks, error: picksError } = await supabasePublic
    .from("fpl_picks")
    .select("position, multiplier, player_id")
    .eq("entry_id", entryId)
    .eq("event", event)
    .order("position", { ascending: true });

  if (picksError || !picks || picks.length === 0) return [];

  const playerIds = picks.map((p) => p.player_id);

  const { data: players } = await supabasePublic
    .from("fpl_players")
    .select(
      "id, web_name, element_type, status, chance_of_playing_next_round, form, ep_next, team_id, fpl_teams ( id, short_name )",
    )
    .in("id", playerIds)
    .returns<PlayerRow[]>();

  const playerById = new Map((players ?? []).map((p) => [p.id, p]));
  const teamIds = Array.from(new Set((players ?? []).map((p) => p.team_id)));

  const [fixturesRes, projectionsRes, allTeamsRes] = await Promise.all([
    teamIds.length > 0
      ? supabasePublic
          .from("fpl_fixtures")
          .select("event, team_h, team_a, team_h_difficulty, team_a_difficulty")
          .gte("event", event)
          .or(`team_h.in.(${teamIds.join(",")}),team_a.in.(${teamIds.join(",")})`)
          .order("event", { ascending: true })
      : Promise.resolve({ data: [] as never[] }),
    playerIds.length > 0
      ? supabasePublic
          .from("fpl_projections")
          .select("player_id, projected_points")
          .eq("event", event)
          .in("player_id", playerIds)
      : Promise.resolve({ data: [] as never[] }),
    // All 20 clubs, not just the squad's own - an opponent is very often a
    // team nobody in the squad plays for.
    supabasePublic.from("fpl_teams").select("id, short_name"),
  ]);

  const teamShortNameById = new Map<number, string>(
    (allTeamsRes.data ?? []).map((t: TeamRow) => [t.id, t.short_name]),
  );

  // teamId -> its next fixture from this point on (first by event, either side)
  const nextFixtureByTeam = new Map<number, { opponent: string; isHome: boolean; difficulty: number }>();
  for (const fixture of fixturesRes.data ?? []) {
    for (const teamId of teamIds) {
      if (nextFixtureByTeam.has(teamId)) continue;
      if (fixture.team_h === teamId) {
        nextFixtureByTeam.set(teamId, {
          opponent: teamShortNameById.get(fixture.team_a) ?? "?",
          isHome: true,
          difficulty: fixture.team_h_difficulty,
        });
      } else if (fixture.team_a === teamId) {
        nextFixtureByTeam.set(teamId, {
          opponent: teamShortNameById.get(fixture.team_h) ?? "?",
          isHome: false,
          difficulty: fixture.team_a_difficulty,
        });
      }
    }
  }

  const projectionByPlayer = new Map<number, number>(
    (projectionsRes.data ?? []).map((p: { player_id: number; projected_points: number }) => [
      p.player_id,
      p.projected_points,
    ]),
  );

  const squad: SquadPlayer[] = [];
  for (const pick of picks) {
    const player = playerById.get(pick.player_id);
    if (!player) continue;
    const team = Array.isArray(player.fpl_teams) ? player.fpl_teams[0] : player.fpl_teams;
    const epNext = toNumber(player.ep_next);

    squad.push({
      id: player.id,
      webName: player.web_name,
      teamId: player.team_id,
      teamShortName: team?.short_name ?? "—",
      position: player.element_type,
      pickPosition: pick.position,
      multiplier: pick.multiplier,
      status: player.status,
      availabilityScore: estimateAvailability(player.status, player.chance_of_playing_next_round),
      form: toNumber(player.form),
      epNext,
      projectedPoints: projectionByPlayer.get(player.id) ?? epNext,
      nextFixture: nextFixtureByTeam.get(player.team_id) ?? null,
    });
  }

  return squad;
}

export const getSquad = unstable_cache(fetchSquad, ["draft-squad"], {
  tags: ["fpl-players", "fpl-league"],
});
