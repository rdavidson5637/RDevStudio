"use client";

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
import { InteractiveToolCard } from "./InteractiveToolCard";
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
  label: string;
  title: string;
  tools: InteractiveTool[];
  compact?: boolean;
  animationOffset?: number;
};

function InteractiveSection({
  label,
  title,
  tools,
  compact = false,
  animationOffset = 0,
}: InteractiveSectionProps) {
  if (tools.length === 0) return null;

  return (
    <section className="border-b border-border py-10">
      <header
        className="mb-6 animate-fade-in opacity-0"
        style={{ animationDelay: `${animationOffset}ms` }}
      >
        <p className="shell-label mb-2 text-accent">{label}</p>
        <h2 className="font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl">
          {title}
        </h2>
      </header>
      <div
        className={`grid gap-5 ${
          compact
            ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
            : "grid-cols-1 md:grid-cols-2"
        }`}
      >
        {tools.map((tool, index) => (
          <InteractiveToolCard
            key={tool.id}
            tool={tool}
            compact={compact}
            animationDelayMs={animationOffset + 80 + index * 70}
          />
        ))}
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
          <InteractiveSection
            label="Featured"
            title="Start here"
            tools={featuredTools}
            animationOffset={120}
          />
          <InteractiveSection
            label="Trending"
            title="Popular right now"
            tools={trendingTools}
            compact
            animationOffset={200}
          />
        </>
      ) : null}

      <section className="py-10">
        <header
          className="mb-6 animate-fade-in opacity-0"
          style={{
            animationDelay: showHighlightSections ? "280ms" : "120ms",
          }}
        >
          <p className="shell-label mb-2 text-accent">
            {showHighlightSections ? "Full lineup" : "Results"}
          </p>
          <h2 className="font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl">
            {showHighlightSections ? "All tools" : "Matching tools"}
          </h2>
        </header>

        {filteredTools.length === 0 ? (
          <div
            className="animate-fade-in rounded-[10px] border border-border-strong bg-raised p-8 text-center opacity-0"
            style={{ animationDelay: "160ms" }}
          >
            <p className="text-base text-secondary">
              No tools match your search. Try a different keyword or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredTools.map((tool, index) => (
              <InteractiveToolCard
                key={tool.id}
                tool={tool}
                animationDelayMs={
                  (showHighlightSections ? 320 : 160) + index * 70
                }
              />
            ))}
          </div>
        )}
      </section>

      {showHighlightSections && comingSoonTools.length > 0 ? (
        <section className="border-t border-border py-10">
          <header
            className="mb-6 animate-fade-in opacity-0"
            style={{ animationDelay: "360ms" }}
          >
            <p className="shell-label mb-2 text-accent">Pipeline</p>
            <h2 className="font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl">
              Coming soon
            </h2>
          </header>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {comingSoonTools.map((tool, index) => (
              <InteractiveToolCard
                key={tool.id}
                tool={tool}
                compact
                animationDelayMs={400 + index * 70}
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
