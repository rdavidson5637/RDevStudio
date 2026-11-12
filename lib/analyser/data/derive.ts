import { applyAutosubs } from "@/lib/analyser/draft/autosub";
import { availabilityScore, type ReportedSignal, type Status } from "@/lib/analyser/draft/availability";
import { changesBetween, describeChange, type SnapshotRow } from "@/lib/analyser/draft/changes";
import { bestXI, type FormationConstraints, type SquadPlayer } from "@/lib/analyser/draft/optimise";
import {
  projectPoints,
  resolveScoringSettings,
  type ProjectionInput,
  type ScoringSettings,
} from "@/lib/analyser/draft/projection";
import { simulateSeason } from "@/lib/analyser/draft/simulate";
import type { Analyser, Bundle, Cell, Chip, Player, Pos, Side, Slot } from "./types";

const RANK_WORD = ["", "First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth"];

function london(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(iso));
}

const round1 = (n: number) => Math.round(n * 10) / 10;

export function squadForOptimiser(slots: Slot[], ignoreAvailability: boolean): SquadPlayer[] {
  return slots.map((slot) => ({
    id: slot.id,
    webName: slot.name,
    position: slot.position,
    pickPosition: slot.pick,
    projectedPoints: ignoreAvailability ? slot.xp1Fit : slot.xp1,
    availabilityScore: ignoreAvailability ? 100 : slot.availability,
  }));
}

