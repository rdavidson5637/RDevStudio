"use client";

import { useEffect, useMemo, useState } from "react";
import { ToolkitToolHeader } from "@/components/toolkit-audit/ToolkitToolHeader";
import { FadeIn } from "@/components/toolkit-audit/FadeIn";
import { recordRecentSlug } from "@/lib/business-toolkit/storage";

type GradientType = "linear" | "radial";

export function GradientGeneratorApp() {
  const [colorA, setColorA] = useState("#1e5c3a");
  const [colorB, setColorB] = useState("#d22b2b");
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState<GradientType>("linear");

  useEffect(() => {
    recordRecentSlug("gradient-generator");
  }, []);

  const css = useMemo(() => {
    if (type === "radial") {
      return `background: radial-gradient(circle at center, ${colorA}, ${colorB});`;
    }
    return `background: linear-gradient(${angle}deg, ${colorA}, ${colorB});`;
  }, [colorA, colorB, angle, type]);

  const tailwind = useMemo(() => {
    if (type === "radial")
      return `bg-[radial-gradient(circle_at_center,${colorA},${colorB})]`;
    return `bg-[linear-gradient(${angle}deg,${colorA},${colorB})]`;
  }, [colorA, colorB, angle, type]);

  return (
    <div>
      <ToolkitToolHeader
        category="Developer tools"
        title="Gradient Generator"
        description="Build linear or radial CSS gradients, preview them live, and copy the code into your stylesheet or Tailwind class."
      />
      <div className="grid gap-8 py-10 lg:grid-cols-2">
        <FadeIn className="space-y-5 rounded-[10px] border border-border-strong bg-raised p-5 sm:p-6">
          <div className="flex flex-wrap gap-2">
            {(["linear", "radial"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                aria-pressed={type === t}
                className={`rounded-md border px-4 py-2 text-sm font-semibold capitalize ${type === t ? "border-accent bg-accent text-on-accent" : "border-border-strong bg-base text-primary"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-3">
              <span className="shell-label text-accent">Colour A</span>
              <input
                type="color"
                value={colorA}
                onChange={(e) => setColorA(e.target.value)}
                className="h-10 w-14 cursor-pointer rounded border border-border-strong"
              />
            </label>
            <label className="flex items-center gap-3">
              <span className="shell-label text-accent">Colour B</span>
              <input
                type="color"
                value={colorB}
                onChange={(e) => setColorB(e.target.value)}
                className="h-10 w-14 cursor-pointer rounded border border-border-strong"
              />
            </label>
          </div>
          {type === "linear" ? (
            <label className="block">
              <span className="shell-label text-accent">Angle ({angle}°)</span>
              <input
                type="range"
                min={0}
                max={360}
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="mt-2 w-full accent-accent"
              />
            </label>
          ) : null}
        </FadeIn>
        <FadeIn delayMs={80} className="space-y-4">
          <div
            className="h-48 rounded-[10px] border border-border-strong sm:h-64"
            style={{
              background:
                type === "radial"
                  ? `radial-gradient(circle at center, ${colorA}, ${colorB})`
                  : `linear-gradient(${angle}deg, ${colorA}, ${colorB})`,
            }}
            aria-hidden="true"
          />
          <div className="rounded-[10px] border border-border-strong bg-raised p-4">
            <p className="shell-label text-accent">CSS</p>
            <pre className="mt-2 overflow-x-auto font-mono text-sm text-primary">
              {css}
            </pre>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(css)}
              className="btn-secondary mt-3"
            >
              Copy CSS
            </button>
          </div>
          <div className="rounded-[10px] border border-border-strong bg-raised p-4">
            <p className="shell-label text-accent">Tailwind arbitrary</p>
            <pre className="mt-2 overflow-x-auto font-mono text-xs text-primary">
              {tailwind}
            </pre>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(tailwind)}
              className="btn-secondary mt-3"
            >
              Copy Tailwind
            </button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
