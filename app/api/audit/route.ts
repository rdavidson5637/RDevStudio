import { NextResponse } from "next/server";
import {
  buildGraderResult,
  buildSeoResult,
  fetchSignals,
  normalizeUrl,
} from "@/lib/audit-tools/analyze";

// Node runtime (not edge) so we can fetch arbitrary sites server-side.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("url");

  if (!raw || !raw.trim()) {
    return NextResponse.json({ error: "A url query parameter is required." }, { status: 400 });
  }

  // Basic guard: only http(s), and block obvious internal hosts (SSRF hygiene).
  let target: URL;
  try {
    target = new URL(normalizeUrl(raw));
  } catch {
    return NextResponse.json({ error: "That doesn't look like a valid URL." }, { status: 400 });
  }
  const host = target.hostname.toLowerCase();
  const blocked =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "0.0.0.0" ||
    host.endsWith(".local") ||
    /^10\./.test(host) ||
    /^192\.168\./.test(host) ||
    /^169\.254\./.test(host) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(host);
  if (blocked) {
    return NextResponse.json({ error: "That host can't be scanned." }, { status: 400 });
  }

  const tool = (searchParams.get("tool") ?? "grader").toLowerCase();

  try {
    const signals = await fetchSignals(target.toString());
    const result =
      tool === "seo"
        ? buildSeoResult(target.toString(), signals)
        : buildGraderResult(target.toString(), signals);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Couldn't reach that site. Check the URL and try again." },
      { status: 502 }
    );
  }
}
