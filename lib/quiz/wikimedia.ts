/**
 * Wikimedia Commons only generates certain thumbnail widths.
 * 400px is NOT valid for most files — browsers get HTTP 400 and images fail.
 * 330px is widely supported.
 */
export function isValidWikimediaImageUrl(url: string): boolean {
  return (
    url.startsWith("https://upload.wikimedia.org") ||
    url.startsWith("https://commons.wikimedia.org")
  );
}

export function normalizeWikimediaImageUrl(url: string): string {
  if (!url) {
    return url;
  }

  let normalized = url.trim();

  // AI and our old prompts used 400px — Wikimedia rejects these for most assets
  normalized = normalized.replace(/\/400px-/g, "/330px-");

  return normalized;
}

/** Check that Wikimedia will actually serve this image (AI often hallucinates paths). */
export async function isWikimediaImageAccessible(url: string): Promise<boolean> {
  const normalized = normalizeWikimediaImageUrl(url);

  if (!isValidWikimediaImageUrl(normalized)) {
    return false;
  }

  try {
    const response = await fetch(normalized, {
      method: "GET",
      headers: {
        "User-Agent": "PubQuiz/1.0 (image validation)",
        Range: "bytes=0-2048",
      },
      signal: AbortSignal.timeout(8000),
    });

    const contentType = response.headers.get("content-type") ?? "";

    return (
      response.ok &&
      !contentType.includes("text/html") &&
      (contentType.startsWith("image/") || response.status === 206)
    );
  } catch {
    return false;
  }
}
