import { LandingPageAuditorApp } from "@/components/landing-page-auditor/LandingPageAuditorApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Landing page checker",
  description:
    "Reads a page for a heading, a description, a way to respond, and a privacy link. It does not invent findings.",
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
