import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "./constants";

type PageMeta = {
  title: string;
  description?: string;
  path: string;
};

export function createPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path,
}: PageMeta): Metadata {
  const isHome = path === "/";
  const pageTitle = isHome ? SITE_TITLE : `${title} — ${SITE_TITLE}`;
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const ogImage = `${SITE_URL}/images/og/og-image-slot.svg`;

  return {
    title: isHome ? { absolute: SITE_TITLE } : pageTitle,
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
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "RDev Studio — Ryan Davidson, designer and developer in Belfast",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImage],
    },
  };
}

export const rootMetadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_TITLE}`,
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
    images: [
      {
        url: `${SITE_URL}/images/og/og-image-slot.svg`,
        width: 1200,
        height: 630,
        alt: "RDev Studio — Ryan Davidson, designer and developer in Belfast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/images/og/og-image-slot.svg`],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};
