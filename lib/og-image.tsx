import { ogContentType, ogSize, studioOgImage } from "@/lib/og-studio";

export const OG_SIZE = ogSize;
export const OG_CONTENT_TYPE = ogContentType;

export function toolOgImage(title: string, eyebrow: string) {
  return studioOgImage(title, eyebrow);
}
