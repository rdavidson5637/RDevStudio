/**
 * How many pubs Stout Finder lists. The app has no public stats endpoint, so
 * this reads the number its own home page prints ("45,035 pubs ..."). It is
 * cached for six hours. If the page changes shape or the fetch fails, it
 * returns null and the caller falls back to a sentence with no number.
 */
export async function getStoutFinderPubCount(): Promise<number | null> {
  try {
    const res = await fetch("https://stoutfinder.com/", {
      next: { revalidate: 21600 },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    const html = await res.text();
    // Rendered text first ("45,035 pubs", even with tags in between), then the
    // raw number from the page data.
    const text = html.replace(/<[^>]+>/g, " ");
    const match =
      text.match(/(\d{1,3}(?:,\d{3})+)\s+pubs/i) ?? html.match(/"pubCount"\s*:\s*(\d{4,7})/);
    if (!match) return null;
    const count = Number(match[1].replace(/,/g, ""));
    return Number.isFinite(count) && count > 1000 ? count : null;
  } catch {
    return null;
  }
}
