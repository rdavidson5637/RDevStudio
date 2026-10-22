import fs from "node:fs";
import path from "node:path";

/**
 * Screenshots made by `npm run capture:screens` live in
 * public/images/work/captures/<slug>-desktop.png and <slug>-mobile.png.
 * This returns the public path if the file exists, so a case lights up its
 * screenshots as soon as the files are committed. No data edit needed.
 */
export function captureFor(slug: string, device: "desktop" | "mobile"): string | undefined {
  const rel = `/images/work/captures/${slug}-${device}.png`;
  try {
    return fs.existsSync(path.join(process.cwd(), "public", rel)) ? rel : undefined;
  } catch {
    return undefined;
  }
}