export function buildAnalyser(bundle: Bundle, now: Date): Analyser {
  const settings = resolveScoringSettings(bundle.rules);
  const constraints: FormationConstraints = {
    minDef: bundle.squadRules?.minDef ?? 3,
    maxDef: bundle.squadRules?.maxDef ?? 5,
    minMid: bundle.squadRules?.minMid ?? 2,
    maxMid: bundle.squadRules?.maxMid ?? 5,
    minFwd: bundle.squadRules?.minFwd ?? 1,
    maxFwd: bundle.squadRules?.maxFwd ?? 3,
    totalStarters: bundle.squadRules?.totalStarters ?? 11,
  };
  const teams = new Map(bundle.teams.map((team) => [team.id, team]));
  const current = bundle.events.find((event) => event.current) ?? bundle.events.at(-1);
  if (!current) throw new Error("No gameweeks in the database yet");
  const next = bundle.events.find((event) => event.next) ?? null;
  const deadlinePassed = new Date(current.deadline).getTime() <= now.getTime();
  const decision = deadlinePassed && next ? next : current;
  const horizon = bundle.events.filter((event) => event.id >= decision.id).slice(0, 6).map((event) => event.id);
  const finished = bundle.events.filter((event) => event.finished && event.id < current.id).map((event) => event.id);
  const minuteEvents = finished.slice(-4);
  const defconEvents = finished.slice(-6);
  const gamesPlayed = Math.max(finished.length, 1);

  const owner = new Map(bundle.ownership.map((row) => [row.playerId, row.ownerId]));
  const moves = new Map<number, number>();
  for (const row of bundle.transactions) {
    if (row.elementIn) moves.set(row.elementIn, (moves.get(row.elementIn) ?? 0) + 1);
    if (row.elementOut) moves.set(row.elementOut, (moves.get(row.elementOut) ?? 0) + 1);
  }
  const signals = new Map<number, ReportedSignal>();
  for (const item of bundle.news) {
    if (signals.has(item.playerId) || !isSignal(item.signal)) continue;
    signals.set(item.playerId, { signal: item.signal, confidence: item.confidence ?? 0.5 });
  }

  const xgc = new Map<number, number>();
  for (const team of bundle.teams) {
    const keeper = bundle.players
      .filter((player) => player.teamId === team.id && player.position === 1 && player.xgc90 != null)
      .sort((a, b) => b.minutes - a.minutes)[0];
    xgc.set(team.id, keeper?.xgc90 ?? 1.35);
  }

  const fixturesByTeam = new Map<number, Bundle["fixtures"]>();
  for (const fixture of bundle.fixtures) {
    for (const teamId of [fixture.teamH, fixture.teamA]) {
      const list = fixturesByTeam.get(teamId) ?? [];
      list.push(fixture);
      fixturesByTeam.set(teamId, list);
    }
  }

  const liveNow = new Map(bundle.live.filter((row) => row.event === current.id).map((row) => [row.playerId, row]));
  const history = new Map(bundle.live.map((row) => [`${row.event}:${row.playerId}`, row]));
  const bonus = provisionalBonus(
    bundle.fixtures.filter((fixture) => fixture.event === current.id),
    liveNow,
    new Map(bundle.players.map((player) => [player.id, player.teamId])),
  );

  const statusChanges = recentChanges(bundle.snapshots);
  const players = bundle.players.map((raw): Player => {
    const minutesLast4 = minuteEvents.map((event) => history.get(`${event}:${raw.id}`)?.minutes ?? 0);
    const limit = defconLimit(raw.position, settings);
    let hits = 0;
    let sample = 0;
    for (const event of defconEvents) {
      const row = history.get(`${event}:${raw.id}`);
      if (!row) continue;
      sample += 1;
      if (limit > 0 && row.defcon >= limit) hits += 1;
    }
    const scaledHits = sample > 0 ? Math.round((hits / sample) * 6) : 0;
    const avail = availabilityScore({
      status: (raw.status as Status) || "n",
      news: raw.news,
      newsAdded: raw.newsAdded ? new Date(raw.newsAdded) : null,
      newsReturn: raw.newsReturn ? new Date(raw.newsReturn) : null,
      chanceThisRound: raw.chanceThis,
      chanceNextRound: raw.chanceNext,
      minutesLast4,
      reportedSignal: signals.get(raw.id) ?? null,
      now,
    });
    const trust = Math.min(1, raw.minutes / 450);
    const inputFor = (availabilityScoreValue: number): Omit<ProjectionInput, "fixtureDifficulty" | "isHome"> => ({
      position: raw.position,
      availabilityScore: availabilityScoreValue,
      starts: raw.starts,
      gamesPlayed,
      minutesLast4,
      xG90: Math.min(1.4, (raw.xg90 ?? 0) * trust),
      xA90: Math.min(1, (raw.xa90 ?? 0) * trust),
      defconPer90: (raw.defcon90 ?? 0) * trust,
      defconHitsLast6: scaledHits,
      bpsPer90: raw.minutes >= 180 ? (raw.bps / raw.minutes) * 90 : 0,
      teamXgcPer90: xgc.get(raw.teamId) ?? 1.35,
      pointsPerGame: raw.minutes >= 270 ? raw.ppg : null,
      yellowsPer90: raw.minutes >= 180 ? (raw.yellows / raw.minutes) * 90 : 0,
      redsPer90: raw.minutes >= 180 ? (raw.reds / raw.minutes) * 90 : 0,
      settings,
    });
    const teamFixtures = fixturesByTeam.get(raw.teamId) ?? [];
    const cells = horizon.map((event) => ({
      event,
      chips: chipsFor(raw.teamId, event, teamFixtures, teams),
    }));
    const currentChips = chipsFor(raw.teamId, current.id, teamFixtures, teams);
    const baseInput = inputFor(avail.score);
    const projected = projectCells(baseInput, cells);
    const fit = projectCells(inputFor(100), cells);
    const week = weekParts(baseInput, cells[0]);
    const live = liveNow.get(raw.id);
    const team = teams.get(raw.teamId);
    return {
      id: raw.id,
      name: raw.name,
      teamId: raw.teamId,
      team: team?.short ?? "",
      teamCode: team?.code ?? 0,
      position: raw.position,
      status: raw.status,
      news: raw.news,
      availability: avail.score,
      band: avail.band,
      summary: avail.summary,
      parts: [
        { label: "Status base", value: String(avail.components.base) },
        { label: "Chance blend", value: avail.components.cop == null ? "Not published" : `${avail.components.cop}%` },
        { label: "News", value: avail.components.newsPenalty ? `-${avail.components.newsPenalty}` : "0" },
        { label: "Minutes trend", value: `${avail.components.minutesTrend > 0 ? "+" : ""}${avail.components.minutesTrend}` },
        { label: "Reported", value: `${avail.components.reportedAbsence > 0 ? "+" : ""}${avail.components.reportedAbsence}` },
      ],
      returnInDays: avail.returnInDays,
      form: raw.form,
      pointsPerGame: raw.ppg,
      minutesLast4,
      defconHits: hits,
      defconOf: sample,
      xp1: round1(projected[0] ?? 0),
      xp3: round1(projected.slice(0, 3).reduce((sum, value) => sum + value, 0)),
      xp6: round1(projected.reduce((sum, value) => sum + value, 0)),
      xp1Fit: round1(fit[0] ?? 0),
      draftRank: raw.draftRank,
      totalPoints: raw.totalPoints,
      selected: raw.selected,
      penaltiesOrder: raw.penaltiesOrder,
      cornersOrder: raw.cornersOrder,
      fkOrder: raw.fkOrder,
      epNext: raw.epNext,
      pStart: week.pStart,
      confidence: week.confidence,
      xpParts: week.parts,
      history: statusChanges.get(raw.id) ?? [],
      reports: bundle.news
        .filter((item) => item.playerId === raw.id)
        .slice(0, 4)
        .map((item) => ({
          signal: item.signal.replaceAll("_", " "),
          quote: item.quote,
          sourceName: item.sourceName,
          sourceUrl: item.sourceUrl,
          at: item.at,
        })),
      moves: moves.get(raw.id) ?? 0,
      livePoints: live ? live.points : null,
      liveMinutes: live ? live.minutes : null,
      provisionalBonus: bonus.get(raw.id) ?? 0,
      cells,
      currentOpen: currentChips.some((chip) => chip.open),
      ownerId: owner.has(raw.id) ? (owner.get(raw.id) ?? null) : null,
    };
  });

  const byId = new Map(players.map((player) => [player.id, player]));
  const sides: Side[] = bundle.entries.map((entry) => {
    const squad = bundle.picks
      .filter((pick) => pick.entryId === entry.entryId)
      .flatMap((pick) => {
        const player = byId.get(pick.playerId);
        return player ? [{ ...player, pick: pick.position }] : [];
      })
      .sort((a, b) => a.pick - b.pick);
    const optim = bestXI(squadForOptimiser(squad, false), constraints);
    const autosub = applyAutosubs(
      squad.map((player) => ({
        id: player.id,
        position: player.position,
        pickPosition: player.pick,
        minutes: player.liveMinutes ?? 0,
        fixtureFinished: !player.currentOpen,
        points: (player.livePoints ?? 0) + player.provisionalBonus,
      })),
    );
    const nameOf = (id: number) => squad.find((player) => player.id === id)?.name ?? "A player";
    const fit = (position: Pos) => squad.filter((player) => player.position === position && player.availability >= 60).length;
    const thin = [
      fit(1) < 1 ? "GK" : null,
      fit(2) < 3 ? "DEF" : null,
      fit(3) < 2 ? "MID" : null,
      fit(4) < 1 ? "FWD" : null,
    ].filter((item): item is string => item != null);
    return {
      entryId: entry.entryId,
      name: entry.name,
      manager: entry.manager,
      waiver: entry.waiver,
      rank: entry.rank,
      lastRank: entry.lastRank,
      total: entry.total,
      eventPoints: entry.eventPoints,
      squad,
      projected: round1(optim.projectedTotal),
      live: autosub.points,
      subs: autosub.subs.map((sub) => `${nameOf(sub.in)} on for ${nameOf(sub.out)}`),
      thin,
      reds: squad.filter((player) => player.availability < 40).length,
    };
  });

  sides.sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99) || b.total - a.total);
  const me = sides.find((side) => side.entryId === bundle.myEntryId) ?? sides[0];
  if (!me) throw new Error("No league entries synced yet");
  const leaderGap = Math.max(0, Math.round((sides[0]?.total ?? 0) - me.total));
  const optimisedRaw = bestXI(squadForOptimiser(me.squad, false), constraints);
  const freeAgents = players.filter((player) => player.ownerId == null).sort((a, b) => b.xp3 - a.xp3);
  const seasonWeeks = Math.max(bundle.events.filter((event) => event.id >= decision.id).length, 1);
  const season = simulateSeason(
    sides.map((side) => ({ entryId: side.entryId, currentTotal: side.total, weeklyMean: Math.max(side.projected, 1) })),
    seasonWeeks,
    4000,
  ).map((row) => ({ ...row, name: sides.find((side) => side.entryId === row.entryId)?.name ?? "Team" }));

  const gain = optimisedRaw.gainOverCurrent;
  return {
    leagueName: bundle.leagueName,
    classic: bundle.scoring !== "h",
    updatedAt: bundle.updatedAt,
    current: { id: current.id, name: current.name, deadline: current.deadline, finished: current.finished },
    next: next ? { id: next.id, name: next.name, deadline: next.deadline, waivers: next.waivers } : null,
    decisionEventId: decision.id,
    deadlinePassed,
    horizon,
    headline: headlineFor(me, bundle.leagueName, leaderGap),
    standfirst: standfirstFor(me, current, next, deadlinePassed),
    primary: !deadlinePassed && gain >= 1.5 ? { href: "/draft/squad", label: "Fix the XI" } : { href: "/draft/waivers", label: "Open the waiver wire" },
    me,
    table: sides,
    leaderGap,
    flagged: [...me.squad].filter((player) => player.availability < 75).sort((a, b) => a.availability - b.availability),
    optimised: {
      formation: optimisedRaw.formation,
      total: optimisedRaw.projectedTotal,
      gain,
      close: gain < 1.5,
      risks: optimisedRaw.risks,
      xi: optimisedRaw.xi.map((player) => {
        const full = me.squad.find((slot) => slot.id === player.id);
        return {
          id: player.id,
          name: player.webName,
          team: full?.team ?? "",
          position: player.position,
          xp: player.projectedPoints ?? 0,
          availability: player.availabilityScore,
        };
      }),
      swaps: optimisedRaw.swaps.map((swap) => ({ out: swap.out.webName, in: swap.in.webName, gain: swap.gain })),
    },
    moves: waiverMoves(me.squad, freeAgents),
    gapPlayers: players.some((player) => player.epNext != null)
      ? [...freeAgents].sort((a, b) => b.xp1 - (b.epNext ?? b.xp1) - (a.xp1 - (a.epNext ?? a.xp1))).slice(0, 5)
      : [],
    rising: risingPlayers(bundle.snapshots, byId, now),
    freeAgents,
    timeline: buildTimeline(bundle.snapshots, byId),
    reported: freshReports(bundle.news, byId, now, new Set(me.squad.map((player) => player.id))),
    season: season.sort((a, b) => b.titlePct - a.titlePct),
    seasonWeeks,
    ...postMortem(players.filter((player) => player.ownerId != null), players, sides),
    tradePool: sides.flatMap((side) =>
      side.squad.map((player) => ({
        id: player.id,
        name: player.name,
        entryId: side.entryId,
        owner: side.name,
        position: player.position,
        xp6: player.xp6,
      })),
    ),
  };
}

