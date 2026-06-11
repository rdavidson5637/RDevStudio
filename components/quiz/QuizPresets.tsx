"use client";

import { QUIZ_PRESETS } from "@/lib/quiz/presets";
import type { RoundConfig } from "@/lib/quiz/types";

interface QuizPresetsProps {
  onSelect: (presetId: string, rounds: RoundConfig[]) => void;
  activePresetId?: string | null;
}

export function QuizPresets({ onSelect, activePresetId }: QuizPresetsProps) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-medium text-quiz-ink">Quiz night presets</p>
        <p className="text-xs text-quiz-muted">
          One-tap setups — you can still tweak rounds below.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {QUIZ_PRESETS.map((preset) => {
          const isActive = activePresetId === preset.id;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelect(preset.id, preset.buildRounds())}
              className={`rounded-xl border p-3 text-left transition-all ${
                isActive
                  ? "border-quiz-amber bg-quiz-amber/10"
                  : "border-quiz-border bg-quiz-bg-elevated hover:border-quiz-amber/40"
              }`}
            >
              <p className="font-medium text-quiz-ink">{preset.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-quiz-muted">
                {preset.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
