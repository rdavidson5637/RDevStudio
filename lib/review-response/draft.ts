export type ReviewTone = "Professional" | "Friendly" | "Apologetic";

export type ReviewDraft =
  | { ok: true; reply: string }
  | { ok: false; error: string };

function clip(value: string, max: number): string {
  const cleaned = value.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  const cut = cleaned.slice(0, max).replace(/\s+\S*$/, "").trim();
  return cut.length > 40 ? cut : cleaned.slice(0, max).trim();
}

/** A draft that quotes the review. It does not call a model. */
export function draftReviewReply(input: {
  rating: number;
  review: string;
  tone: ReviewTone;
  business: string;
}): ReviewDraft {
  const review = input.review.replace(/\s+/g, " ").trim();
  if (review.length < 8) {
    return {
      ok: false,
      error: "Paste the review. A reply that ignores what they wrote is no use.",
    };
  }

  const bit = clip(review, 140);
  const quoted = `"${bit}"${/[.!?]$/.test(bit) ? "" : "."}`;
  const name = input.business.replace(/\s+/g, " ").trim() || "us";
  const stars = Math.min(5, Math.max(1, Math.round(input.rating)));

  if (stars >= 4) {
    const who = name === "us" ? "We're" : `${name} is`;
    if (input.tone === "Friendly") {
      return {
        ok: true,
        reply: `Thanks for the ${stars}-star review. You said ${quoted} ${who} glad it landed well.`,
      };
    }
    return {
      ok: true,
        reply: `Thank you for the ${stars}-star review. You wrote: ${quoted} ${who} glad that was the experience.`,
    };
  }

  if (stars <= 2) {
    if (input.tone === "Professional") {
      return {
        ok: true,
        reply: `Thank you for the ${stars}-star review. You wrote: ${quoted} ${name === "us" ? "We" : name} fell short, and we'd like the chance to sort it out. Please get in touch.`,
      };
    }
    return {
      ok: true,
      reply: `Sorry about this. You wrote: ${quoted} ${name === "us" ? "We'd" : `${name} would`} like to put it right. Please get in touch.`,
    };
  }

  return {
    ok: true,
    reply: `Thank you for reviewing ${name}. You wrote: ${quoted} We'll take that on board.`,
  };
}
