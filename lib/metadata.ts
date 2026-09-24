import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "./constants";

type OgImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

type PageMeta = {
  /** Short page name, e.g. "Services". Rendered as "Services | RDev Studio". */
  title: string;
  description?: string;
  path: string;
  /** Small label above the title on the generated link preview card. */
  ogEyebrow?: string;
  /**
   * Use a specific image instead of the generated card. A path or URL, or an
   * object with its size. Pass `false` to leave images unset so a file-based
   * opengraph-image.tsx in the same route segment is used instead.
   */
  ogImage?: string | OgImage | false;
};

const OG_CARD_SIZE = { width: 1200, height: 630 };

/** Section label for the generated card, based on where the page lives. */
function defaultOgEyebrow(path: string): string {
  const [, section = "", child] = path.split("/");

  switch (section) {
    case "services":
      return "Services";
    case "work":
      return child ? "Case study" : "Work";
    case "toolkit":
      return child ? "Free business tool" : "Free business tools";
    case "interactive":
      return child ? "Interactive tool" : "Interactive tools";
    case "build":
      return "How it's built";
    case "draft":
      return "Draft Analyser";
    case "games":
    case "champions-draft":
    case "rugby-draft":
    case "pub-quiz":
      return "Free game";
    case "projects":
    case "wardrobe-ai":
      return "Projects";
    case "hire":
    case "about":
      return "Ryan Davidson";
    case "contact":
      return "Contact";
  }

  if (section.startsWith("web-design-")) return "Web design";
  return SITE_NAME;
}

/** URL for the dynamic card rendered by app/og/route.tsx. */
export function ogCardUrl(title: string, eyebrow: string = SITE_NAME): string {
  const params = new URLSearchParams({ title, eyebrow });
  return `/og?${params.toString()}`;
}

export function createPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path,
  ogEyebrow,
  ogImage,
}: PageMeta): Metadata {
  const isHome = path === "/";
  const pageTitle = isHome ? SITE_TITLE : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${isHome ? "" : path}`;

  let image: OgImage | undefined;
  if (ogImage === false) {
    image = undefined;
  } else if (typeof ogImage === "string") {
    image = { url: ogImage, alt: title };
  } else if (ogImage) {
    image = { alt: title, ...ogImage };
  } else if (isHome) {
    // The site-wide card from app/opengraph-image.tsx.
    image = {
      url: "/opengraph-image",
      ...OG_CARD_SIZE,
      alt: "RDev Studio - websites for NI businesses and charities, from £650",
    };
  } else {
    image = {
      url: ogCardUrl(title, ogEyebrow ?? defaultOgEyebrow(path)),
      ...OG_CARD_SIZE,
      alt: title,
    };
  }

  // A square image gets cropped badly by the large card, so use the small one.
  const isSquare =
    image?.width !== undefined && image.width === image.height;

  return {
    title: { absolute: pageTitle },
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
      ...(image && { images: [image] }),
    },
    twitter: {
      card: isSquare ? "summary" : "summary_large_image",
      title: pageTitle,
      description,
      ...(image && { images: [image] }),
    },
  };
}

/**
 * Root defaults. There is deliberately no canonical here: it would be
 * inherited by every page that does not set its own, telling Google those
 * pages are copies of the homepage. Pages set theirs via createPageMetadata.
 */
export const rootMetadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_GB",
    type: "website",
    // Image comes from app/opengraph-image.tsx for pages without their own.
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  // Apple touch icon comes from app/apple-icon.png. Next only adds file-based
  // icons when `icons` is not set here, so the apple entry is listed here too.
  icons: {
    icon: "/favicon.svg",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};
