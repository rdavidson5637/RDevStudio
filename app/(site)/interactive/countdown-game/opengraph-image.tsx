import { getInteractiveToolBySlug } from "@/lib/interactive-tools/catalog";
import { OG_CONTENT_TYPE, OG_SIZE, toolOgImage } from "@/lib/og-image";

const tool = getInteractiveToolBySlug("countdown-game");

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = tool ? tool.title : "Countdown Game";

export default function Image() {
  return toolOgImage(tool?.title ?? "Countdown Game", "Interactive game");
}