const PART_LABELS: Record<string, string> = {
  appearance: "Appearance",
  goals: "Goals",
  assists: "Assists",
  cleanSheet: "Clean sheet",
  defcon: "DefCon",
  bonus: "Bonus",
  conceded: "Conceded",
  cards: "Cards",
  recentForm: "Recent form",
};

function weekParts(base: Omit<ProjectionInput, "fixtureDifficulty" | "isHome">, cell: Cell | undefined) {
  const chips = cell?.chips ?? [];
  if (chips.length === 0) {
    const idle = projectPoints({ ...base, fixtureDifficulty: 3, isHome: true });
    return { parts: [] as { label: string; value: number }[], pStart: idle.pStart, confidence: idle.confidence };
  }
  const totals: Record<string, number> = {};
  let pStart = 0;
  let confidence: Player["confidence"] = "low";
  for (const chip of chips) {
    const result = projectPoints({ ...base, fixtureDifficulty: chip.fdr, isHome: chip.side === "H" });
    pStart = result.pStart;
    confidence = result.confidence;
    for (const [key, value] of Object.entries(result.components)) totals[key] = (totals[key] ?? 0) + value;
  }
  const parts = Object.keys(PART_LABELS)
    .filter((key) => Math.abs(totals[key] ?? 0) >= 0.05)
    .map((key) => ({ label: PART_LABELS[key], value: Math.round((totals[key] ?? 0) * 10) / 10 }));
  return { parts, pStart, confidence };
}

