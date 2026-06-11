"use client";

import { CategoryPill } from "@/components/quiz/CategoryPill";
import { CATEGORY_OPTIONS } from "@/lib/quiz/categories";
import {
  DEFAULT_TIME_LIMIT_SECONDS,
  MAX_QUESTIONS_PER_ROUND,
  MAX_ROUNDS,
  MIN_QUESTIONS_PER_ROUND,
  QUESTIONS_PER_ROUND,
} from "@/lib/quiz/constants";
import {
  ROUND_FORMAT_OPTIONS,
  createDefaultRound,
  defaultRoundName,
} from "@/lib/quiz/rounds";
import { DIFFICULTY_OPTIONS } from "@/lib/quiz/difficulty";
import { Difficulty, QuizCategory, RoundFormat, type RoundConfig } from "@/lib/quiz/types";

interface RoundBuilderProps {
  rounds: RoundConfig[];
  onChange: (rounds: RoundConfig[]) => void;
}

export function RoundBuilder({ rounds, onChange }: RoundBuilderProps) {
  const totalQuestions = rounds.reduce(
    (sum, round) => sum + round.questionCount,
    0
  );

  function updateRound(index: number, patch: Partial<RoundConfig>) {
    onChange(
      rounds.map((round, roundIndex) => {
        if (roundIndex !== index) {
          return round;
        }

        const updated = { ...round, ...patch };

        if (patch.format || patch.category) {
          updated.name = defaultRoundName(
            updated.format,
            updated.category,
            index + 1
          );
        }

        return updated;
      })
    );
  }

  function addRound() {
    if (rounds.length >= MAX_ROUNDS) {
      return;
    }

    const categories = Object.values(QuizCategory);
    const category = categories[rounds.length % categories.length];

    onChange([...rounds, createDefaultRound(rounds.length + 1, category)]);
  }

  function removeRound(index: number) {
    if (rounds.length <= 1) {
      return;
    }

    onChange(
      rounds
        .filter((_, roundIndex) => roundIndex !== index)
        .map((round, roundIndex) => ({
          ...round,
          id: `round_${roundIndex + 1}`,
          name: defaultRoundName(round.format, round.category, roundIndex + 1),
        }))
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-white">Rounds</p>
          <p className="text-xs text-quiz-muted">
            {rounds.length} round{rounds.length === 1 ? "" : "s"} ·{" "}
            {totalQuestions} questions total
          </p>
        </div>
        {rounds.length < MAX_ROUNDS ? (
          <button
            type="button"
            onClick={addRound}
            className="quiz-btn-secondary text-sm"
          >
            + Add round
          </button>
        ) : null}
      </div>

      <div className="space-y-3">
        {rounds.map((round, index) => (
          <div
            key={round.id}
            className="rounded-xl border border-quiz-border bg-quiz-bg/50 p-4 space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium text-white">{round.name}</p>
              {rounds.length > 1 ? (
                <button
                  type="button"
                  onClick={() => removeRound(index)}
                  className="text-xs text-quiz-muted hover:text-red-400"
                >
                  Remove
                </button>
              ) : null}
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-quiz-muted">
                Format
              </p>
              <div className="flex flex-wrap gap-2">
                {ROUND_FORMAT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    title={option.description}
                    onClick={() => updateRound(index, { format: option.value })}
                    className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                      round.format === option.value
                        ? "border-quiz-amber bg-quiz-amber/15 text-quiz-amber"
                        : "border-quiz-border text-quiz-muted hover:border-quiz-amber/40"
                    }`}
                  >
                    {option.icon} {option.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-quiz-muted">
                {
                  ROUND_FORMAT_OPTIONS.find(
                    (option) => option.value === round.format
                  )?.description
                }
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-quiz-muted">
                Category
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_OPTIONS.map((category) => (
                  <CategoryPill
                    key={category.value}
                    label={category.label}
                    icon={category.icon}
                    selected={round.category === category.value}
                    onClick={() =>
                      updateRound(index, { category: category.value })
                    }
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-quiz-muted">
                Difficulty
              </p>
              {DIFFICULTY_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  title={option.description}
                  onClick={() =>
                    updateRound(index, { difficulty: option.value })
                  }
                  className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                    (round.difficulty ?? Difficulty.MIXED) === option.value
                      ? option.className
                      : "border-quiz-border text-quiz-muted hover:border-quiz-amber/40"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-quiz-muted">
                Questions ({round.questionCount})
              </p>
              <input
                type="range"
                min={MIN_QUESTIONS_PER_ROUND}
                max={MAX_QUESTIONS_PER_ROUND}
                value={round.questionCount}
                onChange={(event) =>
                  updateRound(index, {
                    questionCount: Number.parseInt(event.target.value, 10),
                  })
                }
                className="w-full accent-quiz-amber"
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-quiz-muted">
                Timer ({round.timeLimitSeconds ?? DEFAULT_TIME_LIMIT_SECONDS}s)
              </p>
              <input
                type="range"
                min={10}
                max={60}
                step={5}
                value={round.timeLimitSeconds ?? DEFAULT_TIME_LIMIT_SECONDS}
                onChange={(event) =>
                  updateRound(index, {
                    timeLimitSeconds: Number.parseInt(event.target.value, 10),
                  })
                }
                className="w-full accent-quiz-amber"
              />
            </div>

            <label className="flex items-center justify-between gap-3 rounded-lg border border-quiz-border px-3 py-2">
              <span className="text-xs text-quiz-muted">
                Double points this round
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={Boolean(round.doublePoints)}
                onClick={() =>
                  updateRound(index, { doublePoints: !round.doublePoints })
                }
                className={`relative h-6 w-10 rounded-full transition-colors ${
                  round.doublePoints ? "bg-quiz-amber" : "bg-quiz-border"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    round.doublePoints ? "left-4" : "left-0.5"
                  }`}
                />
              </button>
            </label>
          </div>
        ))}
      </div>

      <p className="text-xs text-quiz-muted">
        {MIN_QUESTIONS_PER_ROUND}–{MAX_QUESTIONS_PER_ROUND} questions per round.
        Questions won&apos;t repeat across games in this session.
      </p>
    </div>
  );
}
