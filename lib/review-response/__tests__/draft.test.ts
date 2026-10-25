import { describe, expect, it } from "vitest";
import { draftReviewReply } from "@/lib/review-response/draft";

describe("draftReviewReply", () => {
  it("refuses to draft when the review is missing", () => {
    const result = draftReviewReply({
      rating: 1,
      review: "   ",
      tone: "Apologetic",
      business: "RV's",
    });
    expect(result.ok).toBe(false);
  });

  it("quotes the review in a low-star reply", () => {
    const result = draftReviewReply({
      rating: 1,
      review: "The cold brew was an hour late and arrived warm.",
      tone: "Apologetic",
      business: "RV's Cold Brew",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.reply).toContain("an hour late");
      expect(result.reply).toContain("RV's Cold Brew");
    }
  });

  it("does not apologise for a high rating", () => {
    const result = draftReviewReply({
      rating: 5,
      review: "Best flat white in the mall.",
      tone: "Apologetic",
      business: "",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.reply.toLowerCase()).not.toContain("sorry");
      expect(result.reply).toContain("Best flat white");
    }
  });
});
