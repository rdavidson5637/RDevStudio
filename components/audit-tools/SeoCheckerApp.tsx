"use client";

import { UrlAuditToolApp } from "@/components/toolkit-audit/UrlAuditToolApp";
import { SEO_CHECKER_CONFIG } from "@/lib/audit-tools/configs";

export function SeoCheckerApp() {
  return <UrlAuditToolApp config={SEO_CHECKER_CONFIG} />;
}
