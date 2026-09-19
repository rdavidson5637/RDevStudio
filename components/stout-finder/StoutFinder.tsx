"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { DrinkFilter } from "./DrinkFilter";
import { PubList } from "./PubList";
import {
  BELFAST_CITY_HALL,
  DEFAULT_RADIUS_M,
  MAX_RADIUS_M,
  MIN_CONFIDENCE_OPTIONS,
  type Drink,
  type MinConfidence,
  type NearbyPub,
} from "@/lib/stout-finder/types";

const StoutMap = dynamic(() => import("./StoutMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[16rem] items-center justify-center rounded-[10px] border border-border bg-overlay text-sm text-secondary">
      Loading map
    </div>
  ),
});

type Props = {
  defaultDrinks?: Drink[];
};

type NearbyResponse = { pubs?: NearbyPub[]; error?: string };

export function StoutFinder({ defaultDrinks = ["beamish"] }: Props) {
  const [selectedDrinks, setSelectedDrinks] = useState<Drink[]>(defaultDrinks);
  const [matchAll, setMatchAll] = useState(false);
  const [minConfidence, setMinConfidence] = useState<MinConfidence>("any");
  const [radius, setRadius] = useState(DEFAULT_RADIUS_M);
  const [center, setCenter] = useState<{ lat: number; lng: number }>(BELFAST_CITY_HALL);
  const [usingFallback, setUsingFallback] = useState(true);
  const [fallbackNote, setFallbackNote] = useState(true);
  const [pubs, setPubs] = useState<NearbyPub[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPubId, setSelectedPubId] = useState<string | null>(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [rangeCount, setRangeCount] = useState<number | null>(null);

  const fetchPubs = useCallback(
    async (nextCenter: { lat: number; lng: number }, nextRadius: number) => {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams({
        lat: String(nextCenter.lat),
        lng: String(nextCenter.lng),
        radius: String(nextRadius),
        matchAll: String(matchAll),
        minConfidence,
      });
      if (selectedDrinks.length > 0) {
        params.set("drinks", selectedDrinks.join(","));
      }
      try {
        const response = await fetch(`/api/stout-finder/nearby?${params}`);
        const payload = (await response.json()) as NearbyResponse;
        if (!response.ok) {
          throw new Error(payload.error || "Could not load pubs.");
        }
        setPubs(payload.pubs ?? []);
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "Could not load pubs.");
        setPubs([]);
      } finally {
        setLoading(false);
      }
    },
    [matchAll, minConfidence, selectedDrinks],
  );

  useEffect(() => {
    void fetchPubs(center, radius);
  }, [center, fetchPubs, radius]);

  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(() => {
      if (!cancelled) {
        setUsingFallback(true);
      }
    }, 5000);

    if (!navigator.geolocation) {
      window.clearTimeout(timer);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (cancelled) return;
        window.clearTimeout(timer);
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setUsingFallback(false);
        setFallbackNote(false);
      },
      () => {
        if (cancelled) return;
        window.clearTimeout(timer);
        setUsingFallback(true);
        setFallbackNote(true);
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 60_000 },
    );

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (pubs.length > 0) {
      setRangeCount(null);
      return;
    }
    if (loading) return;
    const params = new URLSearchParams({
      lat: String(center.lat),
      lng: String(center.lng),
      radius: String(radius),
    });
    void fetch(`/api/stout-finder/nearby?${params}`)
      .then((response) => response.json())
      .then((payload: NearbyResponse) => {
        setRangeCount(payload.pubs?.length ?? 0);
      })
      .catch(() => setRangeCount(null));
  }, [center.lat, center.lng, loading, pubs.length, radius]);

  function toggleDrink(drink: Drink) {
    setSelectedDrinks((current) => {
      if (current.includes(drink)) {
        const next = current.filter((item) => item !== drink);
        return next;
      }
      return [...current, drink];
    });
  }

  function retryLocation() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setUsingFallback(false);
        setFallbackNote(false);
      },
      () => setFallbackNote(true),
      { timeout: 5000 },
    );
  }

  const beamishOnly =
    selectedDrinks.length === 1 && selectedDrinks[0] === "beamish";

  const emptyActions = useMemo(
    () => (
      <div className="space-y-3 rounded-[10px] border border-border bg-raised p-4 text-sm text-secondary">
        <p>
          {rangeCount != null
            ? `No matches. ${rangeCount} pub${rangeCount === 1 ? "" : "s"} in this area.`
            : "No matches for these filters."}
        </p>
        <div className="flex flex-wrap gap-2">
          {radius < MAX_RADIUS_M ? (
            <button
              type="button"
              className="btn-secondary !w-auto !px-3 !py-2 text-xs"
              onClick={() => setRadius((current) => Math.min(current * 2, MAX_RADIUS_M))}
            >
              Widen the search
            </button>
          ) : null}
          {minConfidence !== "any" ? (
            <button
              type="button"
              className="btn-secondary !w-auto !px-3 !py-2 text-xs"
              onClick={() => setMinConfidence("any")}
            >
              Include unchecked pubs
            </button>
          ) : null}
          {beamishOnly ? (
            <button
              type="button"
              className="btn-primary !w-auto !px-3 !py-2 text-xs"
              onClick={() => setSelectedDrinks(["guinness"])}
            >
              Show Guinness instead
            </button>
          ) : null}
        </div>
      </div>
    ),
    [beamishOnly, minConfidence, radius, rangeCount],
  );

  return (
    <div className="space-y-5">
      {fallbackNote && usingFallback ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[10px] border border-border bg-overlay px-4 py-3 text-sm text-secondary">
          <p>Using Belfast City Hall as a default location.</p>
          <div className="flex gap-2">
            <button type="button" className="btn-secondary !w-auto !px-3 !py-1.5 text-xs" onClick={retryLocation}>
              Use my location
            </button>
            <button
              type="button"
              className="text-xs text-secondary underline-offset-2 hover:underline"
              onClick={() => setFallbackNote(false)}
            >
              Dismiss
            </button>
          </div>
        </div>
      ) : null}

      <DrinkFilter
        selectedDrinks={selectedDrinks}
        matchAll={matchAll}
        onToggleDrink={toggleDrink}
        onMatchAll={setMatchAll}
      />

      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm text-secondary">
          Freshness
          <select
            className="ml-2 rounded-md border border-border bg-raised px-2 py-1 text-primary"
            value={minConfidence}
            onChange={(event) =>
              setMinConfidence(event.target.value as MinConfidence)
            }
          >
            {MIN_CONFIDENCE_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm text-secondary">
          Radius
          <select
            className="ml-2 rounded-md border border-border bg-raised px-2 py-1 text-primary"
            value={radius}
            onChange={(event) => setRadius(Number(event.target.value))}
          >
            <option value={5000}>5 km</option>
            <option value={15000}>15 km</option>
            <option value={30000}>30 km</option>
            <option value={50000}>50 km</option>
          </select>
        </label>
        <Link href="/stout-finder/add" className="ml-auto text-sm text-accent underline-offset-2 hover:underline">
          Add a pub
        </Link>
      </div>

      <button
        type="button"
        className="btn-secondary md:hidden"
        onClick={() => setMapOpen((open) => !open)}
      >
        {mapOpen ? "Shrink map" : "Expand map"}
      </button>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.9fr)]">
        <div className={`${mapOpen ? "h-[22rem]" : "h-56"} md:h-[70vh]`}>
          <StoutMap
            pubs={pubs}
            selectedDrinks={selectedDrinks}
            center={center}
            selectedPubId={selectedPubId}
            onSelectPub={setSelectedPubId}
          />
        </div>
        <div className="md:max-h-[70vh] md:overflow-y-auto">
          {loading ? (
            <p className="text-sm text-secondary">Loading pubs.</p>
          ) : null}
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          {!loading && pubs.length === 0 ? emptyActions : null}
          {!loading && pubs.length > 0 ? (
            <PubList
              pubs={pubs}
              selectedDrinks={selectedDrinks}
              selectedPubId={selectedPubId}
              onSelectPub={setSelectedPubId}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
