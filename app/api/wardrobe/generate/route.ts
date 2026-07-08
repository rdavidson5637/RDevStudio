import { NextResponse } from "next/server";
import { supabase } from "@/lib/wardrobe/supabase";
import { publicUrl } from "@/lib/wardrobe/storage";
import { generateOutfits } from "@/lib/wardrobe/generate-outfits";
import type { Item, ItemWithUrl } from "@/lib/wardrobe/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const USER_ID = 1;

// GET /api/wardrobe/generate - load items, run the deterministic engine (public).
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const allowFormalityMismatch = searchParams.get("allowFormalityMismatch") === "true";

  const { data, error } = await supabase.from("items").select("*").eq("user_id", USER_ID);
  if (error) return NextResponse.json({ error: "Could not load items." }, { status: 500 });

  const items: ItemWithUrl[] = (data as Item[]).map((i) => ({ ...i, image_url: publicUrl(i.image_path) }));
  const outfits = generateOutfits(items, { allowFormalityMismatch });
  return NextResponse.json({ count: outfits.length, outfits, items });
}
