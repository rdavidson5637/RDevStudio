"use client";

import { useId, useState } from "react";
import { AuditResultsHeader } from "@/components/toolkit-audit/AuditResultsHeader";
import { PlaceholderNotice } from "@/components/toolkit-audit/PlaceholderNotice";
import { ScanLoadingPanel } from "@/components/toolkit-audit/ScanLoadingPanel";
import { ScoreCard } from "@/components/toolkit-audit/ScoreCard";
import { ToolkitToolHeader } from "@/components/toolkit-audit/ToolkitToolHeader";
import { useFileAuditFlow } from "@/hooks/useFileAuditFlow";
import { useFocusOnPhaseChange } from "@/hooks/useFocusOnPhaseChange";
import { LOGO_ROAST_STEPS } from "@/lib/logo-roast/constants";
import { getPlaceholderRoastResult } from "@/lib/logo-roast/placeholder";
import { staggerDelay } from "@/lib/toolkit-audit/utils";
import type { LogoRoastResult } from "@/types/logo-roast";
import { ImageUploadZone } from "./ImageUploadZone";

export function LogoRoastApp() {
  const resultsHeadingId = useId();
  const statusId = useId();
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [pendingPreview, setPendingPreview] = useState<string | null>(null);

  const {
    phase,
    fileName,
    previewUrl,
    progress,
    activeStepIndex,
    result,
    runScan,
    reset,
  } = useFileAuditFlow<LogoRoastResult>({
    toolSlug: "logo-roast",
    steps: LOGO_ROAST_STEPS,
    getResult: getPlaceholderRoastResult,
  });

  useFocusOnPhaseChange(phase, resultsHeadingId);

  const displayPreview = phase === "input" ? pendingPreview : previewUrl;
  const displayName = phase === "input" ? (pendingFile?.name ?? "") : fileName;

  const handleFileSelect = (file: File) => {
    if (pendingPreview) URL.revokeObjectURL(pendingPreview);
    setPendingFile(file);
    setPendingPreview(URL.createObjectURL(file));
  };

  const handleRoast = () => {
    if (pendingFile) runScan(pendingFile);
  };

  const handleReset = () => {
    if (pendingPreview) URL.revokeObjectURL(pendingPreview);
    setPendingFile(null);
    setPendingPreview(null);
    reset();
  };

  return (
    <div>
      <p
        id={statusId}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {phase === "loading"
          ? `Roasting ${fileName}. Please wait.`
          : phase === "results"
            ? `Roast complete for ${fileName}.`
            : ""}
      </p>

      <ToolkitToolHeader
        category="Creative & brand"
        title="Logo Roast"
        description="Upload a logo for a blunt-but-fair critique — typography, colour, scalability, memorability, and accessibility. Placeholder AI responses for now."
      />

      {phase === "input" ? (
        <div className="py-10">
          <ImageUploadZone
            onFileSelect={handleFileSelect}
            previewUrl={displayPreview}
            fileName={displayName}
          />
          {pendingFile ? (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={handleRoast}
                className="btn-primary sm:min-w-[12rem]"
              >
                Roast my logo
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      {phase === "loading" ? (
        <ScanLoadingPanel
          title={fileName}
          subtitle="Analysing brand impact, typography, colour, and scalability."
          steps={LOGO_ROAST_STEPS}
          progress={progress}
          activeStepIndex={activeStepIndex}
          ariaLabel={`Roasting logo ${fileName}`}
          progressLabel="Logo roast progress"
        />
      ) : null}

      {phase === "results" && result ? (
        <section className="py-8" aria-labelledby={resultsHeadingId}>
          <AuditResultsHeader
            title={result.fileName.replace(/\.[^.]+$/, "")}
            subtitle={result.fileName}
            scannedAt={result.scannedAt}
            resetLabel="Roast another logo"
            onReset={handleReset}
            resultsHeadingId={resultsHeadingId}
          />

          {previewUrl ? (
            <div className="mb-8 flex justify-center">
              <div className="flex h-44 w-full max-w-sm items-center justify-center rounded-[10px] border border-border-strong bg-raised p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt={`Roasted logo: ${result.fileName}`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          ) : null}

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

          <PlaceholderNotice message="Placeholder roast data shown for preview — AI analysis is not connected yet." />
        </section>
      ) : null}
    </div>
  );
}
