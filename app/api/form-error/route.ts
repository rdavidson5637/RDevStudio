import { NextResponse } from "next/server";
import { isFormErrorForm, isFormErrorKind } from "@/lib/form-error";

const WINDOW_MS = 60 * 60 * 1000;
const LIMIT = 10;

const hits = new Map<string, number[]>();

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function allowed(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((at) => now - at < WINDOW_MS);
  if (recent.length >= LIMIT) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

export async function GET() {
  return new NextResponse(null, { status: 405, headers: { Allow: "POST" } });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return new NextResponse(null, { status: 400 });
  }

  const { form, kind } = body as { form?: unknown; kind?: unknown };
  if (!isFormErrorForm(form) || !isFormErrorKind(kind)) {
    return new NextResponse(null, { status: 400 });
  }

  if (!allowed(clientIp(request))) {
    return new NextResponse(null, { status: 429 });
  }

  console.error(`[form-error] ${form} ${kind}`);
  return new NextResponse(null, { status: 204 });
}
