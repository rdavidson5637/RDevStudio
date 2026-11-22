import { CaseStudyView } from "@/components/studio/CaseStudyView";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "UC Caseworker Assistant",
  description:
    "Case study: an AI assistant for Universal Credit caseworkers, built around safeguarding and human-in-the-loop review.",
  path: "/work/uc-caseworker-tool",
  ogImage: "/work/uc-caseworker-tool/opengraph-image",
});

export default function UcCaseworkerToolCaseStudyPage() {
  return <CaseStudyView slug="uc-caseworker-tool" />;
}
