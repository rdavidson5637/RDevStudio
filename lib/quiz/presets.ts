import {
  DEFAULT_TIME_LIMIT_SECONDS,
  QUESTIONS_PER_ROUND,
} from "./constants";
import { defaultRoundName } from "./rounds";
import {
  Difficulty,
  QuizCategory,
  RoundFormat,
  type RoundConfig,
} from "./types";

export interface QuizPreset {
  id: string;
  name: string;
  description: string;
  buildRounds: () => RoundConfig[];
}

function round(
  index: number,
  spec: {
    format: RoundFormat;
    category: QuizCategory;
    questionCount?: number;
    difficulty?: Difficulty;
    timeLimitSeconds?: number;
    doublePoints?: boolean;
  }
): RoundConfig {
  const format = spec.format;
  const category = spec.category;

  return {
    id: `round_${index}`,
    name: defaultRoundName(format, category, index),
    format,
    category,
    questionCount: spec.questionCount ?? QUESTIONS_PER_ROUND,
    difficulty: spec.difficulty ?? Difficulty.MIXED,
    timeLimitSeconds: spec.timeLimitSeconds ?? DEFAULT_TIME_LIMIT_SECONDS,
    doublePoints: spec.doublePoints,
  };
}

export const QUIZ_PRESETS: QuizPreset[] = [
  {
    id: "classic",
    name: "Classic pub night",
    description: "General → Sport → Music → Picture. The full experience.",
    buildRounds: () => [
      round(1, { format: RoundFormat.STANDARD, category: QuizCategory.GENERAL }),
      round(2, { format: RoundFormat.STANDARD, category: QuizCategory.SPORT }),
      round(3, {
        format: RoundFormat.MUSIC,
        category: QuizCategory.MUSIC,
        timeLimitSeconds: 35,
      }),
      round(4, {
        format: RoundFormat.PICTURE,
        category: QuizCategory.GEOGRAPHY,
        timeLimitSeconds: 40,
        doublePoints: true,
      }),
    ],
  },
  {
    id: "film-buffs",
    name: "Film buffs",
    description: "Film & TV, music, general knowledge, then a risk round.",
    buildRounds: () => [
      round(1, {
        format: RoundFormat.STANDARD,
        category: QuizCategory.FILM_TV,
        difficulty: Difficulty.MEDIUM,
      }),
      round(2, {
        format: RoundFormat.MUSIC,
        category: QuizCategory.MUSIC,
        timeLimitSeconds: 35,
      }),
      round(3, {
        format: RoundFormat.STANDARD,
        category: QuizCategory.GENERAL,
      }),
      round(4, {
        format: RoundFormat.RISK,
        category: QuizCategory.POP_CULTURE,
        questionCount: 8,
        difficulty: Difficulty.HARD,
        doublePoints: true,
      }),
    ],
  },
  {
    id: "chaos",
    name: "Chaos mode",
    description: "Buzzer, risk, picture, and music — fast and frantic.",
    buildRounds: () => [
      round(1, {
        format: RoundFormat.BUZZER,
        category: QuizCategory.GENERAL,
        questionCount: 8,
        difficulty: Difficulty.MEDIUM,
        timeLimitSeconds: 20,
      }),
      round(2, {
        format: RoundFormat.RISK,
        category: QuizCategory.SPORT,
        questionCount: 8,
      }),
      round(3, {
        format: RoundFormat.PICTURE,
        category: QuizCategory.GEOGRAPHY,
        questionCount: 8,
        timeLimitSeconds: 40,
      }),
      round(4, {
        format: RoundFormat.MUSIC,
        category: QuizCategory.MUSIC,
        questionCount: 8,
        timeLimitSeconds: 35,
        doublePoints: true,
      }),
    ],
  },
  {
    id: "quick",
    name: "Quick pint",
    description: "Two short rounds — done in about 20 minutes.",
    buildRounds: () => [
      round(1, {
        format: RoundFormat.STANDARD,
        category: QuizCategory.GENERAL,
        questionCount: 6,
        difficulty: Difficulty.EASY,
      }),
      round(2, {
        format: RoundFormat.PICTURE,
        category: QuizCategory.GEOGRAPHY,
        questionCount: 6,
        difficulty: Difficulty.EASY,
        timeLimitSeconds: 40,
        doublePoints: true,
      }),
    ],
  },
];

export function getPresetRounds(presetId: string): RoundConfig[] | null {
  const preset = QUIZ_PRESETS.find((item) => item.id === presetId);

  if (!preset) {
    return null;
  }

  return preset.buildRounds();
}
