// AI auto-tagging via Claude vision. Server-side only.
import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { validateItemTags, FORMALITIES, VALID_LAYERS } from "./validate-item";
import type { ItemTags } from "./types";

type MediaType = "image/jpeg" | "image/png" | "image/webp";

const TAG_TOOL = {
  name: "record_garment_tags",
  description: "Record the structured tags for a single garment shown in the photo.",
  input_schema: {
    type: "object" as const,
    properties: {
      type: { type: "string", description: "Garment type, e.g. shirt, trousers, shoes, jacket." },
      subtype: { type: ["string", "null"], description: "More specific style, e.g. oxford, cargo, loafer. Null if unclear." },
      colour: { type: "string", description: "Dominant colour in plain English, e.g. navy, olive, off-white." },
      formality: { type: "string", enum: FORMALITIES },
      layer: {
        type: "string",
        enum: VALID_LAYERS,
        description:
          "base = top worn on torso; mid = jumper/cardigan; bottom = trousers/shorts/skirt; outer = coat/jacket; footwear = shoes.",
      },
    },
    required: ["type", "colour", "formality", "layer"],
  },
};

function client() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

async function callClaude(base64: string, mediaType: MediaType): Promise<Record<string, unknown>> {
  const anthropic = client();
  const msg = await anthropic.messages.create({
    model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5",
    max_tokens: 400,
    tools: [TAG_TOOL],
    tool_choice: { type: "tool", name: TAG_TOOL.name },
    system:
      "You are a precise clothing tagger. Look at the garment photo and record its tags using the tool. " +
      "Return ONLY the tool call, no prose. Be honest about formality and pick the single best-fit layer.",
    messages: [
      {
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
          { type: "text", text: "Tag this garment." },
        ],
      },
    ],
  });

  const toolUse = msg.content.find((b) => b.type === "tool_use");
  if (toolUse && "input" in toolUse) return toolUse.input as Record<string, unknown>;

  const textBlock = msg.content.find((b) => b.type === "text");
  if (textBlock && "text" in textBlock) {
    return JSON.parse(textBlock.text.replace(/```json|```/g, "").trim());
  }
  throw new Error("No usable content in model response");
}

export async function tagGarmentFromBuffer(buffer: Buffer, mediaType: string): Promise<ItemTags> {
  const base64 = buffer.toString("base64");
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const raw = await callClaude(base64, mediaType as MediaType);
      const result = validateItemTags(raw);
      if (result.ok) return result.value;
      if (attempt === 1) throw new Error(`Tags failed validation: ${result.errors.join(", ")}`);
    } catch (err) {
      if (attempt === 1) throw err;
    }
  }
  throw new Error("Tagging failed");
}

export const PLACEHOLDER_TAGS: ItemTags = {
  type: "unknown",
  subtype: null,
  colour: "unknown",
  formality: "casual",
  layer: "base",
};
