import { unstable_cache } from "next/cache";
import { supabasePublic } from "@/lib/supabase/public";
import { getLeagueDetails } from "@/lib/fpl/client";
import { availabilityFor, projectWindow } from "./project-player";
import { getTeamsAndFixtures } from "./fixtures";
import { simulateMatchup, simulateSeason } from "./simulate";
import type { LeagueBoardData, PostMortemRow, RivalPlayer, RivalTeam, TradePiece } from "./league-types";
import { getLatestSignalsForPlayers } from "./news/queries";

export type { LeagueBoardData, TradePiece } from "./league-types";

type StandingRow = {
  league_entry?: number;
  entry_id?: number;
  rank?: number;
  total?: number;
  event_total?: number;
};

async function fetchLeagueBoard(eventId: number, leagueId: number, myEntryId: number): Promise<LeagueBoardData> {
  const [{ data: entries }, { data: picks }, { data: matches }, { byTeam }] = await Promise.all([
    supabasePublic.from("fpl_league_entries").select("entry_id, entry_name, player_first_name, player_last_name, waiver_pick, short_name"),
    supabasePublic.from("fpl_picks").select("entry_id, player_id, position, multiplier").eq("event", eventId).limit(2000),
    supabasePublic.from("fpl_league_matches").select("event, entry_1_entry, entry_1_points, entry_2_entry, entry_2_points, finished").eq("event", eventId),
    getTeamsAndFixtures(eventId, 6),
  ]);

  const playerIds = Array.from(new Set((picks ?? []).map((p) => p.player_id)));
  const { data: players } = playerIds.length
    ? await supabasePublic
        .from("fpl_players")
        .select(
          "id, web_name, team_id, element_type, status, news, news_added, news_return, chance_of_playing_this_round, chance_of_playing_next_round, total_points, draft_rank, minutes, bps, starts_per_90, expected_goals_per_90, expected_assists_per_90, defensive_contribution_per_90",
        )
        .in("id", playerIds)
    : { data: [] };

  const playerById = new Map((players ?? []).map((p) => [p.id, p]));
  const now = new Date();
  const signals = await getLatestSignalsForPlayers(playerIds);

  let standings: StandingRow[] = [];
  try {
    const details = await getLeagueDetails(leagueId);
    const raw = (details as { standings?: StandingRow[] }).standings;
    if (Array.isArray(raw)) standings = raw;
  } catch {
    standings = [];
  }

  const standingByEntry = new Map<number, StandingRow>();
  for (const row of standings) {
    const id = row.league_entry ?? row.entry_id;
    if (id != null) standingByEntry.set(id, row);
  }

  const teams: RivalTeam[] = (entries ?? []).map((entry) => {
    const entryPicks = (picks ?? []).filter((p) => p.entry_id === entry.entry_id);
    const mapped: RivalPlayer[] = [];
    for (const pick of entryPicks) {
      const row = playerById.get(pick.player_id);
      if (!row) continue;
      const avail = availabilityFor(row, now, signals.get(row.id) ?? null).score;
      const upcoming = byTeam.get(row.team_id) ?? [];
      const projected = projectWindow(
        row,
        upcoming.map((f) => ({ event: f.event, difficulty: f.difficulty, isHome: f.isHome })),
        avail,
      );
      mapped.push({
        id: row.id,
        webName: row.web_name,
        position: row.element_type as 1 | 2 | 3 | 4,
        pickPosition: pick.position,
        availabilityScore: avail,
        projectedPoints: projected.gw1,
        totalPoints: row.total_points ?? 0,
        draftRank: row.draft_rank,
        status: row.status,
      });
    }

    const starters = mapped.filter((p) => p.pickPosition <= 11);
    const byPos: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
    for (const p of mapped) byPos[p.position] += 1;

    const thin: string[] = [];
    if (byPos[1] < 2) thin.push("GK");
    if (byPos[2] < 5) thin.push("DEF");
    if (byPos[3] < 5) thin.push("MID");
    if (byPos[4] < 3) thin.push("FWD");

    const standing = standingByEntry.get(entry.entry_id);

    return {
      entryId: entry.entry_id,
      name: entry.entry_name,
      manager: `${entry.player_first_name} ${entry.player_last_name}`.trim(),
      waiverPick: entry.waiver_pick,
      players: mapped,
      projectedGw: Number(
        (starters.length > 0 ? starters : mapped.slice(0, 11)).reduce(
          (sum, p) => sum + p.projectedPoints,
          0,
        ).toFixed(1),
      ),
      injuryCount: mapped.filter((p) => p.availabilityScore < 40).length,
      thinPositions: thin,
      rank: standing?.rank ?? null,
      total: standing?.total ?? mapped.reduce((sum, p) => sum + p.totalPoints, 0),
    };
  });

  teams.sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99) || b.projectedGw - a.projectedGw);

  const mine = teams.find((t) => t.entryId === myEntryId) ?? teams[0];
  const h2h = (matches ?? []).find(
    (m) => !m.finished && (m.entry_1_entry === myEntryId || m.entry_2_entry === myEntryId),
  );

  let matchup: LeagueBoardData["matchup"] = null;
  if (mine && h2h) {
    const oppId = h2h.entry_1_entry === myEntryId ? h2h.entry_2_entry : h2h.entry_1_entry;
    const opp = teams.find((t) => t.entryId === oppId);
    if (opp) {
      const sim = simulateMatchup(
        mine.players.slice(0, 11).map((p) => ({ name: p.webName, xP: p.projectedPoints })),
        opp.players.slice(0, 11).map((p) => ({ name: p.webName, xP: p.projectedPoints })),
      );
      matchup = { ...sim, opponentName: opp.name, opponentEntryId: opp.entryId };
    }
  }

  const remainingMeans = teams.map((team) => ({
    entryId: team.entryId,
    currentTotal: team.total,
    remainingGwMeans: Array.from({ length: 6 }, () => team.projectedGw),
  }));
  const season = simulateSeason(remainingMeans);

  const postRows: PostMortemRow[] = [];
  for (const team of teams) {
    for (const player of team.players) {
      if (player.draftRank == null) continue;
      postRows.push({
        id: player.id,
        webName: player.webName,
        owner: team.name,
        draftRank: player.draftRank,
        totalPoints: player.totalPoints,
        value: player.totalPoints + player.draftRank * 0.15,
      });
    }
  }
  const best = [...postRows].sort((a, b) => b.value - a.value).slice(0, 8);
  const worst = [...postRows].sort((a, b) => a.totalPoints / Math.max(a.draftRank, 1) - b.totalPoints / Math.max(b.draftRank, 1)).slice(0, 8);

  const tradePool: TradePiece[] = teams.flatMap((team) =>
    team.players.map((player) => {
      const row = playerById.get(player.id);
      const upcoming = row ? byTeam.get(row.team_id) ?? [] : [];
      const projected6 = row
        ? projectWindow(
            row,
            upcoming.map((f) => ({ event: f.event, difficulty: f.difficulty, isHome: f.isHome })),
            player.availabilityScore,
          ).gw6
        : player.projectedPoints * 6;
      return {
        id: player.id,
        webName: player.webName,
        entryId: team.entryId,
        owner: team.name,
        position: player.position,
        projected6,
      };
    }),
  );

  return {
    teams,
    myEntryId,
    matchup,
    classicNote: !h2h,
    season,
    postMortem: { best, worst },
    tradePool,
  };
}

export const getLeagueBoard = unstable_cache(fetchLeagueBoard, ["draft-league"], {
  tags: ["fpl-league", "fpl-players"],
});
