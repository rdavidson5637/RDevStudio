import Link from "next/link";
import { WARDROBE_AI } from "@/lib/constants";

type WardrobeAISpotlightProps = {
  animationDelayMs?: number;
  compact?: boolean;
};

export function WardrobeAISpotlight({
  animationDelayMs = 0,
  compact = false,
}: WardrobeAISpotlightProps) {
  return (
    <article
      className={`work-card-lift group flex animate-fade-in flex-col overflow-hidden rounded-[10px] border border-border bg-raised opacity-0 ${
        compact ? "p-5" : "p-6 sm:p-8"
      }`}
      style={{ animationDelay: `${animationDelayMs}ms` }}
    >
      <Link
        href={WARDROBE_AI.href}
        className="flex flex-1 flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
      >
        <div className="flex items-start justify-between gap-3">
          <h2
            className={`font-display uppercase leading-tight text-primary ${
              compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
            }`}
          >
            {WARDROBE_AI.label}
          </h2>
          <span className="shrink-0 rounded-full border border-border-strong bg-base px-2.5 py-0.5 text-xs font-semibold text-accent">
            Live
          </span>
        </div>

        <p
          className={`mt-3 flex-1 leading-relaxed text-secondary ${
            compact ? "text-sm" : "text-sm sm:text-base"
          }`}
        >
          {WARDROBE_AI.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="shell-label text-accent">Experiment</span>
          <span className="pitch-link text-sm font-semibold text-primary transition-colors group-hover:text-accent">
            Open →
          </span>
        </div>
      </Link>
    </article>
  );
}