function recentChanges(snapshots: Bundle["snapshots"]) {
  const grouped = new Map<number, SnapshotRow[]>();
  for (const row of snapshots) {
    const list = grouped.get(row.playerId) ?? [];
    list.push({
      playerId: row.playerId,
      at: row.at,
      status: row.status,
      news: row.news,
      chanceThis: row.chanceThis,
      chanceNext: row.chanceNext,
    });
    grouped.set(row.playerId, list);
  }
  const out = new Map<number, { text: string; at: string }[]>();
  for (const [playerId, rows] of grouped) {
    rows.sort((a, b) => a.at.localeCompare(b.at));
    const events = [];
    for (let i = 1; i < rows.length; i++) events.push(...changesBetween(rows[i - 1], rows[i]));
    out.set(
      playerId,
      events
        .sort((a, b) => b.at.localeCompare(a.at))
        .slice(0, 5)
        .map((event) => ({ text: describeChange(event), at: event.at })),
    );
  }
  return out;
}

function projectCells(base: Omit<ProjectionInput, "fixtureDifficulty" | "isHome">, cells: Cell[]) {
  return cells.map((cell) =>
    cell.chips.reduce(
      (sum, chip) => sum + projectPoints({ ...base, fixtureDifficulty: chip.fdr, isHome: chip.side === "H" }).xP,
      0,
    ),
  );
}

