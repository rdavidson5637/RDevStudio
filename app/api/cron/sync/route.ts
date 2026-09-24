import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { chunk, parseDate, parseNum } from "@/lib/fpl/parse";
import { captureSnapshots } from "@/lib/fpl/snapshots";
import { availabilityScore, type Status } from "@/lib/draft/availability";
import { projectPoints, resolveScoringSettings } from "@/lib/draft/projection";
import {
  getDraftBootstrap,
  getElementStatus,
  getFixtures,
  getFplBootstrap,
  getGameState,
  getLeagueDetails,
  getEntryPicks,
  getTransactions,
} from "@/lib/fpl/client";
import { ingestNewsLayer } from "@/lib/draft/news/ingest";
import { getLatestSignalsForPlayers } from "@/lib/draft/news/queries";
import { refreshLiveBoard } from "@/lib/draft/live";
import { sendDeadlineAlerts } from "@/lib/draft/alerts";
import { unauthorized } from "@/lib/draft/cron-auth";
import type { DraftElement } from "@/lib/fpl/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CHUNK_SIZE = 200;
const PICKS_DELAY_MS = 250;

type StepError = { step: string; message: string };

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function upsertChunked(
  table: string,
  rows: Record<string, unknown>[],
  onConflict: string,
): Promise<number> {
  let written = 0;
  for (const batch of chunk(rows, CHUNK_SIZE)) {
    if (batch.length === 0) continue;
    const { error } = await supabaseAdmin.from(table).upsert(batch, { onConflict });
    if (error) throw new Error(`${table} upsert failed: ${error.message}`);
    written += batch.length;
  }
  return written;
}

function mapDraftElementToPlayerRow(el: DraftElement, updatedAt: string) {
  return {
    id: el.id,
    code: el.code,
    web_name: el.web_name,
    first_name: el.first_name,
    second_name: el.second_name,
    team_id: el.team,
    element_type: el.element_type,
    status: el.status,
    news: el.news,
    news_added: parseDate(el.news_added),
    news_return: parseDate(el.news_return),
    chance_of_playing_this_round: el.chance_of_playing_this_round,
    chance_of_playing_next_round: el.chance_of_playing_next_round,
    draft_rank: el.draft_rank,
    total_points: el.total_points,
    event_points: el.event_points,
    points_per_game: parseNum(el.points_per_game),
    form: parseNum(el.form),
    ep_this: parseNum(el.ep_this),
    ep_next: parseNum(el.ep_next),
    minutes: el.minutes,
    starts: el.starts,
    goals_scored: el.goals_scored,
    assists: el.assists,
    clean_sheets: el.clean_sheets,
    goals_conceded: el.goals_conceded,
    own_goals: el.own_goals,
    penalties_saved: el.penalties_saved,
    penalties_missed: el.penalties_missed,
    yellow_cards: el.yellow_cards,
    red_cards: el.red_cards,
    saves: el.saves,
    bonus: el.bonus,
    bps: el.bps,
    influence: parseNum(el.influence),
    creativity: parseNum(el.creativity),
    threat: parseNum(el.threat),
    ict_index: parseNum(el.ict_index),
    expected_goals: parseNum(el.expected_goals),
    expected_assists: parseNum(el.expected_assists),
    expected_goal_involvements: parseNum(el.expected_goal_involvements),
    expected_goals_conceded: parseNum(el.expected_goals_conceded),
    defensive_contribution: el.defensive_contribution,
    tackles: el.tackles,
    recoveries: el.recoveries,
    clearances_blocks_interceptions: el.clearances_blocks_interceptions,
    penalties_order: el.penalties_order,
    penalties_text: el.penalties_text,
    corners_and_indirect_freekicks_order: el.corners_and_indirect_freekicks_order,
    direct_freekicks_order: el.direct_freekicks_order,
    updated_at: updatedAt,
  };
}

