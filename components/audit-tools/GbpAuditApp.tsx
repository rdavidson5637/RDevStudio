"use client";

import { UrlAuditToolApp } from "@/components/toolkit-audit/UrlAuditToolApp";
import { GBP_AUDIT_CONFIG } from "@/lib/audit-tools/configs";

export function GbpAuditApp() {
  return <UrlAuditToolApp config={GBP_AUDIT_CONFIG} />;
}
