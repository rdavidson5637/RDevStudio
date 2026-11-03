"use client";

import { useEffect, useState } from "react";
import { ToolkitToolHeader } from "@/components/toolkit-audit/ToolkitToolHeader";
import { FadeIn } from "@/components/toolkit-audit/FadeIn";
import { recordRecentSlug } from "@/lib/business-toolkit/storage";
import { buildNameIdeas } from "@/lib/business-name/ideas";

export function BusinessNameGeneratorApp() {
  const [keywords, setKeywords] = useState("coffee, belfast, craft");
  const [industry, setIndustry] = useState("café");
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    recordRecentSlug("business-name-generator");
  }, []);

  const generate = () => {
    setResults(buildNameIdeas(keywords, industry));
  };

  return (
    <div>
      <ToolkitToolHeader
        category="Creative & brand"
        title="Business Name Generator"
        description="Shuffle name ideas from your keywords and the industry. It mixes words. It does not check if a name is free."
      />
      <div className="grid gap-8 py-10 lg:grid-cols-2">
        <FadeIn className="space-y-4 rounded-[10px] border border-border-strong bg-raised p-5 sm:p-6">
          <label className="block">
            <span className="shell-label text-accent">Industry</span>
            <input
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="mt-2 w-full rounded-md border border-border-strong bg-paper px-4 py-3 text-primary"
            />
          </label>
          <label className="block">
            <span className="shell-label text-accent">
              Keywords (comma separated)
            </span>
            <input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="mt-2 w-full rounded-md border border-border-strong bg-paper px-4 py-3 text-primary"
            />
          </label>
          <button type="button" onClick={generate} className="btn-primary">
            Generate names
          </button>
        </FadeIn>
        <FadeIn
          delayMs={80}
          className="rounded-[10px] border border-border-strong bg-raised p-5 sm:p-6"
        >
          <p className="shell-label text-accent">Ideas</p>
          {results.length ? (
            <ul className="mt-4 space-y-2">
              {results.map((name) => (
                <li key={name}>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(name)}
                    className="min-h-12 w-full rounded-md border border-border-strong bg-paper px-4 py-3 text-left text-primary transition-colors hover:border-accent hover:text-accent"
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-tertiary">
              Hit generate to see name ideas.
            </p>
          )}
        </FadeIn>
      </div>
    </div>
  );
}
