import { unstable_cache } from "next/cache";
import { supabasePublic } from "@/lib/supabase/public";
import { availabilityFor, projectWindow, type ProjectablePlayer } from "./project-player";
import { getTeamsAndFixtures } from "./fixtures";
import { buildTickerRow } from "./ticker";
import type { DropPlayer } from "./drop";
import { defconLimit } from "./positions";
import { getSquad } from "./squad";
import type { WaiverBoardData, WirePlayer } from "./waiver-types";
import { getLatestSignalsForPlayers } from "./news/queries";

export type { WaiverBoardData, WirePlayer } from "./waiver-types";

type PlayerRow = ProjectablePlayer & {
  web_name: string;
  team_id: number;
  form: number | string | null;
  minutes: number | null;
  starts: number | null;
  defensive_contribution_per_90: number | string | null;
};

function num(value: number | string | null | undefined): number {
  if (value == null || value === "") return 0;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}

async function fetchWaiverBoard(eventId: number, entryId: number): Promise<WaiverBoardData> {
  const [{ data: ownership }, { teamById, byTeam }, squad] = await Promise.all([
    supabasePublic.from("fpl_ownership").select("player_id, owner_entry_id").limit(2000),
    getTeamsAndFixtures(eventId, 6),
    getSquad(entryId, eventId),
  ]);

  const freeIds = (ownership ?? [])
    .filter((row) => row.owner_entry_id == null)
    .map((row) => row.player_id);

  if (freeIds.length === 0) {
    return { players: [], trending: { availabilityRisers: [] }, squadDrops: [] };
  }

  const freeSet = new Set(freeIds);

  const [{ data: allPlayers }, { data: transactions }, { data: snapshots }] = await Promise.all([
    supabasePublic
      .from("fpl_players")
      .select(
        "id, web_name, team_id, element_type, status, news, news_added, news_return, chance_of_playing_this_round, chance_of_playing_next_round, form, minutes, starts, bps, starts_per_90, expected_goals_per_90, expected_assists_per_90, defensive_contribution_per_90",
      )
      .limit(1000)
      .returns<PlayerRow[]>(),
    supabasePublic
      .from("fpl_transactions")
      .select("element_in, element_out, result")
      .in("result", ["a", "accepted"])
      .limit(4000),
    supabasePublic
      .from("fpl_player_snapshots")
      .select("player_id, availability_score, captured_at")
      .gte("captured_at", new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString())
      .order("captured_at", { ascending: true })
      .limit(4000),
  ]);

  const players = (allPlayers ?? []).filter((p) => freeSet.has(p.id));
  const signals = await getLatestSignalsForPlayers(players.map((p) => p.id));

  const pickups = new Map<number, number>();
  const drops = new Map<number, number>();
  for (const row of transactions ?? []) {
    if (row.element_in != null) pickups.set(row.element_in, (pickups.get(row.element_in) ?? 0) + 1);
    if (row.element_out != null) drops.set(row.element_out, (drops.get(row.element_out) ?? 0) + 1);
  }

  const snapshotFirst = new Map<number, number>();
  const snapshotLast = new Map<number, number>();
  for (const row of snapshots ?? []) {
    if (row.availability_score == null || !freeSet.has(row.player_id)) continue;
    if (!snapshotFirst.has(row.player_id)) snapshotFirst.set(row.player_id, row.availability_score);
    snapshotLast.set(row.player_id, row.availability_score);
  }

  const now = new Date();
  const wire: WirePlayer[] = [];

  for (const player of players ?? []) {
    const avail = availabilityFor(player, now, signals.get(player.id) ?? null).score;
    const upcoming = byTeam.get(player.team_id) ?? [];
    const projected = projectWindow(
      player,
      upcoming.map((f) => ({ event: f.event, difficulty: f.difficulty, isHome: f.isHome })),
      avail,
    );
    const cells = buildTickerRow(upcoming, eventId, 6);
    const defconPer90 = num(player.defensive_contribution_per_90);
    const limit = defconLimit(player.element_type);

    wire.push({
      id: player.id,
      webName: player.web_name,
      teamId: player.team_id,
      teamShortName: teamById.get(player.team_id)?.short_name ?? "—",
      position: player.element_type as 1 | 2 | 3 | 4,
      availabilityScore: avail,
      projected1: projected.gw1,
      projected3: projected.gw3,
      projected6: projected.gw6,
      next3: upcoming.slice(0, 3).map((f) => ({
        opponent: f.opponent,
        isHome: f.isHome,
        difficulty: f.difficulty,
      })),
      form: num(player.form) || null,
      minutes: num(player.minutes),
      starts: num(player.starts),
      defconPer90,
      defconRate: limit > 0 ? Math.min(1, defconPer90 / limit) : 0,
      pickupCount: pickups.get(player.id) ?? 0,
      dropCount: drops.get(player.id) ?? 0,
      hasNextGwFixture: upcoming.some((f) => f.event === eventId),
      cells,
    });
  }

  wire.sort((a, b) => b.projected3 - a.projected3);

  const availabilityRisers = [...snapshotFirst.entries()]
    .map(([id, from]) => {
      const to = snapshotLast.get(id) ?? from;
      const player = wire.find((row) => row.id === id);
      return player ? { id, webName: player.webName, from, to, delta: to - from } : null;
    })
    .filter((row): row is { id: number; webName: string; from: number; to: number; delta: number } => row != null)
    .filter((row) => row.delta > 0)
    .sort((a, b) => b.delta - a.delta)
    .slice(0, 3)
    .map(({ id, webName, from, to }) => ({ id, webName, from, to }));

  const squadIds = squad.map((p) => p.id);
  const { data: squadRows } =
    squadIds.length > 0
      ? await supabasePublic
          .from("fpl_players")
          .select(
            "id, web_name, team_id, element_type, status, news, news_added, news_return, chance_of_playing_this_round, chance_of_playing_next_round, form, minutes, starts, bps, starts_per_90, expected_goals_per_90, expected_assists_per_90, defensive_contribution_per_90",
          )
          .in("id", squadIds)
          .returns<PlayerRow[]>()
      : { data: [] as PlayerRow[] };

  const squadRowById = new Map((squadRows ?? []).map((row) => [row.id, row]));
  const squadDrops: DropPlayer[] = squad.map((p) => {
    const row = squadRowById.get(p.id);
    const upcoming = byTeam.get(p.teamId) ?? [];
    const projected6 = row
      ? projectWindow(
          row,
          upcoming.map((f) => ({ event: f.event, difficulty: f.difficulty, isHome: f.isHome })),
          p.availabilityScore,
        ).gw6
      : (p.projectedPoints ?? 0) * 6;
    return {
      id: p.id,
      webName: p.webName,
      position: p.position as 1 | 2 | 3 | 4,
      projected6,
    };
  });

  return {
    players: wire,
    trending: { availabilityRisers },
    squadDrops,
  };
}

export const getWaiverBoard = unstable_cache(fetchWaiverBoard, ["draft-waivers"], {
  tags: ["fpl-players", "fpl-league", "fpl-ownership", "fpl-fixtures"],
});
