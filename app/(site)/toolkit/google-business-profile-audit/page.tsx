import { GbpAuditApp } from "@/components/audit-tools/GbpAuditApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Google Business Profile Audit",
  description:
    "Audit your Google Business Profile listing for completeness, photos, reviews, and local SEO.",
  path: "/toolkit/google-business-profile-audit",
});

export default function GbpAuditPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <GbpAuditApp />
      </div>
    </div>
  );
}
