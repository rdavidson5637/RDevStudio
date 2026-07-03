"use client";
import { useState, useCallback, type ReactNode } from "react";
import type { GameState } from "@/types/champions-draft";
import { GameBugReport } from "@/components/games/GameBugReport";
import { buildDraftSlots } from "@/lib/champions-draft/utils";
import ModeSelect from "./ModeSelect";
import LeagueSelect from "./LeagueSelect";
import NationSelect from "./NationSelect";
import WCDraftModeSelect from "./WCDraftModeSelect";
import FormationSelect from "./FormationSelect";
import DraftEngine from "./DraftEngine";
import LeagueSeason from "./LeagueSeason";
import ChampionsLeague from "./ChampionsLeague";
import WorldCup from "./WorldCup";

const initialState: GameState = {
  phase: "mode-select",
  mode: null,
  selectedLeague: null,
  selectedNation: null,
  wcDraftMode: null,
  formation: null,
  draftSlots: [],
  currentSpinSquad: null,
  eligiblePlayers: [],
  usedSquadIds: [],
  usedPlayerIds: [],
  teamRatings: null,
  leagueTable: [],
  fixtures: [],
  clGroups: [],
  wcGroups: [],
  knockoutRounds: [],
  endStats: null,
  speedMode: "normal",
};

export default function GameShell() {
  const [state, setState] = useState<GameState>(initialState);

  const update = useCallback((updates: Partial<GameState>) => {
    setState((prev) => {
      const next = { ...prev, ...updates };
      if (updates.formation && !prev.formation) {
        next.draftSlots = buildDraftSlots(updates.formation);
      }
      return next;
    });
  }, []);

  const exitDraft = useCallback(() => {
    setState(initialState);
  }, []);

  const goBack = useCallback(() => {
    setState((prev) => {
      if (
        prev.phase === "league-select" ||
        prev.phase === "nation-select" ||
        prev.phase === "wc-draft-mode-select" ||
        prev.phase === "formation-select"
      ) {
        if (prev.phase === "formation-select" && prev.mode === "league") {
          return { ...prev, phase: "league-select", selectedLeague: null };
        }
        if (prev.phase === "formation-select" && prev.mode === "world-cup") {
          return {
            ...prev,
            phase: "wc-draft-mode-select",
            formation: null,
            draftSlots: [],
          };
        }
        if (prev.phase === "wc-draft-mode-select") {
          return {
            ...prev,
            phase: "nation-select",
            selectedNation: null,
            wcDraftMode: null,
          };
        }
        return { ...prev, phase: "mode-select", mode: null };
      }
      return prev;
    });
  }, []);

  const { phase } = state;
  const bugContext = [
    phase,
    state.mode,
    state.selectedLeague,
    state.selectedNation,
    state.formation,
  ]
    .filter(Boolean)
    .join(" · ");

  const showBugFab = phase !== "mode-select";
  const bugReport = showBugFab ? (
    <GameBugReport game="Champions Draft" context={bugContext} />
  ) : null;

  if (phase === "mode-select") {
    return <ModeSelect onSelect={update} />;
  }

  let content: ReactNode;

  if (phase === "league-select") {
    content = <LeagueSelect onSelect={update} onBack={goBack} />;
  } else if (phase === "nation-select") {
    content = <NationSelect onSelect={update} onBack={goBack} />;
  } else if (phase === "wc-draft-mode-select" && state.selectedNation) {
    content = (
      <WCDraftModeSelect
        selectedNation={state.selectedNation}
        onSelect={update}
        onBack={goBack}
      />
    );
  } else if (phase === "formation-select") {
    content = (
      <FormationSelect
        onSelect={update}
        onBack={goBack}
        mode={state.mode}
        selectedNation={state.selectedNation}
        wcDraftMode={state.wcDraftMode}
      />
    );
  } else if (phase === "drafting" || phase === "draft-complete") {
    content = (
      <DraftEngine state={state} onUpdate={update} onExit={exitDraft} />
    );
  } else if (phase === "playing" && state.mode === "league") {
    content = (
      <LeagueSeason state={state} onUpdate={update} onExit={exitDraft} />
    );
  } else if (phase === "playing" && state.mode === "champions-league") {
    content = (
      <ChampionsLeague state={state} onUpdate={update} onExit={exitDraft} />
    );
  } else if (phase === "playing" && state.mode === "world-cup") {
    content = <WorldCup state={state} onUpdate={update} onExit={exitDraft} />;
  } else {
    content = (
      <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center">
        <p className="text-white/40 text-sm uppercase tracking-widest">
          Phase: {phase}
        </p>
      </div>
    );
  }

  return (
    <>
      {content}
      {bugReport}
    </>
  );
}
