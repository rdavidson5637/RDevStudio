"use client";

import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Center = { lat: number; lng: number };

const pin = L.divIcon({
  className: "stout-pin",
  html: '<span class="block h-4 w-4 rounded-full bg-accent ring-2 ring-paper"></span>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

function DragPin({
  value,
  onChange,
}: {
  value: Center;
  onChange: (next: Center) => void;
}) {
  useMapEvents({
    click(event) {
      onChange({ lat: event.latlng.lat, lng: event.latlng.lng });
    },
  });
  return (
    <Marker
      draggable
      position={[value.lat, value.lng]}
      icon={pin}
      eventHandlers={{
        dragend: (event) => {
          const marker = event.target as L.Marker;
          const latlng = marker.getLatLng();
          onChange({ lat: latlng.lat, lng: latlng.lng });
        },
      }}
    />
  );
}

export default function PinPickerMap({
  value,
  onChange,
}: {
  value: Center;
  onChange: (next: Center) => void;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;

  return (
    <div className="h-64 overflow-hidden rounded-[10px] border border-border">
      <MapContainer
        center={[value.lat, value.lng]}
        zoom={14}
        className="h-full w-full"
        scrollWheelZoom
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <DragPin value={value} onChange={onChange} />
      </MapContainer>
    </div>
  );
}
