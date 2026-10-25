"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { isLikelyStaleChunkError } from "@/lib/normalize-error";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function SiteError({ error, reset }: ErrorProps) {
  const staleChunk = isLikelyStaleChunkError(error);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-studio-bg px-6 py-16 font-studio-sans text-studio-text md:px-8 md:py-24">
      <div className="mx-auto max-w-studio">
        <h1 className="display-lg max-w-[14ch] text-balance">That didn&apos;t load</h1>
        <p className="type-body mt-5 max-w-prose text-studio-muted">
          {staleChunk
            ? "Your browser is holding an older version of the site. Reload the page."
            : "It may be a temporary fault. Try again, or go back to the homepage."}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          {staleChunk ? (
            <Button onClick={() => window.location.reload()}>Reload page</Button>
          ) : (
            <Button onClick={reset}>Try again</Button>
          )}
          <Button href="/" variant="secondary">
            Back to the homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
