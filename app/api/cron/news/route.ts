import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { unauthorized } from "@/lib/draft/cron-auth";
import { ingestNewsLayer } from "@/lib/draft/news/ingest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  if (unauthorized(request.headers.get("authorization"))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const started = Date.now();
  try {
    const result = await ingestNewsLayer();
    revalidateTag("fpl-players");
    return NextResponse.json({
      ok: result.skipped.every((s) => s.startsWith("fetch failed")),
      durationMs: Date.now() - started,
      ...result,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err), durationMs: Date.now() - started },
      { status: 500 },
    );
  }
}
