// Deterministic outfit combination engine. Pure - no DB, no API, no side effects.
// An outfit is: exactly one base, one bottom, one footwear, optionally one mid and one outer.
// Never two items of the same layer. Ported from the standalone Wardrobe AI app.

import type { Layer } from "./types";

export const LAYERS: Layer[] = ["base", "mid", "bottom", "outer", "footwear"];

interface OutfitItem {
  id: number;
  layer: Layer | string;
  formality: string;
}

export function generateOutfits<T extends OutfitItem>(
  items: T[],
  options: { allowFormalityMismatch?: boolean } = {},
): number[][] {
  const { allowFormalityMismatch = false } = options;

  const byLayer: Record<Layer, T[]> = {
    base: [],
    mid: [],
    bottom: [],
    outer: [],
    footwear: [],
  };
  for (const item of items) {
    if ((byLayer as Record<string, T[]>)[item.layer]) {
      (byLayer as Record<string, T[]>)[item.layer].push(item);
    }
  }

  if (!byLayer.base.length || !byLayer.bottom.length || !byLayer.footwear.length) {
    return [];
  }

  const outerChoices: (T | null)[] = [null, ...byLayer.outer];
  const midChoices: (T | null)[] = [null, ...byLayer.mid];

  const outfits: number[][] = [];
  for (const base of byLayer.base) {
    for (const bottom of byLayer.bottom) {
      for (const footwear of byLayer.footwear) {
        if (
          !allowFormalityMismatch &&
          footwear.formality === "formal" &&
          bottom.formality === "casual"
        ) {
          continue;
        }
        for (const mid of midChoices) {
          for (const outer of outerChoices) {
            const chosen = [base, mid, bottom, outer, footwear].filter(
              (i): i is T => Boolean(i),
            );
            outfits.push(chosen.map((i) => i.id));
          }
        }
      }
    }
  }

  return outfits;
}
