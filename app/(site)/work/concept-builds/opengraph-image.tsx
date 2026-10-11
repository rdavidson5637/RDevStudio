import { ogContentType, ogSize, studioOgImage } from "@/lib/og-studio";

export const alt = "Concept builds | RDev Studio";
export const size = ogSize;
export const contentType = ogContentType;

export default function Og() {
  return studioOgImage("Concept builds");
}
