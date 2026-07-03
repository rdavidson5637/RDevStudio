import type { ScanStep } from "@/types/toolkit-audit";
import { FadeIn } from "./FadeIn";
import { ScanProgress } from "./ScanProgress";

type ScanLoadingPanelProps = {
  title: string;
  subtitle: string;
  steps: readonly ScanStep[];
  progress: number;
  activeStepIndex: number;
  ariaLabel: string;
  progressLabel?: string;
};

export function ScanLoadingPanel({
  title,
  subtitle,
  steps,
  progress,
  activeStepIndex,
  ariaLabel,
  progressLabel,
}: ScanLoadingPanelProps) {
  return (
    <section className="py-8" aria-busy="true" aria-label={ariaLabel}>
      <FadeIn>
        <div className="mx-auto max-w-2xl">
          <header className="mb-8 text-center">
            <p className="shell-label text-accent">Analysing</p>
            <h2 className="mt-3 font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 text-sm text-secondary sm:text-base">
              {subtitle}
            </p>
          </header>

          <div className="rounded-[10px] border border-border-strong bg-raised p-5 sm:p-8">
            <ScanProgress
              steps={steps}
              progress={progress}
              activeStepIndex={activeStepIndex}
              progressLabel={progressLabel}
            />
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
