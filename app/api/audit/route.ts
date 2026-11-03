import { NextResponse } from "next/server";
import {
  buildAccessibilityResult,
  buildGraderResult,
  buildLandingResult,
  buildSeoResult,
  fetchSignals,
  normalizeUrl,
  scanUrlError,
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

  const blocked = scanUrlError(raw);
  if (blocked) {
    return NextResponse.json({ error: blocked }, { status: 400 });
  }
  const target = new URL(normalizeUrl(raw));

  const tool = (searchParams.get("tool") ?? "grader").toLowerCase();

  try {
    const signals = await fetchSignals(target.toString());
    const result =
      tool === "seo"
        ? buildSeoResult(target.toString(), signals)
        : tool === "a11y"
          ? buildAccessibilityResult(target.toString(), signals)
          : tool === "landing"
            ? buildLandingResult(target.toString(), signals)
            : buildGraderResult(target.toString(), signals);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Couldn't reach that site. Check the URL and try again." },
      { status: 502 }
    );
  }
}
