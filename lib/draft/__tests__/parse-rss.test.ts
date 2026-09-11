import { describe, expect, it } from "vitest";
import { parseRss, isFresh } from "../news/parse-rss";

const RSS = `<?xml version="1.0"?>
<rss><channel>
<item>
  <title><![CDATA[Saka misses Arsenal training]]></title>
  <link>https://www.bbc.co.uk/sport/football/articles/example</link>
  <description>Bukayo Saka was not in the session.</description>
  <pubDate>Wed, 09 Sep 2026 08:00:00 GMT</pubDate>
</item>
</channel></rss>`;

const ATOM = `<?xml version="1.0"?>
<feed>
  <entry>
    <title>Salah returns</title>
    <link href="https://www.theguardian.com/football/salah"/>
    <updated>2026-09-09T09:00:00Z</updated>
    <summary>Mohamed Salah trained.</summary>
  </entry>
</feed>`;

describe("parseRss", () => {
  it("reads RSS 2.0 items and strips CDATA", () => {
    const [item] = parseRss(RSS, "BBC Sport");
    expect(item.title).toBe("Saka misses Arsenal training");
    expect(item.link).toContain("bbc.co.uk");
    expect(item.sourceName).toBe("BBC Sport");
    expect(item.publishedAt).toBe("2026-09-09T08:00:00.000Z");
  });

  it("reads Atom entries using link href", () => {
    const [item] = parseRss(ATOM, "The Guardian");
    expect(item.title).toBe("Salah returns");
    expect(item.link).toContain("theguardian.com");
  });

  it("treats items without a date as fresh", () => {
    expect(isFresh({ title: "x", link: "y", description: "", publishedAt: null, sourceName: "BBC" }, 1000)).toBe(true);
  });
});
