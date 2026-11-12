import "server-only";
import { unstable_cache } from "next/cache";
import { buildAnalyser } from "@/lib/analyser/data/derive";
import type { Bundle, Pos } from "@/lib/analyser/data/types";
import { getLeagueDetails } from "@/lib/analyser/fpl/client";
import { entryId, leagueId, parseNum } from "@/lib/analyser/fpl/config";
import { supabaseAdmin } from "@/lib/supabase/admin";

async function rows<T>(table: string, select: string, filter?: (query: any) => any): Promise<T[]> {
  const db = supabaseAdmin;
  const out: T[] = [];
  for (let from = 0; ; from += 1000) {
    let query = db.from(table).select(select).range(from, from + 999);
    if (filter) query = filter(query);
    const { data, error } = await query;
    if (error) throw new Error(`${table}: ${error.message}`);
    const chunk = (data ?? []) as T[];
    out.push(...chunk);
    if (chunk.length < 1000) break;
  }
  return out;
}

function titleCase(value: string) {
  return value.replace(/\b[\p{L}]/gu, (letter) => letter.toUpperCase());
}

async function fetchBundle(): Promise<Bundle> {
  const db = supabaseAdmin;
  const since = new Date(Date.now() - 5 * 86_400_000).toISOString();
  const [events, teams, players, fixtures, entries, ownership, live, transactions, snapshots, news, settings] = await Promise.all([
    rows<{ id: number; name: string; deadline_time: string; finished: boolean; is_current: boolean; is_next: boolean; waivers_time: string | null }>(
      "fpl_events",
      "id, name, deadline_time, finished, is_current, is_next, waivers_time",
    ),
    rows<{ id: number; code: number; name: string; short_name: string }>("fpl_teams", "id, code, name, short_name"),
    rows<Record<string, unknown>>(
      "fpl_players",
      "id, team_id, web_name, element_type, status, news, news_added, news_return, chance_of_playing_this_round, chance_of_playing_next_round, draft_rank, total_points, form, points_per_game, ep_next, minutes, starts, yellow_cards, red_cards, bps, expected_goals_per_90, expected_assists_per_90, defensive_contribution_per_90, expected_goals_conceded_per_90, selected_by_percent, penalties_order, corners_and_indirect_freekicks_order, direct_freekicks_order, updated_at",
    ),
    rows<Record<string, unknown>>(
      "fpl_fixtures",
      "event, kickoff_time, team_h, team_a, team_h_difficulty, team_a_difficulty, started, finished",
    ),
    rows<Record<string, unknown>>(
      "fpl_league_entries",
      "entry_id, entry_name, player_first_name, player_last_name, waiver_pick, rank, last_rank, total_points, event_points",
    ),
    rows<{ player_id: number; owner_entry_id: number | null }>("fpl_ownership", "player_id, owner_entry_id"),
    rows<Record<string, unknown>>("fpl_live_stats", "event, player_id, total_points, minutes, bps, stats"),
    rows<{ element_in: number | null; element_out: number | null }>("fpl_transactions", "element_in, element_out"),
    rows<Record<string, unknown>>("fpl_player_snapshots", "player_id, captured_at, status, news, chance_of_playing_this_round, chance_of_playing_next_round, availability_score", (query) =>
      query.gte("captured_at", since).order("captured_at", { ascending: false }),
    ),
    rows<Record<string, unknown>>("fpl_news_items", "player_id, signal, confidence, quote, source_name, source_url, published_at", (query) =>
      query.order("published_at", { ascending: false }).limit(40),
    ),
    db.from("fpl_settings").select("scoring, squad").eq("id", 1).maybeSingle(),
  ]);

  const current = events.find((event) => event.is_current);
  const picks = current
    ? await rows<{ entry_id: number; player_id: number; position: number }>(
        "fpl_picks",
        "entry_id, player_id, position",
        (query) => query.eq("event", current.id),
      )
    : [];

  let leagueName = "Academy FC";
  let scoring = "c";
  const entryRows = entries.map((row) => ({
    entryId: Number(row.entry_id),
    name: String(row.entry_name),
    manager: titleCase(`${row.player_first_name ?? ""} ${row.player_last_name ?? ""}`.trim()),
    waiver: row.waiver_pick == null ? null : Number(row.waiver_pick),
    rank: row.rank == null ? null : Number(row.rank),
    lastRank: row.last_rank == null ? null : Number(row.last_rank),
    total: Number(row.total_points ?? 0),
    eventPoints: Number(row.event_points ?? 0),
  }));

  if (entryRows.some((row) => row.rank == null)) {
    try {
      const details = await getLeagueDetails(leagueId());
      leagueName = details.league.name;
      scoring = details.league.scoring;
      const byLeagueEntry = new Map(details.league_entries.map((entry) => [entry.entry_id, entry]));
      const standing = new Map(details.standings.map((row) => [row.league_entry, row]));
      for (const row of entryRows) {
        const entry = byLeagueEntry.get(row.entryId);
        const place = entry ? standing.get(entry.id) : undefined;
        if (!place) continue;
        row.rank = place.rank;
        row.lastRank = place.last_rank;
        row.total = place.total;
        row.eventPoints = place.event_total;
      }
    } catch {
      // Standings already on the row are enough if the API is down.
    }
  } else {
    try {
      const details = await getLeagueDetails(leagueId());
      leagueName = details.league.name;
      scoring = details.league.scoring;
    } catch {
      leagueName = "Academy FC";
    }
  }

  const squad = (settings.data?.squad ?? {}) as Record<string, number>;
  const updatedAt = players.reduce<string | null>((latest, row) => {
    const value = row.updated_at ? String(row.updated_at) : null;
    if (!value) return latest;
    if (!latest || value > latest) return value;
    return latest;
  }, null);

  return {
    leagueName,
    scoring,
    updatedAt,
    myEntryId: entryId(),
    events: events
      .map((event) => ({
        id: event.id,
        name: event.name,
        deadline: event.deadline_time,
        finished: event.finished,
        current: event.is_current,
        next: event.is_next,
        waivers: event.waivers_time,
      }))
      .sort((a, b) => a.id - b.id),
    teams: teams.map((team) => ({ id: team.id, code: team.code, name: team.name, short: team.short_name })),
    players: players.map((row) => ({
      id: Number(row.id),
      teamId: Number(row.team_id),
      name: String(row.web_name),
      position: Number(row.element_type) as Pos,
      status: String(row.status ?? "a"),
      news: row.news ? String(row.news) : null,
      newsAdded: row.news_added ? String(row.news_added) : null,
      newsReturn: row.news_return ? String(row.news_return) : null,
      chanceThis: parseNum(row.chance_of_playing_this_round),
      chanceNext: parseNum(row.chance_of_playing_next_round),
      draftRank: parseNum(row.draft_rank),
      totalPoints: Number(row.total_points ?? 0),
      form: parseNum(row.form),
      ppg: parseNum(row.points_per_game),
      epNext: parseNum(row.ep_next),
      minutes: Number(row.minutes ?? 0),
      starts: Number(row.starts ?? 0),
      yellows: Number(row.yellow_cards ?? 0),
      reds: Number(row.red_cards ?? 0),
      bps: Number(row.bps ?? 0),
      xg90: parseNum(row.expected_goals_per_90),
      xa90: parseNum(row.expected_assists_per_90),
      defcon90: parseNum(row.defensive_contribution_per_90),
      xgc90: parseNum(row.expected_goals_conceded_per_90),
      selected: parseNum(row.selected_by_percent),
      penaltiesOrder: parseNum(row.penalties_order),
      cornersOrder: parseNum(row.corners_and_indirect_freekicks_order),
      fkOrder: parseNum(row.direct_freekicks_order),
    })),
    fixtures: fixtures.map((row) => ({
      event: row.event == null ? null : Number(row.event),
      kickoff: row.kickoff_time ? String(row.kickoff_time) : null,
      teamH: Number(row.team_h),
      teamA: Number(row.team_a),
      fdrH: Number(row.team_h_difficulty ?? 3),
      fdrA: Number(row.team_a_difficulty ?? 3),
      started: Boolean(row.started),
      finished: Boolean(row.finished),
    })),
    entries: entryRows,
    picks: picks.map((row) => ({ entryId: row.entry_id, playerId: row.player_id, position: row.position })),
    ownership: ownership.map((row) => ({ playerId: row.player_id, ownerId: row.owner_entry_id })),
    live: live.map((row) => {
      const stats = (row.stats ?? {}) as { bonus?: number; defensive_contribution?: number };
      return {
        event: Number(row.event),
        playerId: Number(row.player_id),
        points: Number(row.total_points ?? 0),
        minutes: Number(row.minutes ?? 0),
        bps: Number(row.bps ?? 0),
        bonus: Number(stats.bonus ?? 0),
        defcon: Number(stats.defensive_contribution ?? 0),
      };
    }),
    transactions: transactions.map((row) => ({ elementIn: row.element_in, elementOut: row.element_out })),
    snapshots: snapshots.map((row) => ({
      playerId: Number(row.player_id),
      at: String(row.captured_at),
      status: row.status ? String(row.status) : null,
      news: row.news ? String(row.news) : null,
      chanceThis: parseNum(row.chance_of_playing_this_round),
      chanceNext: parseNum(row.chance_of_playing_next_round),
      score: parseNum(row.availability_score),
    })),
    news: news.map((row) => ({
      playerId: Number(row.player_id),
      signal: String(row.signal),
      confidence: parseNum(row.confidence),
      quote: row.quote ? String(row.quote) : null,
      sourceName: row.source_name ? String(row.source_name) : null,
      sourceUrl: row.source_url ? String(row.source_url) : null,
      at: row.published_at ? String(row.published_at) : null,
    })),
    rules: (settings.data?.scoring as Bundle["rules"]) ?? null,
    squadRules: squad.min_play_DEF
      ? {
          minDef: squad.min_play_DEF,
          maxDef: squad.max_play_DEF,
          minMid: squad.min_play_MID,
          maxMid: squad.max_play_MID,
          minFwd: squad.min_play_FWD,
          maxFwd: squad.max_play_FWD,
          totalStarters: squad.play,
        }
      : null,
  };
}

export const getAnalyser = unstable_cache(async () => buildAnalyser(await fetchBundle(), new Date()), ["analyser-site-v1"], {
  revalidate: 30,
  tags: ["fpl-players", "fpl-league", "fpl-fixtures", "fpl-ownership", "fpl-live"],
});

export async function findPlayer(id: number) {
  const analyser = await getAnalyser();
  const owned = analyser.table.flatMap((side) => side.squad.map((player) => ({ player, side })));
  const mine = owned.find((row) => row.player.id === id);
  if (mine) return { player: mine.player, owner: mine.side.name, analyser };
  const free = analyser.freeAgents.find((player) => player.id === id);
  if (free) return { player: free, owner: null as string | null, analyser };
  return null;
}
