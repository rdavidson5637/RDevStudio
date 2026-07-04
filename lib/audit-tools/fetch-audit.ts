import type { UrlAuditResult } from "@/types/url-audit-tool";

export async function fetchAuditResult(
  url: string,
  tool?: "seo",
): Promise<UrlAuditResult> {
  const params = new URLSearchParams({ url });
  if (tool === "seo") {
    params.set("tool", "seo");
  }

  const res = await fetch(`/api/audit?${params}`);
  const payload = (await res.json()) as UrlAuditResult & { error?: string };

  if (!res.ok) {
    throw new Error(payload.error ?? "Audit failed");
  }

  return payload;
}
