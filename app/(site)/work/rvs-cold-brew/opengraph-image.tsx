import { ogContentType, ogSize, studioOgImage } from "@/lib/og-studio";

export const alt = "RV's Cold Brew | RDev Studio";
export const size = ogSize;
export const contentType = ogContentType;

export default function Og() {
  return studioOgImage("RV's Cold Brew");
}
