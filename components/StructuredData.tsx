import {
  CONTACT_EMAIL,
  GITHUB_URL,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/constants";

/**
 * JSON-LD structured data (Person + WebSite) so search engines can understand
 * who Ryan is, link his profiles, and potentially surface a knowledge panel.
 * Rendered site-wide from the root layout.
 */
export function StructuredData() {
  const sameAs = [GITHUB_URL, ...SOCIAL_LINKS.map((link) => link.href)];

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ryan Davidson",
    url: SITE_URL,
    email: CONTACT_EMAIL,
    jobTitle: "Web Developer & Product Designer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Carrickfergus",
      addressRegion: "Northern Ireland",
      addressCountry: "GB",
    },
    sameAs,
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Web Design",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
