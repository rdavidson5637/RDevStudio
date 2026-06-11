import { resetBuzzerState } from "./buzzer";
import { getRoundForQuestionIndex, getRoundNumber } from "./rounds";
import type { GameState } from "./types";
import { triggerGameEvent } from "./pusher";
import { getTimeLimitMsForRound, stripCorrectAnswer } from "./utils";

export async function broadcastQuestion(
  gameId: string,
  game: GameState,
  questionIndex: number
): Promise<void> {
  const question = game.questions[questionIndex];
  const round = getRoundForQuestionIndex(game, questionIndex);

  if (!round) {
    throw new Error("No round found for question index");
  }

  const questionStartedAt = Date.now();
  const roundNumber = getRoundNumber(game, round) ?? 1;

  game.currentQuestionIndex = questionIndex;
  game.currentRoundIndex = roundNumber - 1;
  game.status = "question";
  game.questionStartedAt = questionStartedAt;
  const timeLimitMs = getTimeLimitMsForRound(round);
  game.timeLimitMs = timeLimitMs;
  game.lastReveal = undefined;
  game.pendingQuestionIndex = undefined;
  resetBuzzerState(game);

  if (question.roundId && round.format) {
    question.format = round.format;
  }

  await triggerGameEvent(gameId, "game:question", {
    question: stripCorrectAnswer(question) as typeof question,
    questionIndex,
    timeLimitMs,
    questionStartedAt,
    answeredCount: 0,
    totalPlayers: game.players.length,
    round,
    roundNumber,
    questionInRound: questionIndex - round.startIndex + 1,
  });
}
