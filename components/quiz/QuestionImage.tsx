"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { normalizeWikimediaImageUrl } from "@/lib/quiz/wikimedia";

interface QuestionImageProps {
  imageUrl: string;
  imageAlt: string;
  prominent?: boolean;
}

export function QuestionImage({
  imageUrl,
  imageAlt,
  prominent = false,
}: QuestionImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const src = normalizeWikimediaImageUrl(imageUrl);

  useEffect(() => {
    setLoaded(false);
    setErrored(false);
  }, [src]);

  if (errored) {
    return (
      <div
        className={`question-image-frame flex w-full items-center justify-center rounded-2xl border border-quiz-border bg-quiz-surface ${
          prominent ? "min-h-[200px] sm:min-h-[280px]" : "min-h-[160px]"
        }`}
      >
        <p className="text-sm text-quiz-muted">Image unavailable</p>
      </div>
    );
  }

  return (
    <div
      className={`question-image-frame relative w-full overflow-hidden rounded-2xl border border-quiz-border bg-quiz-surface ${
        prominent ? "mb-8" : "mb-6"
      }`}
    >
      {!loaded ? (
        <div
          className={`image-shimmer flex w-full items-center justify-center bg-quiz-bg/80 ${
            prominent
              ? "h-[200px] sm:h-[280px]"
              : "h-[160px] sm:h-[200px]"
          }`}
          aria-hidden="true"
        />
      ) : null}

      <Image
        key={src}
        src={src}
        alt={imageAlt}
        width={1200}
        height={700}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={`mx-auto w-full object-contain transition-opacity duration-500 ${
          prominent
            ? "max-h-[200px] sm:max-h-[280px]"
            : "max-h-[200px] sm:max-h-[280px]"
        } ${loaded ? "relative opacity-100" : "absolute inset-0 opacity-0"}`}
      />
    </div>
  );
}
