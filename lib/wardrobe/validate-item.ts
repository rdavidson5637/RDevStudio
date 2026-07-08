// Validation for item tags. Shared by manual entry and AI tagging.
// Never trust client- or model-supplied tags without running them through this.

import type { Formality, Layer, ItemTags } from "./types";

export const FORMALITIES: Formality[] = ["casual", "smart-casual", "formal"];
export const VALID_LAYERS: Layer[] = ["base", "mid", "bottom", "outer", "footwear"];

type ValidateResult =
  | { ok: true; value: ItemTags }
  | { ok: false; errors: string[] };

export function validateItemTags(input: Record<string, unknown> = {}): ValidateResult {
  const errors: string[] = [];
  const out: Partial<ItemTags> = {};

  if (typeof input.type !== "string" || !input.type.trim()) {
    errors.push("type is required");
  } else {
    out.type = input.type.trim().toLowerCase();
  }

  if (input.subtype == null || input.subtype === "") {
    out.subtype = null;
  } else if (typeof input.subtype === "string") {
    out.subtype = input.subtype.trim().toLowerCase() || null;
  } else {
    errors.push("subtype must be a string or empty");
  }

  if (typeof input.colour !== "string" || !input.colour.trim()) {
    errors.push("colour is required");
  } else {
    out.colour = input.colour.trim().toLowerCase();
  }

  if (!FORMALITIES.includes(input.formality as Formality)) {
    errors.push(`formality must be one of: ${FORMALITIES.join(", ")}`);
  } else {
    out.formality = input.formality as Formality;
  }

  if (!VALID_LAYERS.includes(input.layer as Layer)) {
    errors.push(`layer must be one of: ${VALID_LAYERS.join(", ")}`);
  } else {
    out.layer = input.layer as Layer;
  }

  if (errors.length) return { ok: false, errors };
  return { ok: true, value: out as ItemTags };
}
