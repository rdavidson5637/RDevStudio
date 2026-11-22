import { CaseStudyView } from "@/components/studio/CaseStudyView";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Crosskennan Lane Animal Sanctuary",
  description:
    "Charity website for Crosskennan Lane Animal Sanctuary near Antrim: adoption listings, volunteer forms, donate and ways to help. Preview online.",
  path: "/work/crosskennan",
  ogImage: "/work/crosskennan/opengraph-image",
});

export default function CrosskennanCaseStudyPage() {
  return <CaseStudyView slug="crosskennan" />;
}
