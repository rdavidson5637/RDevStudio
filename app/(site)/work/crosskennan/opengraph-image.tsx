import { ogContentType, ogSize, studioOgImage } from "@/lib/og-studio";

export const alt = "Crosskennan Lane Animal Sanctuary | RDev Studio";
export const size = ogSize;
export const contentType = ogContentType;

export default function Og() {
  return studioOgImage("Crosskennan");
}
