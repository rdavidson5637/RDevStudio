"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ToolkitToolHeader } from "@/components/toolkit-audit/ToolkitToolHeader";
import { FadeIn } from "@/components/toolkit-audit/FadeIn";
import { recordRecentSlug } from "@/lib/business-toolkit/storage";

const SIZES = [16, 32, 180, 512] as const;

export function FaviconGeneratorApp() {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    recordRecentSlug("favicon-generator");
  }, []);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setFileName(file.name);
    const url = URL.createObjectURL(file);
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
  }, []);

  const downloadSize = (size: number) => {
    if (!preview) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, size, size);
      const link = document.createElement("a");
      link.download = `favicon-${size}x${size}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    img.src = preview;
  };

  return (
    <div>
      <ToolkitToolHeader
        category="Generators"
        title="Favicon Generator"
        description="Upload an image and download common favicon sizes — 16, 32, 180, and 512 pixels."
      />
      <div className="grid gap-8 py-10 lg:grid-cols-2">
        <FadeIn className="rounded-[10px] border border-border-strong bg-raised p-5 sm:p-6">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) =>
              e.target.files?.[0] && handleFile(e.target.files[0])
            }
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="btn-primary"
          >
            Upload image
          </button>
          {fileName ? (
            <p className="mt-3 shell-label text-secondary">{fileName}</p>
          ) : null}
          {preview ? (
            <div className="mt-6 flex justify-center rounded-md border border-border bg-base p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Favicon source preview"
                className="max-h-40 max-w-full object-contain"
              />
            </div>
          ) : null}
        </FadeIn>
        <FadeIn
          delayMs={80}
          className="rounded-[10px] border border-border-strong bg-raised p-5 sm:p-6"
        >
          <p className="shell-label text-accent">Download sizes</p>
          <ul className="mt-4 space-y-3">
            {SIZES.map((size) => (
              <li key={size}>
                <button
                  type="button"
                  disabled={!preview}
                  onClick={() => downloadSize(size)}
                  className="btn-secondary w-full disabled:opacity-50"
                >
                  {size}×{size} PNG
                </button>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </div>
  );
}
