import { NextResponse } from "next/server";
import { supabase } from "@/lib/wardrobe/supabase";
import { removeGarmentImage } from "@/lib/wardrobe/storage";
import { isAdmin } from "@/lib/wardrobe/admin";
import type { Item } from "@/lib/wardrobe/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const USER_ID = 1;

// DELETE /api/wardrobe/items/[id] - admin only.
export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Admin token required." }, { status: 401 });
  }
  const { id: idParam } = await ctx.params;
  const id = Number(idParam);
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("items")
    .delete()
    .eq("id", id)
    .eq("user_id", USER_ID)
    .select()
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Item not found" }, { status: 404 });

  await removeGarmentImage((data as Item).image_path);
  return new NextResponse(null, { status: 204 });
}
