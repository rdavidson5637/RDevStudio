import {
  CONTACT_EMAIL,
  GITHUB_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/constants";

/**
 * Structured data (JSON-LD) builders. The site-wide @graph is rendered once
 * from the root layout (components/StructuredData.tsx); pages add their own
 * Service / BreadcrumbList blocks with components/seo/JsonLd.tsx and point
 * back at these @ids instead of repeating the business or person.
 */

export const BUSINESS_ID = `${SITE_URL}/#business`;
export const PERSON_ID = `${SITE_URL}/#ryan`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const BUSINESS_TELEPHONE = "+447378420418";
export const BUSINESS_PRICE_RANGE = "From £650";
export const INSTAGRAM_URL = "https://www.instagram.com/rdevstudio_";
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/ryan-davidson-462bb221b";

const LOGO_URL = `${SITE_URL}/images/logo/rdevstudio-logo.png`;
const PORTRAIT_URL = `${SITE_URL}/images/ryan-davidson.jpg`;

const NORTHERN_IRELAND = {
  "@type": "AdministrativeArea",
  name: "Northern Ireland",
} as const;

const AREA_SERVED = [
  NORTHERN_IRELAND,
  ...["Carrickfergus", "Belfast", "Newtownabbey", "Larne", "Lisburn"].map(
    (name) => ({ "@type": "City", name }),
  ),
];

export type JsonLdObject = Record<string, unknown>;

/** Turns "/services" into "https://rdevstudio.co.uk/services". Absolute URLs pass through. */
export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (pathOrUrl === "" || pathOrUrl === "/") return SITE_URL;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

/** Site-wide graph: the business, Ryan, and the website, linked by @id. */
export function siteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": BUSINESS_ID,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        email: CONTACT_EMAIL,
        telephone: BUSINESS_TELEPHONE,
        image: LOGO_URL,
        logo: LOGO_URL,
        priceRange: BUSINESS_PRICE_RANGE,
        founder: { "@id": PERSON_ID },
        areaServed: AREA_SERVED,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Carrickfergus",
          addressRegion: "Northern Ireland",
          addressCountry: "GB",
        },
        sameAs: [INSTAGRAM_URL],
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Ryan Davidson",
        url: absoluteUrl("/about"),
        image: PORTRAIT_URL,
        jobTitle: "Software developer and web designer",
        worksFor: { "@id": BUSINESS_ID },
        alumniOf: [
          {
            "@type": "CollegeOrUniversity",
            name: "Queen's University Belfast",
          },
          {
            "@type": "CollegeOrUniversity",
            name: "Liverpool John Moores University",
          },
        ],
        sameAs: [LINKEDIN_URL, GITHUB_URL],
        knowsAbout: [
          "Next.js",
          "React",
          "TypeScript",
          "Supabase",
          "PostgreSQL",
          "Tailwind CSS",
          "Web design",
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: "en-GB",
        publisher: { "@id": BUSINESS_ID },
      },
    ],
  };
}

type ServiceJsonLdInput = {
  name: string;
  description: string;
  /** Page path ("/services/websites") or absolute URL. */
  url: string;
  /** 650, "650" or "£650" all work. Omit it if there is no fixed price. */
  price?: number | string;
  /** Billing unit for recurring prices, e.g. "month" or "project". */
  priceSuffix?: string;
};

function toPrice(price: number | string | undefined): string | undefined {
  if (price === undefined) return undefined;
  const match = String(price).replace(/,/g, "").match(/\d+(\.\d+)?/);
  return match ? match[0] : undefined;
}

/** One Service offered by RDev Studio, with an Offer in GBP. */
export function serviceJsonLd({
  name,
  description,
  url,
  price,
  priceSuffix,
}: ServiceJsonLdInput): JsonLdObject {
  const pageUrl = absoluteUrl(url);
  const amount = toPrice(price);
  const unitText = priceSuffix?.replace(/^[\s/]*(per\s+)?/i, "").trim();

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name,
    serviceType: name,
    description,
    url: pageUrl,
    provider: { "@id": BUSINESS_ID },
    areaServed: NORTHERN_IRELAND,
    offers: {
      "@type": "Offer",
      url: pageUrl,
      priceCurrency: "GBP",
      ...(amount && { price: amount }),
      ...(amount &&
        unitText && {
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: amount,
            priceCurrency: "GBP",
            unitText,
          },
        }),
    },
  };
}

export type BreadcrumbJsonLdItem = {
  name: string;
  /** Page path or absolute URL. Leave off for the current page. */
  href?: string;
};

export function breadcrumbJsonLd(items: BreadcrumbJsonLdItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.href && { item: absoluteUrl(item.href) }),
    })),
  };
}
