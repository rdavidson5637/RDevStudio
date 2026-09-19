import { NextResponse } from "next/server";
import { getNearbyPubs } from "@/lib/stout-finder/queries";
import {
  DRINK_IDS,
  MAX_NEARBY,
  MAX_RADIUS_M,
  isDrink,
  type Drink,
  type MinConfidence,
} from "@/lib/stout-finder/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIN_CONFIDENCE: MinConfidence[] = [
  "any",
  "known",
  "plausible",
  "confirmed",
];

function parseDrinks(raw: string | null): Drink[] | null {
  if (raw == null || raw.trim() === "") return null;
  return raw
    .split(",")
    .map((part) => part.trim())
    .filter((part): part is Drink => isDrink(part));
}

function isMinConfidence(value: string): value is MinConfidence {
  return MIN_CONFIDENCE.includes(value as MinConfidence);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const lat = Number(url.searchParams.get("lat"));
  const lng = Number(url.searchParams.get("lng"));

  if (!Number.isFinite(lat) || !Number.isFinite(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return NextResponse.json({ error: "lat and lng are required." }, { status: 400 });
  }

  const radiusRaw = Number(url.searchParams.get("radius") ?? 15000);
  const radiusM = Number.isFinite(radiusRaw)
    ? Math.min(Math.max(Math.round(radiusRaw), 1), MAX_RADIUS_M)
    : 15000;

  const limitRaw = Number(url.searchParams.get("limit") ?? MAX_NEARBY);
  const limit = Number.isFinite(limitRaw)
    ? Math.min(Math.max(Math.round(limitRaw), 1), MAX_NEARBY)
    : MAX_NEARBY;

  const drinksParam = url.searchParams.get("drinks");
  if (drinksParam) {
    const invalid = drinksParam
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean)
      .some((drink) => !DRINK_IDS.includes(drink as Drink));
    if (invalid) {
      return NextResponse.json({ error: "Unknown drink." }, { status: 400 });
    }
  }
  const drinks = parseDrinks(drinksParam);

  const matchAll = url.searchParams.get("matchAll") === "true";
  const minRaw = url.searchParams.get("minConfidence") ?? "any";
  if (!isMinConfidence(minRaw)) {
    return NextResponse.json({ error: "Unknown confidence floor." }, { status: 400 });
  }

  try {
    const pubs = await getNearbyPubs({
      lat,
      lng,
      radiusM,
      drinks,
      matchAll,
      minConfidence: minRaw,
      limit,
    });
    return NextResponse.json({ pubs });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not load pubs.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
