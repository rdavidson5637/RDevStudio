import { formatScannedAt } from "@/lib/toolkit-audit/utils";
import { FadeIn } from "./FadeIn";

type AuditResultsHeaderProps = {
  title: string;
  subtitle?: string;
  scannedAt: string;
  resetLabel: string;
  onReset: () => void;
  resultsHeadingId: string;
};

export function AuditResultsHeader({
  title,
  subtitle,
  scannedAt,
  resetLabel,
  onReset,
  resultsHeadingId,
}: AuditResultsHeaderProps) {
  return (
    <FadeIn
      as="header"
      className="mb-8 flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between"
    >
      <div className="min-w-0">
        <p className="shell-label text-accent">Results</p>
        <h2
          id={resultsHeadingId}
          tabIndex={-1}
          className="mt-2 font-display text-2xl uppercase tracking-tight text-primary outline-none sm:text-3xl"
        >
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 break-all text-sm text-secondary">{subtitle}</p>
        ) : null}
        <p className="mt-1 shell-label text-tertiary">
          Scanned {formatScannedAt(scannedAt)}
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="btn-secondary shrink-0"
      >
        {resetLabel}
      </button>
    </FadeIn>
  );
}
