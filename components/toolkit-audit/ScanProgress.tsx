import type { ScanStep } from "@/types/toolkit-audit";

type ScanProgressProps = {
  steps: readonly ScanStep[];
  progress: number;
  activeStepIndex: number;
  progressLabel?: string;
};

export function ScanProgress({
  steps,
  progress,
  activeStepIndex,
  progressLabel = "Scan progress",
}: ScanProgressProps) {
  const activeStep = steps[activeStepIndex];

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="shell-label text-accent">Scanning</p>
          <p className="shell-label text-secondary">{progress}%</p>
        </div>
        <div
          className="h-2 overflow-hidden rounded-full bg-border"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={progressLabel}
        >
          <div
            className="h-full rounded-full bg-accent transition-all duration-normal ease-out motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
        {activeStep ? (
          <p
            className="mt-3 text-sm text-secondary"
            aria-live="polite"
            aria-atomic="true"
          >
            {activeStep.label}…
          </p>
        ) : null}
      </div>

      <ol className="space-y-3" aria-label="Scan steps">
        {steps.map((step, index) => {
          const isComplete = index < activeStepIndex;
          const isActive = index === activeStepIndex;

          return (
            <li
              key={step.id}
              className={`flex items-center gap-3 rounded-md border px-4 py-3 transition-colors ${
                isActive
                  ? "border-accent/40 bg-accent/5"
                  : isComplete
                    ? "border-border bg-base"
                    : "border-border-strong bg-raised"
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                  isComplete
                    ? "border-accent bg-accent text-on-accent"
                    : isActive
                      ? "border-accent text-accent motion-reduce:animate-none animate-slow-pulse"
                      : "border-border-strong text-tertiary"
                }`}
                aria-hidden="true"
              >
                {isComplete ? "✓" : index + 1}
              </span>
              <span
                className={`text-sm font-medium ${
                  isActive || isComplete ? "text-primary" : "text-tertiary"
                }`}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
