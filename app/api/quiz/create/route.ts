import { NextRequest, NextResponse } from "next/server";

import {
  MAX_QUESTIONS_PER_ROUND,
  MAX_ROUNDS,
  MIN_QUESTIONS_PER_ROUND,
  MIN_ROUNDS,
} from "@/lib/quiz/constants";
import { gameStore, setGame } from "@/lib/quiz/game-store";
import { resolvePlayerIdentity } from "@/lib/quiz/player-identity";
import {
  createDefaultRound,
  uniqueCategoriesFromRounds,
} from "@/lib/quiz/rounds";
import { createDefaultTeams } from "@/lib/quiz/teams";
import type { GameState, Player, RoundConfig } from "@/lib/quiz/types";
import { Difficulty, QuizCategory } from "@/lib/quiz/types";
import { generateGameId, generatePlayerId } from "@/lib/quiz/utils";

interface CreateRequestBody {
  hostName: string;
  colour?: string;
  avatar?: string;
  teamMode?: boolean;
  teamCount?: number;
  roundConfigs?: RoundConfig[];
  /** @deprecated use roundConfigs */
  categories?: QuizCategory[];
  /** @deprecated use roundConfigs */
  totalQuestions?: number;
}

function isValidRoundConfig(round: RoundConfig): boolean {
  const difficulty = round.difficulty ?? Difficulty.MIXED;

  return (
    Boolean(round.id?.trim()) &&
    Boolean(round.name?.trim()) &&
    Object.values(QuizCategory).includes(round.category) &&
    Object.values(Difficulty).includes(difficulty) &&
    Number.isInteger(round.questionCount) &&
    round.questionCount >= MIN_QUESTIONS_PER_ROUND &&
    round.questionCount <= MAX_QUESTIONS_PER_ROUND &&
    (round.timeLimitSeconds === undefined ||
      (round.timeLimitSeconds >= 10 && round.timeLimitSeconds <= 90))
  );
}

function normalizeRoundDifficulty(round: RoundConfig): RoundConfig {
  return {
    ...round,
    difficulty: round.difficulty ?? Difficulty.MIXED,
  };
}

function normalizeRoundConfigs(body: CreateRequestBody): RoundConfig[] {
  if (Array.isArray(body.roundConfigs) && body.roundConfigs.length > 0) {
    return body.roundConfigs;
  }

  const categories =
    Array.isArray(body.categories) && body.categories.length > 0
      ? body.categories
      : [QuizCategory.GENERAL];

  const totalQuestions = body.totalQuestions ?? 10;

  if (categories.length === 1) {
    return [
      {
        ...createDefaultRound(1, categories[0]),
        questionCount: Math.min(10, totalQuestions),
      },
    ];
  }

  const perCategory = Math.max(
    1,
    Math.floor(totalQuestions / categories.length),
  );
  return categories.map((category, index) => ({
    ...createDefaultRound(index + 1, category),
    questionCount: perCategory,
  }));
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateRequestBody;
    const { hostName, colour, avatar, teamMode = false } = body;
    const teamCount = Math.min(4, Math.max(2, Number(body.teamCount) || 2));

    if (!hostName?.trim()) {
      return NextResponse.json(
        { error: "hostName is required" },
        { status: 400 },
      );
    }

    const roundConfigs = normalizeRoundConfigs(body).map(
      normalizeRoundDifficulty,
    );

    if (roundConfigs.length < MIN_ROUNDS || roundConfigs.length > MAX_ROUNDS) {
      return NextResponse.json(
        {
          error: `Games must have between ${MIN_ROUNDS} and ${MAX_ROUNDS} rounds`,
        },
        { status: 400 },
      );
    }

    if (!roundConfigs.every(isValidRoundConfig)) {
      return NextResponse.json(
        { error: "Invalid round configuration" },
        { status: 400 },
      );
    }

    const categories = uniqueCategoriesFromRounds(roundConfigs);
    const totalQuestions = roundConfigs.reduce(
      (sum, round) => sum + round.questionCount,
      0,
    );

    let gameId = generateGameId();
    while (gameStore.has(gameId)) {
      gameId = generateGameId();
    }

    const identity = resolvePlayerIdentity([], { colour, avatar });

    if ("error" in identity) {
      return NextResponse.json({ error: identity.error }, { status: 400 });
    }

    const playerId = generatePlayerId();
    const host: Player = {
      id: playerId,
      name: hostName.trim(),
      colour: identity.colour,
      avatar: identity.avatar,
      score: 0,
      answers: [],
    };

    const gameState: GameState = {
      id: gameId,
      hostId: playerId,
      players: [host],
      questions: [],
      currentQuestionIndex: 0,
      status: "lobby",
      categories,
      totalQuestions,
      roundConfigs,
      rounds: [],
      currentRoundIndex: 0,
      activeBuzz: null,
      buzzLockedOutPlayerIds: [],
      buzzLockedOutTeamIds: [],
      teamMode: Boolean(teamMode),
      teams: teamMode ? createDefaultTeams(teamCount) : null,
      teamCount: teamMode ? teamCount : 0,
      kickedPlayerIds: [],
      skippedQuestionIds: [],
      createdAt: Date.now(),
    };

    await setGame(gameId, gameState);

    return NextResponse.json({ gameId, playerId, gameState });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
