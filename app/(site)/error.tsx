"use client";

import { useEffect } from "react";
import { getErrorMessage, isLikelyStaleChunkError } from "@/lib/normalize-error";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function SiteError({ error, reset }: ErrorProps) {
  const staleChunk = isLikelyStaleChunkError(error);
  const message = getErrorMessage(error);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="section-padding flex min-h-[60vh] items-center justify-center pt-28">
      <div className="container-wide max-w-lg px-6 text-center">
        <p className="shell-label text-accent">Something went wrong</p>
        <h1 className="mt-3 font-display text-3xl uppercase tracking-tight text-primary">
          {staleChunk ? "Page needs a refresh" : "Unexpected error"}
        </h1>
        <p className="mt-4 text-secondary">
          {staleChunk
            ? "Your browser may be holding an older version of the site. A quick reload usually fixes it."
            : message}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Reload page
          </button>
          <button type="button" onClick={reset} className="btn-outline-accent">
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
