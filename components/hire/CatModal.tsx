"use client";

import Image from "next/image";
import { useEffect } from "react";

const CAT_PHOTO = {
  src: "/images/rudi/IMG_3170-75791d4e-a26c-4086-be06-44bf742700c9.png",
  alt: "Grey and white cat with a distinct expression",
} as const;

type CatModalProps = {
  open: boolean;
  onClose: () => void;
};

export function CatModal({ open, onClose }: CatModalProps) {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cat-modal-title"
        className="rudi-modal-in max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#1F1F1F] bg-[#0f172a]"
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
              id="cat-modal-title"
              className="font-display text-3xl font-bold text-white"
            >
              Peer Review
            </h2>
            <p className="mt-2 text-sm text-secondary">
              An independent assessment was requested. This is the result.
            </p>
          </header>

          <div className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-xl">
            <Image
              src={CAT_PHOTO.src}
              alt={CAT_PHOTO.alt}
              fill
              className="object-cover"
              sizes="(max-width: 512px) 100vw, 512px"
              priority
            />
          </div>

          <div className="mt-8 text-center">
            <p className="font-display text-2xl text-white">Unimpressed.</p>
            <p className="mt-2 text-secondary">
              Assessment complete. No further questions.
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <span className="rounded-full border border-amber-400 px-4 py-2 text-sm font-medium text-amber-400">
              😾 Peer Reviewed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
