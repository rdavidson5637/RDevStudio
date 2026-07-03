"use client";

import { useEffect } from "react";
import type { AuditPhase } from "@/types/toolkit-audit";

export function useFocusOnPhaseChange(phase: AuditPhase, headingId: string) {
  useEffect(() => {
    if (phase !== "results") return;
    document.getElementById(headingId)?.focus();
  }, [phase, headingId]);
}
