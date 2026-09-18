"use client";

import { useQueryStates } from "nuqs";
import { keySignature, noteToString, numerals, parseNote, scale, type ScaleName } from "@rdavidson/theory";
import { SCALE_NAMES, clampCapo, guitarLabParsers } from "@/lib/guitar-lab/url-state";

const TUNING_PRESETS = ["EADGBE", "DADGBE", "DGDGBD", "DADF#AD"] as const;

export function GuitarLabApp() {
  const [state, setState] = useQueryStates(guitarLabParsers, {
    history: "push",
  });

  const tonic = parseNote(state.key);
  const theory = tonic.ok
    ? {
        notes: scale(tonic.value, state.scale).map(noteToString),
        signature: keySignature(tonic.value, state.scale),
        numerals: numerals(tonic.value, state.scale).map((n) => n.roman),
      }
    : null;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <p className="text-sm text-tertiary">
        Live theory from <code>@rdavidson/theory</code> — no fretboard yet,
        but the scale, key signature, and Roman numerals below are real.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-tertiary">
            Tuning
          </span>
          <select
            className="w-full rounded-md border border-border bg-raised px-3 py-2 text-primary"
            value={state.tuning}
            onChange={(e) => setState({ tuning: e.target.value })}
          >
            {TUNING_PRESETS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-tertiary">
            Capo
          </span>
          <input
            type="number"
            min={0}
            max={12}
            className="w-full rounded-md border border-border bg-raised px-3 py-2 text-primary"
            value={state.capo}
            onChange={(e) =>
              setState({ capo: clampCapo(Number(e.target.value) || 0) })
            }
          />
        </label>

        <label className="block">
          <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-tertiary">
            Key
          </span>
          <input
            type="text"
            className="w-full rounded-md border border-border bg-raised px-3 py-2 text-primary"
            value={state.key}
            onChange={(e) => setState({ key: e.target.value })}
          />
        </label>

        <label className="block">
          <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-tertiary">
            Scale
          </span>
          <select
            className="w-full rounded-md border border-border bg-raised px-3 py-2 text-primary"
            value={state.scale}
            onChange={(e) => setState({ scale: e.target.value as ScaleName })}
          >
            {SCALE_NAMES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-tertiary">
            Chord (optional)
          </span>
          <input
            type="text"
            placeholder="e.g. Cmaj7"
            className="w-full rounded-md border border-border bg-raised px-3 py-2 text-primary"
            value={state.chord ?? ""}
            onChange={(e) => setState({ chord: e.target.value || null })}
          />
        </label>
      </div>

      <div>
        <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-tertiary">
          Current state (URL is the source of truth)
        </span>
        <pre className="overflow-x-auto rounded-md border border-border bg-overlay p-4 text-sm text-primary">
          {JSON.stringify(state, null, 2)}
        </pre>
      </div>

      {theory ? (
        <div className="space-y-3 rounded-md border border-border bg-overlay p-4 text-sm">
          <p>
            <span className="font-mono text-xs uppercase tracking-wider text-tertiary">
              Scale:{" "}
            </span>
            {theory.notes.join(" ")}
          </p>
          <p>
            <span className="font-mono text-xs uppercase tracking-wider text-tertiary">
              Key signature:{" "}
            </span>
            {theory.signature.count === 0
              ? "no sharps or flats"
              : `${theory.signature.count} ${theory.signature.direction}${theory.signature.count > 1 ? "s" : ""}`}
          </p>
          <p>
            <span className="font-mono text-xs uppercase tracking-wider text-tertiary">
              Numerals:{" "}
            </span>
            {theory.numerals.join(" ")}
          </p>
        </div>
      ) : (
        <p className="text-sm text-destructive">
          &ldquo;{state.key}&rdquo; isn&apos;t a note @rdavidson/theory can parse (try C, F#, Bb).
        </p>
      )}
    </div>
  );
}
