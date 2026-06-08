"use client";
import { useState, useCallback } from "react";
import { getShareUrl } from "./shareHelpers";
import {
  captureElementAsPng,
  downloadImageBlob,
  shareImageBlob,
} from "./shareCardImage";

interface Props {
  shareText: string;
  shareTitle: string;
  captureId: string;
  imageFilename?: string;
  primaryClassName?: string;
}

export default function ShareCardActions({
  shareText,
  shareTitle,
  captureId,
  imageFilename = "champions-draft-result.png",
  primaryClassName = "bg-emerald-400 text-black hover:bg-emerald-300",
}: Props) {
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const shareUrl = getShareUrl();

  const getCaptureElement = useCallback(() => {
    return document.getElementById(captureId);
  }, [captureId]);

  const captureImage = useCallback(async () => {
    const element = getCaptureElement();
    if (!element) {
      throw new Error("Share card not found");
    }
    return captureElementAsPng(element);
  }, [getCaptureElement]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }, [shareText]);

  const handleSaveImage = useCallback(async () => {
    setSaving(true);
    try {
      const blob = await captureImage();
      downloadImageBlob(blob, imageFilename);
    } catch {
      // capture failed — fall back to text copy
      handleCopy();
    } finally {
      setSaving(false);
    }
  }, [captureImage, imageFilename, handleCopy]);

  const handleShare = useCallback(async () => {
    setSaving(true);
    try {
      const blob = await captureImage();
      const shared = await shareImageBlob(blob, imageFilename, shareTitle);
      if (shared) return;

      downloadImageBlob(blob, imageFilename);
    } catch {
      if (navigator.share) {
        try {
          await navigator.share({
            title: shareTitle,
            text: shareText,
            url: shareUrl,
          });
          return;
        } catch {
          // user cancelled or share failed
        }
      }
      handleCopy();
    } finally {
      setSaving(false);
    }
  }, [
    captureImage,
    imageFilename,
    shareTitle,
    shareText,
    shareUrl,
    handleCopy,
  ]);

  return (
    <div className="mt-3 space-y-2">
      <div className="flex gap-2">
        <button
          onClick={handleShare}
          disabled={saving}
          className={`flex-1 py-3 font-black text-sm uppercase tracking-widest rounded-xl active:scale-95 transition-all disabled:opacity-60 ${primaryClassName}`}
        >
          {saving ? "..." : "Share"}
        </button>
        <button
          onClick={handleSaveImage}
          disabled={saving}
          className="flex-1 py-3 bg-white/10 text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-white/20 border border-white/10 transition-all disabled:opacity-60"
        >
          {saving ? "..." : "Save image"}
        </button>
      </div>
      <button
        onClick={handleCopy}
        className="w-full py-3 bg-white/5 text-white/70 font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-white/10 border border-white/10 transition-all"
      >
        {copied ? "Copied!" : "Copy text"}
      </button>
    </div>
  );
}
