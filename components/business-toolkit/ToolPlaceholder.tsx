"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { BusinessTool } from "@/types/business-toolkit";
import { getCategoryLabel } from "@/lib/business-toolkit/catalog";
import { recordRecentSlug } from "@/lib/business-toolkit/storage";
import { ToolBadge } from "./ToolBadge";

type ToolPlaceholderProps = {
  tool: BusinessTool;
};

export function ToolPlaceholder({ tool }: ToolPlaceholderProps) {
  useEffect(() => {
    recordRecentSlug(tool.slug);
  }, [tool.slug]);

  const categoryLabel = getCategoryLabel(tool.category);

  return (
    <div className="section-padding pt-28">
      <div className="container-wide px-6">
        <Link
          href="/toolkit"
          className="text-sm font-medium text-secondary transition-colors hover:text-accent"
        >
          ← Business Toolkit
        </Link>

        <header className="mt-8 max-w-3xl border-b border-border pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <p className="shell-label text-accent">{categoryLabel}</p>
            {tool.badge ? <ToolBadge badge={tool.badge} /> : null}
          </div>
          <h1 className="programme-h1 mt-4">{tool.title.toUpperCase()}</h1>
          <p className="mt-5 text-base leading-relaxed text-secondary sm:text-lg">
            {tool.description}
          </p>
        </header>

        <section className="py-12">
          <div className="mx-auto max-w-2xl rounded-[10px] border border-border-strong bg-raised p-8 text-center sm:p-12">
            <p className="shell-label text-accent">In development</p>
            <h2 className="mt-4 font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl">
              Coming soon
            </h2>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              This tool is queued for build. The route is live so you can
              favourite it and find it again from your toolkit dashboard.
            </p>
            <Link href="/toolkit" className="btn-primary mt-8">
              Back to toolkit
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
