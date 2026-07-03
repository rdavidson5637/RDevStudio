"use client";

import { useEffect, useState } from "react";
import { ToolkitToolHeader } from "@/components/toolkit-audit/ToolkitToolHeader";
import { FadeIn } from "@/components/toolkit-audit/FadeIn";
import { recordRecentSlug } from "@/lib/business-toolkit/storage";

const TONES = ["Professional", "Friendly", "Apologetic"] as const;

function generateResponse(
  rating: number,
  review: string,
  tone: string,
  business: string,
): string {
  const name = business || "our team";
  if (rating >= 4) {
    return tone === "Friendly"
      ? `Thanks so much for the lovely review! We're thrilled you had a great experience with ${name}. Hope to see you again soon.`
      : `Thank you for your ${rating}-star review. We appreciate your feedback and are glad ${name} met your expectations.`;
  }
  if (rating <= 2) {
    return tone === "Apologetic"
      ? `We're sorry your experience didn't meet expectations. Thank you for the honest feedback — we'd like to make this right. Please contact ${name} directly so we can follow up.`
      : `Thank you for your feedback. We're disappointed we fell short and would welcome the chance to resolve this. Please reach out to ${name} at your convenience.`;
  }
  return `Thank you for taking the time to review ${name}. We appreciate your balanced feedback and will use it to keep improving.`;
}

export function ReviewResponseGeneratorApp() {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [tone, setTone] = useState<(typeof TONES)[number]>("Professional");
  const [business, setBusiness] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    recordRecentSlug("review-response-generator");
  }, []);

  const handleGenerate = () => {
    setResponse(generateResponse(rating, review, tone, business));
  };

  return (
    <div>
      <ToolkitToolHeader
        category="Generators"
        title="Review Response Generator"
        description="Draft polite, on-brand replies to Google and social reviews — tweak and post in seconds."
      />
      <div className="grid gap-8 py-10 lg:grid-cols-2">
        <FadeIn className="space-y-4 rounded-[10px] border border-border-strong bg-raised p-5 sm:p-6">
          <label className="block">
            <span className="shell-label text-accent">Business name</span>
            <input
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 text-primary"
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
              onChange={(e) => setTone(e.target.value as typeof tone)}
              className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 text-primary"
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
              Review text (optional)
            </span>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 text-primary"
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
          {response ? (
            <>
              <p className="mt-4 text-base leading-relaxed text-secondary">
                {response}
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
