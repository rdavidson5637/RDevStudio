import { ogContentType, ogSize, studioOgImage } from "@/lib/og-studio";

export const alt = "Assisi site and brand | RDev Studio";
export const size = ogSize;
export const contentType = ogContentType;

export default function Og() {
  return studioOgImage("Assisi site and brand");
}
