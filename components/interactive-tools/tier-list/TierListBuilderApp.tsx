"use client";

import { useEffect, useState } from "react";
import { InteractiveToolHeader } from "@/components/interactive-tools/InteractiveToolHeader";
import { FadeIn } from "@/components/toolkit-audit/FadeIn";
import { recordInteractiveToolVisit } from "@/lib/interactive-tools/storage";

const TIERS = ["S", "A", "B", "C", "D", "F"] as const;

type TierId = (typeof TIERS)[number];

export function TierListBuilderApp() {
  const [pool, setPool] = useState("Pizza\nSushi\nTacos\nCurry\nBurger\nPasta");
  const [tiers, setTiers] = useState<Record<TierId, string[]>>({
    S: [],
    A: [],
    B: [],
    C: [],
    D: [],
    F: [],
  });
  const [dragItem, setDragItem] = useState<string | null>(null);

  useEffect(() => {
    recordInteractiveToolVisit("tier-list-builder");
  }, []);

  const unassigned = pool
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((item) => !TIERS.some((t) => tiers[t].includes(item)));

  const moveToTier = (item: string, tier: TierId) => {
    setTiers((prev) => {
      const next = { ...prev };
      TIERS.forEach((t) => {
        next[t] = next[t].filter((i) => i !== item);
      });
      next[tier] = [...next[tier], item];
      return next;
    });
  };

  return (
    <div>
      <InteractiveToolHeader
        category="Rankings & brackets"
        title="Tier List Builder"
        description="Drag items into S-through-F tiers and settle the debate."
      />
      <FadeIn className="space-y-6 py-10">
        <label className="block max-w-xl">
          <span className="shell-label text-accent">Items (one per line)</span>
          <textarea
            value={pool}
            onChange={(e) => setPool(e.target.value)}
            rows={4}
            className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 text-primary"
          />
        </label>
        {unassigned.length > 0 ? (
          <div className="rounded-[10px] border border-border-strong bg-raised p-4">
            <p className="shell-label mb-3 text-secondary">Unranked</p>
            <div className="flex flex-wrap gap-2">
              {unassigned.map((item) => (
                <button
                  key={item}
                  type="button"
                  draggable
                  onDragStart={() => setDragItem(item)}
                  className="rounded-md border border-border-strong bg-base px-3 py-2 text-sm font-medium text-primary cursor-grab active:cursor-grabbing"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        <div className="space-y-3">
          {TIERS.map((tier) => (
            <div
              key={tier}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => dragItem && moveToTier(dragItem, tier)}
              className="flex min-h-14 flex-wrap items-center gap-2 rounded-md border border-border-strong bg-raised p-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent font-display text-lg text-on-accent">
                {tier}
              </span>
              {tiers[tier].map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-border bg-base px-3 py-1.5 text-sm text-primary"
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
