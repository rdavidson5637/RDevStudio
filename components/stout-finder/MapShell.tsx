"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { LeafletProvider, createLeafletContext } from "@react-leaflet/core";
import L from "leaflet";

type Center = { lat: number; lng: number };

type Props = {
  center: Center;
  zoom: number;
  className?: string;
  children: ReactNode;
};

// MapContainer's callback ref creates a second map on the same node under
// React strict mode and throws "Map container is already initialized."
// An effect with cleanup calls map.remove(), which clears that node.
export function MapShell({ center, zoom, className, children }: Props) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [context, setContext] = useState<ReturnType<
    typeof createLeafletContext
  > | null>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const map = L.map(node, { scrollWheelZoom: true });
    map.setView([center.lat, center.lng], zoom);
    setContext(createLeafletContext(map));

    return () => {
      map.remove();
      setContext(null);
    };
    // Later centre changes go through Recenter. Re-creating the map would
    // drop the user's pan and zoom.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={nodeRef} className={className}>
      {context ? (
        <LeafletProvider value={context}>{children}</LeafletProvider>
      ) : null}
    </div>
  );
}
