/**
 * Overpass seeder for Stout Finder. Not imported by the Next.js app.
 *
 * One request only. If Overpass returns 429 or 504, retry later by hand.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
const USER_AGENT =
  "StoutFinder/1.0 (https://rdevstudio.co.uk; ryan@rdevstudio.co.uk)";

const QUERY = `[out:json][timeout:180];
(
  nwr["amenity"~"^(pub|bar)$"](54.02,-6.90,55.30,-5.40);
);
out tags center;`;

const ANTRIM_DISTRICTS = new Set([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 36, 37, 38, 39, 40, 41,
  42, 43, 44,
]);
const DOWN_DISTRICTS = new Set([
  16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
]);

export type OsmPubRecord = {
  osmType: "node" | "way" | "relation";
  osmId: number;
  name: string;
  lat: number;
  lng: number;
  address: string | null;
  town: string | null;
  postcode: string | null;
  website: string | null;
  phone: string | null;
  countyGuess: "Antrim" | "Down" | "other";
  countyConfident: boolean;
};

type OverpassElement = {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
};

function parseBtDistrict(postcode: string): number | null {
  const match = postcode.toUpperCase().match(/\bBT(\d{1,2})\b/);
  if (!match) return null;
  return Number(match[1]);
}

function countyFromPostcode(postcode: string): "Antrim" | "Down" | null {
  const district = parseBtDistrict(postcode);
  if (district == null) return null;
  // Down prefixes take the overlapping BT20-BT29 range. The spec lists
  // that band under both counties; east Down postcodes are the ones in
  // the overlap that people will actually search.
  if (DOWN_DISTRICTS.has(district)) return "Down";
  if (ANTRIM_DISTRICTS.has(district)) return "Antrim";
  return null;
}

function countyFromPoint(
  lat: number,
  lng: number,
): "Antrim" | "Down" | "other" {
  if (lng < -6.7 || lat < 54.05 || lat > 55.32) return "other";
  if (lat < 54.4) return "Down";
  if (lng > -5.92 && lat < 54.65) return "Down";
  if (lng < -6.45 && lat < 54.5) return "other";
  return "Antrim";
}

function assignCounty(
  postcode: string | null,
  lat: number,
  lng: number,
): { countyGuess: OsmPubRecord["countyGuess"]; countyConfident: boolean } {
  if (postcode) {
    const fromPostcode = countyFromPostcode(postcode);
    if (fromPostcode) {
      return { countyGuess: fromPostcode, countyConfident: true };
    }
  }
  return {
    countyGuess: countyFromPoint(lat, lng),
    countyConfident: false,
  };
}

function mapElement(element: OverpassElement): OsmPubRecord | null {
  const tags = element.tags ?? {};
  const name = tags.name?.trim();
  if (!name) return null;

  const lat = element.lat ?? element.center?.lat;
  const lng = element.lon ?? element.center?.lon;
  if (lat == null || lng == null) return null;

  const house = tags["addr:housenumber"];
  const street = tags["addr:street"];
  const address = [house, street].filter(Boolean).join(" ") || null;
  const town = tags["addr:city"] || tags["addr:town"] || null;
  const postcode = tags["addr:postcode"] || null;
  const website = tags.website || tags["contact:website"] || null;
  const phone = tags.phone || tags["contact:phone"] || null;
  const county = assignCounty(postcode, lat, lng);

  return {
    osmType: element.type,
    osmId: element.id,
    name,
    lat,
    lng,
    address,
    town,
    postcode,
    website,
    phone,
    ...county,
  };
}

async function main() {
  const response = await fetch(OVERPASS_URL, {
    method: "POST",
    headers: {
      "User-Agent": USER_AGENT,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ data: QUERY }),
  });

  if (response.status === 429 || response.status === 504) {
    console.error(
      `Overpass returned ${response.status}. Wait a few minutes and run npm run osm:fetch again. Do not loop retries.`,
    );
    process.exit(1);
  }

  if (!response.ok) {
    console.error(`Overpass request failed: ${response.status} ${response.statusText}`);
    process.exit(1);
  }

  const payload = (await response.json()) as { elements?: OverpassElement[] };
  const elements = payload.elements ?? [];
  const kept: OsmPubRecord[] = [];

  for (const element of elements) {
    const mapped = mapElement(element);
    if (mapped) kept.push(mapped);
  }

  const outPath = resolve(
    dirname(fileURLToPath(import.meta.url)),
    "data/osm-pubs.json",
  );
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, `${JSON.stringify(kept, null, 2)}\n`);

  const byCounty = { Antrim: 0, Down: 0, other: 0 };
  let missingPostcode = 0;
  let uncertain = 0;
  for (const pub of kept) {
    byCounty[pub.countyGuess] += 1;
    if (!pub.postcode) missingPostcode += 1;
    if (!pub.countyConfident) uncertain += 1;
  }

  console.log(`Wrote ${outPath}`);
  console.log(`total elements: ${elements.length}`);
  console.log(`kept after name filter: ${kept.length}`);
  console.log(`Antrim: ${byCounty.Antrim}`);
  console.log(`Down: ${byCounty.Down}`);
  console.log(`other (import will skip): ${byCounty.other}`);
  console.log(`missing postcode: ${missingPostcode}`);
  console.log(`uncertain county (hand-correct if needed): ${uncertain}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
