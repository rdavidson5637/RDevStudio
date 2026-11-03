import { SeoCheckerApp } from "@/components/audit-tools/SeoCheckerApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "SEO Checker",
  description:
    "Reads a page for a title, a meta description, a heading, a canonical, and HTTPS.",
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
