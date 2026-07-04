"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { recordRecentSlug } from "@/lib/business-toolkit/storage";
import { simulateScan } from "@/lib/toolkit-audit/utils";
import type { AuditPhase, ScanStep } from "@/types/toolkit-audit";

type UseUrlAuditFlowOptions<T> = {
  toolSlug: string;
  steps: readonly ScanStep[];
  getResult: (url: string) => T | Promise<T>;
  stepDurationMs?: number;
};

export function useUrlAuditFlow<T>({
  toolSlug,
  steps,
  getResult,
  stepDurationMs,
}: UseUrlAuditFlowOptions<T>) {
  const [phase, setPhase] = useState<AuditPhase>("input");
  const [activeUrl, setActiveUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef(false);

  useEffect(() => {
    recordRecentSlug(toolSlug);
    return () => {
      abortRef.current = true;
    };
  }, [toolSlug]);

  const runScan = useCallback(
    async (url: string) => {
      abortRef.current = false;
      setActiveUrl(url);
      setPhase("loading");
      setProgress(0);
      setActiveStepIndex(0);
      setResult(null);
      setError(null);

      try {
        const scanResult = await simulateScan(
          steps,
          () => getResult(url),
          (nextProgress, stepIndex) => {
            if (!abortRef.current) {
              setProgress(nextProgress);
              setActiveStepIndex(stepIndex);
            }
          },
          stepDurationMs,
        );

        if (!abortRef.current) {
          setResult(scanResult);
          setPhase("results");
        }
      } catch (err) {
        if (!abortRef.current) {
          setError(
            err instanceof Error ? err.message : "Audit failed. Try again.",
          );
          setPhase("error");
        }
      }
    },
    [steps, getResult, stepDurationMs]
  );

  const reset = useCallback(() => {
    abortRef.current = true;
    setPhase("input");
    setActiveUrl("");
    setResult(null);
    setError(null);
    setProgress(0);
    setActiveStepIndex(0);
  }, []);

  return {
    phase,
    activeUrl,
    progress,
    activeStepIndex,
    result,
    error,
    runScan,
    reset,
  };
}
