import { SeoCheckerApp } from "@/components/audit-tools/SeoCheckerApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "SEO Checker",
  description:
    "Free on-page SEO checker - meta tags, headings, links, and technical SEO from RDev Studio.",
  path: "/toolkit/seo-checker",
});

export default function SeoCheckerPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <SeoCheckerApp />
      </div>
    </div>
  );
}
