"use client";

import { useId } from "react";
import { AuditResultsHeader } from "@/components/toolkit-audit/AuditResultsHeader";
import { LeadCaptureCard } from "@/components/toolkit-audit/LeadCaptureCard";
import { PlaceholderNotice } from "@/components/toolkit-audit/PlaceholderNotice";
import { RecommendationsCard } from "@/components/toolkit-audit/RecommendationsCard";
import { ScanLoadingPanel } from "@/components/toolkit-audit/ScanLoadingPanel";
import { ScoreCard } from "@/components/toolkit-audit/ScoreCard";
import { ToolkitToolHeader } from "@/components/toolkit-audit/ToolkitToolHeader";
import { UrlAuditForm } from "@/components/toolkit-audit/UrlAuditForm";
import { useFocusOnPhaseChange } from "@/hooks/useFocusOnPhaseChange";
import { useUrlAuditFlow } from "@/hooks/useUrlAuditFlow";
import { getHostname, staggerDelay } from "@/lib/toolkit-audit/utils";
import type { UrlAuditToolConfig } from "@/types/url-audit-tool";

type UrlAuditToolAppProps = {
  config: UrlAuditToolConfig;
};

export function UrlAuditToolApp({ config }: UrlAuditToolAppProps) {
  const resultsHeadingId = useId();
  const statusId = useId();

  const {
    phase,
    activeUrl,
    progress,
    activeStepIndex,
    result,
    runScan,
    reset,
  } = useUrlAuditFlow({
    toolSlug: config.toolSlug,
    steps: config.steps,
    getResult: config.getResult,
  });

  useFocusOnPhaseChange(phase, resultsHeadingId);

  const host = activeUrl ? getHostname(activeUrl) : "";

  return (
    <div>
      <p
        id={statusId}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {phase === "loading"
          ? `Analysing ${host}. Please wait.`
          : phase === "results"
            ? `Analysis complete for ${host}.`
            : ""}
      </p>

      <ToolkitToolHeader
        category={config.category}
        title={config.title}
        description={config.description}
      />

      {phase === "input" ? (
        <div className="py-10">
          <UrlAuditForm
            onSubmit={runScan}
            submitLabel={config.submitLabel}
            hint={config.hint}
          />
        </div>
      ) : null}

      {phase === "loading" ? (
        <ScanLoadingPanel
          title={host}
          subtitle={config.loadingSubtitle}
          steps={config.steps}
          progress={progress}
          activeStepIndex={activeStepIndex}
          ariaLabel={`Analysing ${host}`}
          progressLabel={config.progressLabel}
        />
      ) : null}

      {phase === "results" && result ? (
        <section className="py-8" aria-labelledby={resultsHeadingId}>
          <AuditResultsHeader
            title={getHostname(result.url)}
            subtitle={result.url}
            scannedAt={result.scannedAt}
            resetLabel={config.resetLabel}
            onReset={reset}
            resultsHeadingId={resultsHeadingId}
          />
          <div className="space-y-5">
            <ScoreCard
              category={result.overall}
              variant="hero"
              animationDelayMs={80}
            />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {result.categories.map((category, index) => (
                <ScoreCard
                  key={category.id}
                  category={category}
                  animationDelayMs={staggerDelay(160, index)}
                />
              ))}
            </div>
            {result.recommendations?.length ? (
              <RecommendationsCard
                recommendations={result.recommendations}
                animationDelayMs={staggerDelay(160, result.categories.length)}
              />
            ) : null}
          </div>
          <PlaceholderNotice message={config.placeholderNotice} />

          <div className="mt-8">
            <LeadCaptureCard
              toolName={config.title}
              context={`${result.url} scored ${result.overall.score}/100`}
            />
          </div>
        </section>
      ) : null}
    </div>
  );
}
