"use client";

import Image from "next/image";
import { useState } from "react";

import type { ProjectCategory } from "@/lib/constants";

type ProjectPreviewProps = {
  title: string;
  image?: string;
  imageAlt?: string;
  previewVideo?: string;
  category?: ProjectCategory;
};

export function ProjectPreview({
  title,
  image,
  imageAlt,
  previewVideo,
  category,
}: ProjectPreviewProps) {
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const showVideo = Boolean(previewVideo && !videoError);
  const showImage = Boolean(image && imageAlt && !imageError && !showVideo);

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-overlay">
      <div className="absolute inset-x-0 top-0 z-20 flex items-center gap-1.5 border-b border-border bg-base/90 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-400/80" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-amber-400/80" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/80" aria-hidden="true" />
        <span className="ml-2 truncate font-display text-[10px] text-tertiary sm:text-xs">
          {title.toLowerCase().replace(/\s+/g, "")}.co.uk
        </span>
      </div>

      <div className="absolute inset-0 top-8">
        {showVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={image}
            className="h-full w-full object-cover object-top"
            aria-label={imageAlt ?? `${title} website preview`}
            onError={() => setVideoError(true)}
          >
            <source src={previewVideo} type="video/mp4" />
          </video>
        ) : showImage && image && imageAlt ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover object-top transition-transform duration-slow group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 576px"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-overlay">
            <div className="px-6 text-center">
              <span
                className="font-display text-5xl font-extrabold text-primary/10 sm:text-6xl"
                aria-hidden="true"
              >
                {title.charAt(0)}
              </span>
              <p className="mt-3 text-xs text-tertiary sm:text-sm">
                Add preview to public/images/work/
              </p>
            </div>
            <span className="sr-only">Preview placeholder for {title}</span>
          </div>
        )}
      </div>

      {category && (
        <span
          className={`absolute bottom-3 right-3 z-20 px-3 py-1 font-display text-[10px] font-semibold uppercase tracking-wider ${
            category === "Client Work"
              ? "border border-accent bg-accent-subtle text-accent"
              : "border border-border bg-base/90 text-tertiary"
          }`}
        >
          {category}
        </span>
      )}
    </div>
  );
}
