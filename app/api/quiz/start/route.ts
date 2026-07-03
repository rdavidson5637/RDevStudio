import { NextRequest, NextResponse } from "next/server";

import { getGame, setGame } from "@/lib/quiz/game-store";
import { toPublicGameState } from "@/lib/quiz/public-state";
import { generateQuestionsForGame } from "@/lib/quiz/questions";
import { broadcastQuestion } from "@/lib/quiz/question-events";
import { buildRoundsFromQuestions } from "@/lib/quiz/rounds";
import { triggerGameEvent } from "@/lib/quiz/pusher";
import { validateTeamAssignments } from "@/lib/quiz/teams";
import { QUESTION_TIME_LIMIT_MS, stripCorrectAnswer } from "@/lib/quiz/utils";

interface StartRequestBody {
  gameId: string;
  hostId: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as StartRequestBody;
    const { gameId, hostId } = body;

    if (!gameId?.trim()) {
      return NextResponse.json(
        { error: "gameId is required" },
        { status: 400 },
      );
    }

    if (!hostId?.trim()) {
      return NextResponse.json(
        { error: "hostId is required" },
        { status: 400 },
      );
    }

    const game = await getGame(gameId);
    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    if (game.hostId !== hostId) {
      return NextResponse.json(
        { error: "Only the host can start the game" },
        { status: 403 },
      );
    }

    if (game.status !== "lobby") {
      return NextResponse.json(
        { error: "Game has already started" },
        { status: 400 },
      );
    }

    if (!game.roundConfigs?.length) {
      return NextResponse.json(
        { error: "No rounds configured for this game" },
        { status: 400 },
      );
    }

    if (game.teamMode && game.teams) {
      const teamError = validateTeamAssignments(game.players, game.teams);

      if (teamError) {
        return NextResponse.json({ error: teamError }, { status: 400 });
      }
    }

    const questions = await generateQuestionsForGame(game.roundConfigs, gameId);

    if (questions.length === 0) {
      return NextResponse.json(
        { error: "No questions available for this game" },
        { status: 500 },
      );
    }

    game.questions = questions;
    game.rounds = buildRoundsFromQuestions(game.roundConfigs, game.questions);
    game.totalQuestions = questions.length;
    game.categories = [
      ...new Set(game.roundConfigs.map((round) => round.category)),
    ];
    game.currentQuestionIndex = 0;
    game.currentRoundIndex = 0;
    game.status = "question";
    game.questionStartedAt = Date.now();
    game.timeLimitMs = QUESTION_TIME_LIMIT_MS;

    await setGame(gameId, game);

    const firstRound = game.rounds[0];
    const firstQuestion = game.questions[0];

    await triggerGameEvent(gameId, "game:started", {
      gameState: { ...game, questions: [] },
    });

    if (firstRound) {
      await triggerGameEvent(gameId, "game:round-started", {
        round: firstRound,
        roundNumber: 1,
      });
    }

    await broadcastQuestion(gameId, game, 0);
    await setGame(gameId, game);

    return NextResponse.json({
      state: toPublicGameState(game),
      firstQuestion: stripCorrectAnswer(firstQuestion),
      questionIndex: 0,
      timeLimitMs: QUESTION_TIME_LIMIT_MS,
      questionStartedAt: game.questionStartedAt,
    });
  } catch (error) {
    console.error("Failed to start game:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to start game",
      },
      { status: 500 },
    );
  }
}
