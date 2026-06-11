export enum QuizCategory {
  GENERAL = "GENERAL",
  SPORT = "SPORT",
  MUSIC = "MUSIC",
  FILM_TV = "FILM_TV",
  GEOGRAPHY = "GEOGRAPHY",
  GAMING = "GAMING",
  HISTORY = "HISTORY",
  SCIENCE = "SCIENCE",
  FOOD_DRINK = "FOOD_DRINK",
  POP_CULTURE = "POP_CULTURE",
}

export enum QuestionType {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  TEXT = "TEXT",
  PICTURE = "PICTURE",
  MUSIC = "MUSIC",
}

export enum RoundFormat {
  STANDARD = "STANDARD",
  PICTURE = "PICTURE",
  MUSIC = "MUSIC",
  BUZZER = "BUZZER",
  RISK = "RISK",
}

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
  MIXED = "MIXED",
}

export interface RoundConfig {
  id: string;
  name: string;
  format: RoundFormat;
  category: QuizCategory;
  questionCount: number;
  difficulty: Difficulty;
  /** Per-question timer in seconds (format default if omitted) */
  timeLimitSeconds?: number;
  /** Award double points for correct answers in this round */
  doublePoints?: boolean;
}

export interface Round extends RoundConfig {
  startIndex: number;
  endIndex: number;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options: string[] | null;
  correctAnswer: string;
  category: QuizCategory;
  explanation?: string;
  roundId?: string;
  /** Wikimedia Commons thumbnail for picture rounds */
  imageUrl?: string;
  /** Accessibility label for picture round images */
  imageAlt?: string;
  /** Direct audio clip URL for music rounds (when available) */
  audioUrl?: string;
  format?: RoundFormat;
}

export interface PlayerAnswer {
  questionId: string;
  answer: string;
  timestamp: number;
  pointsAwarded: number;
  risked?: boolean;
}

export interface ActiveBuzz {
  playerId: string;
  playerName: string;
  playerColour: string;
  playerAvatar: string;
  buzzedAt: number;
}

export const PLAYER_COLOURS = [
  "#F59E0B",
  "#3B82F6",
  "#10B981",
  "#EF4444",
  "#8B5CF6",
  "#F97316",
  "#06B6D4",
  "#EC4899",
] as const;

export const PLAYER_AVATARS = [
  "🦊",
  "🐺",
  "🦁",
  "🐯",
  "🦄",
  "🐸",
  "🦋",
  "🐙",
  "🦈",
  "🐲",
  "👾",
  "🤖",
] as const;

export interface Player {
  id: string;
  name: string;
  colour: string;
  avatar: string;
  score: number;
  answers: PlayerAnswer[];
}

export interface Team {
  id: string;
  name: string;
  colour: string;
  playerIds: string[];
  score: number;
}

export const ALLOWED_REACTIONS = ["🔥", "😂", "😭", "👏", "🤔", "😮"] as const;

export interface ReactionEvent {
  id: string;
  playerId: string;
  playerName: string;
  playerColour: string;
  playerAvatar: string;
  emoji: string;
}

export interface ChatMessage {
  id: string;
  playerId: string;
  playerName: string;
  playerColour: string;
  playerAvatar: string;
  text: string;
  timestamp: number;
}

export type GameStatus =
  | "lobby"
  | "question"
  | "reveal"
  | "round-break"
  | "finished";

export interface GameState {
  id: string;
  hostId: string;
  players: Player[];
  questions: Question[];
  currentQuestionIndex: number;
  status: GameStatus;
  categories: QuizCategory[];
  totalQuestions: number;
  createdAt: number;
  roundConfigs: RoundConfig[];
  rounds: Round[];
  currentRoundIndex: number;
  pendingQuestionIndex?: number;
  questionStartedAt?: number;
  timeLimitMs?: number;
  lastReveal?: GameEventMap["game:reveal"];
  activeBuzz: ActiveBuzz | null;
  buzzLockedOutPlayerIds: string[];
  buzzLockedOutTeamIds: string[];
  timerPausedAt?: number;
  teamMode: boolean;
  teams: Team[] | null;
  teamCount: number;
  kickedPlayerIds: string[];
  skippedQuestionIds: string[];
  tiebreakerUsed?: boolean;
}

export type GameEventType =
  | "game:player-joined"
  | "game:started"
  | "game:round-started"
  | "game:round-break"
  | "game:question"
  | "game:answer-submitted"
  | "game:reveal"
  | "game:leaderboard"
  | "game:finished"
  | "game:reaction"
  | "game:chat"
  | "game:buzz"
  | "game:buzz-result"
  | "game:buzz-cleared"
  | "game:teams-updated"
  | "game:player-kicked"
  | "game:question-skipped";

export interface GameEventMap {
  "game:player-joined": { player: Player; gameState: GameState };
  "game:started": { gameState: GameState };
  "game:round-started": { round: Round; roundNumber: number };
  "game:round-break": {
    completedRound: Round;
    roundNumber: number;
    leaderboard: Player[];
    teams?: Team[];
    teamMode?: boolean;
    nextRound?: Round;
  };
  "game:question": {
    question: Question;
    questionIndex: number;
    timeLimitMs: number;
    questionStartedAt: number;
    answeredCount: number;
    totalPlayers: number;
    round: Round;
    roundNumber: number;
    questionInRound: number;
  };
  "game:answer-submitted": {
    playerId: string;
    questionId: string;
    pointsAwarded: number;
    answeredCount: number;
    totalPlayers: number;
  };
  "game:reveal": {
    question: Question;
    correctAnswer: string;
    playerResults: Array<{
      playerId: string;
      answer: string;
      isCorrect: boolean;
      pointsAwarded: number;
    }>;
    previousScores: Record<string, number>;
    leaderboard: Player[];
    teams?: Team[];
    teamMode?: boolean;
  };
  "game:leaderboard": { players: Player[]; teams?: Team[]; teamMode?: boolean };
  "game:finished": {
    finalLeaderboard: Player[];
    teams?: Team[];
    teamMode?: boolean;
    teamStandings?: Array<{ team: Team; members: Player[] }>;
  };
  "game:teams-updated": { teams: Team[]; teamMode: boolean };
  "game:player-kicked": { kickedPlayerId: string; players: Player[] };
  "game:question-skipped": {
    skippedQuestionId: string;
    skippedQuestionIndex: number;
    nextQuestionIndex?: number;
  };
  "game:reaction": ReactionEvent;
  "game:chat": ChatMessage;
  "game:buzz": {
    playerId: string;
    playerName: string;
    playerColour: string;
    playerAvatar: string;
    pausedAt: number;
    questionStartedAt: number;
    buzzLockedOutTeamIds?: string[];
  };
  "game:buzz-result": {
    playerId: string;
    playerName: string;
    correct: boolean;
    pointsAwarded: number;
    teamId?: string;
    teamPointsAwarded?: number;
  };
  "game:buzz-cleared": {
    lockedOutPlayerId: string;
    pointsDeducted: number;
    questionStartedAt: number;
    buzzLockedOutPlayerIds: string[];
    buzzLockedOutTeamIds?: string[];
    lockedOutTeamId?: string;
  };
}

export type GameEvent = {
  [K in GameEventType]: { event: K; data: GameEventMap[K] };
}[GameEventType];