function chipsFor(
  teamId: number,
  event: number,
  fixtures: Bundle["fixtures"],
  teams: Map<number, Bundle["teams"][number]>,
): Chip[] {
  return fixtures
    .filter((fixture) => fixture.event === event && (fixture.teamH === teamId || fixture.teamA === teamId))
    .map((fixture) => {
      const home = fixture.teamH === teamId;
      const opponent = teams.get(home ? fixture.teamA : fixture.teamH);
      return {
        event,
        opponent: opponent?.short ?? "TBC",
        side: home ? "H" : "A",
        fdr: home ? fixture.fdrH : fixture.fdrA,
        provisional: fixture.kickoff == null,
        open: !fixture.finished,
      };
    });
}

function defconLimit(position: Pos, settings: ScoringSettings) {
  if (position === 2) return settings.defensive_contribution_limit_DEF;
  if (position === 3) return settings.defensive_contribution_limit_MID;
  if (position === 4) return settings.defensive_contribution_limit_FWD;
  return 0;
}

function provisionalBonus(
  fixtures: Bundle["fixtures"],
  live: Map<number, Bundle["live"][number]>,
  teamOf: Map<number, number>,
) {
  const bonus = new Map<number, number>();
  for (const fixture of fixtures) {
    if (!fixture.started || fixture.finished) continue;
    const involved = [...live.values()]
      .filter((row) => {
        const team = teamOf.get(row.playerId);
        return team === fixture.teamH || team === fixture.teamA;
      })
      .sort((a, b) => b.bps - a.bps);
    [3, 2, 1].forEach((points, index) => {
      const row = involved[index];
      if (row && row.bonus === 0) bonus.set(row.playerId, points);
    });
  }
  return bonus;
}

function waiverMoves(squad: Slot[], free: Player[]) {
  const found = ([1, 2, 3, 4] as Pos[]).flatMap((position) => {
    const mine = squad.filter((player) => player.position === position);
    const add = free.find((player) => player.position === position);
    if (!mine.length || !add) return [];
    const drop = [...mine].sort((a, b) => a.xp6 - b.xp6)[0];
    const others = mine.filter((player) => player.id !== drop.id);
    return [{ add, drop, net: round1(add.xp6 - drop.xp6), coverRisk: others.every((player) => player.availability < 60) }];
  });
  return found.sort((a, b) => b.net - a.net);
}

function risingPlayers(snapshots: Bundle["snapshots"], players: Map<number, Player>, now: Date) {
  const since = now.getTime() - 72 * 3600 * 1000;
  const grouped = new Map<number, Bundle["snapshots"]>();
  for (const row of snapshots) {
    if (new Date(row.at).getTime() < since || row.score == null) continue;
    const list = grouped.get(row.playerId) ?? [];
    list.push(row);
    grouped.set(row.playerId, list);
  }
  const scored = [];
  for (const [playerId, rows] of grouped) {
    const player = players.get(playerId);
    if (!player || player.ownerId != null) continue;
    rows.sort((a, b) => a.at.localeCompare(b.at));
    const delta = (rows.at(-1)?.score ?? 0) - (rows[0]?.score ?? 0);
    if (delta > 0) scored.push({ player, delta });
  }
  return scored.sort((a, b) => b.delta - a.delta).slice(0, 3).map((row) => row.player);
}

