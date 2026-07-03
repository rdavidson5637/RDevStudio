"use client";

import { useEffect, useMemo, useState } from "react";
import { InteractiveToolHeader } from "@/components/interactive-tools/InteractiveToolHeader";
import { FadeIn } from "@/components/toolkit-audit/FadeIn";
import { recordInteractiveToolVisit } from "@/lib/interactive-tools/storage";

type Match = { a: string; b: string; winner: string | null };

function buildBracket(teams: string[]): Match[] {
  const padded = [...teams];
  while (padded.length < 8) padded.push("BYE");
  return [
    { a: padded[0], b: padded[1], winner: null },
    { a: padded[2], b: padded[3], winner: null },
    { a: padded[4], b: padded[5], winner: null },
    { a: padded[6], b: padded[7], winner: null },
    { a: "?", b: "?", winner: null },
    { a: "?", b: "?", winner: null },
    { a: "?", b: "?", winner: null },
  ];
}

export function BracketBuilderApp() {
  const [teamsInput, setTeamsInput] = useState(
    "Team 1\nTeam 2\nTeam 3\nTeam 4\nTeam 5\nTeam 6\nTeam 7\nTeam 8",
  );
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    recordInteractiveToolVisit("bracket-builder");
  }, []);

  const teams = useMemo(
    () =>
      teamsInput
        .split("\n")
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 8),
    [teamsInput],
  );

  const init = () => setMatches(buildBracket(teams));

  const pickWinner = (index: number, winner: string) => {
    setMatches((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], winner };
      if (index < 4 && winner) {
        const semi = index < 2 ? 4 : 5;
        const slot = index % 2 === 0 ? "a" : "b";
        next[semi] = { ...next[semi], [slot]: winner };
      }
      if (index >= 4 && index <= 5 && winner) {
        const slot = index === 4 ? "a" : "b";
        next[6] = { ...next[6], [slot]: winner };
      }
      return next;
    });
  };

  return (
    <div>
      <InteractiveToolHeader
        category="Rankings & brackets"
        title="Bracket Builder"
        description="8-team single-elimination bracket - tap winners round by round."
      />
      <div className="py-10">
        <FadeIn className="mb-8 max-w-md space-y-4 rounded-[10px] border border-border-strong bg-raised p-5">
          <label className="block">
            <span className="shell-label text-accent">
              Teams (up to 8, one per line)
            </span>
            <textarea
              value={teamsInput}
              onChange={(e) => setTeamsInput(e.target.value)}
              rows={8}
              className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 text-primary"
            />
          </label>
          <button type="button" onClick={init} className="btn-primary">
            Build bracket
          </button>
        </FadeIn>
        {matches.length > 0 ? (
          <FadeIn delayMs={80} className="overflow-x-auto">
            <div className="flex min-w-[600px] gap-8">
              <div className="space-y-8">
                <p className="shell-label text-accent">Quarter-finals</p>
                {matches.slice(0, 4).map((m, i) => (
                  <div
                    key={i}
                    className="space-y-1 rounded-md border border-border-strong bg-raised p-3"
                  >
                    {[m.a, m.b].map((team) => (
                      <button
                        key={team}
                        type="button"
                        disabled={team === "BYE" || team === "?"}
                        onClick={() => pickWinner(i, team)}
                        className={`block w-full rounded px-3 py-2 text-left text-sm ${m.winner === team ? "bg-accent text-on-accent" : "bg-base text-primary hover:bg-accent/10"}`}
                      >
                        {team}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
              <div className="space-y-16 pt-12">
                <p className="shell-label text-accent">Semi-finals</p>
                {matches.slice(4, 6).map((m, i) => (
                  <div
                    key={i}
                    className="space-y-1 rounded-md border border-border-strong bg-raised p-3"
                  >
                    {[m.a, m.b].map((team) => (
                      <button
                        key={`${i}-${team}`}
                        type="button"
                        disabled={team === "?"}
                        onClick={() => pickWinner(i + 4, team)}
                        className={`block w-full rounded px-3 py-2 text-left text-sm ${m.winner === team ? "bg-accent text-on-accent" : "bg-base text-primary"}`}
                      >
                        {team}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
              <div className="pt-24">
                <p className="shell-label text-accent">Final</p>
                <div className="space-y-1 rounded-md border border-border-strong bg-raised p-3">
                  {matches[6]
                    ? [matches[6].a, matches[6].b].map((team) => (
                        <button
                          key={team}
                          type="button"
                          disabled={team === "?"}
                          onClick={() => pickWinner(6, team)}
                          className={`block w-full rounded px-3 py-2 text-left text-sm ${matches[6].winner === team ? "bg-accent text-on-accent font-bold" : "bg-base text-primary"}`}
                        >
                          {team}
                        </button>
                      ))
                    : null}
                </div>
                {matches[6]?.winner && matches[6].winner !== "?" ? (
                  <p className="mt-4 font-display text-xl uppercase text-accent">
                    Champion: {matches[6].winner}
                  </p>
                ) : null}
              </div>
            </div>
          </FadeIn>
        ) : null}
      </div>
    </div>
  );
}
