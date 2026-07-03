import { QUESTIONS_PER_ROUND } from "./constants";
import { CATEGORY_OPTIONS } from "./categories";
import {
  Difficulty,
  QuizCategory,
  RoundFormat,
  type GameState,
  type Question,
  type Round,
  type RoundConfig,
} from "./types";

export const ROUND_FORMAT_OPTIONS: Array<{
  value: RoundFormat;
  label: string;
  icon: string;
  description: string;
}> = [
  {
    value: RoundFormat.STANDARD,
    label: "Standard",
    icon: "📝",
    description: "Classic pub quiz questions with a countdown timer",
  },
  {
    value: RoundFormat.PICTURE,
    label: "Picture",
    icon: "🖼️",
    description: "Questions based on images — flags, landmarks, faces",
  },
  {
    value: RoundFormat.MUSIC,
    label: "Music",
    icon: "🎵",
    description: "Music trivia and audio clip identification",
  },
  {
    value: RoundFormat.BUZZER,
    label: "Buzzer Round",
    icon: "🔔",
    description: "First to buzz in answers — wrong answers lose points",
  },
  {
    value: RoundFormat.RISK,
    label: "Risk Round",
    icon: "⚠️",
    description: "Wrong answers lose 50 points — are you confident?",
  },
];

export function defaultRoundName(
  format: RoundFormat,
  category: QuizCategory,
  roundNumber: number,
): string {
  const formatLabel =
    ROUND_FORMAT_OPTIONS.find((option) => option.value === format)?.label ??
    "Round";
  const categoryLabel =
    CATEGORY_OPTIONS.find((option) => option.value === category)?.label ??
    category;

  return `Round ${roundNumber}: ${formatLabel} — ${categoryLabel}`;
}

export function createDefaultRound(
  roundNumber: number,
  category: QuizCategory = QuizCategory.GENERAL,
): RoundConfig {
  return {
    id: `round_${roundNumber}`,
    name: defaultRoundName(RoundFormat.STANDARD, category, roundNumber),
    format: RoundFormat.STANDARD,
    category,
    questionCount: QUESTIONS_PER_ROUND,
    difficulty: Difficulty.MIXED,
  };
}

export function buildRoundsFromQuestions(
  roundConfigs: RoundConfig[],
  questions: Question[],
): Round[] {
  let cursor = 0;

  return roundConfigs.map((config) => {
    const startIndex = cursor;
    const endIndex = startIndex + config.questionCount - 1;
    cursor = endIndex + 1;

    for (let index = startIndex; index <= endIndex; index++) {
      if (questions[index]) {
        questions[index].roundId = config.id;
      }
    }

    return {
      ...config,
      startIndex,
      endIndex,
    };
  });
}

export function getRoundForQuestionIndex(
  game: GameState,
  questionIndex: number,
): Round | undefined {
  return game.rounds.find(
    (round) =>
      questionIndex >= round.startIndex && questionIndex <= round.endIndex,
  );
}

export function getRoundNumber(game: GameState, round?: Round): number | null {
  if (!round) {
    return null;
  }

  const index = game.rounds.findIndex((item) => item.id === round.id);
  return index >= 0 ? index + 1 : null;
}

export function isLastQuestionInRound(
  game: GameState,
  questionIndex: number,
): boolean {
  const round = getRoundForQuestionIndex(game, questionIndex);
  return round ? questionIndex === round.endIndex : false;
}

export function isLastRound(game: GameState, round?: Round): boolean {
  if (!round || game.rounds.length === 0) {
    return false;
  }

  return round.id === game.rounds[game.rounds.length - 1]?.id;
}

export function uniqueCategoriesFromRounds(
  roundConfigs: RoundConfig[],
): QuizCategory[] {
  return [...new Set(roundConfigs.map((round) => round.category))];
}
