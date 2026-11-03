import { describe, expect, it } from "vitest";
import { extractJsonObject, parseRoastPayload } from "@/lib/logo-roast/parse";

const category = (id: string) => ({
  id,
  score: 70,
  summary: "The mark is readable at a small size.",
  highlights: ["Clear shape"],
  issues: ["Thin strokes may vanish in one colour"],
});

const valid = {
  overall: {
    score: 64,
    summary: "A plain wordmark. It will work, and it will not be remembered.",
    highlights: ["Legible"],
    issues: ["Nothing ownable"],
  },
  categories: [
    "brand",
    "typography",
    "colour",
    "scalability",
    "memorability",
    "accessibility",
  ].map(category),
};

describe("parseRoastPayload", () => {
  it("keeps a complete roast and stamps the file name", () => {
    const result = parseRoastPayload(valid, "mark.png");
    expect(result?.fileName).toBe("mark.png");
    expect(result?.overall.score).toBe(64);
    expect(result?.categories).toHaveLength(6);
    expect(result?.categories[0]?.title).toBe("Brand");
  });

  it("returns null when a category is missing", () => {
    const broken = {
      ...valid,
      categories: valid.categories.filter((item) => item.id !== "colour"),
    };
    expect(parseRoastPayload(broken, "mark.png")).toBeNull();
  });

  it("returns null when a score is not a number", () => {
    const broken = {
      ...valid,
      overall: { ...valid.overall, score: "high" },
    };
    expect(parseRoastPayload(broken, "mark.png")).toBeNull();
  });

  it("strips an em dash from the summary", () => {
    const withDash = {
      ...valid,
      overall: { ...valid.overall, summary: "Readable \u2014 not ownable." },
    };
    expect(parseRoastPayload(withDash, "mark.png")?.overall.summary).toBe(
      "Readable - not ownable.",
    );
  });
});

describe("extractJsonObject", () => {
  it("reads JSON wrapped in a fence", () => {
    const raw = extractJsonObject("```json\n{\"overall\":{}}\n```");
    expect(raw).toEqual({ overall: {} });
  });
});
