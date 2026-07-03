import { generateQuestionsForRound } from "./questions";
import { createDefaultRound } from "./rounds";
import { getSortedTeams } from "./teams";
import type { GameState, Question } from "./types";
import { QuizCategory, RoundFormat } from "./types";
import { getSortedPlayers } from "./utils";

export function hasTieAtTop(game: GameState): boolean {
  if (game.teamMode && game.teams && game.teams.length >= 2) {
    const sorted = getSortedTeams(game.teams);
    return sorted[0].score === sorted[1].score && sorted[0].score > 0;
  }

  const sorted = getSortedPlayers(game.players);

  if (sorted.length < 2) {
    return false;
  }

  return sorted[0].score === sorted[1].score && sorted[0].score > 0;
}

export async function createTiebreakerQuestion(
  gameId: string,
): Promise<Question | null> {
  const round = {
    ...createDefaultRound(99, QuizCategory.GENERAL),
    format: RoundFormat.BUZZER,
    questionCount: 1,
    name: "Tiebreaker",
    id: "tiebreaker",
  };

  const questions = await generateQuestionsForRound(round, `${gameId}_tie`);

  return questions[0] ?? null;
}
