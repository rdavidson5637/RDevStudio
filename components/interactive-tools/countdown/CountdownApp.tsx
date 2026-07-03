"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { InteractiveToolHeader } from "@/components/interactive-tools/InteractiveToolHeader";
import { FadeIn } from "@/components/toolkit-audit/FadeIn";
import { recordInteractiveToolVisit } from "@/lib/interactive-tools/storage";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function getTimeLeft(target: Date, now = Date.now()) {
  const diff = target.getTime() - now;
  if (diff <= 0)
    return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  const seconds = Math.floor(diff / 1000);
  return {
    done: false,
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

export function CountdownApp() {
  const searchParams = useSearchParams();
  const initialTarget = searchParams.get("target") ?? "";
  const [label, setLabel] = useState(searchParams.get("label") ?? "Launch");
  const [targetInput, setTargetInput] = useState(initialTarget || "");
  const [target, setTarget] = useState<Date | null>(
    initialTarget ? new Date(initialTarget) : null,
  );
  const [clock, setClock] = useState(0);

  useEffect(() => {
    recordInteractiveToolVisit("countdown");
  }, []);

  useEffect(() => {
    const id = setInterval(() => setClock(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeLeft = useMemo(
    () => (target ? getTimeLeft(target, clock) : null),
    [target, clock],
  );

  const start = () => {
    const d = new Date(targetInput);
    if (!Number.isNaN(d.getTime())) setTarget(d);
  };

  const share = useCallback(() => {
    if (!target) return;
    const url = new URL(window.location.href);
    url.searchParams.set("target", target.toISOString());
    url.searchParams.set("label", label);
    navigator.clipboard.writeText(url.toString());
  }, [target, label]);

  const fullscreen = () => {
    document.documentElement.requestFullscreen?.();
  };

  return (
    <div>
      <InteractiveToolHeader
        category="Events & timers"
        title="Countdown Timer"
        description="Set a live countdown for launches, kick-offs, or events - share via link or go fullscreen."
      />
      {!target ? (
        <FadeIn className="py-10">
          <div className="mx-auto max-w-md space-y-4 rounded-[10px] border border-border-strong bg-raised p-6">
            <label className="block">
              <span className="shell-label text-accent">Event name</span>
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 text-primary"
              />
            </label>
            <label className="block">
              <span className="shell-label text-accent">
                Target date & time
              </span>
              <input
                type="datetime-local"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 text-primary"
              />
            </label>
            <button
              type="button"
              onClick={start}
              className="btn-primary w-full"
            >
              Start countdown
            </button>
          </div>
        </FadeIn>
      ) : (
        <FadeIn className="py-10 text-center">
          <p className="shell-label text-accent">{label}</p>
          {timeLeft?.done ? (
            <p className="mt-6 font-display text-5xl uppercase text-accent sm:text-7xl">
              Go!
            </p>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {timeLeft ? (
                <>
                  {[
                    ["Days", timeLeft.days],
                    ["Hours", timeLeft.hours],
                    ["Minutes", timeLeft.minutes],
                    ["Seconds", timeLeft.seconds],
                  ].map(([unit, val]) => (
                    <div
                      key={unit as string}
                      className="rounded-[10px] border border-border-strong bg-raised p-6"
                    >
                      <p className="font-display text-4xl text-primary sm:text-5xl">
                        {pad(val as number)}
                      </p>
                      <p className="mt-2 shell-label text-secondary">{unit}</p>
                    </div>
                  ))}
                </>
              ) : null}
            </div>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={share} className="btn-secondary">
              Copy share link
            </button>
            <button
              type="button"
              onClick={fullscreen}
              className="btn-secondary"
            >
              Fullscreen
            </button>
            <button
              type="button"
              onClick={() => setTarget(null)}
              className="btn-outline-accent"
            >
              Edit
            </button>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
