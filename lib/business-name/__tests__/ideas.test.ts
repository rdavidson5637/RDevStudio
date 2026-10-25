import { describe, expect, it } from "vitest";
import { buildNameIdeas } from "@/lib/business-name/ideas";

describe("buildNameIdeas", () => {
  it("includes the industry with each keyword", () => {
    const names = buildNameIdeas("rye, malt", "bakery", () => 0);
    expect(names).toContain("Rye Bakery");
    expect(names).toContain("Malt Bakery");
  });

  it("still returns ideas when only an industry is given", () => {
    const names = buildNameIdeas("", "bakery", () => 0.5);
    expect(names.length).toBeGreaterThan(0);
    expect(names.some((name) => name.toLowerCase().includes("bakery"))).toBe(true);
  });
});