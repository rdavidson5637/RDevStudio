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
};

export function ProjectPreview({
  title,
  image,
  imageAlt,
  previewVideo,
  category,
  simple = false,
}: ProjectPreviewProps) {
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const showVideo = Boolean(previewVideo && !videoError);
  const showImage = Boolean(image && imageAlt && !imageError && !showVideo);

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-base">
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
          className="object-cover object-top transition-transform duration-slow ease-out group-hover:scale-[1.02]"
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

      {category && !simple && (
        <span
          className={`absolute bottom-3 right-3 z-10 px-2.5 py-1 text-xs font-medium ${
            category === "Client Work"
              ? "bg-accent text-on-accent"
              : "bg-base/90 text-primary"
          }`}
        >
          {category}
        </span>
      )}
    </div>
  );
}
