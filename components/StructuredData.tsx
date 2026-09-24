import { JsonLd } from "@/components/seo/JsonLd";
import { siteJsonLd } from "@/lib/seo";

/**
 * Site-wide JSON-LD: one @graph with RDev Studio (ProfessionalService), Ryan
 * (Person) and the WebSite, linked by @id. Rendered from the root layout.
 * Page-level blocks (Service, BreadcrumbList) reference these @ids.
 */
export function StructuredData() {
  return <JsonLd data={siteJsonLd()} />;
}
