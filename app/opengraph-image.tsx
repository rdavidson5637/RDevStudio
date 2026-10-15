import { ogContentType, ogSize, studioOgImage } from "@/lib/og-studio";

export const alt = "RDev Studio. Websites for businesses and charities in Northern Ireland.";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return studioOgImage("Websites for businesses and charities in Northern Ireland");
}
