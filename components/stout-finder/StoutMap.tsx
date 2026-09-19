"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
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
};

function Recenter({ center }: { center: Center }) {
  const map = useMap();
  useEffect(() => {
    map.setView([center.lat, center.lng]);
  }, [center.lat, center.lng, map]);
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
}: Props) {
  const [viewport, setViewport] = useState<{
    zoom: number;
    bounds: LatLngBounds | null;
  }>({ zoom: 12, bounds: null });

  return (
    <div className="relative h-full min-h-[16rem] overflow-hidden rounded-[10px] border border-border">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={12}
        className="h-full w-full bg-overlay"
        scrollWheelZoom
        attributionControl
      >
        <TileLayer
          // Light CARTO tiles so the map sits on the paper programme palette
          // rather than the old dark #0A0A0F shell this prompt pack assumed.
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <Recenter center={center} />
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
      </MapContainer>
      {pubs.length === 0 ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-paper/70">
          <p className="px-4 text-center text-sm text-secondary">
            No pubs match these filters in this view.
          </p>
        </div>
      ) : null}
    </div>
  );
}
