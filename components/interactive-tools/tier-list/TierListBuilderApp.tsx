"use client";

import { useEffect, useState } from "react";
import { InteractiveToolHeader } from "@/components/interactive-tools/InteractiveToolHeader";
import { FadeIn } from "@/components/toolkit-audit/FadeIn";
import { recordInteractiveToolVisit } from "@/lib/interactive-tools/storage";

const TIERS = ["S", "A", "B", "C", "D", "F"] as const;

type TierId = (typeof TIERS)[number];

const EMPTY_TIERS: Record<TierId, string[]> = {
  S: [],
  A: [],
  B: [],
  C: [],
  D: [],
  F: [],
};

export function TierListBuilderApp() {
  const [pool, setPool] = useState("Pizza\nSushi\nTacos\nCurry\nBurger\nPasta");
  const [tiers, setTiers] = useState<Record<TierId, string[]>>(EMPTY_TIERS);
  const [dragItem, setDragItem] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

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
    setSelectedItem(null);
    setDragItem(null);
  };

  const removeFromTiers = (item: string) => {
    setTiers((prev) => {
      const next = { ...prev };
      TIERS.forEach((t) => {
        next[t] = next[t].filter((i) => i !== item);
      });
      return next;
    });
    setSelectedItem(null);
  };

  const handleItemTap = (item: string) => {
    setSelectedItem((current) => (current === item ? null : item));
  };

  const handleTierTap = (tier: TierId) => {
    if (!selectedItem) return;
    moveToTier(selectedItem, tier);
  };

  return (
    <div>
      <InteractiveToolHeader
        category="Rankings & brackets"
        title="Tier List Builder"
        description="Drag items into S-through-F tiers and settle the debate."
      />
      <FadeIn className="space-y-6 py-10">
        <label className="block max-w-xl" htmlFor="tier-list-items">
          <span className="shell-label text-accent">Items (one per line)</span>
          <textarea
            id="tier-list-items"
            value={pool}
            onChange={(e) => setPool(e.target.value)}
            rows={4}
            className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 text-primary"
          />
        </label>

        <p className="text-sm text-secondary md:hidden">
          Tap an item, then tap a tier to rank it. Drag and drop also works on
          desktop.
        </p>

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
                  onDragEnd={() => setDragItem(null)}
                  onClick={() => handleItemTap(item)}
                  className={`rounded-md border bg-base px-3 py-2 text-sm font-medium text-primary touch-manipulation ${
                    selectedItem === item
                      ? "border-accent ring-2 ring-accent/30"
                      : "border-border-strong cursor-grab active:cursor-grabbing"
                  }`}
                  aria-pressed={selectedItem === item}
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
              onClick={() => handleTierTap(tier)}
              onKeyDown={(event) => {
                if (
                  selectedItem &&
                  (event.key === "Enter" || event.key === " ")
                ) {
                  event.preventDefault();
                  handleTierTap(tier);
                }
              }}
              role={selectedItem ? "button" : undefined}
              tabIndex={selectedItem ? 0 : undefined}
              className={`flex min-h-14 flex-wrap items-center gap-2 rounded-md border bg-raised p-3 touch-manipulation ${
                selectedItem
                  ? "cursor-pointer border-accent/50 ring-1 ring-accent/20"
                  : "border-border-strong"
              }`}
              aria-label={
                selectedItem
                  ? `Move ${selectedItem} to tier ${tier}`
                  : `Tier ${tier}`
              }
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent font-display text-lg text-on-accent">
                {tier}
              </span>
              {tiers[tier].map((item) => (
                <button
                  key={item}
                  type="button"
                  draggable
                  onDragStart={(event) => {
                    event.stopPropagation();
                    setDragItem(item);
                  }}
                  onDragEnd={() => setDragItem(null)}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleItemTap(item);
                  }}
                  onDoubleClick={(event) => {
                    event.stopPropagation();
                    removeFromTiers(item);
                  }}
                  className={`rounded-md border bg-base px-3 py-1.5 text-sm text-primary touch-manipulation ${
                    selectedItem === item
                      ? "border-accent ring-2 ring-accent/30"
                      : "border-border"
                  }`}
                  aria-pressed={selectedItem === item}
                  title="Double-tap to move back to unranked"
                >
                  {item}
                </button>
              ))}
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
