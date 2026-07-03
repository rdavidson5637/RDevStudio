"use client";
import { useState, useCallback } from "react";
import type { GameState, Player, Squad, DraftSlot } from "@/types/rugby-draft";
import {
  getEligiblePlayers,
  getEmptySlots,
  getNextEmptySlotIndex,
  calculateTeamRatings,
  squadHasEligibleNationalPlayers,
  COMPATIBLE_POSITIONS,
} from "@/lib/rugby-draft/utils";
import { getDraftPool } from "@/lib/rugby-draft/data";
import Pitch from "./Pitch";
import PlayerCard from "./PlayerCard";
import QuitButton from "./QuitButton";
import QuitConfirmModal from "./QuitConfirmModal";

interface Props {
  state: GameState;
  onUpdate: (updates: Partial<GameState>) => void;
  onExit: () => void;
}

function spinRandomSquad(
  slots: DraftSlot[],
  squads: Squad[],
  nationality?: string,
  excludedPlayerIds?: string[],
): { squad: Squad; eligible: Player[] } | null {
  const emptySlots = getEmptySlots(slots);
  if (emptySlots.length === 0) return null;

  const available = squads.filter((s) => {
    if (nationality) {
      return squadHasEligibleNationalPlayers(
        s,
        emptySlots,
        nationality,
        excludedPlayerIds,
      );
    }
    return (
      getEligiblePlayers(s, emptySlots, undefined, excludedPlayerIds).length > 0
    );
  });
  if (available.length === 0) return null;

  const shuffled = [...available].sort(() => Math.random() - 0.5);

  for (const squad of shuffled) {
    const eligible = getEligiblePlayers(
      squad,
      emptySlots,
      nationality,
      excludedPlayerIds,
    );
    if (eligible.length > 0) {
      return { squad, eligible };
    }
  }

  return null;
}

function assignPlayerToSlot(
  slots: DraftSlot[],
  player: Player,
  badge: string,
): DraftSlot[] {
  const playerWithBadge = { ...player, badge } as Player & { badge: string };
  const compatible = COMPATIBLE_POSITIONS[player.position] ?? [player.position];

  const match = slots
    .map((slot, index) => ({ slot, index }))
    .find(
      ({ slot }) => slot.player === null && compatible.includes(slot.position),
    );

  if (!match) return slots;

  const newSlots = [...slots];
  newSlots[match.index] = {
    ...newSlots[match.index],
    player: playerWithBadge,
  };
  return newSlots;
}

