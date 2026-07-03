import { NextRequest, NextResponse } from "next/server";

import { getGame, setGame } from "@/lib/quiz/game-store";
import { getAnsweredPlayerIds, revealIfAllAnswered } from "@/lib/quiz/reveal";
import { triggerGameEvent } from "@/lib/quiz/pusher";
import { getRoundForQuestionIndex } from "@/lib/quiz/rounds";
import {
  applyPointsToPlayerTeam,
  hasTeammateAnsweredQuestion,
} from "@/lib/quiz/teams";
import { calculatePoints, calculateRiskPoints } from "@/lib/quiz/scoring";
import { RoundFormat } from "@/lib/quiz/types";
import { isAnswerCorrect, QUESTION_TIME_LIMIT_MS } from "@/lib/quiz/utils";

interface AnswerRequestBody {
  gameId: string;
  playerId: string;
  questionId: string;
  answer: string;
  answerTimeMs: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AnswerRequestBody;
    const { gameId, playerId, questionId, answer, answerTimeMs } = body;

    if (!gameId?.trim()) {
      return NextResponse.json(
        { error: "gameId is required" },
        { status: 400 },
      );
    }

    if (!playerId?.trim()) {
      return NextResponse.json(
        { error: "playerId is required" },
        { status: 400 },
      );
    }

    if (!questionId?.trim()) {
      return NextResponse.json(
        { error: "questionId is required" },
        { status: 400 },
      );
    }

    if (answer === undefined || answer === null) {
      return NextResponse.json(
        { error: "answer is required" },
        { status: 400 },
      );
    }

    if (!Number.isFinite(answerTimeMs) || answerTimeMs < 0) {
      return NextResponse.json(
        { error: "answerTimeMs must be a non-negative number" },
        { status: 400 },
      );
    }

    const game = await getGame(gameId);
    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    if (game.status !== "question") {
      return NextResponse.json(
        { error: "Game is not accepting answers" },
        { status: 400 },
      );
    }

    const currentQuestion = game.questions[game.currentQuestionIndex];
    if (!currentQuestion || currentQuestion.id !== questionId) {
      return NextResponse.json(
        { error: "Question is not active" },
        { status: 400 },
      );
    }

    const player = game.players.find((p) => p.id === playerId);
    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    const alreadyAnswered = player.answers.some(
      (playerAnswer) => playerAnswer.questionId === questionId,
    );

    if (alreadyAnswered) {
      return NextResponse.json(
        { error: "Player has already answered this question" },
        { status: 400 },
      );
    }

    const round = getRoundForQuestionIndex(game, game.currentQuestionIndex);
    const isBuzzerRound = round?.format === RoundFormat.BUZZER;
    const isRiskRound =
      round?.format === RoundFormat.RISK ||
      currentQuestion.format === RoundFormat.RISK;

    if (isBuzzerRound) {
      return NextResponse.json(
        { error: "Use buzz-in for this round" },
        { status: 400 },
      );
    }

    const isPictureRound =
      round?.format === RoundFormat.PICTURE ||
      currentQuestion.format === RoundFormat.PICTURE;

    if (
      game.teamMode &&
      isPictureRound &&
      hasTeammateAnsweredQuestion(game, playerId, questionId)
    ) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    const timeLimitMs = game.timeLimitMs ?? QUESTION_TIME_LIMIT_MS;
    const correct = isAnswerCorrect(answer, currentQuestion.correctAnswer);
    let pointsAwarded = isRiskRound
      ? calculateRiskPoints(correct, answerTimeMs, timeLimitMs)
      : calculatePoints(correct, answerTimeMs, timeLimitMs);

    if (correct && round?.doublePoints) {
      pointsAwarded *= 2;
    }

    player.answers.push({
      questionId,
      answer,
      timestamp: Date.now(),
      pointsAwarded,
      risked: isRiskRound ? true : undefined,
    });
    player.score = Math.max(0, player.score + pointsAwarded);

    if (game.teamMode && game.teams) {
      applyPointsToPlayerTeam(game.teams, playerId, pointsAwarded);
    }

    await setGame(gameId, game);

    const answeredCount = getAnsweredPlayerIds(game, questionId).length;

    await triggerGameEvent(gameId, "game:answer-submitted", {
      playerId,
      questionId,
      pointsAwarded,
      answeredCount,
      totalPlayers: game.players.length,
    });

    await revealIfAllAnswered(gameId, game, questionId);

    return NextResponse.json({
      pointsAwarded,
      correct,
      answeredCount: getAnsweredPlayerIds(game, questionId).length,
      totalPlayers: game.players.length,
    });
  } catch (error) {
    console.error("answer failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to submit answer",
      },
      { status: 500 },
    );
  }
}
