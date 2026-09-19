"use client";

import Link from "next/link";
import { CONFIDENCE_LABELS, type Drink, type NearbyPub } from "@/lib/stout-finder/types";
import { formatLastSeen } from "@/lib/stout-finder/confidence";

type Props = {
  pubs: NearbyPub[];
  selectedDrinks: Drink[];
  selectedPubId: string | null;
  onSelectPub: (id: string) => void;
};

function formatDistance(metres: number): string {
  if (metres < 1000) return `${Math.round(metres)} m`;
  return `${(metres / 1000).toFixed(1)} km`;
}

export function PubList({ pubs, selectedDrinks, selectedPubId, onSelectPub }: Props) {
  const drinks = selectedDrinks.length > 0 ? selectedDrinks : (["beamish"] as Drink[]);

  return (
    <ul className="divide-y divide-border">
      {pubs.map((pub) => {
        const selected = pub.id === selectedPubId;
        return (
          <li key={pub.id}>
            <button
              type="button"
              onClick={() => onSelectPub(pub.id)}
              className={`w-full px-1 py-3 text-left transition-colors ${
                selected ? "bg-accent-light" : "hover:bg-overlay"
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-semibold text-primary">{pub.name}</p>
                <p className="shrink-0 text-xs text-secondary">
                  {formatDistance(pub.distanceM)}
                </p>
              </div>
              <p className="text-sm text-secondary">
                {[pub.town, pub.county].filter(Boolean).join(", ")}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {drinks.map((drink) => {
                  const status = pub.drinks[drink];
                  return (
                    <span
                      key={drink}
                      className={`rounded-full border border-border px-2 py-0.5 text-[11px] uppercase tracking-wide ${
                        status.confidence === "unlikely"
                          ? "text-secondary line-through"
                          : "text-secondary"
                      }`}
                    >
                      {drink} · {CONFIDENCE_LABELS[status.confidence]}
                      {status.lastConfirmedAt
                        ? ` · ${formatLastSeen(status.lastConfirmedAt)}`
                        : ""}
                    </span>
                  );
                })}
              </div>
              <Link
                href={`/stout-finder/${pub.slug}`}
                className="mt-2 inline-block text-sm text-accent underline-offset-2 hover:underline"
                onClick={(event) => event.stopPropagation()}
              >
                Details
              </Link>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
