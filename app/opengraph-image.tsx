import { SITE_NAME } from "@/lib/constants";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

// Route segment config
export const alt = "RDev Studio - websites for NI businesses and charities, from £650";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/**
 * Site-wide Open Graph card (1200x630 PNG). The homepage points at this route
 * explicitly (see createPageMetadata); inner pages use the dynamic /og route.
 * Both render through lib/og-image.tsx so they share one design.
 */
export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: `${SITE_NAME} - Carrickfergus`,
    title: "Websites for NI businesses",
    subtitle: "From £650. Live in about a week.",
  });
}
