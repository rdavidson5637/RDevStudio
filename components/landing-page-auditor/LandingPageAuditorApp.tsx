"use client";

import { useId } from "react";
import { AuditResultsHeader } from "@/components/toolkit-audit/AuditResultsHeader";
import { PlaceholderNotice } from "@/components/toolkit-audit/PlaceholderNotice";
import { RecommendationsCard } from "@/components/toolkit-audit/RecommendationsCard";
import { ScanLoadingPanel } from "@/components/toolkit-audit/ScanLoadingPanel";
import { ScoreCard } from "@/components/toolkit-audit/ScoreCard";
import { ToolkitToolHeader } from "@/components/toolkit-audit/ToolkitToolHeader";
import { UrlAuditForm } from "@/components/toolkit-audit/UrlAuditForm";
import { useFocusOnPhaseChange } from "@/hooks/useFocusOnPhaseChange";
import { useUrlAuditFlow } from "@/hooks/useUrlAuditFlow";
import { AUDITOR_LOADING_STEPS } from "@/lib/landing-page-auditor/constants";
import { getPlaceholderAuditResult } from "@/lib/landing-page-auditor/placeholder";
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
    runScan,
    reset,
  } = useUrlAuditFlow<LandingPageAuditResult>({
    toolSlug: "ai-landing-page-auditor",
    steps: AUDITOR_LOADING_STEPS,
    getResult: getPlaceholderAuditResult,
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
        title="AI Landing Page Auditor"
        description="Paste a landing page URL for an AI-style breakdown of messaging, CTAs, trust signals, visual hierarchy, and conversion opportunities."
      />

      {phase === "input" ? (
        <div className="py-10">
          <UrlAuditForm
            onSubmit={runScan}
            submitLabel="Audit page"
            hint="We'll analyse hero, CTAs, copy, colour, trust, hierarchy, accessibility, and UX."
          />
        </div>
      ) : null}

      {phase === "loading" ? (
        <ScanLoadingPanel
          title={host}
          subtitle="Reviewing conversion patterns, copy clarity, and page structure."
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

          <PlaceholderNotice message="Sample audit data shown for preview — AI backend is not connected yet." />
        </section>
      ) : null}
    </div>
  );
}
