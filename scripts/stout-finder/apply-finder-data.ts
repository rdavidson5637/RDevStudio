/**
 * Turn beamish-kilkenny.json into reports.
 *
 * Only status "confirmed" is written, and only after a pub row exists.
 * "reported" and "unverified" are skipped so a press mention is not
 * stamped Confirmed. The airport venue is skipped.
 *
 * Run after npm run osm:import:
 *   npm run stout:apply-data
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

type Drink = "beamish" | "kilkenny" | "murphys" | "guinness";

type BeerRow = {
  beer: string;
  status: string;
  evidence?: { note?: string }[];
};

type Venue = {
  id: string;
  name: string;
  town: string | null;
  beers: BeerRow[];
};

const SKIP_VENUE_IDS = new Set(["belfast-international-airport"]);
const DRINKS = new Set<Drink>(["beamish", "kilkenny", "murphys", "guinness"]);

function loadEnvLocal() {
  const envPath = resolve(process.cwd(), ".env.local");
  try {
    const text = readFileSync(envPath, "utf8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // --env-file=.env.local is the preferred loader.
  }
}

function norm(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/\bthe\b/g, " ")
    .replace(/[^a-z0-9]+/g, "");
}

function isDrink(value: string): value is Drink {
  return DRINKS.has(value as Drink);
}

async function main() {
  loadEnvLocal();
  const dryRun = process.argv.includes("--dry-run");

  const dataPath = resolve(
    dirname(fileURLToPath(import.meta.url)),
    "data/beamish-kilkenny.json",
  );
  const payload = JSON.parse(readFileSync(dataPath, "utf8")) as {
    venues: Venue[];
  };

  const wanted: {
    venue: Venue;
    drink: Drink;
    note: string | null;
  }[] = [];

  for (const venue of payload.venues) {
    if (SKIP_VENUE_IDS.has(venue.id)) continue;
    for (const beer of venue.beers) {
      if (beer.status !== "confirmed" || !isDrink(beer.beer)) continue;
      const note = beer.evidence?.find((item) => item.note)?.note ?? null;
      wanted.push({
        venue,
        drink: beer.beer,
        note: note ? note.slice(0, 280) : null,
      });
    }
  }

  console.log(`Confirmed rows in the file: ${wanted.length}`);
  if (dryRun) {
    for (const row of wanted) {
      console.log(`  ${row.venue.name} (${row.venue.town ?? "no town"}) ${row.drink}`);
    }
    return;
  }

  const url =
    process.env.NEXT_PUBLIC_STOUT_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL;
  const key =
    process.env.STOUT_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;
  const reporterId = process.env.SEED_REPORTER_ID;
  if (!key) throw new Error("STOUT_SUPABASE_SERVICE_ROLE_KEY is missing.");
  if (!url) throw new Error("NEXT_PUBLIC_STOUT_SUPABASE_URL is missing.");
  if (!reporterId) {
    throw new Error("SEED_REPORTER_ID is missing.");
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: pubs, error } = await supabase
    .from("pubs")
    .select("id, name, town")
    .eq("status", "active");

  if (error) throw new Error(error.message);

  const byNameTown = new Map<string, { id: string }>();
  const byName = new Map<string, { id: string }[]>();
  for (const pub of pubs ?? []) {
    const nameKey = norm(pub.name as string);
    const townKey = pub.town ? norm(pub.town as string) : "";
    byNameTown.set(`${nameKey}|${townKey}`, { id: pub.id as string });
    const list = byName.get(nameKey) ?? [];
    list.push({ id: pub.id as string });
    byName.set(nameKey, list);
  }

  let inserted = 0;
  let skippedToday = 0;
  const unmatched: string[] = [];

  for (const row of wanted) {
    const nameKey = norm(row.venue.name);
    const townKey = row.venue.town ? norm(row.venue.town) : "";
    const exact = byNameTown.get(`${nameKey}|${townKey}`);
    const sameName = byName.get(nameKey) ?? [];
    const pub = exact ?? (sameName.length === 1 ? sameName[0] : null);
    if (!pub) {
      unmatched.push(`${row.venue.name} / ${row.drink}`);
      continue;
    }

    const { error: insertError } = await supabase.from("reports").insert({
      pub_id: pub.id,
      drink: row.drink,
      available: true,
      note: row.note,
      reporter_id: reporterId,
    });

    if (insertError) {
      if (insertError.code === "23505") {
        skippedToday += 1;
        continue;
      }
      throw new Error(
        `Report failed for ${row.venue.name} ${row.drink}: ${insertError.message}`,
      );
    }
    inserted += 1;
    console.log(`  ${row.venue.name} ${row.drink}`);
  }

  if (unmatched.length > 0) {
    console.error(`Unmatched (import OSM first, or the name differs):\n  ${unmatched.join("\n  ")}`);
  }
  console.log(
    `Done. inserted=${inserted} alreadyReportedToday=${skippedToday} unmatched=${unmatched.length}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
