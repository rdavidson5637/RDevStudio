import type { PublicGameState } from "./public-state";

export function getRemainingSeconds(
  questionStartedAt?: number,
  timeLimitMs?: number,
  fallbackSeconds = 30,
): number {
  if (!questionStartedAt || !timeLimitMs) {
    return fallbackSeconds;
  }

  return Math.max(
    0,
    Math.ceil((timeLimitMs - (Date.now() - questionStartedAt)) / 1000),
  );
}

export function hasPlayerAnswered(
  state: PublicGameState,
  playerId: string,
): boolean {
  if (!state.currentQuestion) {
    return false;
  }

  const player = state.players.find((p) => p.id === playerId);
  return (
    player?.answers.some(
      (answer) => answer.questionId === state.currentQuestion!.id,
    ) ?? false
  );
}
