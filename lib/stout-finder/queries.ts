import "server-only";
import { supabasePublic } from "@/lib/supabase/public";
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
  radiusM?: number;
  drinks?: Drink[] | null;
  matchAll?: boolean;
  minConfidence?: MinConfidence;
  limit?: number;
};

export async function getNearbyPubs(params: NearbyParams): Promise<NearbyPub[]> {
  const { data, error } = await supabasePublic.rpc("nearby_pubs", {
    in_lat: params.lat,
    in_lng: params.lng,
    in_radius_m: params.radiusM ?? 15000,
    in_drinks: params.drinks && params.drinks.length > 0 ? params.drinks : null,
    in_match_all: params.matchAll ?? false,
    in_min_confidence: params.minConfidence ?? "any",
    in_limit: params.limit ?? 200,
  });

  if (error) {
    throw new Error(error.message);
  }

  return ((data ?? []) as RpcPub[]).map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    town: row.town,
    county: row.county,
    lat: row.lat,
    lng: row.lng,
    distanceM: row.distance_m,
    drinks: mapDrinks(row.drinks),
  }));
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

export async function getStoutFinderStats(): Promise<{
  pubCount: number;
  confirmedBeamish: number;
}> {
  const { count: pubCount, error: pubError } = await supabasePublic
    .from("pubs")
    .select("id", { count: "exact", head: true })
    .eq("status", "active");

  if (pubError) {
    console.warn("[stout-finder] pub count failed:", pubError.message);
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
  }

  const confirmedBeamish = (beamishRows ?? []).filter((row) => {
    const denied = row.last_denied_at as string | null;
    const confirmed = row.last_confirmed_at as string | null;
    if (!confirmed) return false;
    if (denied && denied > confirmed) return false;
    return true;
  }).length;

  return {
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