export async function GET(request: NextRequest) {
  const started = Date.now();
  // Shared helper: refuses everything when CRON_SECRET is unset, instead of
  // accepting the literal header "Bearer undefined".
  if (unauthorized(request.headers.get("authorization"))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let leagueId: number;
  try {
    const config = await import("@/lib/fpl/config");
    leagueId = config.FPL_DRAFT_LEAGUE_ID;
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Missing FPL config" },
      { status: 500 },
    );
  }

  const errors: StepError[] = [];
  const counts = {
    players: 0,
    teams: 0,
    fixtures: 0,
    entries: 0,
    matches: 0,
    ownership: 0,
    transactions: 0,
    picks: 0,
    projections: 0,
  };

  let currentEvent: number | null = null;
  let nextEvent: number | null = null;

  // 1. Game state
  try {
    const game = await getGameState();
    currentEvent = game.current_event;
    nextEvent = game.next_event;
  } catch (err) {
    errors.push({ step: "getGameState", message: String(err) });
  }

  // 2. Draft bootstrap -> teams, events, players. Each upsert gets its own
  // try/catch so, e.g., a teams failure doesn't also swallow events/players.
  let bootstrap: Awaited<ReturnType<typeof getDraftBootstrap>> | null = null;
  try {
    bootstrap = await getDraftBootstrap();
  } catch (err) {
    errors.push({ step: "getDraftBootstrap", message: String(err) });
  }

  if (bootstrap) {
    const now = new Date().toISOString();

    try {
      // The draft API's teams only carry identity fields (id, code, name,
      // short_name, pulse_id) - no strength_* columns, and pulse_id isn't
      // in our schema. Strength gets filled in from the main API below.
      counts.teams = await upsertChunked(
        "fpl_teams",
        bootstrap.teams.map((t) => ({
          id: t.id,
          code: t.code,
          name: t.name,
          short_name: t.short_name,
          updated_at: now,
        })),
        "id",
      );
    } catch (err) {
      errors.push({ step: "upsert fpl_teams", message: String(err) });
    }

    try {
      await upsertChunked(
        "fpl_events",
        bootstrap.events.data.map((e) => ({
          id: e.id,
          name: e.name,
          deadline_time: parseDate(e.deadline_time),
          finished: e.finished,
          is_current: e.id === currentEvent,
          is_next: e.id === nextEvent,
          waivers_time: parseDate(e.waivers_time),
        })),
        "id",
      );
    } catch (err) {
      errors.push({ step: "upsert fpl_events", message: String(err) });
    }

    try {
      counts.players = await upsertChunked(
        "fpl_players",
        bootstrap.elements.map((el) => mapDraftElementToPlayerRow(el, now)),
        "id",
      );
    } catch (err) {
      errors.push({ step: "upsert fpl_players", message: String(err) });
    }

    // 3. Snapshot capture, right after the players upsert (prompt 04)
    try {
      await captureSnapshots(bootstrap.elements);
    } catch (err) {
      errors.push({ step: "captureSnapshots", message: String(err) });
    }
  }

  // 4. Main FPL bootstrap -> per-90 columns (matched on player CODE not id)
  // and team strength (the draft API's teams don't carry it at all).
  try {
    const fplBootstrap = await getFplBootstrap();

    try {
      await upsertChunked(
        "fpl_teams",
        fplBootstrap.teams.map((t) => ({
          id: t.id,
          strength: t.strength,
          strength_overall_home: t.strength_overall_home,
          strength_overall_away: t.strength_overall_away,
          strength_attack_home: t.strength_attack_home,
          strength_attack_away: t.strength_attack_away,
          strength_defence_home: t.strength_defence_home,
          strength_defence_away: t.strength_defence_away,
        })),
        "id",
      );
    } catch (err) {
      errors.push({ step: "upsert fpl_teams strength", message: String(err) });
    }

    const { data: existing, error: lookupError } = await supabaseAdmin
      .from("fpl_players")
      .select("id, code");
    if (lookupError) throw new Error(lookupError.message);

    const idByCode = new Map<number, number>(
      (existing ?? []).map((row: { id: number; code: number }) => [row.code, row.id]),
    );

    const rows: Record<string, unknown>[] = [];
    let unmatched = 0;
    for (const el of fplBootstrap.elements) {
      const id = idByCode.get(el.code);
      if (id === undefined) {
        unmatched += 1;
        continue;
      }
      rows.push({
        id,
        expected_goals_per_90: parseNum(el.expected_goals_per_90),
        expected_assists_per_90: parseNum(el.expected_assists_per_90),
        defensive_contribution_per_90: parseNum(el.defensive_contribution_per_90),
        starts_per_90: parseNum(el.starts_per_90),
        expected_goals_conceded_per_90: parseNum(el.expected_goals_conceded_per_90),
        selected_by_percent: parseNum(el.selected_by_percent),
      });
    }
    await upsertChunked("fpl_players", rows, "id");
    if (unmatched > 0) {
      errors.push({
        step: "getFplBootstrap",
        message: `${unmatched} player(s) from the main API had no matching code in fpl_players`,
      });
    }
  } catch (err) {
    errors.push({ step: "getFplBootstrap", message: String(err) });
  }

  // 5. Fixtures
  try {
    const fixtures = await getFixtures();
    counts.fixtures = await upsertChunked(
      "fpl_fixtures",
      fixtures.map((f) => ({
        id: f.id,
        event: f.event,
        kickoff_time: parseDate(f.kickoff_time),
        team_h: f.team_h,
        team_a: f.team_a,
        team_h_score: f.team_h_score,
        team_a_score: f.team_a_score,
        team_h_difficulty: f.team_h_difficulty,
        team_a_difficulty: f.team_a_difficulty,
        started: f.started,
        finished: f.finished,
        finished_provisional: f.finished_provisional,
        minutes: f.minutes,
      })),
      "id",
    );
  } catch (err) {
    errors.push({ step: "getFixtures", message: String(err) });
  }

  // 6. League details -> entries, H2H matches
  let leagueEntryIds: number[] = [];
  try {
    const details = await getLeagueDetails(leagueId);
    leagueEntryIds = details.league_entries.map((e) => e.entry_id);

    counts.entries = await upsertChunked(
      "fpl_league_entries",
      details.league_entries.map((e) => ({
        entry_id: e.entry_id,
        entry_name: e.entry_name,
        player_first_name: e.player_first_name,
        player_last_name: e.player_last_name,
        short_name: e.short_name,
        waiver_pick: e.waiver_pick,
      })),
      "entry_id",
    );

    // Classic-scoring leagues (this one included) don't return a `matches`
    // array at all - only head-to-head leagues get a fixture schedule here.
    const matches = details.matches ?? [];
    if (matches.length > 0) {
      counts.matches = await upsertChunked(
        "fpl_league_matches",
        matches.map((m) => ({
          event: m.event,
          entry_1_entry: m.entry_1_entry,
          entry_1_points: m.entry_1_points,
          entry_2_entry: m.entry_2_entry,
          entry_2_points: m.entry_2_points,
          finished: m.finished,
        })),
        "event,entry_1_entry,entry_2_entry",
      );
    }
  } catch (err) {
    errors.push({ step: "getLeagueDetails", message: String(err) });
  }

  // 7. Ownership - full snapshot, not a delta: replace wholesale.
  try {
    const statusResponse = await getElementStatus(leagueId);
    const rows = statusResponse.element_status.map((row) => ({
      player_id: row.element,
      owner_entry_id: row.owner,
      status: row.status,
      in_accepted_trade: row.in_accepted_trade,
      updated_at: new Date().toISOString(),
    }));

    // No multi-statement transaction over PostgREST, so this is delete-then-
    // insert rather than a single atomic swap. This runs once a day and
    // briefly-empty rows here are an acceptable tradeoff over the added
    // complexity of a database function.
    const { error: deleteError } = await supabaseAdmin
      .from("fpl_ownership")
      .delete()
      .neq("player_id", -1);
    if (deleteError) throw new Error(deleteError.message);

    counts.ownership = await upsertChunked("fpl_ownership", rows, "player_id");
  } catch (err) {
    errors.push({ step: "getElementStatus", message: String(err) });
  }

  // 8. Transactions
  try {
    const transactions = await getTransactions(leagueId);
    counts.transactions = await upsertChunked(
      "fpl_transactions",
      transactions.map((t) => ({
        id: t.id,
        entry_id: t.entry,
        event: t.event,
        element_in: t.element_in,
        element_out: t.element_out,
        kind: t.kind,
        priority: t.priority,
        result: t.result,
        added: parseDate(t.added),
      })),
      "id",
    );
  } catch (err) {
    errors.push({ step: "getTransactions", message: String(err) });
  }

  // 9. Picks per entry for the current event, 250ms apart.
  if (currentEvent != null && leagueEntryIds.length > 0) {
    const event = currentEvent; // narrow to number once; `let` doesn't narrow inside closures
    for (const entryId of leagueEntryIds) {
      try {
        const picks = await getEntryPicks(entryId, event);
        counts.picks += await upsertChunked(
          "fpl_picks",
          picks.picks.map((p) => ({
            entry_id: entryId,
            event,
            player_id: p.element,
            position: p.position,
            multiplier: p.multiplier,
          })),
          "entry_id,event,player_id",
        );
      } catch (err) {
        errors.push({ step: `getEntryPicks(${entryId})`, message: String(err) });
      }
      await sleep(PICKS_DELAY_MS);
    }
  } else if (currentEvent == null) {
    errors.push({ step: "picks", message: "Skipped: no current event from getGameState" });
  }

  // 10. Projections for the entry's own squad at the current event. The
  // availability and projection engines are pure functions - this just
  // wires them up with real data and stores the result. Scoped to the
  // squad rather than the full player pool for now; the waiver wire will
  // need the full pool later.
  if (currentEvent != null) {
    try {
      const myEntryId = (await import("@/lib/fpl/config")).FPL_DRAFT_ENTRY_ID;

      const { data: myPicks } = await supabaseAdmin
        .from("fpl_picks")
        .select("player_id")
        .eq("entry_id", myEntryId)
        .eq("event", currentEvent);

      const projectionPlayerIds = (myPicks ?? []).map((p) => p.player_id);

      if (projectionPlayerIds.length > 0) {
        const { data: projPlayers } = await supabaseAdmin
          .from("fpl_players")
          .select(
            "id, element_type, status, news, news_added, news_return, chance_of_playing_this_round, chance_of_playing_next_round, starts_per_90, expected_goals_per_90, expected_assists_per_90, defensive_contribution_per_90, bps, minutes, team_id",
          )
          .in("id", projectionPlayerIds);

        const projTeamIds = Array.from(new Set((projPlayers ?? []).map((p) => p.team_id)));

        const { data: projFixtures } = await supabaseAdmin
          .from("fpl_fixtures")
          .select("event, team_h, team_a, team_h_difficulty, team_a_difficulty")
          .gte("event", currentEvent)
          .or(`team_h.in.(${projTeamIds.join(",")}),team_a.in.(${projTeamIds.join(",")})`)
          .order("event", { ascending: true });

        const nextFixtureByTeam = new Map<number, { difficulty: number; isHome: boolean }>();
        for (const fixture of projFixtures ?? []) {
          for (const teamId of projTeamIds) {
            if (nextFixtureByTeam.has(teamId)) continue;
            if (fixture.team_h === teamId) {
              nextFixtureByTeam.set(teamId, { difficulty: fixture.team_h_difficulty, isHome: true });
            } else if (fixture.team_a === teamId) {
              nextFixtureByTeam.set(teamId, { difficulty: fixture.team_a_difficulty, isHome: false });
            }
          }
        }

        const scoring = resolveScoringSettings(bootstrap?.settings?.scoring);
        const now = new Date();
        const projectionRows: Record<string, unknown>[] = [];
        const signals = await getLatestSignalsForPlayers(projectionPlayerIds);

        for (const player of projPlayers ?? []) {
          const fixture = nextFixtureByTeam.get(player.team_id);
          if (!fixture) continue;

          const avail = availabilityScore({
            status: player.status as Status,
            news: player.news,
            newsAdded: player.news_added ? new Date(player.news_added) : null,
            newsReturn: player.news_return ? new Date(player.news_return) : null,
            chanceThisRound: player.chance_of_playing_this_round,
            chanceNextRound: player.chance_of_playing_next_round,
            minutesLast4: [],
            reportedSignal: signals.get(player.id) ?? null,
            now,
          });

          const bpsPer90 = player.minutes > 0 ? (player.bps / player.minutes) * 90 : 0;

          const projection = projectPoints({
            position: player.element_type as 1 | 2 | 3 | 4,
            availabilityScore: avail.score,
            startsPer90: parseNum(player.starts_per_90) ?? 0,
            xG90: parseNum(player.expected_goals_per_90) ?? 0,
            xA90: parseNum(player.expected_assists_per_90) ?? 0,
            defconPer90: parseNum(player.defensive_contribution_per_90) ?? 0,
            bpsPer90,
            fixtureDifficulty: fixture.difficulty,
            isHome: fixture.isHome,
            settings: scoring,
          });

          projectionRows.push({
            player_id: player.id,
            event: currentEvent,
            projected_points: projection.xP,
            p_start: projection.pStart,
            components: projection.components,
          });
        }

        counts.projections = await upsertChunked("fpl_projections", projectionRows, "player_id,event");
      }
    } catch (err) {
      errors.push({ step: "projections", message: String(err) });
    }
  }

  const extras: Record<string, unknown> = {};
  try {
    extras.news = await ingestNewsLayer();
  } catch (err) {
    errors.push({ step: "ingestNewsLayer", message: String(err) });
  }

  if (currentEvent != null) {
    try {
      const myEntryId = (await import("@/lib/fpl/config")).FPL_DRAFT_ENTRY_ID;
      extras.live = await refreshLiveBoard(currentEvent, myEntryId, { force: true });
    } catch (err) {
      errors.push({ step: "refreshLiveBoard", message: String(err) });
    }
  }

  try {
    extras.deadline = await sendDeadlineAlerts();
  } catch (err) {
    errors.push({ step: "sendDeadlineAlerts", message: String(err) });
  }

  if (errors.length === 0) {
    revalidateTag("fpl-players");
    revalidateTag("fpl-league");
    revalidateTag("fpl-fixtures");
    revalidateTag("fpl-ownership");
    revalidateTag("fpl-live");
  }

  return NextResponse.json({
    ok: errors.length === 0,
    durationMs: Date.now() - started,
    currentEvent,
    nextEvent,
    counts,
    extras,
    errors,
  });
}
