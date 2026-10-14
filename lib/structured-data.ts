import {
  CONTACT_EMAIL,
  GITHUB_URL,
  PRICE_CARE_PLAN_GBP,
  PRICE_CONTENT_GBP,
  PRICE_SOCIAL_GBP,
  PRICE_WEBSITE_GBP,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/constants";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const BUSINESS_ID = `${SITE_URL}/#business`;

const ADDRESS = {
  "@type": "PostalAddress",
  addressLocality: "Carrickfergus",
  addressRegion: "Northern Ireland",
  addressCountry: "GB",
} as const;

/**
 * One JSON-LD graph: the person, the site, and the studio as a
 * ProfessionalService in Carrickfergus. Offer amounts come from the
 * price constants, so a price change cannot drift from the pages.
 */
export function buildStructuredDataGraph() {
  const sameAs = [GITHUB_URL, ...SOCIAL_LINKS.map((link) => link.href)];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Ryan Davidson",
        url: SITE_URL,
        email: CONTACT_EMAIL,
        jobTitle: "Web Developer & Product Designer",
        address: ADDRESS,
        sameAs,
        knowsAbout: [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Supabase",
          "Web Design",
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: SITE_NAME,
        url: SITE_URL,
        publisher: { "@id": BUSINESS_ID },
      },
      {
        "@type": "ProfessionalService",
        "@id": BUSINESS_ID,
        name: SITE_NAME,
        url: SITE_URL,
        founder: { "@id": PERSON_ID },
        address: ADDRESS,
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Northern Ireland",
        },
        email: CONTACT_EMAIL,
        logo: `${SITE_URL}/icon.svg`,
        sameAs,
        makesOffer: [
          {
            "@type": "Offer",
            name: "Website build",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: PRICE_WEBSITE_GBP,
              priceCurrency: "GBP",
            },
          },
          {
            "@type": "Offer",
            name: "Care plan",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: PRICE_CARE_PLAN_GBP,
              priceCurrency: "GBP",
              unitCode: "MON",
            },
          },
          {
            "@type": "Offer",
            name: "Social media",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              minPrice: PRICE_SOCIAL_GBP,
              priceCurrency: "GBP",
              unitCode: "MON",
            },
          },
          {
            "@type": "Offer",
            name: "Content",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: PRICE_CONTENT_GBP,
              priceCurrency: "GBP",
              unitText: "project",
            },
          },
        ],
      },
    ],
  };
}
