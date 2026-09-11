import "server-only";
import { revalidateTag, unstable_cache } from "next/cache";
import { getDraftLive } from "@/lib/fpl/client";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabasePublic } from "@/lib/supabase/public";
import { chunk } from "@/lib/fpl/parse";
import { simulateRemaining } from "./simulate";
import { broadcastLiveBoard } from "./pusher";
import type { LiveBoardData, LiveH2H, LivePlayer } from "./live-types";

export type { LiveBoardData, LiveH2H, LivePlayer } from "./live-types";

const MIN_REFRESH_MS = 45_000;
let lastRefreshAt = 0;

function provisionalBonusFromBps(rows: { id: number; bps: number; bonus: number }[]): Map<number, number> {
  const bonus = new Map<number, number>();
  const ranked = [...rows].sort((a, b) => b.bps - a.bps);
  const awards = [3, 2, 1];
  let awardIndex = 0;
  let i = 0;
  while (i < ranked.length && awardIndex < awards.length) {
    const bps = ranked[i].bps;
    if (bps <= 0) break;
    const tied = ranked.filter((row) => row.bps === bps);
    for (const row of tied) {
      if (row.bonus > 0) bonus.set(row.id, row.bonus);
      else bonus.set(row.id, awards[awardIndex] ?? 0);
    }
    awardIndex += tied.length;
    i += tied.length;
  }
  return bonus;
}

async function persistLiveStats(
  eventId: number,
  live: Awaited<ReturnType<typeof getDraftLive>>,
  provisional: Map<number, number>,
): Promise<number> {
  const now = new Date().toISOString();
  const rows = (live.elements ?? []).map((el) => ({
    event: eventId,
    player_id: el.id,
    total_points: el.stats.total_points ?? 0,
    minutes: el.stats.minutes ?? 0,
    bps: el.stats.bps ?? 0,
    provisional_bonus: provisional.get(el.id) ?? el.stats.bonus ?? 0,
    stats: el.stats,
    updated_at: now,
  }));

  let written = 0;
  for (const batch of chunk(rows, 200)) {
    if (batch.length === 0) continue;
    const { error } = await supabaseAdmin.from("fpl_live_stats").upsert(batch, {
      onConflict: "event,player_id",
    });
    if (error) throw new Error(`fpl_live_stats upsert failed: ${error.message}`);
    written += batch.length;
  }
  return written;
}

