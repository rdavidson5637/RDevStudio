"use client";

import { useEffect, useState } from "react";
import { ToolkitToolHeader } from "@/components/toolkit-audit/ToolkitToolHeader";
import { FadeIn } from "@/components/toolkit-audit/FadeIn";
import { recordRecentSlug } from "@/lib/business-toolkit/storage";
import { draftReviewReply, type ReviewTone } from "@/lib/review-response/draft";

const TONES = ["Professional", "Friendly", "Apologetic"] as const;

export function ReviewResponseGeneratorApp() {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [tone, setTone] = useState<ReviewTone>("Professional");
  const [business, setBusiness] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    recordRecentSlug("review-response-generator");
  }, []);

  const handleGenerate = () => {
    const draft = draftReviewReply({ rating, review, tone, business });
    if (!draft.ok) {
      setResponse("");
      setError(draft.error);
      return;
    }
    setError(null);
    setResponse(draft.reply);
  };

  return (
    <div>
      <ToolkitToolHeader
        category="Generators"
        title="Review Response Generator"
        description="Paste the review and get a short draft that quotes it. Read the draft before you post it. This does not use a model."
      />
      <div className="grid gap-8 py-10 lg:grid-cols-2">
        <FadeIn className="space-y-4 rounded-[10px] border border-border-strong bg-raised p-5 sm:p-6">
          <label className="block">
            <span className="shell-label text-accent">Business name</span>
            <input
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              className="mt-2 w-full rounded-md border border-border-strong bg-paper px-4 py-3 text-primary"
            />
          </label>
          <label className="block">
            <span className="shell-label text-accent">
              Star rating ({rating})
            </span>
            <input
              type="range"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="mt-2 w-full accent-accent"
            />
          </label>
          <label className="block">
            <span className="shell-label text-accent">Tone</span>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as ReviewTone)}
              className="mt-2 w-full rounded-md border border-border-strong bg-paper px-4 py-3 text-primary"
            >
              {TONES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="shell-label text-accent">
              Review text
            </span>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              className="mt-2 w-full rounded-md border border-border-strong bg-paper px-4 py-3 text-primary"
            />
          </label>
          <button
            type="button"
            onClick={handleGenerate}
            className="btn-primary"
          >
            Generate response
          </button>
        </FadeIn>
        <FadeIn
          delayMs={80}
          className="rounded-[10px] border border-border-strong bg-raised p-5 sm:p-6"
        >
          <p className="shell-label text-accent">Suggested reply</p>
          {error ? (
            <p className="mt-4 text-sm font-bold text-primary" role="alert">
              {error}
            </p>
          ) : null}
          {response ? (
            <>
              <p className="mt-4 text-base leading-relaxed text-secondary">
                {response}
              </p>
              <p className="mt-3 text-sm text-tertiary">
                Read this before you post it. It quotes the review and nothing else.
              </p>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(response)}
                className="btn-secondary mt-6"
              >
                Copy response
              </button>
            </>
          ) : (
            <p className="mt-4 text-sm text-tertiary">
              Generate a response to see it here.
            </p>
          )}
        </FadeIn>
      </div>
    </div>
  );
}
