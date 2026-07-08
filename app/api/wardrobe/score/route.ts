import { NextResponse } from "next/server";
import { supabase } from "@/lib/wardrobe/supabase";
import { scoreOutfit } from "@/lib/wardrobe/scoring";
import { allow, clientIp } from "@/lib/wardrobe/rate-limit";
import type { Item } from "@/lib/wardrobe/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const USER_ID = 1;

// POST /api/wardrobe/score - honest AI verdict (tags only). Rate limited: 20 per 10 min per IP.
export async function POST(req: Request) {
  if (!allow(clientIp(req), { windowMs: 10 * 60 * 1000, max: 20 })) {
    return NextResponse.json(
      { error: "Slow down a sec - too many requests. Try again shortly." },
      { status: 429 },
    );
  }

  let itemIds: unknown;
  try {
    ({ item_ids: itemIds } = (await req.json()) as { item_ids: unknown });
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!Array.isArray(itemIds) || itemIds.length === 0) {
    return NextResponse.json({ error: "item_ids must be a non-empty array" }, { status: 400 });
  }
  const ids = itemIds.map(Number);
  if (ids.some((n) => !Number.isInteger(n))) {
    return NextResponse.json({ error: "item_ids must be integers" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("user_id", USER_ID)
    .in("id", ids);
  if (error) return NextResponse.json({ error: "Could not load items." }, { status: 500 });
  if ((data as Item[]).length !== ids.length) {
    return NextResponse.json({ error: "Some items were not found" }, { status: 400 });
  }

  try {
    const verdict = await scoreOutfit(data as Item[]);
    return NextResponse.json(verdict);
  } catch (err) {
    const message = (err as Error).message || "";
    if (/api key/i.test(message) || (err as { status?: number }).status === 401) {
      return NextResponse.json({ error: "AI scoring unavailable (check the API key)." }, { status: 502 });
    }
    console.error("[wardrobe] score:", message);
    return NextResponse.json({ error: "Could not score this outfit." }, { status: 500 });
  }
}
