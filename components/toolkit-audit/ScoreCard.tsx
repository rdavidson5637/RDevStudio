import type { AuditCategoryScore } from "@/types/toolkit-audit";
import { getScoreLetter, getScoreStyle } from "@/lib/toolkit-audit/scoring";
import { FadeIn } from "./FadeIn";
import { InsightList } from "./InsightList";
import { ScoreRing } from "./ScoreRing";

type ScoreCardProps = {
  category: AuditCategoryScore;
  variant?: "default" | "hero";
  animationDelayMs?: number;
  headingLevel?: "h2" | "h3";
};

export function ScoreCard({
  category,
  variant = "default",
  animationDelayMs = 0,
  headingLevel = "h3",
}: ScoreCardProps) {
  const style = getScoreStyle(category.score);
  const letter = getScoreLetter(category.score);
  const isHero = variant === "hero";
  const Heading = isHero ? "h2" : headingLevel;

  return (
    <FadeIn
      as="article"
      delayMs={animationDelayMs}
      className={`work-card-lift overflow-hidden rounded-[10px] border border-border bg-raised ${
        isHero ? "p-6 sm:p-8" : "p-5 sm:p-6"
      }`}
    >
      <div
        className={
          isHero
            ? "flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
            : "flex flex-col gap-4"
        }
      >
        <div className={isHero ? "min-w-0 flex-1" : ""}>
          <div className="flex flex-wrap items-center gap-3">
            <p className="shell-label text-accent">{category.title}</p>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${style.badgeClass}`}
            >
              {style.label}
            </span>
          </div>

          {isHero ? (
            <Heading className="mt-3 font-display text-3xl uppercase tracking-tight text-primary sm:text-4xl">
              {letter} grade
            </Heading>
          ) : (
            <Heading className="mt-2 font-display text-xl uppercase tracking-tight text-primary">
              {category.score}
              <span className="text-base text-tertiary"> / 100</span>
            </Heading>
          )}

          <p
            className={`mt-3 leading-relaxed text-secondary ${
              isHero ? "max-w-2xl text-base sm:text-lg" : "text-sm sm:text-base"
            }`}
          >
            {category.summary}
          </p>
        </div>

        {isHero ? (
          <ScoreRing
            score={category.score}
            size={140}
            className="shrink-0 self-center lg:self-auto"
          />
        ) : (
          <div
            className="h-2 overflow-hidden rounded-full bg-border"
            role="progressbar"
            aria-valuenow={category.score}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${category.title} score`}
          >
            <div
              className={`h-full rounded-full transition-all duration-slow ease-out motion-reduce:transition-none ${style.barClass}`}
              style={{ width: `${category.score}%` }}
            />
          </div>
        )}
      </div>

      {(category.highlights.length > 0 || category.issues.length > 0) && (
        <div
          className={`mt-6 grid gap-5 border-t border-border pt-6 ${
            isHero ? "sm:grid-cols-2" : "grid-cols-1"
          }`}
        >
          <InsightList
            title="Highlights"
            items={category.highlights}
            tone="positive"
          />
          <InsightList
            title="To improve"
            items={category.issues}
            tone="negative"
          />
        </div>
      )}
    </FadeIn>
  );
}
