import { NextRequest, NextResponse } from "next/server";
import { allow, clientIp } from "@/lib/wardrobe/rate-limit";
import { refreshLiveBoard } from "@/lib/draft/live";
import { getCurrentEvent } from "@/lib/draft/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!allow(clientIp(request), { windowMs: 60_000, max: 4 })) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  const eventParam = Number(request.nextUrl.searchParams.get("event"));
  const event = Number.isFinite(eventParam) && eventParam > 0 ? eventParam : (await getCurrentEvent())?.id;
  if (!event) return NextResponse.json({ error: "No current event" }, { status: 404 });

  let entryId: number;
  try {
    entryId = (await import("@/lib/fpl/config")).FPL_DRAFT_ENTRY_ID;
  } catch {
    return NextResponse.json({ error: "Missing FPL config" }, { status: 500 });
  }

  try {
    const result = await refreshLiveBoard(event, entryId);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 502 },
    );
  }
}
