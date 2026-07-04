/** Turn opaque browser/webpack failures into a readable message for error UI. */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message && error.message !== "[object Event]") {
    return error.message;
  }

  if (error instanceof Event) {
    return "A network or script failed to load. Try refreshing the page.";
  }

  if (typeof error === "string") {
    return error;
  }

  return "Something went wrong. Try refreshing the page.";
}

export function isLikelyStaleChunkError(error: unknown): boolean {
  if (error instanceof Event) {
    return true;
  }

  if (error instanceof Error) {
    const message = error.message;
    return (
      message === "[object Event]" ||
      /chunk|failed to fetch dynamically imported module|Loading CSS/i.test(message)
    );
  }

  return false;
}
