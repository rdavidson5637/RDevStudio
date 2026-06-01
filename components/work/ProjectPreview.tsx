"use client";

import Image from "next/image";
import { useState } from "react";

type ProjectPreviewProps = {
  title: string;
  image?: string;
  imageAlt?: string;
  /** Short looping MP4 — smaller and sharper than GIF. Place in public/images/work/ */
  previewVideo?: string;
  demo?: boolean;
};

export function ProjectPreview({
  title,
  image,
  imageAlt,
  previewVideo,
  demo,
}: ProjectPreviewProps) {
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const showVideo = Boolean(previewVideo && !videoError);
  const showImage = Boolean(image && imageAlt && !imageError && !showVideo);

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-slate-800 to-navy">
      {/* Browser-style frame */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center gap-1.5 border-b border-white/10 bg-navy/90 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" aria-hidden="true" />
        <span className="ml-2 truncate text-[10px] text-white/50 sm:text-xs">
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
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 576px"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-navy via-slate-800 to-accent/30">
            <div className="text-center px-6">
              <span
                className="text-5xl font-bold text-white/15 sm:text-6xl"
                aria-hidden="true"
              >
                {title.charAt(0)}
              </span>
              <p className="mt-3 text-xs text-white/40 sm:text-sm">
                Add preview to public/images/work/
              </p>
            </div>
            <span className="sr-only">Preview placeholder for {title}</span>
          </div>
        )}
      </div>

      {demo && (
        <span className="absolute bottom-3 right-3 z-20 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-navy shadow-sm">
          Demo
        </span>
      )}
    </div>
  );
}
