"use client";

import { useState } from "react";

import type { RoundConfig } from "@/lib/quiz/types";

interface PreviewQuestion {
  id: string;
  text: string;
  category: string;
  options?: string[] | null;
}

interface QuestionPreviewProps {
  rounds: RoundConfig[];
}

export function QuestionPreview({ rounds }: QuestionPreviewProps) {
  const [loading, setLoading] = useState(false);
  const [samples, setSamples] = useState<
    Array<{ roundName: string; questions: PreviewQuestion[] }>
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  async function loadPreview() {
    setLoading(true);
    setError(null);

    try {
      const results = await Promise.all(
        rounds.map(async (round) => {
          const params = new URLSearchParams({
            category: round.category,
            format: round.format,
            count: "2",
            difficulty: round.difficulty,
          });

          const response = await fetch(
            `/api/quiz/generate-preview?${params.toString()}`
          );
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error ?? "Preview failed");
          }

          return {
            roundName: round.name,
            questions: data.questions as PreviewQuestion[],
          };
        })
      );

      setSamples(results);
      setOpen(true);
    } catch (previewError) {
      setError(
        previewError instanceof Error
          ? previewError.message
          : "Could not generate preview"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => void loadPreview()}
        disabled={loading || rounds.length === 0}
        className="quiz-btn-secondary w-full text-sm"
      >
        {loading ? "Generating samples..." : "Preview sample questions"}
      </button>

      {error ? (
        <p className="text-xs text-quiz-danger" role="alert">
          {error}
        </p>
      ) : null}

      {open && samples.length > 0 ? (
        <div className="space-y-4 rounded-xl border border-quiz-border bg-quiz-bg-elevated p-4">
          <p className="text-xs text-quiz-muted">
            Sample questions — final set is generated when you start the game.
          </p>
          {samples.map((sample) => (
            <div key={sample.roundName} className="space-y-2">
              <p className="text-sm font-medium text-quiz-amber">
                {sample.roundName}
              </p>
              <ul className="space-y-2">
                {sample.questions.map((question) => (
                  <li
                    key={question.id}
                    className="rounded-lg border border-quiz-border/60 bg-quiz-surface/50 px-3 py-2 text-sm"
                  >
                    <p className="text-quiz-ink">{question.text}</p>
                    {question.options?.length ? (
                      <p className="mt-1 text-xs text-quiz-muted">
                        {question.options.join(" · ")}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-xs text-quiz-muted hover:text-quiz-ink"
          >
            Hide preview
          </button>
        </div>
      ) : null}
    </div>
  );
}
