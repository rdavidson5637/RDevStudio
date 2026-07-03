"use client";

import { useId } from "react";
import { AuditResultsHeader } from "@/components/toolkit-audit/AuditResultsHeader";
import { LeadCaptureCard } from "@/components/toolkit-audit/LeadCaptureCard";
import { PlaceholderNotice } from "@/components/toolkit-audit/PlaceholderNotice";
import { ScanLoadingPanel } from "@/components/toolkit-audit/ScanLoadingPanel";
import { ScoreCard } from "@/components/toolkit-audit/ScoreCard";
import { ToolkitToolHeader } from "@/components/toolkit-audit/ToolkitToolHeader";
import { UrlAuditForm } from "@/components/toolkit-audit/UrlAuditForm";
import { GRADER_LOADING_STEPS } from "@/lib/website-grader/constants";
import { getPlaceholderGraderResult } from "@/lib/website-grader/placeholder";
import { useFocusOnPhaseChange } from "@/hooks/useFocusOnPhaseChange";
import { useUrlAuditFlow } from "@/hooks/useUrlAuditFlow";
import { getHostname, staggerDelay } from "@/lib/toolkit-audit/utils";
import type { WebsiteGraderResult } from "@/types/website-grader";

export function WebsiteGraderApp() {
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
  } = useUrlAuditFlow<WebsiteGraderResult>({
    toolSlug: "website-grader",
    steps: GRADER_LOADING_STEPS,
    getResult: getPlaceholderGraderResult,
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
          ? `Grading ${host}. Please wait.`
          : phase === "results"
            ? `Grading complete for ${host}.`
            : ""}
      </p>

      <ToolkitToolHeader
        category="Audit & analysis"
        title="Website Grader"
        description="Paste any URL for a quick health check - SEO, accessibility, performance, security, and best practices in one report."
      />

      {phase === "input" ? (
        <div className="py-10">
          <UrlAuditForm
            onSubmit={runScan}
            submitLabel="Grade site"
            hint="We'll check SEO, accessibility, performance, security, and best practices."
          />
        </div>
      ) : null}

      {phase === "loading" ? (
        <ScanLoadingPanel
          title={host}
          subtitle="Running checks across SEO, accessibility, performance, and more."
          steps={GRADER_LOADING_STEPS}
          progress={progress}
          activeStepIndex={activeStepIndex}
          ariaLabel={`Grading ${host}`}
          progressLabel="Website scan progress"
        />
      ) : null}

      {phase === "results" && result ? (
        <section className="py-8" aria-labelledby={resultsHeadingId}>
          <AuditResultsHeader
            title={getHostname(result.url)}
            subtitle={result.url}
            scannedAt={result.scannedAt}
            resetLabel="Grade another site"
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
          </div>

          <PlaceholderNotice />

          <div className="mt-8">
            <LeadCaptureCard
              toolName="Website Grader"
              context={`${result.url} scored ${result.overall.score}/100`}
            />
          </div>
        </section>
      ) : null}
    </div>
  );
}
