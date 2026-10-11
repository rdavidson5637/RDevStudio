import { ogContentType, ogSize, studioOgImage } from "@/lib/og-studio";

export const alt = "RDev Studio. Websites for local businesses. Games for everyone else.";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return studioOgImage("Websites for local businesses. Games for everyone else.");
}
