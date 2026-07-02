import { getGame, setGame } from "./game-store";
import { triggerGameEvent } from "./pusher";
import { getSortedTeams } from "./teams";
import type { GameEventMap, GameState } from "./types";
import { getSortedPlayers, isAnswerCorrect } from "./utils";

export function getAnsweredPlayerIds(
  game: GameState,
  questionId: string
): string[] {
  return game.players
    .filter((player) =>
      player.answers.some((answer) => answer.questionId === questionId)
    )
    .map((player) => player.id);
}

export function submitMissingAnswers(
  game: GameState,
  questionId: string
): void {
  for (const player of game.players) {
    const hasAnswered = player.answers.some(
      (answer) => answer.questionId === questionId
    );

    if (!hasAnswered) {
      player.answers.push({
        questionId,
        answer: "",
        timestamp: Date.now(),
        pointsAwarded: 0,
      });
    }
  }
}

export function buildRevealPayload(
  game: GameState,
  questionId: string
): GameEventMap["game:reveal"] {
  const currentQuestion = game.questions.find(
    (question) => question.id === questionId
  );

  if (!currentQuestion) {
    throw new Error("Question not found for reveal");
  }

  const playerResults = game.players.map((player) => {
    const playerAnswer = player.answers.find(
      (answer) => answer.questionId === questionId
    )!;

    return {
      playerId: player.id,
      answer: playerAnswer.answer,
      isCorrect: isAnswerCorrect(
        playerAnswer.answer,
        currentQuestion.correctAnswer
      ),
      pointsAwarded: playerAnswer.pointsAwarded,
    };
  });

  const leaderboard = getSortedPlayers(game.players);

  const previousScores = Object.fromEntries(
    game.players.map((player) => {
      const playerAnswer = player.answers.find(
        (answer) => answer.questionId === questionId
      );
      return [player.id, player.score - (playerAnswer?.pointsAwarded ?? 0)];
    })
  );

  const payload: GameEventMap["game:reveal"] = {
    question: currentQuestion,
    correctAnswer: currentQuestion.correctAnswer,
    playerResults,
    previousScores,
    leaderboard,
  };

  if (game.teamMode && game.teams) {
    payload.teamMode = true;
    payload.teams = getSortedTeams(game.teams);
  }

  return payload;
}

export async function triggerReveal(
  gameId: string,
  game: GameState,
  questionId: string
): Promise<GameEventMap["game:reveal"]> {
  const payload = buildRevealPayload(game, questionId);

  game.status = "reveal";
  game.lastReveal = payload;
  await setGame(gameId, game);

  await triggerGameEvent(gameId, "game:reveal", payload);
  await triggerGameEvent(gameId, "game:leaderboard", {
    players: payload.leaderboard,
    teams: payload.teams,
    teamMode: payload.teamMode,
  });

  return payload;
}

export async function revealIfAllAnswered(
  gameId: string,
  game: GameState,
  questionId: string
): Promise<GameEventMap["game:reveal"] | null> {
  const allAnswered = game.players.every((player) =>
    player.answers.some((answer) => answer.questionId === questionId)
  );

  if (!allAnswered) {
    return null;
  }

  return triggerReveal(gameId, game, questionId);
}

export async function getGameFromStore(gameId: string): Promise<GameState> {
  const game = await getGame(gameId);
  if (!game) {
    throw new Error("Game not found");
  }
  return game;
}
