import { ogContentType, ogSize, studioOgImage } from "@/lib/og-studio";

export const alt = "ShelterLink | RDev Studio";
export const size = ogSize;
export const contentType = ogContentType;

export default function Og() {
  return studioOgImage("ShelterLink");
}
