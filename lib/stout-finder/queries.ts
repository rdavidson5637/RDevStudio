import "server-only";
import { supabaseStout as supabasePublic } from "@/lib/supabase/stout-public";
import { deriveConfidence } from "./confidence";
import {
  DRINK_IDS,
  emptyDrinks,
  isConfidence,
  isDrink,
  type Confidence,
  type Drink,
  type DrinkStatus,
  type MinConfidence,
  type NearbyPub,
  type PubDetail,
} from "./types";

type RpcDrink = {
  confidence?: string;
  last_confirmed_at?: string | null;
  yes_count?: number;
  no_count?: number;
};

type RpcPub = {
  id: string;
  slug: string;
  name: string;
  town: string | null;
  county: "Antrim" | "Down";
  lat: number;
  lng: number;
  distance_m: number;
  drinks: Record<string, RpcDrink> | null;
};

type PubRow = {
  id: string;
  slug: string;
  name: string;
  town: string | null;
  county: "Antrim" | "Down";
  lat: number;
  lng: number;
  address: string | null;
  postcode: string | null;
  website: string | null;
  phone: string | null;
  pub_drinks: {
    drink: Drink;
    yes_count: number;
    no_count: number;
    last_confirmed_at: string | null;
    last_denied_at: string | null;
  }[];
};

function mapRpcDrink(raw: RpcDrink | undefined): DrinkStatus {
  const confidence = raw?.confidence;
  return {
    confidence: confidence && isConfidence(confidence) ? confidence : "unknown",
    lastConfirmedAt: raw?.last_confirmed_at ?? null,
    yesCount: raw?.yes_count ?? 0,
    noCount: raw?.no_count ?? 0,
  };
}

function mapDrinks(raw: Record<string, RpcDrink> | null): Record<Drink, DrinkStatus> {
  const drinks = emptyDrinks();
  if (!raw) return drinks;
  for (const [key, value] of Object.entries(raw)) {
    if (isDrink(key)) drinks[key] = mapRpcDrink(value);
  }
  return drinks;
}

function mapRowDrinks(rows: PubRow["pub_drinks"]): Record<Drink, DrinkStatus> {
  const drinks = emptyDrinks();
  for (const row of rows ?? []) {
    if (!isDrink(row.drink)) continue;
    drinks[row.drink] = {
      confidence: deriveConfidence({
        lastConfirmedAt: row.last_confirmed_at,
        lastDeniedAt: row.last_denied_at,
        yesCount: row.yes_count,
        noCount: row.no_count,
      }),
      lastConfirmedAt: row.last_confirmed_at,
      yesCount: row.yes_count,
      noCount: row.no_count,
    };
  }
  return drinks;
}

export type NearbyParams = {
  lat: number;
  lng: number;
  /** Null means no distance limit. A number is metres. */
  radiusM?: number | null;
  drinks?: Drink[] | null;
  matchAll?: boolean;
  minConfidence?: MinConfidence;
  limit?: number;
};

