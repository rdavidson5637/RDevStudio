import { NextRequest, NextResponse } from "next/server";

import { getGame, setGame } from "@/lib/quiz/game-store";
import { broadcastQuestion } from "@/lib/quiz/question-events";
import { triggerGameEvent } from "@/lib/quiz/pusher";
import {
  getRoundForQuestionIndex,
  getRoundNumber,
  isLastQuestionInRound,
  isLastRound,
} from "@/lib/quiz/rounds";
import { submitMissingAnswers } from "@/lib/quiz/reveal";
import { buildTeamStandings, getSortedTeams } from "@/lib/quiz/teams";
import { getSortedPlayers } from "@/lib/quiz/utils";

interface SkipRequestBody {
  gameId: string;
  hostId: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SkipRequestBody;
    const { gameId, hostId } = body;

    if (!gameId?.trim() || !hostId?.trim()) {
      return NextResponse.json(
        { error: "gameId and hostId are required" },
        { status: 400 }
      );
    }

    const game = getGame(gameId);
    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    if (game.hostId !== hostId) {
      return NextResponse.json(
        { error: "Only the host can skip questions" },
        { status: 403 }
      );
    }

    if (game.status !== "question") {
      return NextResponse.json(
        { error: "Can only skip during an active question" },
        { status: 400 }
      );
    }

    const currentQuestion = game.questions[game.currentQuestionIndex];
    if (!currentQuestion) {
      return NextResponse.json({ error: "No active question" }, { status: 400 });
    }

    if (!game.skippedQuestionIds) {
      game.skippedQuestionIds = [];
    }

    if (!game.skippedQuestionIds.includes(currentQuestion.id)) {
      game.skippedQuestionIds.push(currentQuestion.id);
    }

    submitMissingAnswers(game, currentQuestion.id);

    const skippedIndex = game.currentQuestionIndex;
    const currentRound = getRoundForQuestionIndex(game, skippedIndex);
    const endOfRound = isLastQuestionInRound(game, skippedIndex);
    const nextIndex = skippedIndex + 1;

    await triggerGameEvent(gameId, "game:question-skipped", {
      skippedQuestionId: currentQuestion.id,
      skippedQuestionIndex: skippedIndex,
      nextQuestionIndex: nextIndex < game.questions.length ? nextIndex : undefined,
    });

    if (endOfRound && currentRound && !isLastRound(game, currentRound)) {
      const nextRound = game.rounds[game.currentRoundIndex + 1];

      game.status = "round-break";
      game.pendingQuestionIndex = nextIndex;
      game.lastReveal = undefined;
      game.activeBuzz = null;
      game.buzzLockedOutPlayerIds = [];
      game.buzzLockedOutTeamIds = [];
      game.timerPausedAt = undefined;

      await triggerGameEvent(gameId, "game:round-break", {
        completedRound: currentRound,
        roundNumber: getRoundNumber(game, currentRound) ?? 1,
        leaderboard: getSortedPlayers(game.players),
        teams:
          game.teamMode && game.teams ? getSortedTeams(game.teams) : undefined,
        teamMode: game.teamMode || undefined,
        nextRound,
      });

      setGame(gameId, game);
      return NextResponse.json({ ok: true });
    }

    if (nextIndex < game.questions.length) {
      await broadcastQuestion(gameId, game, nextIndex);
      setGame(gameId, game);
      return NextResponse.json({ ok: true });
    }

    game.status = "finished";
    game.activeBuzz = null;
    game.buzzLockedOutPlayerIds = [];
    game.buzzLockedOutTeamIds = [];
    setGame(gameId, game);

    const sortedTeams =
      game.teamMode && game.teams ? getSortedTeams(game.teams) : undefined;

    await triggerGameEvent(gameId, "game:finished", {
      finalLeaderboard: getSortedPlayers(game.players),
      teams: sortedTeams,
      teamMode: game.teamMode || undefined,
      teamStandings:
        game.teamMode && game.teams
          ? buildTeamStandings(game.teams, game.players)
          : undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("skip failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to skip question" },
      { status: 500 }
    );
  }
}
