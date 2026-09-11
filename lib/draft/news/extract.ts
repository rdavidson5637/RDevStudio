import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import type { RssItem } from "./parse-rss";
import { isNewsSignal, type ExtractedSignal, type NewsSignal } from "./match";

const EXTRACT_TOOL = {
  name: "record_availability_signals",
  description: "Record training and availability signals mentioned in these headlines. Skip rumour, transfer, and contract stories.",
  input_schema: {
    type: "object" as const,
    properties: {
      items: {
        type: "array",
        items: {
          type: "object",
          properties: {
            player: { type: "string", description: "Player surname or common name as printed." },
            team: { type: "string" },
            signal: {
              type: "string",
              enum: ["trained", "missed_training", "doubt", "ruled_out", "returned", "rested"],
            },
            confidence: { type: "number", minimum: 0, maximum: 1 },
            quote: { type: "string", description: "Short quote or paraphrase from the headline/summary." },
            sourceUrl: { type: "string" },
          },
          required: ["player", "team", "signal", "confidence", "quote", "sourceUrl"],
        },
      },
    },
    required: ["items"],
  },
};

export async function extractSignals(
  clubName: string,
  items: RssItem[],
): Promise<(ExtractedSignal & { sourceUrl: string })[]> {
  if (items.length === 0) return [];
  if (!process.env.ANTHROPIC_API_KEY) return [];

  const digest = items
    .slice(0, 8)
    .map(
      (item, i) =>
        `${i + 1}. ${item.title}\nURL: ${item.link}\n${item.description.slice(0, 280)}`,
    )
    .join("\n\n");

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const msg = await anthropic.messages.create({
    model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5",
    max_tokens: 800,
    tools: [EXTRACT_TOOL],
    tool_choice: { type: "tool", name: EXTRACT_TOOL.name },
    system:
      "You extract football availability signals from RSS headlines and summaries only. " +
      "Do not invent training reports. If the text does not clearly say a named player trained, missed training, is a doubt, is ruled out, has returned, or is being rested, omit it. " +
      "sourceUrl must be one of the URLs provided. Label every claim as reported, not confirmed.",
    messages: [
      {
        role: "user",
        content: `Club: ${clubName}\n\nHeadlines:\n${digest}`,
      },
    ],
  });

  const toolUse = msg.content.find((block) => block.type === "tool_use");
  const input = toolUse && "input" in toolUse ? (toolUse.input as { items?: unknown }) : { items: [] };
  const raw = Array.isArray(input.items) ? input.items : [];
  const allowed = new Set(items.map((item) => item.link));
  const out: (ExtractedSignal & { sourceUrl: string })[] = [];

  for (const row of raw) {
    if (!row || typeof row !== "object") continue;
    const rec = row as Record<string, unknown>;
    const signal = String(rec.signal ?? "");
    const sourceUrl = String(rec.sourceUrl ?? "");
    const player = String(rec.player ?? "").trim();
    if (!player || !isNewsSignal(signal) || !allowed.has(sourceUrl)) continue;
    const confidence = Math.min(1, Math.max(0, Number(rec.confidence) || 0));
    out.push({
      player,
      team: String(rec.team ?? clubName),
      signal: signal as NewsSignal,
      confidence,
      quote: String(rec.quote ?? "").slice(0, 280),
      sourceUrl,
    });
  }

  return out;
}
