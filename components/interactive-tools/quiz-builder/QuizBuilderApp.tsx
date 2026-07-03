"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { InteractiveToolHeader } from "@/components/interactive-tools/InteractiveToolHeader";
import { FadeIn } from "@/components/toolkit-audit/FadeIn";
import { recordInteractiveToolVisit } from "@/lib/interactive-tools/storage";

type Question = {
  id: string;
  text: string;
  answers: string[];
  correct: number;
};

export function QuizBuilderApp() {
  const [title, setTitle] = useState("My Pub Quiz");
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      text: "What year did the web go public?",
      answers: ["1989", "1991", "1995", "2000"],
      correct: 1,
    },
  ]);

  useEffect(() => {
    recordInteractiveToolVisit("quiz-builder");
  }, []);

  const addQuestion = () => {
    setQuestions((q) => [
      ...q,
      {
        id: crypto.randomUUID(),
        text: "",
        answers: ["", "", "", ""],
        correct: 0,
      },
    ]);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify({ title, questions }, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "quiz-draft.json";
    link.click();
  };

  return (
    <div>
      <InteractiveToolHeader
        category="Quizzes & games"
        title="Quiz Builder"
        description="Draft quiz rounds locally, then host a full multiplayer game with Pub Quiz."
      />
      <FadeIn className="space-y-6 py-10">
        <label className="block max-w-md">
          <span className="shell-label text-accent">Quiz title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 text-primary"
          />
        </label>
        {questions.map((q, qi) => (
          <div
            key={q.id}
            className="rounded-[10px] border border-border-strong bg-raised p-5"
          >
            <label className="block">
              <span className="shell-label text-accent">Question {qi + 1}</span>
              <input
                value={q.text}
                onChange={(e) =>
                  setQuestions((prev) =>
                    prev.map((x) =>
                      x.id === q.id ? { ...x, text: e.target.value } : x,
                    ),
                  )
                }
                className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-2 text-primary"
              />
            </label>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {q.answers.map((a, ai) => (
                <input
                  key={ai}
                  value={a}
                  onChange={(e) =>
                    setQuestions((prev) =>
                      prev.map((x) =>
                        x.id === q.id
                          ? {
                              ...x,
                              answers: x.answers.map((ans, j) =>
                                j === ai ? e.target.value : ans,
                              ),
                            }
                          : x,
                      ),
                    )
                  }
                  placeholder={`Answer ${ai + 1}`}
                  className="rounded-md border border-border-strong bg-base px-3 py-2 text-sm text-primary"
                />
              ))}
            </div>
          </div>
        ))}
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={addQuestion} className="btn-secondary">
            Add question
          </button>
          <button type="button" onClick={exportJson} className="btn-secondary">
            Export JSON
          </button>
          <Link href="/pub-quiz" className="btn-primary">
            Host with Pub Quiz →
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
