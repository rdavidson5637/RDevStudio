"use client";

import Image from "next/image";
import { useEffect } from "react";

const RUDI_PHOTOS = [
  {
    src: "/images/rudi/IMG_3174-7259b54b-ca99-41ac-93f0-238e87fedaa9.png",
    alt: "Rudi standing on his hind legs",
    width: 472,
    height: 1024,
  },
  {
    src: "/images/rudi/IMG_3180-e625f31e-00a4-4b8e-8384-19b807c6d9f4.png",
    alt: "Rudi close-up selfie",
    width: 472,
    height: 1024,
  },
  {
    src: "/images/rudi/IMG_3171-6b0c8892-34a1-4d6e-b51a-1396aabd3e22.png",
    alt: "Rudi lying belly-up on the bed",
    width: 472,
    height: 1024,
  },
  {
    src: "/images/rudi/IMG_3178-7e9da1f5-b40c-4ea3-ad01-0f5a0117f7c8.png",
    alt: "Rudi sleeping",
    width: 472,
    height: 1024,
  },
  {
    src: "/images/rudi/IMG_3176-0ed56d76-017e-40d5-b545-45714dce6838.png",
    alt: "Rudi wearing an Arsenal kit",
    caption: "Club allegiances confirmed.",
    width: 472,
    height: 1024,
  },
  {
    src: "/images/rudi/IMG_3177-69aed706-9fb4-4349-90a8-73adb593a30c.png",
    alt: "Rudi wearing an Arsenal scarf and kit",
    caption: "Club allegiances confirmed.",
    width: 472,
    height: 1024,
  },
] as const;

type RudiModalProps = {
  open: boolean;
  onClose: () => void;
};

export function RudiModal({ open, onClose }: RudiModalProps) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rudi-modal-title"
        className="rudi-modal-in max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#1F1F1F] bg-[#0f172a]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center text-[#888888] transition-colors hover:text-white"
            aria-label="Close"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <header className="pr-10">
            <h2
              id="rudi-modal-title"
              className="font-display text-3xl font-bold text-white"
            >
              Rudi&apos;s Official Review
            </h2>
            <p className="mt-2 text-sm text-secondary">
              Independent assessor. No conflicts of interest declared.
            </p>
          </header>

          <div className="mt-8 space-y-6">
            {RUDI_PHOTOS.map((photo) => (
              <figure key={photo.src}>
                <div className="overflow-hidden rounded-xl border border-border/40">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="h-auto w-full"
                  />
                </div>
                {"caption" in photo && photo.caption && (
                  <figcaption className="mt-2 text-center text-sm text-secondary">
                    {photo.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="font-display text-2xl text-white">
              &ldquo;10/10 ear scratches.&rdquo;
            </p>
            <p className="mt-2 text-secondary">Would recommend. Has treats.</p>
          </div>

          <div className="mt-8 flex justify-center">
            <span className="rounded-full border border-amber-400 px-4 py-2 text-sm font-medium text-amber-400">
              🐾 Easter Egg Found
            </span>
          </div>

          <p className="mt-8 text-center text-xs text-secondary">
            Rudi is a consultant. He does not check emails.
          </p>
        </div>
      </div>
    </div>
  );
}
