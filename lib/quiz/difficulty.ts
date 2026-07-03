import { Difficulty } from "./types";

export const DIFFICULTY_OPTIONS: Array<{
  value: Difficulty;
  label: string;
  description: string;
  className: string;
}> = [
  {
    value: Difficulty.EASY,
    label: "Easy",
    description:
      "Well-known facts and popular culture — most adults should know these",
    className: "border-green-500/60 bg-green-500/15 text-green-400",
  },
  {
    value: Difficulty.MEDIUM,
    label: "Medium",
    description: "Standard pub quiz — mix of obvious and less obvious",
    className: "border-quiz-amber/60 bg-quiz-amber/15 text-quiz-amber",
  },
  {
    value: Difficulty.HARD,
    label: "Hard",
    description:
      "Challenging trivia for knowledgeable players — obscure facts welcome",
    className: "border-red-500/60 bg-red-500/15 text-red-400",
  },
  {
    value: Difficulty.MIXED,
    label: "Mixed",
    description: "AI mixes easy, medium, and hard questions in this round",
    className: "border-purple-500/60 bg-purple-500/15 text-purple-300",
  },
];

export const DIFFICULTY_PROMPTS: Record<Difficulty, string> = {
  [Difficulty.EASY]:
    "Questions should be accessible to most adults. Think GCSE level. Favour well-known facts, popular culture, and obvious answers.",
  [Difficulty.MEDIUM]:
    "Questions should require some knowledge but not specialist expertise. Mix of obvious and less obvious. Standard pub quiz difficulty.",
  [Difficulty.HARD]:
    "Questions should challenge knowledgeable players. Obscure facts, specific dates/stats, deeper cuts in each category.",
  [Difficulty.MIXED]:
    "Mix easy, medium and hard questions roughly equally. Include one or two very easy questions and one or two very hard ones.",
};

export function getDifficultyLabel(difficulty: Difficulty): string {
  return (
    DIFFICULTY_OPTIONS.find((option) => option.value === difficulty)?.label ??
    difficulty
  );
}
