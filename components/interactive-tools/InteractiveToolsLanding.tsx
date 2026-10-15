"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type {
  InteractiveTool,
  InteractiveToolCategory,
} from "@/types/interactive-tools";
import {
  getComingSoonInteractiveTools,
  getFeaturedInteractiveTools,
  getInteractiveToolBySlug,
  getLiveInteractiveTools,
} from "@/lib/interactive-tools/catalog";
import { getTrendingSlugs } from "@/lib/interactive-tools/storage";
import { InteractiveCategoryFilters } from "./InteractiveCategoryFilters";
import { InteractiveToolSearch } from "./InteractiveToolSearch";

function matchesSearch(tool: InteractiveTool, query: string): boolean {
  if (!query.trim()) return true;

  const haystack = [
    tool.title,
    tool.description,
    tool.category,
    ...tool.keywords,
  ]
    .join(" ")
    .toLowerCase();

  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

function matchesCategory(
  tool: InteractiveTool,
  category: InteractiveToolCategory | "all",
): boolean {
  return category === "all" || tool.category === category;
}

function resolveTools(slugs: string[]): InteractiveTool[] {
  return slugs
    .map((slug) => getInteractiveToolBySlug(slug))
    .filter((tool): tool is InteractiveTool => tool !== undefined);
}

type InteractiveSectionProps = {
  title: string;
  tools: InteractiveTool[];
};

function ToolList({ tools }: { tools: InteractiveTool[] }) {
  return (
    <ul className="border-t border-studio-line">
      {tools.map((tool) => (
        <li key={tool.id} className="border-b border-studio-line">
          <Link
            href={tool.href}
            className="block py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
          >
            <span className="block font-studio-display text-2xl text-studio-text">{tool.title}</span>
            <span className="type-body mt-1 block max-w-prose text-studio-muted">{tool.description}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function InteractiveSection({ title, tools }: InteractiveSectionProps) {
  if (tools.length === 0) return null;

  return (
    <section className="border-b border-studio-line py-10">
      <h2 className="font-studio-display text-3xl text-studio-text">{title}</h2>
      <div className="mt-6">
        <ToolList tools={tools} />
      </div>
    </section>
  );
}

export function InteractiveToolsLanding() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    InteractiveToolCategory | "all"
  >("all");
  const [trendingSlugs, setTrendingSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setTrendingSlugs(getTrendingSlugs());
    setHydrated(true);
  }, []);

  const filteredTools = useMemo(() => {
    return getLiveInteractiveTools().filter(
      (tool) =>
        matchesSearch(tool, searchQuery) &&
        matchesCategory(tool, activeCategory),
    );
  }, [searchQuery, activeCategory]);

  const comingSoonTools = useMemo(() => getComingSoonInteractiveTools(), []);

  const featuredTools = useMemo(() => {
    const featured = getFeaturedInteractiveTools();
    if (!searchQuery.trim() && activeCategory === "all") {
      return featured;
    }
    return featured.filter(
      (tool) =>
        matchesSearch(tool, searchQuery) &&
        matchesCategory(tool, activeCategory),
    );
  }, [searchQuery, activeCategory]);

  const trendingTools = useMemo(() => {
    const tools = resolveTools(trendingSlugs);
    if (!searchQuery.trim() && activeCategory === "all") {
      return tools;
    }
    return tools.filter(
      (tool) =>
        matchesSearch(tool, searchQuery) &&
        matchesCategory(tool, activeCategory),
    );
  }, [trendingSlugs, searchQuery, activeCategory]);

  const showHighlightSections =
    hydrated && !searchQuery.trim() && activeCategory === "all";

  return (
    <div>
      <section className="border-b border-border pb-10">
        <div className="space-y-6">
          <InteractiveToolSearch
            value={searchQuery}
            onChange={setSearchQuery}
            resultCount={filteredTools.length}
          />
          <InteractiveCategoryFilters
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
        </div>
      </section>

      {showHighlightSections ? (
        <>
          <InteractiveSection title="Start here" tools={featuredTools} />
          <InteractiveSection title="Popular right now" tools={trendingTools} />
        </>
      ) : null}

      <section className="py-10">
        <h2 className="font-studio-display text-3xl text-studio-text">
          {showHighlightSections ? "All tools" : "Matching tools"}
        </h2>

        {filteredTools.length === 0 ? (
          <p className="type-body mt-6 text-studio-muted">
            No tools match your search. Try a different keyword or category.
          </p>
        ) : (
          <div className="mt-6">
            <ToolList tools={filteredTools} />
          </div>
        )}
      </section>

      {showHighlightSections && comingSoonTools.length > 0 ? (
        <section className="border-t border-studio-line py-10">
          <h2 className="font-studio-display text-3xl text-studio-text">Coming soon</h2>
          <div className="mt-6">
            <ToolList tools={comingSoonTools} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
