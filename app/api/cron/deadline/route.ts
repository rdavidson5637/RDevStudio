import { NextRequest, NextResponse } from "next/server";
import { unauthorized } from "@/lib/draft/cron-auth";
import { sendDeadlineAlerts } from "@/lib/draft/alerts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (unauthorized(request.headers.get("authorization"))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const started = Date.now();
  try {
    const result = await sendDeadlineAlerts();
    return NextResponse.json({ ok: true, durationMs: Date.now() - started, ...result });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err), durationMs: Date.now() - started },
      { status: 500 },
    );
  }
}
