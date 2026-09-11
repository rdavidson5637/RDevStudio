import type { Position, ProjectionInput, ScoringSettings } from "./projection";
import { FALLBACK_SCORING, projectRange } from "./projection";
import { availabilityScore, type ReportedSignal, type Status } from "./availability";

export type ProjectablePlayer = {
  id: number;
  element_type: number;
  status: string;
  news: string | null;
  news_added: string | null;
  news_return: string | null;
  chance_of_playing_this_round: number | null;
  chance_of_playing_next_round: number | null;
  starts_per_90: number | string | null;
  expected_goals_per_90: number | string | null;
  expected_assists_per_90: number | string | null;
  defensive_contribution_per_90: number | string | null;
  bps: number | null;
  minutes: number | null;
};

function num(value: number | string | null | undefined): number {
  if (value == null || value === "") return 0;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}

export function availabilityFor(
  player: ProjectablePlayer,
  now = new Date(),
  reportedSignal?: ReportedSignal | null,
) {
  return availabilityScore({
    status: player.status as Status,
    news: player.news,
    newsAdded: player.news_added ? new Date(player.news_added) : null,
    newsReturn: player.news_return ? new Date(player.news_return) : null,
    chanceThisRound: player.chance_of_playing_this_round,
    chanceNextRound: player.chance_of_playing_next_round,
    minutesLast4: [],
    reportedSignal,
    now,
  });
}

export function projectionBase(
  player: ProjectablePlayer,
  availability: number,
  settings: ScoringSettings = FALLBACK_SCORING,
): Omit<ProjectionInput, "fixtureDifficulty" | "isHome"> {
  const minutes = num(player.minutes);
  return {
    position: player.element_type as Position,
    availabilityScore: availability,
    startsPer90: num(player.starts_per_90),
    xG90: num(player.expected_goals_per_90),
    xA90: num(player.expected_assists_per_90),
    defconPer90: num(player.defensive_contribution_per_90),
    bpsPer90: minutes > 0 ? (num(player.bps) / minutes) * 90 : 0,
    settings,
  };
}

export function projectWindow(
  player: ProjectablePlayer,
  fixtures: { event: number; difficulty: number; isHome: boolean }[],
  availability = availabilityFor(player).score,
  settings: ScoringSettings = FALLBACK_SCORING,
): { gw1: number; gw3: number; gw6: number; byEvent: { event: number; xP: number }[] } {
  const byEvent = projectRange(projectionBase(player, availability, settings), fixtures);
  const sumN = (n: number) =>
    byEvent.slice(0, n).reduce((total, row) => total + row.xP, 0);
  return {
    gw1: Number((byEvent[0]?.xP ?? 0).toFixed(2)),
    gw3: Number(sumN(3).toFixed(2)),
    gw6: Number(sumN(6).toFixed(2)),
    byEvent,
  };
}
