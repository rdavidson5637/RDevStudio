"use client";

import { useId } from "react";
import { AuditErrorPanel } from "@/components/toolkit-audit/AuditErrorPanel";
import { AuditResultsHeader } from "@/components/toolkit-audit/AuditResultsHeader";
import { RecommendationsCard } from "@/components/toolkit-audit/RecommendationsCard";
import { ScanLoadingPanel } from "@/components/toolkit-audit/ScanLoadingPanel";
import { ScoreCard } from "@/components/toolkit-audit/ScoreCard";
import { ToolkitToolHeader } from "@/components/toolkit-audit/ToolkitToolHeader";
import { UrlAuditForm } from "@/components/toolkit-audit/UrlAuditForm";
import { useFocusOnPhaseChange } from "@/hooks/useFocusOnPhaseChange";
import { useUrlAuditFlow } from "@/hooks/useUrlAuditFlow";
import { AUDITOR_LOADING_STEPS } from "@/lib/landing-page-auditor/constants";
import { getHostname, staggerDelay } from "@/lib/toolkit-audit/utils";
import type { LandingPageAuditResult } from "@/types/landing-page-auditor";

export function LandingPageAuditorApp() {
  const resultsHeadingId = useId();
  const statusId = useId();

  const {
    phase,
    activeUrl,
    progress,
    activeStepIndex,
    result,
    error,
    runScan,
    reset,
  } = useUrlAuditFlow<LandingPageAuditResult>({
    toolSlug: "ai-landing-page-auditor",
    steps: AUDITOR_LOADING_STEPS,
    getResult: async (url: string) => {
      const params = new URLSearchParams({ url, tool: "landing" });
      const response = await fetch(`/api/audit?${params}`);
      const payload = (await response.json()) as LandingPageAuditResult & { error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? "That page could not be checked.");
      }
      return payload;
    },
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
          ? `Auditing landing page for ${host}. Please wait.`
          : phase === "results"
            ? `Audit complete for ${host}.`
            : ""}
      </p>

      <ToolkitToolHeader
        category="Audit & analysis"
        title="Landing page checker"
        description="Paste a URL. This reads the HTML for a heading, a description, a way to respond, and a privacy link. It does not guess at design or copy."
      />

      {phase === "input" ? (
        <div className="py-10">
          <UrlAuditForm
            onSubmit={runScan}
            submitLabel="Audit page"
            hint="The check uses the page HTML. Colour, layout, and tone are not scored."
          />
        </div>
      ) : null}

      {phase === "loading" ? (
        <ScanLoadingPanel
          title={host}
          subtitle="Reading the heading, the description, and how someone can respond."
          steps={AUDITOR_LOADING_STEPS}
          progress={progress}
          activeStepIndex={activeStepIndex}
          ariaLabel={`Auditing ${host}`}
          progressLabel="Landing page audit progress"
        />
      ) : null}

      {phase === "results" && result ? (
        <section className="py-8" aria-labelledby={resultsHeadingId}>
          <AuditResultsHeader
            title={getHostname(result.url)}
            subtitle={result.url}
            scannedAt={result.scannedAt}
            resetLabel="Audit another page"
            onReset={reset}
            resultsHeadingId={resultsHeadingId}
          />

          <div className="space-y-5">
            <ScoreCard
              category={result.hero}
              variant="hero"
              animationDelayMs={80}
            />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {result.sections.map((section, index) => (
                <ScoreCard
                  key={section.id}
                  category={section}
                  animationDelayMs={staggerDelay(160, index)}
                />
              ))}
            </div>

            <RecommendationsCard
              recommendations={result.recommendations}
              animationDelayMs={staggerDelay(160, result.sections.length)}
            />
          </div>

        </section>
      ) : null}

      {phase === "error" && error ? (
        <AuditErrorPanel message={error} onRetry={reset} retryLabel="Check another page" />
      ) : null}
    </div>
  );
}
