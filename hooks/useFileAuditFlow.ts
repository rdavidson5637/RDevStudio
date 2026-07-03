"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { recordRecentSlug } from "@/lib/business-toolkit/storage";
import { simulateScan } from "@/lib/toolkit-audit/utils";
import type { AuditPhase, ScanStep } from "@/types/toolkit-audit";

type UseFileAuditFlowOptions<T> = {
  toolSlug: string;
  steps: readonly ScanStep[];
  getResult: (fileName: string) => T;
  stepDurationMs?: number;
};

export function useFileAuditFlow<T>({
  toolSlug,
  steps,
  getResult,
  stepDurationMs,
}: UseFileAuditFlowOptions<T>) {
  const [phase, setPhase] = useState<AuditPhase>("input");
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [result, setResult] = useState<T | null>(null);
  const abortRef = useRef(false);
  const previewUrlRef = useRef<string | null>(null);

  useEffect(() => {
    recordRecentSlug(toolSlug);
    return () => {
      abortRef.current = true;
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, [toolSlug]);

  const setPreview = useCallback((file: File) => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }
    const url = URL.createObjectURL(file);
    previewUrlRef.current = url;
    setPreviewUrl(url);
  }, []);

  const runScan = useCallback(
    async (file: File) => {
      abortRef.current = false;
      setFileName(file.name);
      setPreview(file);
      setPhase("loading");
      setProgress(0);
      setActiveStepIndex(0);
      setResult(null);

      const scanResult = await simulateScan(
        steps,
        () => getResult(file.name),
        (nextProgress, stepIndex) => {
          if (!abortRef.current) {
            setProgress(nextProgress);
            setActiveStepIndex(stepIndex);
          }
        },
        stepDurationMs
      );

      if (!abortRef.current) {
        setResult(scanResult);
        setPhase("results");
      }
    },
    [steps, getResult, stepDurationMs, setPreview]
  );

  const reset = useCallback(() => {
    abortRef.current = true;
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setPhase("input");
    setFileName("");
    setPreviewUrl(null);
    setResult(null);
    setProgress(0);
    setActiveStepIndex(0);
  }, []);

  return {
    phase,
    fileName,
    previewUrl,
    progress,
    activeStepIndex,
    result,
    runScan,
    reset,
  };
}
