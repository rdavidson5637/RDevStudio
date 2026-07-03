import { getRoundForQuestionIndex, getRoundNumber } from "./rounds";
import type {
  ActiveBuzz,
  GameEventMap,
  GameState,
  Player,
  Question,
  Round,
  Team,
} from "./types";
import { getSortedPlayers, stripCorrectAnswer } from "./utils";

export type PublicQuestion = Omit<Question, "correctAnswer">;

export interface PublicGameState {
  id: string;
  hostId: string;
  status: GameState["status"];
  players: Player[];
  totalQuestions: number;
  currentQuestionIndex: number;
  currentQuestion?: PublicQuestion;
  questionStartedAt?: number;
  timeLimitMs?: number;
  answeredCount: number;
  answeredPlayerIds: string[];
  reveal?: GameEventMap["game:reveal"];
  roundConfigs: GameState["roundConfigs"];
  rounds: Round[];
  currentRoundIndex: number;
  currentRound?: Round;
  roundNumber?: number;
  questionInRound?: number;
  roundBreak?: GameEventMap["game:round-break"];
  activeBuzz: ActiveBuzz | null;
  buzzLockedOutPlayerIds: string[];
  buzzLockedOutTeamIds: string[];
  timerPaused: boolean;
  teamMode: boolean;
  teams: Team[] | null;
  teamCount: number;
}

export function toPublicGameState(game: GameState): PublicGameState {
  const currentQuestion = game.questions[game.currentQuestionIndex];
  const questionId = currentQuestion?.id;
  const currentRound = getRoundForQuestionIndex(
    game,
    game.currentQuestionIndex,
  );

  const answeredPlayerIds = questionId
    ? game.players
        .filter((player) =>
          player.answers.some((answer) => answer.questionId === questionId),
        )
        .map((player) => player.id)
    : [];

  const publicState: PublicGameState = {
    id: game.id,
    hostId: game.hostId,
    status: game.status,
    players: game.players,
    totalQuestions: game.totalQuestions,
    currentQuestionIndex: game.currentQuestionIndex,
    answeredCount: answeredPlayerIds.length,
    answeredPlayerIds,
    roundConfigs: game.roundConfigs ?? [],
    rounds: game.rounds ?? [],
    currentRoundIndex: game.currentRoundIndex ?? 0,
    activeBuzz: game.activeBuzz ?? null,
    buzzLockedOutPlayerIds: game.buzzLockedOutPlayerIds ?? [],
    buzzLockedOutTeamIds: game.buzzLockedOutTeamIds ?? [],
    timerPaused: Boolean(game.timerPausedAt),
    teamMode: game.teamMode ?? false,
    teams: game.teams ?? null,
    teamCount: game.teamCount ?? 0,
  };

  if (currentRound) {
    publicState.currentRound = currentRound;
    publicState.roundNumber = getRoundNumber(game, currentRound) ?? undefined;
    publicState.questionInRound =
      game.currentQuestionIndex - currentRound.startIndex + 1;
  }

  if (
    (game.status === "question" || game.status === "reveal") &&
    currentQuestion
  ) {
    publicState.currentQuestion = stripCorrectAnswer(currentQuestion);
    publicState.questionStartedAt = game.questionStartedAt;
    publicState.timeLimitMs = game.timeLimitMs;
  }

  if (game.status === "reveal" && game.lastReveal) {
    publicState.reveal = game.lastReveal;
  }

  if (
    game.status === "round-break" &&
    game.pendingQuestionIndex !== undefined
  ) {
    const nextRound = game.rounds[game.currentRoundIndex + 1];
    const completedRound = game.rounds[game.currentRoundIndex];

    if (completedRound) {
      publicState.roundBreak = {
        completedRound,
        roundNumber: getRoundNumber(game, completedRound) ?? 1,
        leaderboard: getSortedPlayers(game.players),
        nextRound,
      };
    }
  }

  return publicState;
}

export function toLobbyGameState(game: GameState): GameState {
  return {
    id: game.id,
    hostId: game.hostId,
    players: game.players,
    questions: [],
    currentQuestionIndex: 0,
    status: "lobby",
    categories: game.categories,
    totalQuestions: game.totalQuestions,
    roundConfigs: game.roundConfigs ?? [],
    rounds: [],
    currentRoundIndex: 0,
    activeBuzz: null,
    buzzLockedOutPlayerIds: [],
    buzzLockedOutTeamIds: [],
    teamMode: game.teamMode ?? false,
    teams: game.teams,
    teamCount: game.teamCount ?? 0,
    kickedPlayerIds: game.kickedPlayerIds ?? [],
    skippedQuestionIds: [],
    createdAt: game.createdAt,
  };
}
