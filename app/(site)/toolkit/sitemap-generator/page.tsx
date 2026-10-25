import { SitemapGeneratorApp } from "@/components/sitemap-generator/SitemapGeneratorApp";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Sitemap Generator",
  description: "Paste a list of URLs and download an XML sitemap. It does not crawl the site.",
  path: "/toolkit/sitemap-generator",
});

export default function Page() {
  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <SitemapGeneratorApp />
      </div>
    </div>
  );
}
