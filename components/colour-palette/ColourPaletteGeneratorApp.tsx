"use client";

import { useEffect, useMemo, useState } from "react";
import { ToolkitToolHeader } from "@/components/toolkit-audit/ToolkitToolHeader";
import { FadeIn } from "@/components/toolkit-audit/FadeIn";
import { recordRecentSlug } from "@/lib/business-toolkit/storage";

function hexToHsl(hex: string): [number, number, number] | null {
  const cleaned = hex.replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(cleaned)) return null;
  const r = parseInt(cleaned.slice(0, 2), 16) / 255;
  const g = parseInt(cleaned.slice(2, 4), 16) / 255;
  const b = parseInt(cleaned.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      default:
        h = ((r - g) / d + 4) / 6;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l / 100 - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function generatePalette(baseHex: string): string[] {
  const hsl = hexToHsl(baseHex);
  if (!hsl) return [];
  const [h, s, l] = hsl;
  return [
    hslToHex(h, s, Math.max(l - 30, 10)),
    hslToHex(h, s, Math.max(l - 15, 15)),
    baseHex,
    hslToHex(h, s, Math.min(l + 15, 85)),
    hslToHex((h + 30) % 360, s, l),
    hslToHex((h + 180) % 360, s, l),
  ];
}

export function ColourPaletteGeneratorApp() {
  const [base, setBase] = useState("#1e5c3a");

  useEffect(() => {
    recordRecentSlug("colour-palette-generator");
  }, []);

  const palette = useMemo(() => generatePalette(base), [base]);

  const copyAll = async () => {
    await navigator.clipboard.writeText(palette.join("\n"));
  };

  return (
    <div>
      <ToolkitToolHeader
        category="Developer tools"
        title="Colour Palette Generator"
        description="Pick a base colour and generate a harmonious palette with shades and complements — copy hex values straight into your project."
      />
      <div className="py-10">
        <FadeIn className="rounded-[10px] border border-border-strong bg-raised p-5 sm:p-6">
          <label className="flex flex-wrap items-center gap-4">
            <span className="shell-label text-accent">Base colour</span>
            <input
              type="color"
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className="h-12 w-16 cursor-pointer rounded-md border border-border-strong bg-base"
              aria-label="Pick base colour"
            />
            <input
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className="w-32 rounded-md border border-border-strong bg-base px-3 py-2 font-mono text-sm uppercase text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </label>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {palette.map((colour) => (
              <button
                key={colour}
                type="button"
                onClick={() => navigator.clipboard.writeText(colour)}
                className="group overflow-hidden rounded-md border border-border-strong text-left transition-transform hover:scale-[1.02]"
                aria-label={`Copy ${colour}`}
              >
                <div
                  className="h-24 w-full"
                  style={{ backgroundColor: colour }}
                />
                <p className="shell-label p-2 text-center text-primary group-hover:text-accent">
                  {colour}
                </p>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={copyAll}
            className="btn-secondary mt-6"
          >
            Copy all hex values
          </button>
        </FadeIn>
      </div>
    </div>
  );
}
