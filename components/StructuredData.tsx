import { buildStructuredDataGraph } from "@/lib/structured-data";

/**
 * One JSON-LD graph (Person, WebSite, ProfessionalService) so search
 * engines can see a Carrickfergus studio, not only a person. Rendered
 * site-wide from the root layout.
 */
export function StructuredData() {
  const graph = buildStructuredDataGraph();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
