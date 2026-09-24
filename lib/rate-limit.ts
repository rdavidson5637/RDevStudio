import "server-only";

/**
 * Per-IP rate limiting for the routes that cost money or hit other sites:
 * Claude calls (quiz question generation) and the site audit fetcher.
 *
 * Uses the same Redis (Vercel KV / Upstash REST) the Pub Quiz already uses,
 * so the limit holds across serverless instances. Without Redis, or if Redis
 * errors, it falls back to an in-memory window on the current instance: never
 * fail open to "unlimited", never take the route down because Redis blinked.
 */

type Limit = {
  /** Short name for the route, used in the key. */
  name: string;
  max: number;
  windowSeconds: number;
};

const memoryHits = new Map<string, number[]>();

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

function kvCredentials(): { url: string; token: string } | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url?.trim() || !token?.trim()) return null;
  return { url: url.replace(/\/$/, ""), token };
}

async function kv(command: (string | number)[]): Promise<unknown> {
  const credentials = kvCredentials();
  if (!credentials) throw new Error("KV not configured");
  const response = await fetch(credentials.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${credentials.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`KV request failed (${response.status})`);
  const data = (await response.json()) as { result?: unknown };
  return data.result ?? null;
}

function allowInMemory(key: string, { max, windowSeconds }: Limit): boolean {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const recent = (memoryHits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    memoryHits.set(key, recent);
    return false;
  }
  recent.push(now);
  memoryHits.set(key, recent);
  return true;
}

/** True if this request is allowed; false means answer with a 429. */
export async function allowRequest(
  request: Request,
  limit: Limit,
): Promise<boolean> {
  const ip = clientIp(request);
  const key = `rl:${limit.name}:${ip}`;

  if (kvCredentials()) {
    try {
      const windowStart = Math.floor(Date.now() / 1000 / limit.windowSeconds);
      const windowKey = `${key}:${windowStart}`;
      const count = Number(await kv(["INCR", windowKey]));
      if (count === 1) {
        await kv(["EXPIRE", windowKey, limit.windowSeconds]);
      }
      return count <= limit.max;
    } catch (error) {
      console.error("[rate-limit] Redis unavailable, using memory:", error);
    }
  }

  return allowInMemory(key, limit);
}

export function tooManyRequests(
  message = "Too many requests. Give it a few minutes and try again.",
) {
  return Response.json({ error: message }, { status: 429 });
}
