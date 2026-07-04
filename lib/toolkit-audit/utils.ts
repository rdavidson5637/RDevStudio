import type { ScanStep, UrlValidationResult } from "@/types/toolkit-audit";

export const DEFAULT_EXAMPLE_URLS = [
  { label: "RDev Studio", url: "https://rdevstudio.co.uk" },
  { label: "BBC", url: "https://www.bbc.co.uk" },
  { label: "Example.com", url: "https://example.com" },
] as const;

export function normalizeUrlInput(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function validateWebsiteUrl(value: string): UrlValidationResult {
  const trimmed = value.trim();

  if (!trimmed) {
    return { valid: false, message: "Enter a website URL to analyse." };
  }

  const normalizedUrl = normalizeUrlInput(trimmed);

  try {
    const parsed = new URL(normalizedUrl);

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return {
        valid: false,
        message: "Only http and https URLs are supported.",
      };
    }

    if (!parsed.hostname || !parsed.hostname.includes(".")) {
      return {
        valid: false,
        message: "Enter a valid domain, e.g. yourbusiness.co.uk",
      };
    }

    return { valid: true, normalizedUrl: parsed.toString() };
  } catch {
    return {
      valid: false,
      message: "That doesn’t look like a valid URL. Try https://yoursite.com",
    };
  }
}

export function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function formatScannedAt(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function simulateScan<T>(
  steps: readonly ScanStep[],
  getResult: () => T | Promise<T>,
  onProgress: (progress: number, stepIndex: number) => void,
  stepDurationMs = 520,
): Promise<T> {
  for (let step = 0; step < steps.length; step += 1) {
    onProgress(Math.round(((step + 1) / steps.length) * 100), step);
    await new Promise((resolve) => setTimeout(resolve, stepDurationMs));
  }
  return await getResult();
}

export function staggerDelay(
  baseMs: number,
  index: number,
  stepMs = 70,
): number {
  return baseMs + index * stepMs;
}