export default function DraftEngine({ state, onUpdate, onExit }: Props) {
  const [spinning, setSpinning] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const [spinFailed, setSpinFailed] = useState(false);
  const { draftSlots, currentSpinSquad, eligiblePlayers, usedPlayerIds } =
    state;

  const draftPool = getDraftPool(state.mode!);

  const filledCount = draftSlots.filter((s) => s.player !== null).length;
  const totalSlots = draftSlots.length;
  const isDraftComplete = filledCount === totalSlots;
  const nextSlotIndex = getNextEmptySlotIndex(draftSlots);

  const handleSpin = useCallback(() => {
    setSpinning(true);
    setSpinFailed(false);
    setTimeout(() => {
      const result = spinRandomSquad(
        draftSlots,
        draftPool,
        undefined,
        usedPlayerIds,
      );
      if (result) {
        onUpdate({
          currentSpinSquad: result.squad,
          eligiblePlayers: result.eligible,
        });
      } else {
        setSpinFailed(true);
      }
      setSpinning(false);
    }, 600);
  }, [usedPlayerIds, draftSlots, onUpdate, draftPool]);

  const handleSelectPlayer = useCallback(
    (player: Player) => {
      if (!currentSpinSquad) return;
      const badge = currentSpinSquad.badge;
      const newSlots = assignPlayerToSlot(draftSlots, player, badge);
      if (newSlots === draftSlots) return;
      const newFilledCount = newSlots.filter((s) => s.player !== null).length;
      const complete = newFilledCount === totalSlots;
      const ratings = complete ? calculateTeamRatings(newSlots) : null;

      onUpdate({
        draftSlots: newSlots,
        currentSpinSquad: null,
        eligiblePlayers: [],
        usedPlayerIds: [...usedPlayerIds, player.id],
        ...(complete && { phase: "draft-complete", teamRatings: ratings }),
      });
    },
    [currentSpinSquad, draftSlots, totalSlots, usedPlayerIds, onUpdate],
  );

  const teamLabel =
    state.mode === "champions-cup" ? state.selectedClub : state.selectedNation;

  return (
    <div className="min-h-screen bg-[#0a0a12] flex flex-col">
      <div className="sticky top-0 z-20 bg-[#0a0a12]/95 backdrop-blur border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <QuitButton
          onQuit={() => setShowQuitConfirm(true)}
          label="← Quit Draft"
        />
        <p className="text-white/30 text-xs uppercase tracking-widest">
          {filledCount} / {totalSlots} drafted
        </p>
      </div>

      {showQuitConfirm && (
        <QuitConfirmModal
          title="Quit Draft?"
          message="Your progress will be lost and you'll return to the main menu."
          cancelLabel="Keep Drafting"
          onCancel={() => setShowQuitConfirm(false)}
          onConfirm={onExit}
        />
      )}

      <div className="flex flex-col lg:flex-row flex-1">
        <div className="w-full lg:w-[45%] xl:w-[40%] px-3 py-4 lg:px-6 lg:py-8 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white font-black text-lg uppercase tracking-tight">
                Draft Your XV
              </h2>
              <p className="text-white/40 text-xs mt-0.5">
                {filledCount} / {totalSlots} players drafted
                {teamLabel ? ` · ${teamLabel}` : ""}
              </p>
            </div>
            <div className="flex gap-1 flex-wrap justify-end max-w-[120px]">
              {draftSlots.map((slot, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    slot.player
                      ? "bg-emerald-400"
                      : i === nextSlotIndex
                        ? "bg-white animate-pulse"
                        : "bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex-1 max-w-[320px] mx-auto w-full">
            <Pitch slots={draftSlots} nextSlotIndex={nextSlotIndex} />
          </div>
        </div>

        <div className="w-full lg:w-[55%] xl:w-[60%] px-3 py-4 lg:px-6 lg:py-8 border-t lg:border-t-0 lg:border-l border-white/10">
          {isDraftComplete ? (
            <div className="max-w-md mx-auto text-center py-8">
              <p className="text-emerald-400 text-xs font-black uppercase tracking-[0.2em] mb-2">
                Draft Complete
              </p>
              <h3 className="text-white font-black text-3xl uppercase tracking-tight mb-6">
                Your XV is Ready
              </h3>
              {state.teamRatings && (
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {(
                    [
                      ["Forwards", state.teamRatings.forwards],
                      ["Backs", state.teamRatings.backs],
                      ["Overall", state.teamRatings.overall],
                    ] as const
                  ).map(([label, value]) => (
                    <div
                      key={label}
                      className="bg-white/5 border border-white/10 rounded-xl p-4"
                    >
                      <p className="text-white/40 text-[10px] uppercase tracking-widest">
                        {label}
                      </p>
                      <p className="text-white font-black text-2xl mt-1">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => onUpdate({ phase: "playing" })}
                className="w-full py-4 bg-white text-black font-black text-sm uppercase tracking-widest rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all"
              >
                Start Tournament →
              </button>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              {!currentSpinSquad ? (
                <div className="text-center py-8">
                  <button
                    onClick={handleSpin}
                    disabled={spinning || nextSlotIndex < 0}
                    className="w-full py-5 bg-white text-black font-black text-lg uppercase tracking-widest rounded-2xl hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {spinning ? "Spinning…" : "Spin Squad"}
                  </button>
                  {spinFailed && (
                    <p className="text-red-400 text-sm mt-4">
                      No squads left with players who fit your open positions.
                      Try a different draft strategy.
                    </p>
                  )}
                  {nextSlotIndex >= 0 && (
                    <p className="text-white/30 text-xs mt-4 uppercase tracking-widest">
                      Next: {draftSlots[nextSlotIndex].position}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black"
                      style={{
                        backgroundColor: `var(--badge-${currentSpinSquad.badge}, #333)`,
                      }}
                    >
                      {currentSpinSquad.badge.slice(0, 3)}
                    </div>
                    <div>
                      <p className="text-white font-black uppercase tracking-tight">
                        {currentSpinSquad.club}
                      </p>
                      <p className="text-white/40 text-xs">
                        {currentSpinSquad.season} · Pick any player who fits an
                        open slot
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto">
                    {eligiblePlayers.map((player) => (
                      <PlayerCard
                        key={player.id}
                        player={player}
                        onSelect={handleSelectPlayer}
                        badge={currentSpinSquad.badge}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
