import { NextRequest, NextResponse } from "next/server";
import { unauthorized } from "@/lib/draft/cron-auth";
import { refreshLiveBoard } from "@/lib/draft/live";
import { getCurrentEvent } from "@/lib/draft/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET(request: NextRequest) {
  if (unauthorized(request.headers.get("authorization"))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const started = Date.now();
  const event = await getCurrentEvent();
  if (!event) {
    return NextResponse.json({ ok: false, error: "No current event", durationMs: Date.now() - started });
  }

  let entryId: number;
  try {
    entryId = (await import("@/lib/fpl/config")).FPL_DRAFT_ENTRY_ID;
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Missing FPL config", durationMs: Date.now() - started },
      { status: 500 },
    );
  }

  try {
    const result = await refreshLiveBoard(event.id, entryId, { force: true });
    return NextResponse.json({ ok: true, durationMs: Date.now() - started, eventId: event.id, ...result });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err), durationMs: Date.now() - started },
      { status: 500 },
    );
  }
}
