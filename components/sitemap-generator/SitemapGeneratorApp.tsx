"use client";

import { useEffect, useMemo, useState } from "react";
import { ToolkitToolHeader } from "@/components/toolkit-audit/ToolkitToolHeader";
import { FadeIn } from "@/components/toolkit-audit/FadeIn";
import { recordRecentSlug } from "@/lib/business-toolkit/storage";

function buildSitemapXml(urls: string[], baseUrl: string): string {
  const today = new Date().toISOString().split("T")[0];
  const entries = urls
    .map((raw) => {
      try {
        const u = raw.startsWith("http")
          ? raw
          : new URL(raw, baseUrl).toString();
        return `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;
}

export function SitemapGeneratorApp() {
  const [baseUrl, setBaseUrl] = useState("https://yoursite.com");
  const [urlList, setUrlList] = useState("/\n/about\n/contact\n/services");

  useEffect(() => {
    recordRecentSlug("sitemap-generator");
  }, []);

  const urls = useMemo(
    () =>
      urlList
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean),
    [urlList],
  );

  const xml = useMemo(() => buildSitemapXml(urls, baseUrl), [urls, baseUrl]);

  const copy = async () => navigator.clipboard.writeText(xml);
  const download = () => {
    const blob = new Blob([xml], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "sitemap.xml";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div>
      <ToolkitToolHeader
        category="Generators"
        title="Sitemap Generator"
        description="Paste your URLs to generate a standards-compliant XML sitemap — ready to upload or drop in your project."
      />
      <div className="grid gap-8 py-10 lg:grid-cols-2">
        <FadeIn className="space-y-4 rounded-[10px] border border-border-strong bg-raised p-5 sm:p-6">
          <label className="block">
            <span className="shell-label text-accent">Site base URL</span>
            <input
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </label>
          <label className="block">
            <span className="shell-label text-accent">
              URLs (one per line, paths or full URLs)
            </span>
            <textarea
              value={urlList}
              onChange={(e) => setUrlList(e.target.value)}
              rows={12}
              className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 font-mono text-sm text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </label>
          <p className="text-sm text-tertiary">
            {urls.length} URL{urls.length === 1 ? "" : "s"} in sitemap
          </p>
        </FadeIn>
        <FadeIn
          delayMs={80}
          className="rounded-[10px] border border-border-strong bg-raised p-5 sm:p-6"
        >
          <p className="shell-label text-accent">XML output</p>
          <pre className="mt-3 max-h-96 overflow-auto rounded-md border border-border bg-base p-4 font-mono text-xs text-primary whitespace-pre-wrap">
            {xml}
          </pre>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={copy} className="btn-secondary">
              Copy
            </button>
            <button type="button" onClick={download} className="btn-primary">
              Download sitemap.xml
            </button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
