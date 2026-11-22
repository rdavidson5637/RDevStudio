import { CaseStudyView } from "@/components/studio/CaseStudyView";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "ShelterLink",
  description:
    "Volunteer rotas, roles, and an admin dashboard for Assisi Animal Sanctuary.",
  path: "/work/shelterlink",
  ogImage: "/work/shelterlink/opengraph-image",
});

export default function ShelterLinkCaseStudyPage() {
  return <CaseStudyView slug="shelterlink" />;
}
