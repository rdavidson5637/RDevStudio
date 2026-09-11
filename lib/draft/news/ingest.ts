import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { clubFeed, SHARED_FEEDS } from "./feeds";
import { isFresh, parseRss, type RssItem } from "./parse-rss";
import { extractSignals } from "./extract";
import { looksLikeAvailabilityNews, matchPlayerId } from "./match";

const MAX_AGE_MS = 48 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 8_000;
const RSS_CONCURRENCY = 5;
const MAX_EXTRACT_CLUBS = 8;

type TeamRow = { id: number; name: string; short_name: string };
type PlayerRow = {
  id: number;
  web_name: string;
  first_name: string;
  second_name: string;
  team_id: number;
};

async function fetchText(url: string): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml",
        "User-Agent": "RDevStudio-FPL-Draft-Analyser/1.0 (+https://rdevstudio.co.uk)",
      },
      signal: controller.signal,
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function mapPool<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = [];
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return out;
}

function mentionsClub(item: RssItem, team: TeamRow): boolean {
  const hay = `${item.title} ${item.description}`.toLowerCase();
  return hay.includes(team.name.toLowerCase()) || hay.includes(team.short_name.toLowerCase());
}

export async function ingestNewsLayer(): Promise<{
  feeds: number;
  itemsSeen: number;
  extracted: number;
  stored: number;
  skipped: string[];
}> {
  const skipped: string[] = [];
  if (!process.env.ANTHROPIC_API_KEY) {
    skipped.push("ANTHROPIC_API_KEY missing");
    return { feeds: 0, itemsSeen: 0, extracted: 0, stored: 0, skipped };
  }

  const [{ data: teams }, { data: players }, { data: existing }] = await Promise.all([
    supabaseAdmin.from("fpl_teams").select("id, name, short_name"),
    supabaseAdmin.from("fpl_players").select("id, web_name, first_name, second_name, team_id").limit(1000),
    supabaseAdmin.from("fpl_news_items").select("source_url").limit(4000),
  ]);

  const seenUrls = new Set((existing ?? []).map((row) => row.source_url).filter(Boolean));
  const teamList = (teams ?? []) as TeamRow[];
  const playerList = (players ?? []) as PlayerRow[];

  const feedList: { url: string; sourceName: string; team: TeamRow | null }[] = SHARED_FEEDS.map((feed) => ({
    ...feed,
    team: null,
  }));
  for (const team of teamList) {
    const feed = clubFeed(team.short_name);
    if (feed) feedList.push({ ...feed, team });
  }

  const freshByClub = new Map<number, RssItem[]>();
  let itemsSeen = 0;

  const fetched = await mapPool(feedList, RSS_CONCURRENCY, async (feed) => {
    const xml = await fetchText(feed.url);
    return { feed, xml };
  });

  for (const { feed, xml } of fetched) {
    if (!xml) {
      skipped.push(`fetch failed: ${feed.url}`);
      continue;
    }
    const parsed = parseRss(xml, feed.sourceName).filter(
      (item) =>
        isFresh(item, MAX_AGE_MS) &&
        !seenUrls.has(item.link) &&
        looksLikeAvailabilityNews(item.title, item.description),
    );
    itemsSeen += parsed.length;

    if (feed.team) {
      const list = freshByClub.get(feed.team.id) ?? [];
      list.push(...parsed);
      freshByClub.set(feed.team.id, list);
      continue;
    }

    for (const team of teamList) {
      const hits = parsed.filter((item) => mentionsClub(item, team));
      if (hits.length === 0) continue;
      const list = freshByClub.get(team.id) ?? [];
      list.push(...hits);
      freshByClub.set(team.id, list);
    }
  }

  const rankedClubs = [...teamList]
    .map((team) => ({
      team,
      items: [...new Map((freshByClub.get(team.id) ?? []).map((item) => [item.link, item])).values()].slice(0, 8),
    }))
    .filter((row) => row.items.length > 0)
    .sort((a, b) => b.items.length - a.items.length)
    .slice(0, MAX_EXTRACT_CLUBS);

  let extracted = 0;
  let stored = 0;

  for (const { team, items } of rankedClubs) {
    let signals: Awaited<ReturnType<typeof extractSignals>> = [];
    try {
      signals = await extractSignals(team.name, items);
    } catch (err) {
      skipped.push(`extract ${team.short_name}: ${err instanceof Error ? err.message : String(err)}`);
      continue;
    }
    extracted += signals.length;

    const rows = [];
    for (const signal of signals) {
      const playerId = matchPlayerId(signal.player, team.id, playerList);
      if (playerId == null) continue;
      const source = items.find((item) => item.link === signal.sourceUrl);
      rows.push({
        player_id: playerId,
        team_id: team.id,
        signal: signal.signal,
        confidence: signal.confidence,
        quote: signal.quote,
        source_url: signal.sourceUrl,
        source_name: source?.sourceName ?? "RSS",
        published_at: source?.publishedAt ?? new Date().toISOString(),
      });
    }

    if (rows.length === 0) continue;
    const { error } = await supabaseAdmin.from("fpl_news_items").upsert(rows, {
      onConflict: "player_id,source_url,published_at",
      ignoreDuplicates: true,
    });
    if (error) skipped.push(`store ${team.short_name}: ${error.message}`);
    else stored += rows.length;
  }

  return { feeds: feedList.length, itemsSeen, extracted, stored, skipped };
}
