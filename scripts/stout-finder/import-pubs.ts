/**
 * Upsert OSM pubs into Supabase. Server-side only. Never import from app/.
 */

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import type { OsmPubRecord } from "./fetch-osm-pubs";

const RESERVED_SLUGS = new Set([
  "add",
  "beamish",
  "murphys",
  "guinness",
  "api",
]);

function kebab(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function osmHash(osmType: string, osmId: number): string {
  return createHash("sha1")
    .update(`${osmType}:${osmId}`)
    .digest("hex")
    .slice(0, 6);
}

function preferredSlug(record: OsmPubRecord): string {
  const base = kebab(record.name) || "pub";
  const withTown = record.town ? `${base}-${kebab(record.town)}` : base;
  if (RESERVED_SLUGS.has(withTown)) {
    return `${withTown}-${osmHash(record.osmType, record.osmId)}`;
  }
  return withTown;
}

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
    // --env-file=.env.local is the preferred loader; this is a fallback.
  }
}

type ExistingRow = {
  osm_type: string | null;
  osm_id: number | null;
  slug: string;
};

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

async function main() {
  loadEnvLocal();
  const dryRun = process.argv.includes("--dry-run");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is missing. Load it from .env.local. This script must never run with the anon key.",
    );
  }
  if (!url) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing.");
  }

  const dataPath = resolve(
    dirname(fileURLToPath(import.meta.url)),
    "data/osm-pubs.json",
  );
  const records = JSON.parse(readFileSync(dataPath, "utf8")) as OsmPubRecord[];
  const inScope = records.filter(
    (record) => record.countyGuess === "Antrim" || record.countyGuess === "Down",
  );

  const rows = inScope.map((record) => ({
    osm_type: record.osmType,
    osm_id: record.osmId,
    name: record.name,
    address: record.address,
    town: record.town,
    postcode: record.postcode,
    county: record.countyGuess,
    lat: record.lat,
    lng: record.lng,
    website: record.website,
    phone: record.phone,
    source: "osm" as const,
    status: "active" as const,
    preferredSlug: preferredSlug(record),
    hash: osmHash(record.osmType, record.osmId),
  }));

  if (dryRun) {
    console.log(`Dry run. Would upsert ${rows.length} pubs (skipped ${records.length - inScope.length} out of county).`);
    for (const row of rows.slice(0, 20)) {
      console.log(`  ${row.preferredSlug}  ${row.name}  ${row.county}  ${row.osm_type}/${row.osm_id}`);
    }
    if (rows.length > 20) console.log(`  … ${rows.length - 20} more`);
    return;
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: existing, error: existingError } = await supabase
    .from("pubs")
    .select("osm_type, osm_id, slug")
    .not("osm_id", "is", null);

  if (existingError) {
    throw new Error(`Failed to read existing pubs: ${existingError.message}`);
  }

  const slugByOsm = new Map<string, string>();
  const usedSlugs = new Set<string>();
  for (const row of (existing ?? []) as ExistingRow[]) {
    if (row.osm_type && row.osm_id != null) {
      slugByOsm.set(`${row.osm_type}:${row.osm_id}`, row.slug);
    }
    usedSlugs.add(row.slug);
  }

  const payload = rows.map((row) => {
    const osmKey = `${row.osm_type}:${row.osm_id}`;
    const existingSlug = slugByOsm.get(osmKey);
    let slug = existingSlug ?? row.preferredSlug;
    if (!existingSlug) {
      if (usedSlugs.has(slug)) {
        slug = `${row.preferredSlug}-${row.hash}`;
      }
      usedSlugs.add(slug);
    }
    return {
      osm_type: row.osm_type,
      osm_id: row.osm_id,
      slug,
      name: row.name,
      address: row.address,
      town: row.town,
      postcode: row.postcode,
      county: row.county,
      lat: row.lat,
      lng: row.lng,
      website: row.website,
      phone: row.phone,
      source: row.source,
      status: row.status,
    };
  });

  let inserted = 0;
  let updated = 0;
  const batches = chunk(payload, 500);
  for (let i = 0; i < batches.length; i += 1) {
    const batch = batches[i];
    const { data, error } = await supabase
      .from("pubs")
      .upsert(batch, { onConflict: "osm_type,osm_id" })
      .select("id");

    if (error) {
      throw new Error(`Chunk ${i + 1} failed: ${error.message}`);
    }

    const wrote = data?.length ?? batch.length;
    const existingInChunk = batch.filter((row) =>
      slugByOsm.has(`${row.osm_type}:${row.osm_id}`),
    ).length;
    updated += existingInChunk;
    inserted += wrote - existingInChunk;
    console.log(
      `Chunk ${i + 1}/${batches.length}: ${batch.length} rows (running inserted ${inserted}, updated ${updated})`,
    );
  }

  console.log(
    `Done. inserted≈${inserted} updated≈${updated} skippedOutOfCounty=${records.length - inScope.length}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
