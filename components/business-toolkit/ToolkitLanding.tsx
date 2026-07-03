"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { BusinessTool, ToolCategory } from "@/types/business-toolkit";
import {
  getComingSoonTools,
  getFeaturedTools,
  getLiveTools,
  getToolBySlug,
} from "@/lib/business-toolkit/catalog";
import {
  getFavouriteSlugs,
  getRecentSlugs,
  toggleFavouriteSlug,
} from "@/lib/business-toolkit/storage";
import { CategoryFilters } from "./CategoryFilters";
import { ToolkitSearch } from "./ToolkitSearch";
import { ToolCard } from "./ToolCard";

function matchesSearch(tool: BusinessTool, query: string): boolean {
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
  tool: BusinessTool,
  category: ToolCategory | "all",
): boolean {
  return category === "all" || tool.category === category;
}

function resolveTools(slugs: string[]): BusinessTool[] {
  return slugs
    .map((slug) => getToolBySlug(slug))
    .filter((tool): tool is BusinessTool => tool !== undefined);
}

type ToolkitSectionProps = {
  label: string;
  title: string;
  tools: BusinessTool[];
  favouriteSlugs: string[];
  onToggleFavourite: (slug: string) => void;
  compact?: boolean;
};

function ToolkitSection({
  label,
  title,
  tools,
  favouriteSlugs,
  onToggleFavourite,
  compact = false,
}: ToolkitSectionProps) {
  if (tools.length === 0) return null;

  return (
    <section className="border-b border-border py-10">
      <header className="mb-6">
        <p className="shell-label mb-2 text-accent">{label}</p>
        <h2 className="font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl">
          {title}
        </h2>
      </header>
      <div
        className={`grid gap-5 ${
          compact
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 md:grid-cols-2"
        }`}
      >
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            compact={compact}
            isFavourite={favouriteSlugs.includes(tool.slug)}
            onToggleFavourite={onToggleFavourite}
          />
        ))}
      </div>
    </section>
  );
}

export function ToolkitLanding() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "all">(
    "all",
  );
  const [favouriteSlugs, setFavouriteSlugs] = useState<string[]>([]);
  const [recentSlugs, setRecentSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setFavouriteSlugs(getFavouriteSlugs());
    setRecentSlugs(getRecentSlugs());
    setHydrated(true);
  }, []);

  const handleToggleFavourite = useCallback((slug: string) => {
    const next = toggleFavouriteSlug(slug);
    setFavouriteSlugs(next);
  }, []);

  const filteredTools = useMemo(() => {
    return getLiveTools().filter(
      (tool) =>
        matchesSearch(tool, searchQuery) &&
        matchesCategory(tool, activeCategory),
    );
  }, [searchQuery, activeCategory]);

  const comingSoonTools = useMemo(() => getComingSoonTools(), []);

  const featuredTools = useMemo(() => {
    const featured = getFeaturedTools();
    if (!searchQuery.trim() && activeCategory === "all") {
      return featured;
    }
    return featured.filter(
      (tool) =>
        matchesSearch(tool, searchQuery) &&
        matchesCategory(tool, activeCategory),
    );
  }, [searchQuery, activeCategory]);

  const favouriteTools = useMemo(
    () => resolveTools(favouriteSlugs),
    [favouriteSlugs],
  );

  const recentTools = useMemo(() => resolveTools(recentSlugs), [recentSlugs]);

  const showPersonalSections =
    hydrated && !searchQuery.trim() && activeCategory === "all";

  return (
    <div>
      <section className="border-b border-border pb-10">
        <div className="space-y-6">
          <ToolkitSearch
            value={searchQuery}
            onChange={setSearchQuery}
            resultCount={filteredTools.length}
          />
          <CategoryFilters
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
        </div>
      </section>

      {showPersonalSections ? (
        <>
          <ToolkitSection
            label="Pinned"
            title="Favourites"
            tools={favouriteTools}
            favouriteSlugs={favouriteSlugs}
            onToggleFavourite={handleToggleFavourite}
            compact
          />
          <ToolkitSection
            label="Recent"
            title="Recently used"
            tools={recentTools}
            favouriteSlugs={favouriteSlugs}
            onToggleFavourite={handleToggleFavourite}
            compact
          />
          <ToolkitSection
            label="Featured"
            title="Start here"
            tools={featuredTools}
            favouriteSlugs={favouriteSlugs}
            onToggleFavourite={handleToggleFavourite}
          />
        </>
      ) : null}

      <section className="py-10">
        <header className="mb-6">
          <p className="shell-label mb-2 text-accent">
            {showPersonalSections ? "Full squad" : "Results"}
          </p>
          <h2 className="font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl">
            {showPersonalSections ? "All tools" : "Matching tools"}
          </h2>
        </header>

        {filteredTools.length === 0 ? (
          <div className="rounded-[10px] border border-border-strong bg-raised p-8 text-center">
            <p className="text-base text-secondary">
              No tools match your search. Try a different keyword or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavourite={favouriteSlugs.includes(tool.slug)}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
          </div>
        )}
      </section>

      {showPersonalSections && comingSoonTools.length > 0 ? (
        <section className="border-t border-border py-10">
          <header className="mb-6">
            <p className="shell-label mb-2 text-accent">Pipeline</p>
            <h2 className="font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl">
              Coming soon
            </h2>
          </header>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {comingSoonTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} compact />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
