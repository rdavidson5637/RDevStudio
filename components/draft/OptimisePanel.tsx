"use client";

import { useMemo, useState } from "react";
import { bestXI, type SquadPlayer as OptimiserPlayer } from "@/lib/draft/optimise";
import type { SquadPlayer } from "@/lib/draft/squad";
import { AvailabilityDot } from "./AvailabilityDot";

function toOptimiserPlayer(p: SquadPlayer, ignoreAvailability: boolean): OptimiserPlayer {
  return {
    id: p.id,
    webName: p.webName,
    position: p.position as OptimiserPlayer["position"],
    pickPosition: p.pickPosition,
    // "Ignore availability" swaps in raw form as a sanity check against the
    // model - projectedPoints already has availability baked in via pStart,
    // form doesn't, so it's a genuinely different ranking, not a relabelling.
    projectedPoints: ignoreAvailability ? p.form : p.projectedPoints,
    availabilityScore: p.availabilityScore,
  };
}

export function OptimisePanel({ squad }: { squad: SquadPlayer[] }) {
  const [ignoreAvailability, setIgnoreAvailability] = useState(false);

  const result = useMemo(() => {
    const players = squad.map((p) => toOptimiserPlayer(p, ignoreAvailability));
    return bestXI(players);
  }, [squad, ignoreAvailability]);

  const byId = new Map(squad.map((p) => [p.id, p]));
  const closeToOptimal = result.gainOverCurrent < 1.5;

  return (
    <div className="rounded-lg border border-border bg-raised p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="shell-label text-accent">Optimise</p>
          <h3 className="font-display text-xl uppercase tracking-tight text-primary">
            Recommended XI — {result.formation}
          </h3>
        </div>
        <label className="flex items-center gap-2 text-sm text-secondary">
          <input
            type="checkbox"
            checked={ignoreAvailability}
            onChange={(e) => setIgnoreAvailability(e.target.checked)}
            className="h-4 w-4 accent-accent"
          />
          Ignore availability
        </label>
      </div>

      <p className="mb-4 text-sm text-secondary">
        Projected total: <span className="tabular-nums text-primary">{result.projectedTotal.toFixed(1)}</span>
        {" · "}
        {closeToOptimal ? (
          <span className="text-secondary">Your lineup is already close to optimal, not worth changing.</span>
        ) : (
          <span className="text-accent">
            +{result.gainOverCurrent.toFixed(1)} pts over your current XI
          </span>
        )}
      </p>

      {result.swaps.length > 0 && !closeToOptimal ? (
        <div className="mb-4 space-y-2">
          {result.swaps.map((swap) => (
            <div key={`${swap.out.id}-${swap.in.id}`} className="flex items-center gap-2 text-sm">
              <span className="text-destructive">{swap.out.webName}</span>
              <span className="text-secondary">→</span>
              <span className="text-accent">{swap.in.webName}</span>
              <span className="ml-auto tabular-nums text-secondary">
                +{swap.gain.toFixed(1)} pts
              </span>
            </div>
          ))}
        </div>
      ) : null}

      {result.risks.length > 0 ? (
        <ul className="mb-4 space-y-1">
          {result.risks.map((risk) => (
            <li key={risk} className="shell-label text-destructive">
              ⚠ {risk}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mb-4 flex flex-wrap gap-2">
        {result.xi.map((p) => {
          const full = byId.get(p.id);
          return (
            <span
              key={p.id}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-overlay px-2.5 py-1 text-xs"
            >
              {full ? <AvailabilityDot score={full.availabilityScore} /> : null}
              {p.webName}
            </span>
          );
        })}
      </div>

      <p className="shell-label text-secondary">
        This tells you what to do — there is no public API to write a lineup back to FPL, so you make the change yourself in the app.
      </p>
    </div>
  );
}
