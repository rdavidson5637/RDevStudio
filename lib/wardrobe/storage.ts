// Garment photo storage on Supabase Storage.
import "server-only";
import crypto from "node:crypto";
import { supabase, BUCKET } from "./supabase";

const EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

export async function uploadGarmentImage(buffer: Buffer, mimeType: string): Promise<string> {
  const key = `garments/${crypto.randomBytes(8).toString("hex")}${EXT[mimeType] || ""}`;
  const { error } = await supabase.storage.from(BUCKET).upload(key, buffer, {
    contentType: mimeType,
    upsert: false,
  });
  if (error) throw new Error(`Image upload failed: ${error.message}`);
  return key;
}

export function publicUrl(key: string | null): string | null {
  if (!key) return null;
  return supabase.storage.from(BUCKET).getPublicUrl(key).data.publicUrl;
}

export async function removeGarmentImage(key: string | null): Promise<void> {
  if (!key) return;
  await supabase.storage.from(BUCKET).remove([key]).then(
    () => undefined,
    () => undefined,
  );
}
