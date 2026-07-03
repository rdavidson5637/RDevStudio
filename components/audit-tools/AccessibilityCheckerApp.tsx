"use client";

import { UrlAuditToolApp } from "@/components/toolkit-audit/UrlAuditToolApp";
import { ACCESSIBILITY_CHECKER_CONFIG } from "@/lib/audit-tools/configs";

export function AccessibilityCheckerApp() {
  return <UrlAuditToolApp config={ACCESSIBILITY_CHECKER_CONFIG} />;
}
