import { getToolBySlug } from "@/lib/business-toolkit/catalog";
import { OG_CONTENT_TYPE, OG_SIZE, toolOgImage } from "@/lib/og-image";

const tool = getToolBySlug("business-name-generator");

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = tool ? tool.title : "Free tool";

export default function Image() {
  return toolOgImage(tool?.title ?? "Free tool", "Free business tool");
}
