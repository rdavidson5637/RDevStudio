import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "./constants";

type PageMeta = {
  title: string;
  description?: string;
  path: string;
  /** A path, or null to use the route's own opengraph-image file. Defaults to the studio card. */
  ogImage?: string | null;
};

export function createPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path,
  ogImage = "/opengraph-image",
}: PageMeta): Metadata {
  const isHome = path === "/";
  const pageTitle = isHome ? SITE_TITLE : title;
  const url = `${SITE_URL}${path === "/" ? "" : path}`;

  return {
    title: isHome ? { absolute: SITE_TITLE } : title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_GB",
      type: "website",
      // No images here unless a page asks for one. Next then uses the nearest
      // opengraph-image file for the route (nested ones get a hashed URL, so
      // hard-coding "/work/opengraph-image" gave a 404).
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export const rootMetadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s | RDev Studio",
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_GB",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
};
