"use client";

import { useEffect, useMemo, useState } from "react";
import { ToolkitToolHeader } from "@/components/toolkit-audit/ToolkitToolHeader";
import { FadeIn } from "@/components/toolkit-audit/FadeIn";
import { recordRecentSlug } from "@/lib/business-toolkit/storage";

export function RobotsTxtGeneratorApp() {
  const [userAgent, setUserAgent] = useState("*");
  const [allowAll, setAllowAll] = useState(true);
  const [disallowPaths, setDisallowPaths] = useState("/admin\n/private");
  const [sitemapUrl, setSitemapUrl] = useState(
    "https://yoursite.com/sitemap.xml",
  );
  const [crawlDelay, setCrawlDelay] = useState("");

  useEffect(() => {
    recordRecentSlug("robots-txt-generator");
  }, []);

  const output = useMemo(() => {
    const lines: string[] = [`User-agent: ${userAgent || "*"}`];
    if (allowAll) {
      lines.push("Allow: /");
    }
    disallowPaths
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean)
      .forEach((path) =>
        lines.push(`Disallow: ${path.startsWith("/") ? path : `/${path}`}`),
      );
    if (crawlDelay.trim()) lines.push(`Crawl-delay: ${crawlDelay.trim()}`);
    if (sitemapUrl.trim()) lines.push("", `Sitemap: ${sitemapUrl.trim()}`);
    return lines.join("\n");
  }, [userAgent, allowAll, disallowPaths, sitemapUrl, crawlDelay]);

  const copy = async () => {
    await navigator.clipboard.writeText(output);
  };

  const download = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "robots.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div>
      <ToolkitToolHeader
        category="Generators"
        title="robots.txt Generator"
        description="Build a robots.txt file with allow, disallow, crawl-delay, and sitemap directives."
      />
      <div className="grid gap-8 py-10 lg:grid-cols-2">
        <FadeIn className="space-y-4 rounded-[10px] border border-border-strong bg-raised p-5 sm:p-6">
          <label className="block">
            <span className="shell-label text-accent">User-agent</span>
            <input
              value={userAgent}
              onChange={(e) => setUserAgent(e.target.value)}
              className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </label>
          <label className="flex items-center gap-3 text-sm text-primary">
            <input
              type="checkbox"
              checked={allowAll}
              onChange={(e) => setAllowAll(e.target.checked)}
              className="h-4 w-4 accent-accent"
            />
            Allow all (Allow: /)
          </label>
          <label className="block">
            <span className="shell-label text-accent">
              Disallow paths (one per line)
            </span>
            <textarea
              value={disallowPaths}
              onChange={(e) => setDisallowPaths(e.target.value)}
              rows={5}
              className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 font-mono text-sm text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </label>
          <label className="block">
            <span className="shell-label text-accent">Sitemap URL</span>
            <input
              value={sitemapUrl}
              onChange={(e) => setSitemapUrl(e.target.value)}
              className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </label>
          <label className="block">
            <span className="shell-label text-accent">
              Crawl-delay (optional)
            </span>
            <input
              value={crawlDelay}
              onChange={(e) => setCrawlDelay(e.target.value)}
              placeholder="10"
              className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </label>
        </FadeIn>
        <FadeIn
          delayMs={80}
          className="rounded-[10px] border border-border-strong bg-raised p-5 sm:p-6"
        >
          <p className="shell-label text-accent">Preview</p>
          <pre className="mt-3 max-h-80 overflow-auto rounded-md border border-border bg-base p-4 font-mono text-sm text-primary whitespace-pre-wrap">
            {output}
          </pre>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={copy} className="btn-secondary">
              Copy
            </button>
            <button type="button" onClick={download} className="btn-primary">
              Download robots.txt
            </button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
