import { parseAsInteger, parseAsString, parseAsStringLiteral } from "nuqs";
import type { ScaleName } from "@rdavidson/theory";

export const SCALE_NAMES = [
  "major",
  "minor",
  "dorian",
  "phrygian",
  "lydian",
  "mixolydian",
  "locrian",
] as const satisfies readonly ScaleName[];

/**
 * URL is the source of truth for Guitar Lab (spec section 2):
 * ?tuning=DADGBE&capo=2&key=Bb&scale=dorian&chord=Cmaj7
 */
export const guitarLabParsers = {
  tuning: parseAsString.withDefault("EADGBE"),
  capo: parseAsInteger.withDefault(0),
  key: parseAsString.withDefault("C"),
  scale: parseAsStringLiteral(SCALE_NAMES).withDefault("major"),
  chord: parseAsString,
};

export type GuitarLabState = {
  tuning: string;
  capo: number;
  key: string;
  scale: ScaleName;
  chord: string | null;
};

export function clampCapo(fret: number): number {
  return Math.min(12, Math.max(0, fret));
}
