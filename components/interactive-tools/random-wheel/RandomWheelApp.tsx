"use client";

import { useEffect, useRef, useState } from "react";
import { InteractiveToolHeader } from "@/components/interactive-tools/InteractiveToolHeader";
import { FadeIn } from "@/components/toolkit-audit/FadeIn";
import { recordInteractiveToolVisit } from "@/lib/interactive-tools/storage";

const SEGMENT_COLORS = [
  "#1e5c3a",
  "#d22b2b",
  "#9a6700",
  "#524f47",
  "#16150f",
  "#6b685e",
];

export function RandomWheelApp() {
  const [options, setOptions] = useState("Alice\nBob\nCharlie\nDana\nEve");
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const items = options
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  useEffect(() => {
    recordInteractiveToolVisit("random-wheel");
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || items.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const size = canvas.width;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 4;
    ctx.clearRect(0, 0, size, size);
    const slice = (2 * Math.PI) / items.length;
    items.forEach((item, i) => {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, i * slice + rotation, (i + 1) * slice + rotation);
      ctx.fillStyle = SEGMENT_COLORS[i % SEGMENT_COLORS.length];
      ctx.fill();
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(i * slice + slice / 2 + rotation);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px system-ui";
      ctx.textAlign = "right";
      ctx.fillText(item.slice(0, 12), r - 16, 5);
      ctx.restore();
    });
    ctx.beginPath();
    ctx.arc(cx, cy, 16, 0, 2 * Math.PI);
    ctx.fillStyle = "#f7f5f0";
    ctx.fill();
    ctx.strokeStyle = "#16150f";
    ctx.stroke();
  }, [items, rotation]);

  const spin = () => {
    if (spinning || items.length < 2) return;
    setSpinning(true);
    setWinner(null);
    const extra = 4 * Math.PI + Math.random() * 2 * Math.PI;
    const start = rotation;
    const duration = 3000;
    const startTime = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setRotation(start + extra * ease);
      if (t < 1) requestAnimationFrame(tick);
      else {
        setSpinning(false);
        const norm = (start + extra) % (2 * Math.PI);
        const idx =
          Math.floor(
            ((2 * Math.PI - norm + Math.PI / 2) % (2 * Math.PI)) /
              ((2 * Math.PI) / items.length),
          ) % items.length;
        setWinner(items[idx]);
      }
    };
    requestAnimationFrame(tick);
  };

  return (
    <div>
      <InteractiveToolHeader
        category="Pickers & wheels"
        title="Random Wheel"
        description="Add names or options, spin the wheel, and let chance pick the winner."
      />
      <div className="grid gap-8 py-10 lg:grid-cols-2">
        <FadeIn className="rounded-[10px] border border-border-strong bg-raised p-5 sm:p-6">
          <label className="block">
            <span className="shell-label text-accent">
              Options (one per line)
            </span>
            <textarea
              value={options}
              onChange={(e) => setOptions(e.target.value)}
              rows={8}
              className="mt-2 w-full rounded-md border border-border-strong bg-base px-4 py-3 text-primary"
            />
          </label>
          <button
            type="button"
            onClick={spin}
            disabled={spinning || items.length < 2}
            className="btn-primary mt-4 w-full disabled:opacity-50"
          >
            {spinning ? "Spinning…" : "Spin the wheel"}
          </button>
        </FadeIn>
        <FadeIn
          delayMs={80}
          className="flex flex-col items-center rounded-[10px] border border-border-strong bg-raised p-6"
        >
          <div className="relative">
            <div
              className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1 text-2xl text-destructive"
              aria-hidden="true"
            >
              ▼
            </div>
            <canvas
              ref={canvasRef}
              width={320}
              height={320}
              className="rounded-full"
              aria-label="Random wheel"
            />
          </div>
          {winner ? (
            <p
              className="mt-6 font-display text-2xl uppercase text-accent"
              role="status"
            >
              Winner: {winner}
            </p>
          ) : null}
        </FadeIn>
      </div>
    </div>
  );
}
