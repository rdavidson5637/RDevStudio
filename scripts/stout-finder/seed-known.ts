/**
 * Seed personally vouched stock by writing reports only.
 * The apply_report trigger maintains pub_drinks. Never import from app/.
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

type Drink = "beamish" | "murphys" | "guinness";

type KnownStockEntry = {
  slug: string;
  drinks: Partial<Record<Drink, boolean>>;
};

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

async function main() {
  loadEnvLocal();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const reporterId = process.env.SEED_REPORTER_ID;

  if (!key) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing.");
  }
  if (!url) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing.");
  }
  if (!reporterId) {
    throw new Error(
      "SEED_REPORTER_ID is missing. Create an auth user (anonymous is fine) and put its uuid in .env.local.",
    );
  }

  const dataPath = resolve(
    dirname(fileURLToPath(import.meta.url)),
    "data/known-stock.json",
  );
  const entries = JSON.parse(readFileSync(dataPath, "utf8")) as KnownStockEntry[];

  if (entries.length === 0) {
    console.log("known-stock.json is empty. Add slugs after the OSM import, then re-run npm run stout:seed.");
    return;
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const unmatched: string[] = [];
  let inserted = 0;
  let skippedToday = 0;

  for (const entry of entries) {
    const { data: pub, error } = await supabase
      .from("pubs")
      .select("id, slug")
      .eq("slug", entry.slug)
      .maybeSingle();

    if (error) {
      throw new Error(`Lookup failed for ${entry.slug}: ${error.message}`);
    }
    if (!pub) {
      unmatched.push(entry.slug);
      console.error(`No pub matches slug "${entry.slug}"`);
      continue;
    }

    for (const [drink, available] of Object.entries(entry.drinks) as [
      Drink,
      boolean,
    ][]) {
      if (typeof available !== "boolean") continue;
      const { error: insertError } = await supabase.from("reports").insert({
        pub_id: pub.id,
        drink,
        available,
        reporter_id: reporterId,
      });

      if (insertError) {
        if (insertError.code === "23505") {
          skippedToday += 1;
          continue;
        }
        throw new Error(
          `Report failed for ${entry.slug} ${drink}: ${insertError.message}`,
        );
      }
      inserted += 1;
      console.log(`  ${entry.slug} ${drink}=${available}`);
    }
  }

  if (unmatched.length > 0) {
    console.error(`Unmatched slugs: ${unmatched.join(", ")}`);
  }
  console.log(
    `Done. inserted=${inserted} alreadyReportedToday=${skippedToday} unmatched=${unmatched.length}`,
  );
  if (unmatched.length > 0) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
