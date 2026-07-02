import { NextRequest, NextResponse } from "next/server";

import { getGame, setGame } from "@/lib/quiz/game-store";
import { toPublicGameState } from "@/lib/quiz/public-state";
import {
  getAnsweredPlayerIds,
  submitMissingAnswers,
  triggerReveal,
} from "@/lib/quiz/reveal";

interface SkipWaitingRequestBody {
  gameId: string;
  hostId: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SkipWaitingRequestBody;
    const { gameId, hostId } = body;

    if (!gameId?.trim() || !hostId?.trim()) {
      return NextResponse.json(
        { error: "gameId and hostId are required" },
        { status: 400 }
      );
    }

    const game = await getGame(gameId);

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    if (game.hostId !== hostId) {
      return NextResponse.json(
        { error: "Only the host can skip waiting" },
        { status: 403 }
      );
    }

    if (game.status !== "question") {
      return NextResponse.json(
        { error: "Game is not on a question" },
        { status: 400 }
      );
    }

    const currentQuestion = game.questions[game.currentQuestionIndex];

    if (!currentQuestion) {
      return NextResponse.json(
        { error: "No active question" },
        { status: 400 }
      );
    }

    const answeredBefore = getAnsweredPlayerIds(game, currentQuestion.id);

    if (answeredBefore.length === game.players.length) {
      return NextResponse.json(
        { error: "All players have already answered" },
        { status: 400 }
      );
    }

    submitMissingAnswers(game, currentQuestion.id);
    await setGame(gameId, game);

    await triggerReveal(gameId, game, currentQuestion.id);

    return NextResponse.json({ state: toPublicGameState(game) });
  } catch (error) {
    console.error("skip-waiting failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to skip waiting",
      },
      { status: 500 }
    );
  }
}
