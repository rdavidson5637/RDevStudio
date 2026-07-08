// Ghost clothing: strip the background from a garment photo via remove.bg.
// If no API key is set, returns the original unchanged so uploads still work.
import "server-only";

export async function removeBackground(
  buffer: Buffer,
  mimeType: string,
): Promise<{ buffer: Buffer; mimeType: string; removed: boolean }> {
  const key = process.env.REMOVE_BG_API_KEY;
  if (!key) return { buffer, mimeType, removed: false };

  const form = new FormData();
  form.append(
    "image_file",
    new Blob([new Uint8Array(buffer)], { type: mimeType }),
    "garment",
  );
  form.append("size", "auto");
  form.append("format", "png");

  const res = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": key },
    body: form,
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[wardrobe] remove.bg failed:", res.status, detail.slice(0, 200));
    return { buffer, mimeType, removed: false };
  }

  const out = Buffer.from(await res.arrayBuffer());
  return { buffer: out, mimeType: "image/png", removed: true };
}
