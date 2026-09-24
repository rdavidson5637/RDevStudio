import { SITE_NAME } from "@/lib/constants";
import { renderOgImage } from "@/lib/og-image";

// Reads the bundled fonts with fs, so this must stay on the Node runtime.
export const runtime = "nodejs";

const MAX_TITLE = 90;
const MAX_EYEBROW = 40;

function clean(value: string | null, max: number): string {
  if (!value) return "";
  // Drop control characters and collapse whitespace before clamping.
  const text = Array.from(value)
    .map((char) => {
      const code = char.charCodeAt(0);
      return code < 32 || code === 127 ? " " : char;
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max - 3).trimEnd()}...` : text;
}

/**
 * Per-page Open Graph card: /og?title=Services&eyebrow=RDev%20Studio
 * createPageMetadata points openGraph.images and twitter.images here.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = clean(searchParams.get("title"), MAX_TITLE) || SITE_NAME;
  const eyebrow = clean(searchParams.get("eyebrow"), MAX_EYEBROW) || SITE_NAME;

  return renderOgImage({ title, eyebrow });
}
