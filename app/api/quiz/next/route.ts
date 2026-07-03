import { NextRequest, NextResponse } from "next/server";

import { getGame, setGame } from "@/lib/quiz/game-store";
import { toPublicGameState } from "@/lib/quiz/public-state";
import { broadcastQuestion } from "@/lib/quiz/question-events";
import {
  getRoundForQuestionIndex,
  getRoundNumber,
  isLastQuestionInRound,
  isLastRound,
} from "@/lib/quiz/rounds";
import { triggerGameEvent } from "@/lib/quiz/pusher";
import { buildTeamStandings, getSortedTeams } from "@/lib/quiz/teams";
import { createTiebreakerQuestion, hasTieAtTop } from "@/lib/quiz/tiebreaker";
import { getSortedPlayers } from "@/lib/quiz/utils";
import { Difficulty, RoundFormat } from "@/lib/quiz/types";

interface NextRequestBody {
  gameId: string;
  hostId: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as NextRequestBody;
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
        { error: "Only the host can advance the game" },
        { status: 403 },
      );
    }

    if (game.status === "round-break") {
      const nextIndex = game.pendingQuestionIndex;

      if (nextIndex === undefined || nextIndex >= game.questions.length) {
        return NextResponse.json(
          { error: "No pending question for next round" },
          { status: 400 },
        );
      }

      const round = getRoundForQuestionIndex(game, nextIndex);

      if (round) {
        const roundNumber = getRoundNumber(game, round) ?? 1;
        await triggerGameEvent(gameId, "game:round-started", {
          round,
          roundNumber,
        });
      }

      await broadcastQuestion(gameId, game, nextIndex);
      await setGame(gameId, game);

      return NextResponse.json({ state: toPublicGameState(game) });
    }

    if (game.status !== "reveal") {
      return NextResponse.json(
        { error: "Game is not ready to advance" },
        { status: 400 },
      );
    }

    const currentRound = getRoundForQuestionIndex(
      game,
      game.currentQuestionIndex,
    );
    const endOfRound = isLastQuestionInRound(game, game.currentQuestionIndex);
    const nextIndex = game.currentQuestionIndex + 1;

    if (endOfRound && currentRound && !isLastRound(game, currentRound)) {
      const nextRound = game.rounds[game.currentRoundIndex + 1];

      game.status = "round-break";
      game.pendingQuestionIndex = nextIndex;
      game.lastReveal = undefined;

      await triggerGameEvent(gameId, "game:round-break", {
        completedRound: currentRound,
        roundNumber: getRoundNumber(game, currentRound) ?? 1,
        leaderboard: getSortedPlayers(game.players),
        teams:
          game.teamMode && game.teams ? getSortedTeams(game.teams) : undefined,
        teamMode: game.teamMode || undefined,
        nextRound,
      });

      await setGame(gameId, game);
      return NextResponse.json({ state: toPublicGameState(game) });
    }

    if (nextIndex < game.questions.length) {
      await broadcastQuestion(gameId, game, nextIndex);
      await setGame(gameId, game);
    } else if (!game.tiebreakerUsed && hasTieAtTop(game)) {
      const tiebreaker = await createTiebreakerQuestion(gameId);

      if (tiebreaker) {
        tiebreaker.format = RoundFormat.BUZZER;
        tiebreaker.roundId = "tiebreaker";

        game.questions.push(tiebreaker);
        game.totalQuestions = game.questions.length;
        game.tiebreakerUsed = true;

        const tiebreakerRound = {
          id: "tiebreaker",
          name: "Tiebreaker",
          format: RoundFormat.BUZZER,
          category: tiebreaker.category,
          questionCount: 1,
          difficulty: game.roundConfigs[0]?.difficulty ?? Difficulty.MIXED,
          timeLimitSeconds: 20,
          startIndex: game.questions.length - 1,
          endIndex: game.questions.length - 1,
        };

        game.rounds = [...game.rounds, tiebreakerRound];
        game.roundConfigs = [...game.roundConfigs, tiebreakerRound];

        await broadcastQuestion(gameId, game, game.questions.length - 1);
        await setGame(gameId, game);
      } else {
        game.status = "finished";
        await setGame(gameId, game);

        await triggerGameEvent(gameId, "game:finished", {
          finalLeaderboard: getSortedPlayers(game.players),
          teams:
            game.teamMode && game.teams
              ? getSortedTeams(game.teams)
              : undefined,
          teamMode: game.teamMode || undefined,
          teamStandings:
            game.teamMode && game.teams
              ? buildTeamStandings(game.teams, game.players)
              : undefined,
        });
      }
    } else {
      game.status = "finished";
      await setGame(gameId, game);

      const finalLeaderboard = getSortedPlayers(game.players);

      const sortedTeams =
        game.teamMode && game.teams ? getSortedTeams(game.teams) : undefined;

      await triggerGameEvent(gameId, "game:finished", {
        finalLeaderboard,
        teams: sortedTeams,
        teamMode: game.teamMode || undefined,
        teamStandings:
          game.teamMode && game.teams
            ? buildTeamStandings(game.teams, game.players)
            : undefined,
      });
    }

    return NextResponse.json({ state: toPublicGameState(game) });
  } catch (error) {
    console.error("next failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to advance game",
      },
      { status: 500 },
    );
  }
}
