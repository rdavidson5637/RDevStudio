"use client";

import { useEffect, useMemo, useState } from "react";
import { ToolkitToolHeader } from "@/components/toolkit-audit/ToolkitToolHeader";
import { FadeIn } from "@/components/toolkit-audit/FadeIn";
import { recordRecentSlug } from "@/lib/business-toolkit/storage";

const PREFIXES = [
  "North",
  "Bright",
  "True",
  "Peak",
  "Urban",
  "Green",
  "Blue",
  "Carrick",
];
const SUFFIXES = [
  "Works",
  "Co",
  "Studio",
  "Labs",
  "Collective",
  "Digital",
  "Group",
  "HQ",
];

export function BusinessNameGeneratorApp() {
  const [keywords, setKeywords] = useState("coffee, belfast, craft");
  const [industry, setIndustry] = useState("café");
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    recordRecentSlug("business-name-generator");
  }, []);

  const keywordList = useMemo(
    () =>
      keywords
        .split(/[,\s]+/)
        .map((k) => k.trim())
        .filter(Boolean),
    [keywords],
  );

  const generate = () => {
    const names = new Set<string>();
    const bases = keywordList.length ? keywordList : [industry || "brand"];
    while (names.size < 12) {
      const base = bases[Math.floor(Math.random() * bases.length)];
      const cap = base.charAt(0).toUpperCase() + base.slice(1);
      const style = Math.random();
      if (style < 0.33)
        names.add(
          `${PREFIXES[Math.floor(Math.random() * PREFIXES.length)]} ${cap}`,
        );
      else if (style < 0.66)
        names.add(
          `${cap} ${SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)]}`,
        );
      else
        names.add(
          `${cap}${SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)]}`,
        );
    }
    setResults([...names]);
  };

  return (
    <div>
      <ToolkitToolHeader
        category="Creative & brand"
        title="Business Name Generator"
        description="Brainstorm name ideas by industry and keywords — shuffle until something sticks."
      />
      <div className="grid gap-8 py-10 lg:grid-cols-2">
        <FadeIn className="space-y-4 rounded-[10px] border border-border-strong bg-raised p-5 sm:p-6">
          <label className="block">
            <span className="shell-label text-accent">Industry</span>
            <input
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 text-primary"
            />
          </label>
          <label className="block">
            <span className="shell-label text-accent">
              Keywords (comma separated)
            </span>
            <input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 text-primary"
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
                    className="w-full rounded-md border border-border-strong bg-base px-4 py-3 text-left text-primary transition-colors hover:border-accent hover:text-accent"
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
