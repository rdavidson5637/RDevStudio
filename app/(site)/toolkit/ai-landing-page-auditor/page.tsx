import { LandingPageAuditorApp } from "@/components/landing-page-auditor/LandingPageAuditorApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "AI Landing Page Auditor",
  description:
    "AI-powered landing page audit - hero score, CTA analysis, copywriting, trust signals, and conversion recommendations from RDev Studio.",
  path: "/toolkit/ai-landing-page-auditor",
});

export default function LandingPageAuditorPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <LandingPageAuditorApp />
      </div>
    </div>
  );
}
