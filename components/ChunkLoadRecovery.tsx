"use client";

import { useEffect } from "react";
import { isLikelyStaleChunkError } from "@/lib/normalize-error";

const RELOAD_KEY = "rdevstudio-chunk-reload";

/**
 * Webpack/Next occasionally reject dynamic imports with a raw Event when a JS
 * chunk is missing (stale tab after deploy, or dev cache out of sync). Reload
 * once per session instead of leaving users on an opaque "[object Event]" overlay.
 */
export function ChunkLoadRecovery() {
  useEffect(() => {
    const maybeReload = (reason: unknown) => {
      if (!isLikelyStaleChunkError(reason)) {
        return;
      }
      if (sessionStorage.getItem(RELOAD_KEY)) {
        return;
      }
      sessionStorage.setItem(RELOAD_KEY, "1");
      window.location.reload();
    };

    const onRejection = (event: PromiseRejectionEvent) => {
      if (isLikelyStaleChunkError(event.reason)) {
        event.preventDefault();
        maybeReload(event.reason);
      }
    };

    const onError = (event: ErrorEvent) => {
      if (event.error && isLikelyStaleChunkError(event.error)) {
        maybeReload(event.error);
      }
    };

    window.addEventListener("unhandledrejection", onRejection);
    window.addEventListener("error", onError);
    return () => {
      window.removeEventListener("unhandledrejection", onRejection);
      window.removeEventListener("error", onError);
    };
  }, []);

  return null;
}
