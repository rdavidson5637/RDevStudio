import { NextResponse } from "next/server";
import { supabase } from "@/lib/wardrobe/supabase";
import { validateItemTags } from "@/lib/wardrobe/validate-item";
import { uploadGarmentImage, publicUrl } from "@/lib/wardrobe/storage";
import { removeBackground } from "@/lib/wardrobe/background";
import { tagGarmentFromBuffer, PLACEHOLDER_TAGS } from "@/lib/wardrobe/tagging";
import { isAdmin } from "@/lib/wardrobe/admin";
import type { Item, ItemWithUrl } from "@/lib/wardrobe/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const USER_ID = 1;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_BYTES = 8 * 1024 * 1024;

function withUrl(item: Item): ItemWithUrl {
  return { ...item, image_url: publicUrl(item.image_path) };
}

// GET /api/wardrobe/items - list (public).
export async function GET() {
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("user_id", USER_ID)
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: "Could not load items." }, { status: 500 });
  return NextResponse.json((data as Item[]).map(withUrl));
}

// POST /api/wardrobe/items - admin only. Multipart with an image, or JSON manual entry.
export async function POST(req: Request) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Admin token required." }, { status: 401 });
  }

  try {
    const contentType = req.headers.get("content-type") || "";

    // Manual JSON entry (no image).
    if (contentType.includes("application/json")) {
      const body = (await req.json()) as Record<string, unknown>;
      const result = validateItemTags(body);
      if (!result.ok) {
        return NextResponse.json({ error: "Invalid item", details: result.errors }, { status: 400 });
      }
      return await insertItem({ image_path: null, ...result.value });
    }

    // Multipart with an image.
    const form = await req.formData();
    const file = form.get("image");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "An image file is required." }, { status: 400 });
    }
    if (!ALLOWED.has(file.type)) {
      return NextResponse.json({ error: "Only JPEG, PNG or WEBP images are allowed." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Image is too large (8MB max)." }, { status: 400 });
    }

    const original = Buffer.from(await file.arrayBuffer());
    const ghost = await removeBackground(original, file.type);
    const imageKey = await uploadGarmentImage(ghost.buffer, ghost.mimeType);

    // Manual tags supplied alongside the image?
    const manualInput: Record<string, unknown> = {};
    for (const f of ["type", "subtype", "colour", "layer", "formality"]) {
      const v = form.get(f);
      if (typeof v === "string" && v.trim()) manualInput[f] = v.trim();
    }
    const manual = validateItemTags(manualInput);
    if (manual.ok) {
      return await insertItem({ image_path: imageKey, ...manual.value });
    }

    // Otherwise auto-tag, falling back to placeholders + needs_review.
    try {
      const tags = await tagGarmentFromBuffer(ghost.buffer, ghost.mimeType);
      return await insertItem({ image_path: imageKey, ...tags });
    } catch (aiErr) {
      console.error("[wardrobe] tagging failed:", (aiErr as Error).message);
      return await insertItem({ image_path: imageKey, ...PLACEHOLDER_TAGS, needs_review: true });
    }
  } catch (err) {
    console.error("[wardrobe] POST items:", (err as Error).message);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

async function insertItem(fields: Record<string, unknown>) {
  const { data, error } = await supabase
    .from("items")
    .insert({ user_id: USER_ID, ...fields })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(withUrl(data as Item), { status: 201 });
}
