"use client";

interface CategoryPillProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  icon?: string;
}

export function CategoryPill({
  label,
  selected,
  onClick,
  icon,
}: CategoryPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
        selected
          ? "border-quiz-amber bg-quiz-amber text-quiz-bg shadow-[0_0_20px_rgba(245,158,11,0.25)]"
          : "border-quiz-border bg-quiz-surface text-quiz-muted hover:border-quiz-amber/50 hover:text-white"
      }`}
    >
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      <span>{label}</span>
    </button>
  );
}
