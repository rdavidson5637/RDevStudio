export const POINTS_BASE = 100;
export const POINTS_SPEED_BONUS_MAX = 50;
export const RISK_WRONG_DEDUCTION = 50;
export const BUZZER_WRONG_DEDUCTION = 50;

export function calculatePoints(
  isCorrect: boolean,
  answerTimeMs: number,
  timeLimitMs: number,
): number {
  if (!isCorrect) {
    return 0;
  }

  const clampedTime = Math.min(Math.max(answerTimeMs, 0), timeLimitMs);
  const remainingRatio = 1 - clampedTime / timeLimitMs;
  const speedBonus = Math.round(remainingRatio * POINTS_SPEED_BONUS_MAX);

  return POINTS_BASE + speedBonus;
}

export function calculateRiskPoints(
  isCorrect: boolean,
  answerTimeMs: number,
  timeLimitMs: number,
): number {
  if (isCorrect) {
    return calculatePoints(true, answerTimeMs, timeLimitMs);
  }

  return -RISK_WRONG_DEDUCTION;
}
