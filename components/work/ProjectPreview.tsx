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
  previewFit?: "cover" | "contain";
  previewBg?: string;
  simple?: boolean;
  className?: string;
  priority?: boolean;
};

export function ProjectPreview({
  title,
  image,
  imageAlt,
  previewVideo,
  category,
  previewFit = "cover",
  previewBg,
  simple = false,
  className = "",
  priority = false,
}: ProjectPreviewProps) {
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const showVideo = Boolean(previewVideo && !videoError);
  const showImage = Boolean(image && imageAlt && !imageError && !showVideo);
  const isLogoPreview = previewFit === "contain";

  return (
    <div
      className={`relative aspect-[16/10] overflow-hidden bg-base ${className}`}
      style={previewBg ? { backgroundColor: previewBg } : undefined}
    >
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
          priority={priority}
          className={
            isLogoPreview
              ? "object-contain p-10 sm:p-14"
              : "object-cover object-top"
          }
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 576px"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-raised">
          <div className="px-6 text-center">
            <span
              className="font-display text-4xl font-bold text-primary/25 sm:text-5xl"
              aria-hidden="true"
            >
              {title.charAt(0)}
            </span>
            <p className="mt-2 text-sm text-secondary">
              Preview not available yet
            </p>
          </div>
          <span className="sr-only">Preview placeholder for {title}</span>
        </div>
      )}

      {category && !simple && (
        <span className="absolute bottom-3 right-3 z-10 rounded-full border border-white/30 bg-base/90 px-2 py-0.5 text-xs font-medium text-primary backdrop-blur-sm">
          {category}
        </span>
      )}
    </div>
  );
}
