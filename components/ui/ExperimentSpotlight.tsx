import Link from "next/link";

type Experiment = {
  href: string;
  label: string;
  description: string;
  status?: "live" | "soon";
};

type ExperimentSpotlightProps = {
  experiment: Experiment;
  animationDelayMs?: number;
  compact?: boolean;
  animated?: boolean;
};

export function ExperimentSpotlight({
  experiment,
  animationDelayMs = 0,
  compact = false,
  animated = true,
}: ExperimentSpotlightProps) {
  const soon = experiment.status === "soon";

  return (
    <article
      className={`work-card-lift group flex flex-col overflow-hidden rounded-[10px] border border-border bg-raised ${
        animated ? "animate-fade-in opacity-0" : ""
      } ${compact ? "p-5" : "p-6 sm:p-8"}`}
      style={animated ? { animationDelay: `${animationDelayMs}ms` } : undefined}
    >
      <Link
        href={experiment.href}
        className="flex flex-1 flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
      >
        <div className="flex items-start justify-between gap-3">
          <h2
            className={`font-display uppercase leading-tight text-primary ${
              compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
            }`}
          >
            {experiment.label}
          </h2>
          <span
            className={`shrink-0 rounded-full border border-border-strong bg-base px-2.5 py-0.5 text-xs font-semibold ${
              soon ? "text-tertiary" : "text-accent"
            }`}
          >
            {soon ? "Coming soon" : "Live"}
          </span>
        </div>

        <p
          className={`mt-3 flex-1 leading-relaxed text-secondary ${
            compact ? "text-sm" : "text-sm sm:text-base"
          }`}
        >
          {experiment.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="shell-label text-accent">Experiment</span>
          <span className="pitch-link text-sm font-semibold text-primary transition-colors group-hover:text-accent">
            {soon ? "Have a look →" : "Open →"}
          </span>
        </div>
      </Link>
    </article>
  );
}
