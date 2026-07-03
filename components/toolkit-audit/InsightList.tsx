import type { ReactNode } from "react";

type InsightListProps = {
  title: string;
  items: string[];
  tone?: "positive" | "negative";
};

export function InsightList({
  title,
  items,
  tone = "positive",
}: InsightListProps) {
  if (items.length === 0) return null;

  const titleClass = tone === "negative" ? "text-destructive" : "text-accent";
  const dotClass = tone === "negative" ? "bg-destructive" : "bg-accent";

  return (
    <div>
      <p className={`shell-label mb-3 ${titleClass}`}>{title}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-sm leading-relaxed text-secondary"
          >
            <span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dotClass}`}
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
