import { NextRequest, NextResponse } from "next/server";

import { resetBuzzerState, resumeGameTimer } from "@/lib/quiz/buzzer";
import { getGame, setGame } from "@/lib/quiz/game-store";
import { toPublicGameState } from "@/lib/quiz/public-state";
import { getRoundForQuestionIndex } from "@/lib/quiz/rounds";
import {
  applyPointsToPlayerTeam,
  findTeamForPlayer,
  lockTeamOutOfBuzzing,
} from "@/lib/quiz/teams";
import { triggerReveal } from "@/lib/quiz/reveal";
import { triggerGameEvent } from "@/lib/quiz/pusher";
import {
  BUZZER_WRONG_DEDUCTION,
  calculatePoints,
} from "@/lib/quiz/scoring";
import { RoundFormat } from "@/lib/quiz/types";
import { QUESTION_TIME_LIMIT_MS } from "@/lib/quiz/utils";

interface BuzzAnswerRequestBody {
  gameId: string;
  hostId: string;
  answer?: string;
  correct: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as BuzzAnswerRequestBody;
    const { gameId, hostId, answer, correct } = body;

    if (!gameId?.trim() || !hostId?.trim()) {
      return NextResponse.json(
        { error: "gameId and hostId are required" },
        { status: 400 }
      );
    }

    if (typeof correct !== "boolean") {
      return NextResponse.json(
        { error: "correct must be a boolean" },
        { status: 400 }
      );
    }

    const game = await getGame(gameId);

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    if (game.hostId !== hostId) {
      return NextResponse.json(
        { error: "Only the host can judge buzzer answers" },
        { status: 403 }
      );
    }

    if (game.status !== "question") {
      return NextResponse.json(
        { error: "Game is not on a question" },
        { status: 400 }
      );
    }

    const round = getRoundForQuestionIndex(game, game.currentQuestionIndex);

    if (round?.format !== RoundFormat.BUZZER) {
      return NextResponse.json(
        { error: "This is not a buzzer round" },
        { status: 400 }
      );
    }

    if (!game.activeBuzz) {
      return NextResponse.json(
        { error: "No active buzz to judge" },
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

    const buzzer = game.players.find(
      (player) => player.id === game.activeBuzz!.playerId
    );

    if (!buzzer) {
      return NextResponse.json({ error: "Buzzing player not found" }, { status: 404 });
    }

    const timeLimitMs = game.timeLimitMs ?? QUESTION_TIME_LIMIT_MS;
    const buzzedAt = game.activeBuzz.buzzedAt;
    const questionStartedAt = game.questionStartedAt ?? buzzedAt;
    const answerTimeMs = Math.max(0, buzzedAt - questionStartedAt);

    if (correct) {
      let pointsAwarded = calculatePoints(true, answerTimeMs, timeLimitMs);

      if (round?.doublePoints) {
        pointsAwarded *= 2;
      }
      const verbalAnswer = answer?.trim() || "(verbal)";

      buzzer.answers.push({
        questionId: currentQuestion.id,
        answer: verbalAnswer,
        timestamp: Date.now(),
        pointsAwarded,
      });
      buzzer.score += pointsAwarded;

      if (game.teamMode && game.teams) {
        applyPointsToPlayerTeam(game.teams, buzzer.id, pointsAwarded);
      }

      for (const player of game.players) {
        if (player.id === buzzer.id) {
          continue;
        }

        const alreadyAnswered = player.answers.some(
          (entry) => entry.questionId === currentQuestion.id
        );

        if (!alreadyAnswered) {
          player.answers.push({
            questionId: currentQuestion.id,
            answer: "",
            timestamp: Date.now(),
            pointsAwarded: 0,
          });
        }
      }

      resetBuzzerState(game);
      await setGame(gameId, game);

      const buzzerTeam =
        game.teamMode && game.teams
          ? findTeamForPlayer(game.teams, buzzer.id)
          : undefined;

      await triggerGameEvent(gameId, "game:buzz-result", {
        playerId: buzzer.id,
        playerName: buzzer.name,
        correct: true,
        pointsAwarded,
        teamId: buzzerTeam?.id,
        teamPointsAwarded: buzzerTeam ? pointsAwarded : undefined,
      });

      await triggerReveal(gameId, game, currentQuestion.id);

      return NextResponse.json({
        ok: true,
        state: toPublicGameState(game),
      });
    }

    buzzer.score = Math.max(0, buzzer.score - BUZZER_WRONG_DEDUCTION);

    if (game.teamMode && game.teams) {
      applyPointsToPlayerTeam(
        game.teams,
        buzzer.id,
        -BUZZER_WRONG_DEDUCTION
      );
    }

    const buzzerTeam =
      game.teamMode && game.teams
        ? findTeamForPlayer(game.teams, buzzer.id)
        : undefined;

    if (game.teamMode && buzzerTeam) {
      lockTeamOutOfBuzzing(game, buzzerTeam.id);
    } else if (!game.buzzLockedOutPlayerIds.includes(buzzer.id)) {
      game.buzzLockedOutPlayerIds.push(buzzer.id);
    }

    game.activeBuzz = null;
    const resumedQuestionStartedAt = resumeGameTimer(game);

    await setGame(gameId, game);

    await triggerGameEvent(gameId, "game:buzz-result", {
      playerId: buzzer.id,
      playerName: buzzer.name,
      correct: false,
      pointsAwarded: -BUZZER_WRONG_DEDUCTION,
      teamId: buzzerTeam?.id,
      teamPointsAwarded: buzzerTeam ? -BUZZER_WRONG_DEDUCTION : undefined,
    });

    await triggerGameEvent(gameId, "game:buzz-cleared", {
      lockedOutPlayerId: buzzer.id,
      pointsDeducted: BUZZER_WRONG_DEDUCTION,
      questionStartedAt: resumedQuestionStartedAt,
      buzzLockedOutPlayerIds: [...game.buzzLockedOutPlayerIds],
      buzzLockedOutTeamIds: [...(game.buzzLockedOutTeamIds ?? [])],
      lockedOutTeamId: buzzerTeam?.id,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("buzz-answer failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to judge buzzer answer",
      },
      { status: 500 }
    );
  }
}
