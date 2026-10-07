"use client";

import { useEffect, useRef, useState } from "react";
import { TileLayer, useMap, useMapEvents } from "react-leaflet";
import { MapShell } from "./MapShell";
import { MAP_TILE_ATTRIBUTION, MAP_TILE_URL } from "./mapTiles";
import L, { type LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import { PubMarkers } from "./PubMarkers";
import type { Drink, NearbyPub } from "@/lib/stout-finder/types";

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type Center = { lat: number; lng: number };

type Props = {
  pubs: NearbyPub[];
  selectedDrinks: Drink[];
  center: Center;
  onSelectPub: (id: string) => void;
  selectedPubId: string | null;
  showEmpty?: boolean;
};

function FrameResults({
  pubs,
}: {
  pubs: { lat: number; lng: number }[];
}) {
  const map = useMap();
  const signature = pubs.map((pub) => `${pub.lat},${pub.lng}`).join("|");
  useEffect(() => {
    if (pubs.length === 0) return;
    const frame = () => {
      map.invalidateSize();
      const bounds = L.latLngBounds(
        pubs.map((pub) => [pub.lat, pub.lng] as [number, number]),
      );
      if (!bounds.isValid()) return;
      map.fitBounds(bounds, { padding: [32, 32], maxZoom: 14 });
    };
    frame();
    const timer = window.setTimeout(frame, 150);
    return () => window.clearTimeout(timer);
  }, [map, signature, pubs]);
  return null;
}

function InvalidateSize() {
  const map = useMap();
  useEffect(() => {
    const container = map.getContainer();
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(container);
    return () => observer.disconnect();
  }, [map]);
  return null;
}

function ViewportSync({
  onChange,
}: {
  onChange: (zoom: number, bounds: LatLngBounds) => void;
}) {
  const map = useMap();
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  useMapEvents({
    moveend: () => onChangeRef.current(map.getZoom(), map.getBounds()),
    zoomend: () => onChangeRef.current(map.getZoom(), map.getBounds()),
  });
  useEffect(() => {
    onChangeRef.current(map.getZoom(), map.getBounds());
  }, [map]);
  return null;
}

export default function StoutMap({
  pubs,
  selectedDrinks,
  center,
  onSelectPub,
  selectedPubId,
  showEmpty = true,
}: Props) {
  const [viewport, setViewport] = useState<{
    zoom: number;
    bounds: LatLngBounds | null;
  }>({ zoom: 12, bounds: null });

  return (
    <div className="relative h-full min-h-[16rem] overflow-hidden rounded-[10px] border border-border">
      <MapShell
        center={center}
        zoom={12}
        className="h-full w-full bg-overlay"
      >
        <TileLayer url={MAP_TILE_URL} attribution={MAP_TILE_ATTRIBUTION} />
        <FrameResults pubs={pubs} />
        <InvalidateSize />
        <ViewportSync
          onChange={(zoom, bounds) => setViewport({ zoom, bounds })}
        />
        <PubMarkers
          pubs={pubs}
          selectedDrinks={selectedDrinks}
          selectedPubId={selectedPubId}
          onSelectPub={onSelectPub}
          zoom={viewport.zoom}
          bounds={viewport.bounds}
        />
      </MapShell>
      {showEmpty && pubs.length === 0 ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-paper/70">
          <p className="px-4 text-center text-sm text-secondary">
            No pubs match these filters in this view.
          </p>
        </div>
      ) : null}
    </div>
  );
}