export async function buildLiveBoard(eventId: number, myEntryId: number): Promise<LiveBoardData> {
  const [live, { data: entries }, { data: picks }, { data: matches }] = await Promise.all([
    getDraftLive(eventId),
    supabasePublic.from("fpl_league_entries").select("entry_id, entry_name"),
    supabasePublic.from("fpl_picks").select("entry_id, player_id, multiplier, position").eq("event", eventId),
    supabasePublic
      .from("fpl_league_matches")
      .select("entry_1_entry, entry_2_entry, finished")
      .eq("event", eventId),
  ]);

  const liveById = new Map((live.elements ?? []).map((el) => [el.id, el]));
  const bpsRows = (live.elements ?? []).map((el) => ({
    id: el.id,
    bps: el.stats.bps ?? 0,
    bonus: el.stats.bonus ?? 0,
  }));
  const provisional = provisionalBonusFromBps(bpsRows);

  const nameByEntry = new Map((entries ?? []).map((e) => [e.entry_id, e.entry_name]));
  const playerIds = Array.from(new Set((picks ?? []).map((p) => p.player_id)));
  const [{ data: players }, { data: projections }] = await Promise.all([
    playerIds.length
      ? supabasePublic.from("fpl_players").select("id, web_name").in("id", playerIds)
      : Promise.resolve({ data: [] as { id: number; web_name: string }[] }),
    playerIds.length
      ? supabasePublic
          .from("fpl_projections")
          .select("player_id, projected_points")
          .eq("event", eventId)
          .in("player_id", playerIds)
      : Promise.resolve({ data: [] as { player_id: number; projected_points: number }[] }),
  ]);
  const nameByPlayer = new Map((players ?? []).map((p) => [p.id, p.web_name]));
  const xPByPlayer = new Map((projections ?? []).map((p) => [p.player_id, Number(p.projected_points) || 0]));

  const mapped: LivePlayer[] = [];
  const totals = new Map<number, number>();

  for (const pick of picks ?? []) {
    const stats = liveById.get(pick.player_id);
    const points = (stats?.stats.total_points ?? 0) * (pick.multiplier || 0);
    const row: LivePlayer = {
      id: pick.player_id,
      webName: nameByPlayer.get(pick.player_id) ?? `#${pick.player_id}`,
      owner: nameByEntry.get(pick.entry_id) ?? "Unknown",
      entryId: pick.entry_id,
      points,
      minutes: stats?.stats.minutes ?? 0,
      bps: stats?.stats.bps ?? 0,
      bonus: stats?.stats.bonus ?? 0,
      provisionalBonus: provisional.get(pick.player_id) ?? stats?.stats.bonus ?? 0,
      multiplier: pick.multiplier ?? 0,
    };
    mapped.push(row);
    if (pick.multiplier > 0) {
      totals.set(pick.entry_id, (totals.get(pick.entry_id) ?? 0) + points);
    }
  }

  const byEntry = (entries ?? [])
    .map((e) => ({
      entryId: e.entry_id,
      name: e.entry_name,
      points: totals.get(e.entry_id) ?? 0,
    }))
    .sort((a, b) => b.points - a.points);

  const h2hMatch = (matches ?? []).find(
    (m) => !m.finished && (m.entry_1_entry === myEntryId || m.entry_2_entry === myEntryId),
  );

  let h2h: LiveH2H | null = null;
  if (h2hMatch) {
    const oppId = h2hMatch.entry_1_entry === myEntryId ? h2hMatch.entry_2_entry : h2hMatch.entry_1_entry;
    const mine = mapped.filter((p) => p.entryId === myEntryId && p.multiplier > 0);
    const theirs = mapped.filter((p) => p.entryId === oppId && p.multiplier > 0);
    const split = (rows: LivePlayer[]) => {
      const locked = rows.filter((p) => p.minutes > 0).reduce((sum, p) => sum + p.points, 0);
      const remaining = rows
        .filter((p) => p.minutes === 0)
        .map((p) => ({ name: p.webName, xP: xPByPlayer.get(p.id) || 2 }));
      return { locked, remaining };
    };
    const home = split(mine);
    const away = split(theirs);
    const sim = simulateRemaining(home.locked, away.locked, home.remaining, away.remaining, 2500, eventId);
    h2h = {
      opponentName: nameByEntry.get(oppId) ?? "Opponent",
      opponentEntryId: oppId,
      myPoints: totals.get(myEntryId) ?? 0,
      theirPoints: totals.get(oppId) ?? 0,
      myWinPct: sim.homeWinPct,
    };
  }

  return {
    eventId,
    players: mapped.sort((a, b) => b.points - a.points),
    byEntry,
    h2h,
    updatedAt: new Date().toISOString(),
  };
}

export const getLiveBoard = unstable_cache(buildLiveBoard, ["draft-live"], {
  revalidate: 60,
  tags: ["fpl-live", "fpl-league"],
});

export async function refreshLiveBoard(
  eventId: number,
  myEntryId: number,
  opts?: { force?: boolean },
): Promise<{ board: LiveBoardData; stale: boolean; persisted: number }> {
  const now = Date.now();
  if (!opts?.force && now - lastRefreshAt < MIN_REFRESH_MS) {
    return { board: await getLiveBoard(eventId, myEntryId), stale: true, persisted: 0 };
  }
  lastRefreshAt = now;

  const live = await getDraftLive(eventId);
  const bpsRows = (live.elements ?? []).map((el) => ({
    id: el.id,
    bps: el.stats.bps ?? 0,
    bonus: el.stats.bonus ?? 0,
  }));
  const persisted = await persistLiveStats(eventId, live, provisionalBonusFromBps(bpsRows));
  const board = await buildLiveBoard(eventId, myEntryId);
  await broadcastLiveBoard(board);
  revalidateTag("fpl-live");
  return { board, stale: false, persisted };
}
