import { FadeIn } from "./FadeIn";

type RecommendationsCardProps = {
  recommendations: string[];
  animationDelayMs?: number;
};

export function RecommendationsCard({
  recommendations,
  animationDelayMs = 0,
}: RecommendationsCardProps) {
  if (recommendations.length === 0) return null;

  return (
    <FadeIn
      as="article"
      delayMs={animationDelayMs}
      className="work-card-lift overflow-hidden rounded-[10px] border border-border bg-raised p-6 sm:p-8"
    >
      <p className="shell-label text-accent">AI recommendations</p>
      <h2 className="mt-2 font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl">
        Priority fixes
      </h2>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-secondary">
        Actionable changes ranked by likely impact on conversions and clarity.
      </p>
      <ol className="mt-6 space-y-4">
        {recommendations.map((item, index) => (
          <li
            key={item}
            className="flex gap-4 rounded-md border border-border-strong bg-base p-4"
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-mono text-sm font-bold text-accent"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <p className="text-sm leading-relaxed text-secondary sm:text-base">
              {item}
            </p>
          </li>
        ))}
      </ol>
    </FadeIn>
  );
}
