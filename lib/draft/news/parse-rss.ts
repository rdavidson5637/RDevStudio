export type RssItem = {
  title: string;
  link: string;
  description: string;
  publishedAt: string | null;
  sourceName: string;
};

function stripCdata(value: string): string {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
}

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function stripTags(value: string): string {
  return decodeEntities(stripCdata(value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function first(block: string, tag: string): string {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"));
  return match ? stripTags(match[1]) : "";
}

function attr(block: string, tag: string, name: string): string {
  const match = block.match(new RegExp(`<${tag}[^>]*\\s${name}=["']([^"']+)["']`, "i"));
  return match ? decodeEntities(match[1]) : "";
}

function chunks(xml: string, tag: string): string[] {
  return xml.match(new RegExp(`<${tag}\\b[\\s\\S]*?</${tag}>`, "gi")) ?? [];
}

function published(block: string): string | null {
  const raw = first(block, "pubDate") || first(block, "published") || first(block, "updated") || first(block, "dc:date");
  if (!raw) return null;
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

/** RSS 2.0 and Atom. Feeds and summaries only — never follows into full pages. */
export function parseRss(xml: string, sourceName: string): RssItem[] {
  const items = [...chunks(xml, "item"), ...chunks(xml, "entry")];
  const parsed: RssItem[] = [];

  for (const block of items) {
    const title = first(block, "title");
    const link = first(block, "link") || attr(block, "link", "href");
    if (!title || !link) continue;
    parsed.push({
      title,
      link,
      description: first(block, "description") || first(block, "summary") || first(block, "content"),
      publishedAt: published(block),
      sourceName,
    });
  }

  return parsed;
}

export function isFresh(item: RssItem, maxAgeMs: number, now = Date.now()): boolean {
  if (!item.publishedAt) return true;
  return now - new Date(item.publishedAt).getTime() <= maxAgeMs;
}
