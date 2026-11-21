import { CaseStudyView } from "@/components/studio/CaseStudyView";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "RV's Cold Brew",
  description:
    "A Belfast cold brew and matcha counter. Menu, hours and where to find Unit 11. Square is linked and the last details are being finished.",
  path: "/work/rvs-cold-brew",
  ogImage: "/work/rvs-cold-brew/opengraph-image",
});

export default function RvsColdBrewCaseStudyPage() {
  return <CaseStudyView slug="rvs-cold-brew" />;
}