function buildTimeline(snapshots: Bundle["snapshots"], players: Map<number, Player>) {
  const grouped = new Map<number, SnapshotRow[]>();
  for (const row of snapshots) {
    const list = grouped.get(row.playerId) ?? [];
    list.push({
      playerId: row.playerId,
      at: row.at,
      status: row.status,
      news: row.news,
      chanceThis: row.chanceThis,
      chanceNext: row.chanceNext,
    });
    grouped.set(row.playerId, list);
  }
  const events = [];
  for (const rows of grouped.values()) {
    rows.sort((a, b) => a.at.localeCompare(b.at));
    for (let i = 1; i < rows.length; i++) events.push(...changesBetween(rows[i - 1], rows[i]));
  }
  return events
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, 14)
    .map((event) => ({
      id: event.playerId,
      name: players.get(event.playerId)?.name ?? "Player",
      text: describeChange(event),
      at: event.at,
    }));
}

function postMortem(owned: Player[], all: Player[], sides: Side[]) {
  const ownerName = new Map<number, string>();
  for (const side of sides) for (const player of side.squad) ownerName.set(player.id, side.name);
  const ranked = all.filter((player) => player.draftRank != null);
  const rows = owned
    .filter((player) => player.draftRank != null)
    .map((player) => {
      const peers = ranked.filter((peer) => Math.abs((peer.draftRank ?? 0) - (player.draftRank ?? 0)) <= 25);
      const average = peers.reduce((sum, peer) => sum + peer.totalPoints, 0) / Math.max(peers.length, 1);
      return {
        id: player.id,
        name: player.name,
        owner: ownerName.get(player.id) ?? "",
        draftRank: player.draftRank ?? 0,
        points: player.totalPoints,
        value: round1(player.totalPoints - average),
      };
    });
  return {
    postBest: [...rows].sort((a, b) => b.value - a.value).slice(0, 8),
    postWorst: [...rows].sort((a, b) => a.value - b.value).slice(0, 8),
  };
}

function headlineFor(me: Side, league: string, gap: number) {
  if (!me.rank) return league;
  if (me.rank === 1) return `Top of ${league}.`;
  return `${RANK_WORD[me.rank] ?? `${me.rank}th`} in ${league}, ${gap} points off the lead.`;
}

function standfirstFor(
  me: Side,
  current: Bundle["events"][number],
  next: Bundle["events"][number] | null,
  deadlinePassed: boolean,
) {
  const who = `${me.name}, managed by ${me.manager}.`;
  const waiver = me.waiver ? ` You hold waiver ${me.waiver}.` : "";
  if (deadlinePassed && next) {
    return `${who} ${current.name} is already underway, so this lineup is locked. The next decision is the ${next.name} deadline, ${london(next.deadline)}.${waiver}`;
  }
  return `${who} ${current.name} locks ${london(current.deadline)}.${waiver}`;
}

function freshReports(news: Bundle["news"], players: Map<number, Player>, now: Date, squadIds: Set<number>) {
  const cutoff = now.getTime() - 8 * 24 * 3600 * 1000;
  const newest = new Map<number, Bundle["news"][number]>();
  for (const item of news) {
    if (!item.at || Date.parse(item.at) < cutoff) continue;
    const previous = newest.get(item.playerId);
    if (!previous || item.at > (previous.at ?? "")) newest.set(item.playerId, item);
  }
  return [...newest.values()]
    .sort((a, b) => {
      const mine = Number(squadIds.has(b.playerId)) - Number(squadIds.has(a.playerId));
      return mine || (b.at ?? "").localeCompare(a.at ?? "");
    })
    .slice(0, 5)
    .map((item) => ({
      id: item.playerId,
      name: players.get(item.playerId)?.name ?? "Player",
      signal: item.signal.replaceAll("_", " "),
      quote: item.quote,
      sourceName: item.sourceName,
      sourceUrl: item.sourceUrl,
      at: item.at,
    }));
}

function isSignal(value: string): value is ReportedSignal["signal"] {
  return ["trained", "missed_training", "doubt", "ruled_out", "returned", "rested"].includes(value);
}
