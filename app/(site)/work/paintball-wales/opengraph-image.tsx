import { ogContentType, ogSize, studioOgImage } from "@/lib/og-studio";

export const alt = "Paintball Wales | RDev Studio";
export const size = ogSize;
export const contentType = ogContentType;

export default function Og() {
  return studioOgImage("Paintball Wales");
}
