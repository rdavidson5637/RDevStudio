"use client";

import { useId, useState } from "react";
import { AuditErrorPanel } from "@/components/toolkit-audit/AuditErrorPanel";
import { AuditResultsHeader } from "@/components/toolkit-audit/AuditResultsHeader";
import { ScanLoadingPanel } from "@/components/toolkit-audit/ScanLoadingPanel";
import { ScoreCard } from "@/components/toolkit-audit/ScoreCard";
import { ToolkitToolHeader } from "@/components/toolkit-audit/ToolkitToolHeader";
import { useFileAuditFlow } from "@/hooks/useFileAuditFlow";
import { useFocusOnPhaseChange } from "@/hooks/useFocusOnPhaseChange";
import { LOGO_ROAST_STEPS } from "@/lib/logo-roast/constants";
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
    error,
    runScan,
    reset,
  } = useFileAuditFlow<LogoRoastResult>({
    toolSlug: "logo-roast",
    steps: LOGO_ROAST_STEPS,
    getResult: async (_fileName, file) => {
      const body = new FormData();
      body.set("file", file);
      const response = await fetch("/api/logo-roast", { method: "POST", body });
      let payload: (LogoRoastResult & { error?: string }) | null = null;
      try {
        payload = (await response.json()) as LogoRoastResult & { error?: string };
      } catch {
        throw new Error("That didn't work. Try again, or email ryan@rdevstudio.co.uk.");
      }
      if (!response.ok || !payload || !payload.overall) {
        throw new Error(payload?.error ?? "That didn't work. Try again.");
      }
      return payload;
    },
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
        description="Upload a PNG, JPG, WebP, or GIF. You get a written critique of the mark. If the roast service is not connected, the page says so."
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

        </section>
      ) : null}

      {phase === "error" && error ? (
        <AuditErrorPanel message={error} onRetry={handleReset} retryLabel="Try another logo" />
      ) : null}
    </div>
  );
}
