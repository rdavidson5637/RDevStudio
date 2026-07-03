import Link from "next/link";
import type { InteractiveTool } from "@/types/interactive-tools";
import {
  getInteractiveCategoryLabel,
  isInteractiveToolSoon,
} from "@/lib/interactive-tools/catalog";
import { InteractiveToolBadge } from "./InteractiveToolBadge";

type InteractiveToolCardProps = {
  tool: InteractiveTool;
  compact?: boolean;
  animationDelayMs?: number;
};

export function InteractiveToolCard({
  tool,
  compact = false,
  animationDelayMs = 0,
}: InteractiveToolCardProps) {
  const categoryLabel = getInteractiveCategoryLabel(tool.category);
  const isSoon = isInteractiveToolSoon(tool);
  const displayBadge = isSoon ? "coming-soon" : tool.badge;

  return (
    <article
      className={`work-card-lift group flex animate-fade-in flex-col overflow-hidden rounded-[10px] border border-border bg-raised opacity-0 ${
        compact ? "p-5" : "p-6 sm:p-8"
      } ${isSoon ? "!opacity-90" : ""}`}
      style={{ animationDelay: `${animationDelayMs}ms` }}
    >
      <Link
        href={tool.href}
        className="flex flex-1 flex-col focus:outline-none"
      >
        <div className="flex items-start justify-between gap-3">
          <h2
            className={`font-display uppercase leading-tight text-primary ${
              compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
            }`}
          >
            {tool.title}
          </h2>
          {displayBadge ? <InteractiveToolBadge badge={displayBadge} /> : null}
        </div>

        <p
          className={`mt-3 flex-1 leading-relaxed text-secondary ${
            compact ? "text-sm" : "text-sm sm:text-base"
          }`}
        >
          {tool.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="shell-label text-accent">{categoryLabel}</span>
          <span
            className={`pitch-link text-sm font-semibold text-primary ${
              isSoon ? "" : "transition-colors group-hover:text-accent"
            }`}
          >
            {isSoon ? "Preview →" : "Open →"}
          </span>
        </div>
      </Link>
    </article>
  );
}
