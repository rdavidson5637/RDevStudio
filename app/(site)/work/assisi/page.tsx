import { CaseStudyView } from "@/components/studio/CaseStudyView";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Assisi site and brand",
  description:
    "Rebuilt website and brand for Assisi Animal Sanctuary in Belfast. Built and awaiting their sign-off.",
  path: "/work/assisi",
  ogImage: "/work/assisi/opengraph-image",
});

export default function AssisiCaseStudyPage() {
  return <CaseStudyView slug="assisi" />;
}
