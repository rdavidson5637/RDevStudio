import { CaseStudyView } from "@/components/studio/CaseStudyView";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Concept Builds",
  description:
    "Three concept builds showing range across trades, restaurant, and salon website design.",
  path: "/work/concept-builds",
  ogImage: "/work/concept-builds/opengraph-image",
});

export default function ConceptBuildsPage() {
  return <CaseStudyView slug="concept-builds" />;
}
