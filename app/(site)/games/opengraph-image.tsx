import { ogContentType, ogSize, studioOgImage } from "@/lib/og-studio";

export const alt = "Games | RDev Studio";
export const size = ogSize;
export const contentType = ogContentType;

export default function GamesOg() {
  return studioOgImage("Play something.");
}
