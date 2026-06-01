import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./constants";

type PageMeta = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMeta): Metadata {
  const fullTitle =
    title === "Home"
      ? `${SITE_NAME} | Modern Websites for Local Businesses`
      : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      siteName: SITE_NAME,
      locale: "en_GB",
      type: "website",
    },
  };
}
