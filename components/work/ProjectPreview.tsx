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
  /** Clean screenshot — no browser chrome */
  simple?: boolean;
  className?: string;
};

export function ProjectPreview({
  title,
  image,
  imageAlt,
  previewVideo,
  category,
  simple = false,
  className = "",
}: ProjectPreviewProps) {
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const showVideo = Boolean(previewVideo && !videoError);
  const showImage = Boolean(image && imageAlt && !imageError && !showVideo);

  return (
    <div
      className={`relative aspect-[16/10] overflow-hidden bg-base ${className}`}
    >
      {showVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={image}
          className="h-full w-full object-cover object-top transition-[filter] duration-[250ms] ease-out group-hover:brightness-105"
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
          className="object-cover object-top transition-[filter] duration-[250ms] ease-out group-hover:brightness-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 576px"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-raised">
          <div className="px-6 text-center">
            <span
              className="font-display text-4xl font-bold text-primary/15 sm:text-5xl"
              aria-hidden="true"
            >
              {title.charAt(0)}
            </span>
            <p className="mt-2 text-sm text-secondary">Preview coming soon</p>
          </div>
          <span className="sr-only">Preview placeholder for {title}</span>
        </div>
      )}

      {(showVideo || showImage) && (
        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-[250ms] ease-out group-hover:opacity-100"
          aria-hidden="true"
        >
          <span className="text-sm font-semibold text-white">View project →</span>
        </div>
      )}

      {category && !simple && (
        <span className="absolute bottom-3 right-3 z-10 rounded-full border border-white/20 bg-base/80 px-2 py-0.5 text-xs font-medium text-white/70 backdrop-blur-sm">
          {category}
        </span>
      )}
    </div>
  );
}
