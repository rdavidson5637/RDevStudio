import {
  CONTACT_EMAIL,
  GITHUB_URL,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/constants";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const BUSINESS_ID = `${SITE_URL}/#business`;

const STUDIO_OFFERS = ["Website build", "Care plan", "Social media", "Content"] as const;

const ADDRESS = {
  "@type": "PostalAddress",
  addressLocality: "Carrickfergus",
  addressRegion: "Northern Ireland",
  addressCountry: "GB",
} as const;

/**
 * One JSON-LD graph: the person, the site, and the studio as a
 * ProfessionalService in Carrickfergus. Offers carry no prices, because
 * the public pages do not show prices (every job gets a fixed quote).
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
        makesOffer: STUDIO_OFFERS.map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
    ],
  };
}
