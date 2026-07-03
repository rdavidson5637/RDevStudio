"use client";

import Link from "next/link";
import type { BusinessTool } from "@/types/business-toolkit";
import { getCategoryLabel, isToolSoon } from "@/lib/business-toolkit/catalog";
import { ToolBadge } from "./ToolBadge";

type ToolCardProps = {
  tool: BusinessTool;
  isFavourite?: boolean;
  onToggleFavourite?: (slug: string) => void;
  compact?: boolean;
};

export function ToolCard({
  tool,
  isFavourite = false,
  onToggleFavourite,
  compact = false,
}: ToolCardProps) {
  const categoryLabel = getCategoryLabel(tool.category);
  const isSoon = isToolSoon(tool);
  const displayBadge = isSoon ? "coming-soon" : tool.badge;

  const body = (
    <>
      <div
        className={`flex items-start justify-between gap-3 ${onToggleFavourite ? "pr-10" : ""}`}
      >
        <h2
          className={`font-display uppercase leading-tight text-primary ${
            compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
          }`}
        >
          {tool.title}
        </h2>
        {displayBadge ? <ToolBadge badge={displayBadge} /> : null}
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
    </>
  );

  return (
    <article
      className={`work-card-lift group relative flex flex-col overflow-hidden rounded-[10px] border border-border bg-raised ${
        compact ? "p-5" : "p-6 sm:p-8"
      } ${isSoon ? "opacity-90" : ""}`}
    >
      {onToggleFavourite && !isSoon ? (
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onToggleFavourite(tool.slug);
          }}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-md border border-border-strong bg-base text-secondary transition-colors hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-raised"
          aria-label={
            isFavourite
              ? `Remove ${tool.title} from favourites`
              : `Add ${tool.title} to favourites`
          }
          aria-pressed={isFavourite}
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill={isFavourite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        </button>
      ) : null}

      <Link
        href={tool.href}
        className="flex flex-1 flex-col focus:outline-none"
      >
        {body}
      </Link>
    </article>
  );
}
