import type { ComponentType } from "react";
import { ChampionsDraftCover } from "./ChampionsDraftCover";
import { DraftAnalyserCover } from "./DraftAnalyserCover";
import { FallbackCover } from "./FallbackCover";
import { GigRadarCover } from "./GigRadarCover";
import { GuitarLabCover } from "./GuitarLabCover";
import { LongestWordCover } from "./LongestWordCover";
import { PubQuizCover } from "./PubQuizCover";
import { RugbyDraftCover } from "./RugbyDraftCover";
import { StoutFinderCover } from "./StoutFinderCover";
import { WardrobeCover } from "./WardrobeCover";

export const coverMap: Record<string, ComponentType> = {
  "champions-draft": ChampionsDraftCover,
  "rugby-draft": RugbyDraftCover,
  "pub-quiz": PubQuizCover,
  "longest-word": LongestWordCover,
  "stout-finder": StoutFinderCover,
  "draft-analyser": DraftAnalyserCover,
  "wardrobe-ai": WardrobeCover,
  "gig-radar": GigRadarCover,
  "guitar-lab": GuitarLabCover,
};

export function ProductCover({ slug, initial }: { slug: string; initial?: string }) {
  const Cover = coverMap[slug];
  if (!Cover) return <FallbackCover initial={initial ?? slug} />;
  return <Cover />;
}
