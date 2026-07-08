// AI styling judgement. Sends outfit TAGS (never images) to Claude for an honest score.
import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import type { Item, Verdict } from "./types";

const SCORE_TOOL = {
  name: "record_styling_verdict",
  description: "Record an honest score and critique for the outfit.",
  input_schema: {
    type: "object" as const,
    properties: {
      score: { type: "integer", minimum: 0, maximum: 100, description: "Overall quality, 0-100. Be discerning, not generous." },
      feedback: { type: "string", description: "Two to four sentences. Name specific clashes, formality mismatches or proportion issues." },
    },
    required: ["score", "feedback"],
  },
};

const SYSTEM = [
  "You are an honest, critical menswear stylist. You are NOT a hype man.",
  "Score the outfit 0-100 based only on the tags provided.",
  "Actively flag colour clashes, formality mismatches, and proportion issues.",
  "Do not just approve. If the combination is mediocre, say so and say exactly why.",
  "A safe-but-boring outfit should land in the 60s, not the 90s. Reserve 90+ for genuinely sharp combinations.",
].join(" ");

export async function scoreOutfit(items: Item[]): Promise<Verdict> {
  const summary = items
    .map((i) => `- ${i.layer}: ${i.colour} ${i.subtype ? i.subtype + " " : ""}${i.type} (${i.formality})`)
    .join("\n");

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const msg = await anthropic.messages.create({
        model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5",
        max_tokens: 500,
        tools: [SCORE_TOOL],
        tool_choice: { type: "tool", name: SCORE_TOOL.name },
        system: SYSTEM,
        messages: [{ role: "user", content: `Judge this outfit:\n${summary}` }],
      });

      const toolUse = msg.content.find((b) => b.type === "tool_use");
      let out: { score?: unknown; feedback?: unknown };
      if (toolUse && "input" in toolUse) {
        out = toolUse.input as { score?: unknown; feedback?: unknown };
      } else {
        const text = msg.content.find((b) => b.type === "text");
        out = JSON.parse(((text && "text" in text ? text.text : "") || "").replace(/```json|```/g, "").trim());
      }

      const score = Math.max(0, Math.min(100, Math.round(Number(out.score))));
      const feedback = String(out.feedback || "").trim();
      if (!Number.isFinite(score) || !feedback) throw new Error("Malformed verdict");
      return { score, feedback };
    } catch (err) {
      if (attempt === 1) throw err;
    }
  }
  throw new Error("Scoring failed");
}
