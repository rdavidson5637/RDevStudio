import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config.mjs";

/**
 * Origins the browser actually connects to. A later CSP edit that drops
 * one of these fails this test.
 *
 * - https://formspree.io: @formspree/react useForm and LeadCaptureCard
 * - https://api.dictionaryapi.dev: Longest Word word check
 * - pusher.com: pusher-js WebSocket and its HTTPS fallback
 * - https://va.vercel-scripts.com: Vercel Analytics debug script in dev
 * - supabase.co and vitals.vercel-insights.com: already allowed for the
 *   browser Supabase client and Vercel vitals, kept so they cannot vanish
 */
const REQUIRED_CONNECT_SRC = [
  "'self'",
  "https://*.supabase.co",
  "wss://*.supabase.co",
  "https://*.pusher.com",
  "wss://*.pusher.com",
  "https://va.vercel-scripts.com",
  "https://vitals.vercel-insights.com",
  "https://formspree.io",
  "https://api.dictionaryapi.dev",
] as const;

type HeaderRule = {
  headers: { key: string; value: string }[];
};

function connectSrcTokens(csp: string): string[] {
  const directive = csp
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("connect-src "));

  if (!directive) {
    throw new Error("Content-Security-Policy has no connect-src");
  }

  return directive.slice("connect-src ".length).split(/\s+/);
}

describe("Content-Security-Policy connect-src", () => {
  it("includes Formspree and every other browser cross-origin", async () => {
    if (!nextConfig.headers) {
      throw new Error("next.config.mjs does not export headers()");
    }

    const rules = (await nextConfig.headers()) as HeaderRule[];
    const csp = rules
      .flatMap((rule) => rule.headers)
      .find((header) => header.key === "Content-Security-Policy")?.value;

    expect(csp).toEqual(expect.any(String));

    const tokens = connectSrcTokens(csp ?? "");
    for (const origin of REQUIRED_CONNECT_SRC) {
      expect(tokens).toContain(origin);
    }
  });
});
