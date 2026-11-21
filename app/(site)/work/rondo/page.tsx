import { CaseStudyView } from "@/components/studio/CaseStudyView";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Rondo",
  description:
    "Free coaching app for grassroots football teams. Availability, training plans, match day and subs. Live pilot with Grove United 3rds.",
  path: "/work/rondo",
  ogImage: "/work/rondo/opengraph-image",
});

export default function RondoCaseStudyPage() {
  return <CaseStudyView slug="rondo" />;
}
