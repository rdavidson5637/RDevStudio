import { randomBytes, randomUUID } from "crypto";

import { DEFAULT_TIME_LIMIT_SECONDS } from "./constants";
import type { GameState, Player, Question, Round } from "./types";
import { RoundFormat } from "./types";

export const QUESTION_TIME_LIMIT_MS = DEFAULT_TIME_LIMIT_SECONDS * 1000;

const GAME_ID_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const DEFAULT_TIME_BY_FORMAT: Record<RoundFormat, number> = {
  [RoundFormat.STANDARD]: 30,
  [RoundFormat.PICTURE]: 40,
  [RoundFormat.MUSIC]: 35,
  [RoundFormat.BUZZER]: 20,
  [RoundFormat.RISK]: 30,
};

export function generateGameId(): string {
  const bytes = randomBytes(6);
  return Array.from(
    bytes,
    (byte) => GAME_ID_CHARS[byte % GAME_ID_CHARS.length],
  ).join("");
}

export function generatePlayerId(): string {
  return randomUUID();
}

export function normalizeAnswer(answer: string): string {
  return answer
    .trim()
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/[^\w\s'-]/g, "")
    .replace(/\s+/g, " ");
}

function stripLeadingArticle(answer: string): string {
  return answer.replace(/^(the|a|an)\s+/i, "");
}

function levenshteinDistance(a: string, b: string): number {
  if (a === b) {
    return 0;
  }

  if (a.length === 0) {
    return b.length;
  }

  if (b.length === 0) {
    return a.length;
  }

  const matrix: number[][] = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0),
  );

  for (let i = 0; i <= a.length; i++) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= b.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  return matrix[a.length][b.length];
}

export function isAnswerCorrect(
  submitted: string,
  correctAnswer: string,
): boolean {
  const normalizedSubmitted = normalizeAnswer(submitted);
  const normalizedCorrect = normalizeAnswer(correctAnswer);

  if (!normalizedSubmitted) {
    return false;
  }

  if (normalizedSubmitted === normalizedCorrect) {
    return true;
  }

  const submittedStripped = stripLeadingArticle(normalizedSubmitted);
  const correctStripped = stripLeadingArticle(normalizedCorrect);

  if (submittedStripped === correctStripped) {
    return true;
  }

  const maxLength = Math.max(submittedStripped.length, correctStripped.length);

  if (maxLength === 0) {
    return false;
  }

  const distance = levenshteinDistance(submittedStripped, correctStripped);
  const threshold = Math.max(1, Math.floor(maxLength / 4));

  return distance <= threshold;
}

export function getTimeLimitMsForRound(round?: Round): number {
  if (!round) {
    return QUESTION_TIME_LIMIT_MS;
  }

  const seconds =
    round.timeLimitSeconds ??
    DEFAULT_TIME_BY_FORMAT[round.format] ??
    DEFAULT_TIME_LIMIT_SECONDS;

  return seconds * 1000;
}

export function stripCorrectAnswer(
  question: Question,
): Omit<Question, "correctAnswer"> {
  const { correctAnswer: _, ...publicQuestion } = question;
  return publicQuestion;
}

export function getSortedPlayers(players: Player[]): Player[] {
  return [...players].sort((a, b) => b.score - a.score);
}

export function allPlayersAnswered(game: GameState): boolean {
  const question = game.questions[game.currentQuestionIndex];
  if (!question) {
    return false;
  }

  return game.players.every((player) =>
    player.answers.some((answer) => answer.questionId === question.id),
  );
}
