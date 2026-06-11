import type { GameState } from "./types";

export function resumeGameTimer(game: GameState): number {
  if (game.timerPausedAt) {
    const pauseDuration = Date.now() - game.timerPausedAt;
    game.questionStartedAt = (game.questionStartedAt ?? Date.now()) + pauseDuration;
    game.timerPausedAt = undefined;
  }

  return game.questionStartedAt ?? Date.now();
}

export function pauseGameTimer(game: GameState): number {
  const pausedAt = Date.now();
  game.timerPausedAt = pausedAt;
  return pausedAt;
}

export function resetBuzzerState(game: GameState): void {
  game.activeBuzz = null;
  game.buzzLockedOutPlayerIds = [];
  game.buzzLockedOutTeamIds = [];
  game.timerPausedAt = undefined;
}
