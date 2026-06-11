"use client";

interface AnswerButtonProps {
  letter: "A" | "B" | "C" | "D";
  text: string;
  selected: boolean;
  disabled: boolean;
  riskMode?: boolean;
  onClick: () => void;
}

export function AnswerButton({
  letter,
  text,
  selected,
  disabled,
  riskMode = false,
  onClick,
}: AnswerButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex min-h-[56px] w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
        selected
          ? "border-quiz-amber bg-quiz-amber text-quiz-bg shadow-quiz-glow"
          : disabled
            ? "cursor-not-allowed border-quiz-border bg-quiz-surface/40 text-quiz-muted opacity-60"
            : riskMode
              ? "border-quiz-border bg-quiz-surface text-quiz-ink hover:border-quiz-danger/50 hover:bg-quiz-danger/10"
              : "border-quiz-border bg-quiz-surface text-quiz-ink hover:border-quiz-amber/40 hover:bg-quiz-amber/5"
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-colors ${
          selected
            ? "bg-quiz-bg text-quiz-amber"
            : "bg-quiz-bg-elevated text-quiz-amber"
        }`}
      >
        {letter}
      </span>
      <span className="text-base font-medium leading-snug">{text}</span>
    </button>
  );
}
