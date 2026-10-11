import { ogContentType, ogSize, studioOgImage } from "@/lib/og-studio";

export const alt = "Work | RDev Studio";
export const size = ogSize;
export const contentType = ogContentType;

export default function WorkOg() {
  return studioOgImage("Real clients. Real sites.");
}
