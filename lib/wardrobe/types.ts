// Shared types for Wardrobe AI.

export type Formality = "casual" | "smart-casual" | "formal";
export type Layer = "base" | "mid" | "bottom" | "outer" | "footwear";

export interface ItemTags {
  type: string;
  subtype: string | null;
  colour: string;
  formality: Formality;
  layer: Layer;
}

export interface Item extends ItemTags {
  id: number;
  user_id: number;
  image_path: string | null;
  needs_review: boolean;
  created_at: string;
}

// Item plus a renderable public image URL (added by the API layer).
export interface ItemWithUrl extends Item {
  image_url: string | null;
}

export interface Verdict {
  score: number;
  feedback: string;
}
