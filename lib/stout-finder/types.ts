export type Drink = "beamish" | "murphys" | "guinness";

export type Confidence =
  | "confirmed"
  | "likely"
  | "stale"
  | "unlikely"
  | "unknown";

export type DrinkStatus = {
  confidence: Confidence;
  lastConfirmedAt: string | null;
  yesCount: number;
  noCount: number;
};

export type NearbyPub = {
  id: string;
  slug: string;
  name: string;
  town: string | null;
  county: "Antrim" | "Down";
  lat: number;
  lng: number;
  distanceM: number;
  drinks: Record<Drink, DrinkStatus>;
};

export type PubDetail = Omit<NearbyPub, "distanceM"> & {
  address: string | null;
  postcode: string | null;
  website: string | null;
  phone: string | null;
};

export const DRINKS: {
  id: Drink;
  label: string;
}[] = [
  { id: "beamish", label: "Beamish" },
  { id: "murphys", label: "Murphy's" },
  { id: "guinness", label: "Guinness" },
];

export const DRINK_IDS = DRINKS.map((drink) => drink.id);

export const CONFIDENCE_LABELS: Record<Confidence, string> = {
  confirmed: "Confirmed",
  likely: "Last seen",
  stale: "Not checked recently",
  unlikely: "Reported gone",
  unknown: "No reports yet",
};

export type MinConfidence = "any" | "known" | "plausible" | "confirmed";

export const MIN_CONFIDENCE_OPTIONS: { id: MinConfidence; label: string }[] = [
  { id: "any", label: "Any" },
  { id: "known", label: "Has a report" },
  { id: "plausible", label: "Confirmed or likely" },
  { id: "confirmed", label: "Confirmed only" },
];

export const BELFAST_CITY_HALL = { lat: 54.5967, lng: -5.9301 } as const;

export const DEFAULT_RADIUS_M = 15000;
export const MAX_RADIUS_M = 50000;
export const MAX_NEARBY = 200;

export function isDrink(value: string): value is Drink {
  return DRINK_IDS.includes(value as Drink);
}

export function isConfidence(value: string): value is Confidence {
  return (
    value === "confirmed" ||
    value === "likely" ||
    value === "stale" ||
    value === "unlikely" ||
    value === "unknown"
  );
}

export const EMPTY_DRINK_STATUS: DrinkStatus = {
  confidence: "unknown",
  lastConfirmedAt: null,
  yesCount: 0,
  noCount: 0,
};

export function emptyDrinks(): Record<Drink, DrinkStatus> {
  return {
    beamish: { ...EMPTY_DRINK_STATUS },
    murphys: { ...EMPTY_DRINK_STATUS },
    guinness: { ...EMPTY_DRINK_STATUS },
  };
}
