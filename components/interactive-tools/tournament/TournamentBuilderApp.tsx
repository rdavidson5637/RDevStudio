"use client";

import { useEffect, useState } from "react";
import { InteractiveToolHeader } from "@/components/interactive-tools/InteractiveToolHeader";
import { FadeIn } from "@/components/toolkit-audit/FadeIn";
import { recordInteractiveToolVisit } from "@/lib/interactive-tools/storage";

export function TournamentBuilderApp() {
  const [teamsInput, setTeamsInput] = useState(
    "Alpha\nBravo\nCharlie\nDelta\nEcho\nFoxtrot\nGolf\nHotel",
  );
  const [groups, setGroups] = useState<string[][]>([]);

  useEffect(() => {
    recordInteractiveToolVisit("tournament-builder");
  }, []);

  const generate = () => {
    const teams = teamsInput
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 8);
    setGroups([teams.slice(0, 4), teams.slice(4, 8)]);
  };

  return (
    <div>
      <InteractiveToolHeader
        category="Rankings & brackets"
        title="Tournament Builder"
        description="Split 8 teams into two groups - foundation for group stage + knockout tournaments."
      />
      <div className="py-10">
        <FadeIn className="mb-8 max-w-md space-y-4 rounded-[10px] border border-border-strong bg-raised p-5">
          <label className="block">
            <span className="shell-label text-accent">
              Teams (8, one per line)
            </span>
            <textarea
              value={teamsInput}
              onChange={(e) => setTeamsInput(e.target.value)}
              rows={8}
              className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 text-primary"
            />
          </label>
          <button type="button" onClick={generate} className="btn-primary">
            Generate groups
          </button>
        </FadeIn>
        {groups.length === 2 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {groups.map((group, gi) => (
              <FadeIn
                key={gi}
                delayMs={gi * 80}
                className="rounded-[10px] border border-border-strong bg-raised p-6"
              >
                <p className="shell-label text-accent">Group {gi + 1}</p>
                <ol className="mt-4 space-y-2">
                  {group.map((team, ti) => (
                    <li
                      key={team}
                      className="rounded-md border border-border bg-base px-4 py-2 text-primary"
                    >
                      {ti + 1}. {team}
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-sm text-tertiary">
                  Top 2 advance to semi-finals (knockout stage coming in a
                  future update).
                </p>
              </FadeIn>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
