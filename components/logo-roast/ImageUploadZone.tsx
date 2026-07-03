"use client";

import { useCallback, useId, useRef, useState } from "react";
import { ACCEPTED_IMAGE_EXTENSIONS } from "@/lib/logo-roast/constants";
import { validateLogoFile } from "@/lib/logo-roast/validation";
import { FadeIn } from "@/components/toolkit-audit/FadeIn";

type ImageUploadZoneProps = {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
  previewUrl?: string | null;
  fileName?: string;
};

export function ImageUploadZone({
  onFileSelect,
  disabled = false,
  previewUrl = null,
  fileName = "",
}: ImageUploadZoneProps) {
  const inputId = useId();
  const errorId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(
    (file: File | null | undefined) => {
      const result = validateLogoFile(file);
      if (!result.valid) {
        setError(result.message);
        return;
      }
      setError(null);
      onFileSelect(result.file);
    },
    [onFileSelect],
  );

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    processFile(event.dataTransfer.files[0]);
  };

  return (
    <div className="space-y-4">
      <FadeIn delayMs={60}>
        <div
          className={`relative rounded-[10px] border-2 border-dashed bg-raised p-6 transition-colors sm:p-8 ${
            isDragging
              ? "border-accent bg-accent/5"
              : error
                ? "border-destructive"
                : "border-border-strong"
          }`}
          onDragEnter={(event) => {
            event.preventDefault();
            if (!disabled) setIsDragging(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            setIsDragging(false);
          }}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={ACCEPTED_IMAGE_EXTENSIONS}
            disabled={disabled}
            className="sr-only"
            onChange={(event) => processFile(event.target.files?.[0])}
            aria-describedby={error ? errorId : undefined}
            aria-invalid={error ? true : undefined}
          />

          {previewUrl ? (
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-40 w-full max-w-xs items-center justify-center rounded-md border border-border bg-base p-4 sm:h-48">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt={fileName ? `Preview of ${fileName}` : "Logo preview"}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              {fileName ? (
                <p className="shell-label text-secondary">{fileName}</p>
              ) : null}
            </div>
          ) : (
            <div className="text-center">
              <p className="font-display text-xl uppercase tracking-tight text-primary sm:text-2xl">
                Drop your logo here
              </p>
              <p className="mt-2 text-sm text-secondary sm:text-base">
                or choose a file from your device
              </p>
              <p className="mt-2 text-xs text-tertiary">
                PNG, JPG, WebP, or SVG — max 5 MB
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              disabled={disabled}
              onClick={() => inputRef.current?.click()}
              className="btn-primary sm:min-w-[10rem]"
            >
              {previewUrl ? "Choose another" : "Upload logo"}
            </button>
          </div>
        </div>
      </FadeIn>

      {error ? (
        <p id={errorId} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
