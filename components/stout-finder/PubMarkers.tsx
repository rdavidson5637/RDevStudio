"use client";

import { useEffect, useMemo } from "react";
import L from "leaflet";
import { Marker, Popup, useMap } from "react-leaflet";
import Supercluster from "supercluster";
// supercluster over react-leaflet-cluster: smaller, no markercluster CSS,
// and it works with the same divIcon pins as the rest of the map.
import { bestDrinkAt, pinStyleFor } from "@/lib/stout-finder/confidence";
import { CONFIDENCE_LABELS, DRINKS, type Drink, type NearbyPub } from "@/lib/stout-finder/types";
import { ReportWidget } from "./ReportWidget";

type Props = {
  pubs: NearbyPub[];
  selectedDrinks: Drink[];
  selectedPubId: string | null;
  onSelectPub: (id: string) => void;
  zoom: number;
  bounds: L.LatLngBounds | null;
};

type ClusterProps = { cluster: true; point_count: number };
type PubProps = { cluster?: false; pub: NearbyPub };

function iconFor(pub: NearbyPub, selectedDrinks: Drink[], selected: boolean) {
  const confidence = bestDrinkAt(pub, selectedDrinks);
  const style = pinStyleFor(confidence);
  const ring = selected ? " ring-offset-1 ring-offset-paper outline outline-2 outline-ink" : "";
  return L.divIcon({
    className: "stout-pin",
    html: `<span style="opacity:${style.opacity}" class="${style.className}${ring}"></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -10],
  });
}

function clusterIcon(count: number) {
  return L.divIcon({
    className: "stout-pin",
    html: `<span class="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[11px] font-semibold text-paper">${count}</span>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

export function PubMarkers({
  pubs,
  selectedDrinks,
  selectedPubId,
  onSelectPub,
  zoom,
  bounds,
}: Props) {
  const map = useMap();

  const index = useMemo(() => {
    const cluster = new Supercluster<PubProps, ClusterProps>({
      radius: 60,
      maxZoom: 16,
    });
    cluster.load(
      pubs.map((pub) => ({
        type: "Feature" as const,
        geometry: { type: "Point" as const, coordinates: [pub.lng, pub.lat] },
        properties: { pub },
      })),
    );
    return cluster;
  }, [pubs]);

  const features = useMemo(() => {
    if (!bounds) return [];
    const bbox: [number, number, number, number] = [
      bounds.getWest(),
      bounds.getSouth(),
      bounds.getEast(),
      bounds.getNorth(),
    ];
    if (pubs.length <= 150) {
      return pubs.map((pub) => ({
        type: "Feature" as const,
        id: pub.id,
        geometry: { type: "Point" as const, coordinates: [pub.lng, pub.lat] },
        properties: { pub } satisfies PubProps,
      }));
    }
    return index.getClusters(bbox, zoom);
  }, [bounds, index, pubs, zoom]);

  useEffect(() => {
    if (!selectedPubId) return;
    const pub = pubs.find((item) => item.id === selectedPubId);
    if (pub) map.panTo([pub.lat, pub.lng]);
  }, [map, pubs, selectedPubId]);

  return (
    <>
      {features.map((feature) => {
        const [lng, lat] = feature.geometry.coordinates;
        const props = feature.properties as ClusterProps | PubProps;
        if ("cluster" in props && props.cluster) {
          return (
            <Marker
              key={`c-${feature.id}`}
              position={[lat, lng]}
              icon={clusterIcon(props.point_count)}
              eventHandlers={{
                click: () => {
                  const expansion = index.getClusterExpansionZoom(Number(feature.id));
                  map.setView([lat, lng], expansion);
                },
              }}
            />
          );
        }
        const pub = (props as PubProps).pub;
        return (
          <Marker
            key={pub.id}
            position={[pub.lat, pub.lng]}
            icon={iconFor(pub, selectedDrinks, pub.id === selectedPubId)}
            eventHandlers={{ click: () => onSelectPub(pub.id) }}
          >
            <Popup maxWidth={320}>
              <div className="min-w-[12rem] font-sans text-primary">
                <p className="font-semibold">{pub.name}</p>
                <p className="text-xs text-secondary">{pub.town}</p>
                <ul className="mt-2 space-y-1 text-xs">
                  {DRINKS.filter((drink) =>
                    selectedDrinks.length === 0
                      ? true
                      : selectedDrinks.includes(drink.id),
                  ).map((drink) => {
                    const status = pub.drinks[drink.id];
                    return (
                      <li
                        key={drink.id}
                        className={
                          status.confidence === "unlikely" ? "line-through" : ""
                        }
                      >
                        {drink.label}: {CONFIDENCE_LABELS[status.confidence]}
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-3">
                  <ReportWidget
                    pubId={pub.id}
                    slug={pub.slug}
                    drinks={pub.drinks}
                    compact
                  />
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