function distanceMetres(
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number,
): number {
  const earth = 6371000;
  const lat1 = (fromLat * Math.PI) / 180;
  const lat2 = (toLat * Math.PI) / 180;
  const dLat = ((toLat - fromLat) * Math.PI) / 180;
  const dLng = ((toLng - fromLng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * earth * Math.asin(Math.min(1, Math.sqrt(a)));
}

function meetsConfidence(confidence: Confidence, min: MinConfidence): boolean {
  // A chosen drink means the pub has a report for it. "Any" is any report,
  // not an empty row.
  if (min === "any" || min === "known") return confidence !== "unknown";
  if (min === "plausible") return confidence === "confirmed" || confidence === "likely";
  return confidence === "confirmed";
}

function matchesSelectedDrinks(
  pub: NearbyPub,
  drinks: Drink[] | null,
  matchAll: boolean,
  minConfidence: MinConfidence,
): boolean {
  if (!drinks) return true;
  const hits = drinks.filter((drink) =>
    meetsConfidence(pub.drinks[drink].confidence, minConfidence),
  );
  return matchAll ? hits.length === drinks.length : hits.length > 0;
}

async function listPubsWithoutRadius(params: NearbyParams): Promise<NearbyPub[]> {
  const { data, error } = await supabasePublic
    .from("pubs")
    .select(
      "id, slug, name, town, county, lat, lng, pub_drinks(drink, yes_count, no_count, last_confirmed_at, last_denied_at)",
    )
    .eq("status", "active");

  if (error) throw new Error(error.message);

  const drinks = params.drinks && params.drinks.length > 0 ? params.drinks : null;
  const matchAll = params.matchAll ?? false;
  const minConfidence = params.minConfidence ?? "any";
  const limit = params.limit ?? 200;

  const pubs = ((data ?? []) as PubRow[])
    .map((row) => {
      const drinkStatus = mapRowDrinks(row.pub_drinks);
      return {
        id: row.id,
        slug: row.slug,
        name: row.name,
        town: row.town,
        county: row.county,
        lat: row.lat,
        lng: row.lng,
        distanceM: distanceMetres(params.lat, params.lng, row.lat, row.lng),
        drinks: drinkStatus,
      } satisfies NearbyPub;
    })
    .filter((pub) => matchesSelectedDrinks(pub, drinks, matchAll, minConfidence))
    .sort((a, b) => a.distanceM - b.distanceM);

  return pubs.slice(0, limit);
}

export async function getNearbyPubs(params: NearbyParams): Promise<NearbyPub[]> {
  if (params.radiusM == null) {
    return listPubsWithoutRadius(params);
  }

  const { data, error } = await supabasePublic.rpc("nearby_pubs", {
    in_lat: params.lat,
    in_lng: params.lng,
    in_radius_m: params.radiusM,
    in_drinks: params.drinks && params.drinks.length > 0 ? params.drinks : null,
    in_match_all: params.matchAll ?? false,
    in_min_confidence: params.minConfidence ?? "any",
    in_limit: params.limit ?? 200,
  });

  if (error) {
    throw new Error(error.message);
  }

  const drinks = params.drinks && params.drinks.length > 0 ? params.drinks : null;
  const matchAll = params.matchAll ?? false;
  const minConfidence = params.minConfidence ?? "any";

  return ((data ?? []) as RpcPub[])
    .map((row) => ({
      id: row.id,
      slug: row.slug,
      name: row.name,
      town: row.town,
      county: row.county,
      lat: row.lat,
      lng: row.lng,
      distanceM: row.distance_m,
      drinks: mapDrinks(row.drinks),
    }))
    .filter((pub) => matchesSelectedDrinks(pub, drinks, matchAll, minConfidence));
}

export async function getPubBySlug(slug: string): Promise<PubDetail | null> {
  const { data, error } = await supabasePublic
    .from("pubs")
    .select(
      "id, slug, name, town, county, lat, lng, address, postcode, website, phone, pub_drinks(drink, yes_count, no_count, last_confirmed_at, last_denied_at)",
    )
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();

  if (error) {
    console.warn("[stout-finder] getPubBySlug failed:", error.message);
    return null;
  }
  if (!data) return null;

  const row = data as PubRow;
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    town: row.town,
    county: row.county,
    lat: row.lat,
    lng: row.lng,
    address: row.address,
    postcode: row.postcode,
    website: row.website,
    phone: row.phone,
    drinks: mapRowDrinks(row.pub_drinks),
  };
}

export async function getAllPubSlugs(): Promise<string[]> {
  const { data, error } = await supabasePublic
    .from("pubs")
    .select("slug")
    .eq("status", "active");

  if (error) {
    console.warn("[stout-finder] getAllPubSlugs failed:", error.message);
    return [];
  }
  return (data ?? []).map((row) => row.slug as string);
}

function schemaMissing(message: string): boolean {
  return (
    message.includes("schema cache") ||
    message.includes("Could not find the table") ||
    message.includes("Could not find the function")
  );
}

export async function getStoutFinderStats(): Promise<{
  ready: boolean;
  pubCount: number;
  confirmedBeamish: number;
}> {
  // A head/count request returns 204 with no error when the table is missing,
  // so probe with a normal select before trusting the count.
  const probe = await supabasePublic.from("pubs").select("id").limit(1);
  if (probe.error) {
    console.warn("[stout-finder] pub probe failed:", probe.error.message);
    if (schemaMissing(probe.error.message)) {
      return { ready: false, pubCount: 0, confirmedBeamish: 0 };
    }
  }

  const { count: pubCount, error: pubError } = await supabasePublic
    .from("pubs")
    .select("id", { count: "exact", head: true })
    .eq("status", "active");

  if (pubError) {
    console.warn("[stout-finder] pub count failed:", pubError.message);
    if (schemaMissing(pubError.message)) {
      return { ready: false, pubCount: 0, confirmedBeamish: 0 };
    }
  }

  const since = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
  const { data: beamishRows, error: beamishError } = await supabasePublic
    .from("pub_drinks")
    .select("last_confirmed_at, last_denied_at, pubs!inner(status)")
    .eq("drink", "beamish")
    .eq("pubs.status", "active")
    .gte("last_confirmed_at", since);

  if (beamishError) {
    console.warn("[stout-finder] beamish count failed:", beamishError.message);
    if (schemaMissing(beamishError.message)) {
      return { ready: false, pubCount: 0, confirmedBeamish: 0 };
    }
  }

  const confirmedBeamish = (beamishRows ?? []).filter((row) => {
    const denied = row.last_denied_at as string | null;
    const confirmed = row.last_confirmed_at as string | null;
    if (!confirmed) return false;
    if (denied && denied > confirmed) return false;
    return true;
  }).length;

  return {
    ready: true,
    pubCount: pubCount ?? 0,
    confirmedBeamish,
  };
}

export type RecentConfirmation = {
  slug: string;
  name: string;
  town: string | null;
  drink: Drink;
  lastConfirmedAt: string;
  confidence: Confidence;
};

export async function getRecentConfirmations(
  limit = 8,
): Promise<RecentConfirmation[]> {
  const { data, error } = await supabasePublic
    .from("pub_drinks")
    .select("drink, last_confirmed_at, last_denied_at, yes_count, no_count, pubs!inner(slug, name, town, status)")
    .eq("pubs.status", "active")
    .not("last_confirmed_at", "is", null)
    .order("last_confirmed_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.warn("[stout-finder] recent confirmations failed:", error.message);
    return [];
  }

  const results: RecentConfirmation[] = [];
  for (const row of data ?? []) {
    const pub = row.pubs as unknown as {
      slug: string;
      name: string;
      town: string | null;
    };
    if (!isDrink(row.drink)) continue;
    const lastConfirmedAt = row.last_confirmed_at as string;
    const lastDeniedAt = row.last_denied_at as string | null;
    if (lastDeniedAt && lastDeniedAt > lastConfirmedAt) continue;
    results.push({
      slug: pub.slug,
      name: pub.name,
      town: pub.town,
      drink: row.drink,
      lastConfirmedAt,
      confidence: deriveConfidence({
        lastConfirmedAt,
        lastDeniedAt,
        yesCount: row.yes_count as number,
        noCount: row.no_count as number,
      }),
    });
  }
  return results;
}
