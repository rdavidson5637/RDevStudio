"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { InteractiveTool } from "@/types/interactive-tools";
import { getInteractiveCategoryLabel } from "@/lib/interactive-tools/catalog";
import { recordInteractiveToolVisit } from "@/lib/interactive-tools/storage";
import { InteractiveToolBadge } from "./InteractiveToolBadge";

type InteractiveToolPlaceholderProps = {
  tool: InteractiveTool;
};

export function InteractiveToolPlaceholder({
  tool,
}: InteractiveToolPlaceholderProps) {
  useEffect(() => {
    recordInteractiveToolVisit(tool.slug);
  }, [tool.slug]);

  const categoryLabel = getInteractiveCategoryLabel(tool.category);

  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <Link
          href="/interactive"
          className="text-sm font-medium text-secondary transition-colors hover:text-accent"
        >
          ← Interactive Tools
        </Link>

        <header className="mt-8 max-w-3xl animate-fade-in border-b border-border pb-10 opacity-0">
          <div className="flex flex-wrap items-center gap-3">
            <p className="shell-label text-accent">{categoryLabel}</p>
            {tool.badge ? <InteractiveToolBadge badge={tool.badge} /> : null}
          </div>
          <h1 className="programme-h1 mt-4">{tool.title.toUpperCase()}</h1>
          <p className="mt-5 text-base leading-relaxed text-secondary sm:text-lg">
            {tool.description}
          </p>
        </header>

        <section className="py-12">
          <div
            className="mx-auto max-w-2xl animate-fade-in rounded-[10px] border border-border-strong bg-raised p-8 text-center opacity-0 sm:p-12"
            style={{ animationDelay: "120ms" }}
          >
            <p className="shell-label text-accent">In development</p>
            <h2 className="mt-4 font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl">
              Coming soon
            </h2>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              This interactive tool is on the bench. The route is live so you
              can link to it and track it in trending once it ships.
            </p>
            <Link href="/interactive" className="btn-primary mt-8">
              Back to interactive tools
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
