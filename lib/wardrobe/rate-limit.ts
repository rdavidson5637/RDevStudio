// Tiny in-memory rate limiter keyed by client IP. Protects the paid AI endpoint.
// Good enough for a single instance; use a shared store (e.g. Upstash) if you scale out.
import "server-only";

const hits = new Map<string, number[]>();

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

// Returns true if the request is allowed, false if it should be rejected (429).
export function allow(ip: string, { windowMs, max }: { windowMs: number; max: number }): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}
