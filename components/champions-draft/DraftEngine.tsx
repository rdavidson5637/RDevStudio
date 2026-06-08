'use client'
import { useState, useCallback } from 'react'
import type { GameState, Player, Squad, DraftSlot } from '@/types/champions-draft'
import {
  getEligiblePlayers,
  getEmptySlots,
  calculateTeamRatings,
  squadHasEligibleNationalPlayers,
} from '@/lib/champions-draft/utils'
import { getDraftPool, getNationalityForNation } from '@/lib/champions-draft/data'
import Pitch from './Pitch'
import PlayerCard from './PlayerCard'

interface Props {
  state: GameState
  onUpdate: (updates: Partial<GameState>) => void
  onExit: () => void
}

function getNextEmptySlotIndex(slots: DraftSlot[]): number {
  return slots.findIndex(s => s.player === null)
}

function spinRandomSquad(
  usedSquadIds: string[],
  usedPlayerIds: string[],
  slots: DraftSlot[],
  squads: Squad[],
  nationality?: string,
  nationalSquadMode = false
): { squad: Squad; eligible: Player[] } | null {
  const emptySlots = getEmptySlots(slots)
  if (emptySlots.length === 0) return null

  const available = squads.filter(s => {
    if (!nationalSquadMode && usedSquadIds.includes(s.club + s.season)) {
      return false
    }
    if (nationality) {
      return squadHasEligibleNationalPlayers(
        s,
        emptySlots,
        nationality,
        nationalSquadMode ? usedPlayerIds : undefined
      )
    }
    return true
  })
  if (available.length === 0) return null

  const shuffled = [...available].sort(() => Math.random() - 0.5)

  for (const squad of shuffled) {
    const eligible = getEligiblePlayers(
      squad,
      emptySlots,
      nationality,
      nationalSquadMode ? usedPlayerIds : undefined
    )
    if (eligible.length > 0) {
      return { squad, eligible }
    }
  }

  return null
}

function assignPlayerToSlot(
  slots: DraftSlot[],
  player: Player,
  badge: string
): DraftSlot[] {
  const playerWithBadge = { ...player, badge } as Player & { badge: string }
  const emptySlots = slots
    .map((s, i) => ({ slot: s, index: i }))
    .filter(({ slot }) => slot.player === null)

  const { COMPATIBLE_POSITIONS } = require('@/lib/champions-draft/utils')
  const compatible = COMPATIBLE_POSITIONS[player.position] ?? [player.position]

  const exactMatch = emptySlots.find(({ slot }) =>
    compatible.includes(slot.position)
  )

  if (!exactMatch) return slots

  const newSlots = [...slots]
  newSlots[exactMatch.index] = {
    ...newSlots[exactMatch.index],
    player: playerWithBadge,
  }
  return newSlots
}

export default function DraftEngine({ state, onUpdate, onExit }: Props) {
  const [spinning, setSpinning] = useState(false)
  const [showQuitConfirm, setShowQuitConfirm] = useState(false)
  const [spinFailed, setSpinFailed] = useState(false)
  const { draftSlots, currentSpinSquad, eligiblePlayers, usedSquadIds, usedPlayerIds } =
    state

  const isNationalWC = Boolean(
    state.mode === 'world-cup' &&
      state.wcDraftMode === 'national' &&
      state.selectedNation
  )
  const nationalityFilter = isNationalWC
    ? getNationalityForNation(state.selectedNation!) ?? undefined
    : undefined
  const draftPool = getDraftPool(state.mode, state.wcDraftMode)

  const filledCount = draftSlots.filter(s => s.player !== null).length
  const totalSlots = draftSlots.length
  const isDraftComplete = filledCount === totalSlots
  const nextSlotIndex = getNextEmptySlotIndex(draftSlots)

  const handleSpin = useCallback(() => {
    setSpinning(true)
    setSpinFailed(false)
    setTimeout(() => {
      const result = spinRandomSquad(
        usedSquadIds,
        usedPlayerIds,
        draftSlots,
        draftPool,
        nationalityFilter,
        isNationalWC
      )
      if (result) {
        onUpdate({
          currentSpinSquad: result.squad,
          eligiblePlayers: result.eligible,
          ...(!isNationalWC && {
            usedSquadIds: [
              ...usedSquadIds,
              result.squad.club + result.squad.season,
            ],
          }),
        })
      } else {
        setSpinFailed(true)
      }
      setSpinning(false)
    }, 600)
  }, [
    usedSquadIds,
    usedPlayerIds,
    draftSlots,
    onUpdate,
    nationalityFilter,
    draftPool,
    isNationalWC,
  ])

  const handleSelectPlayer = useCallback((player: Player) => {
    if (!currentSpinSquad) return
    const badge = currentSpinSquad.badge
    const newSlots = assignPlayerToSlot(draftSlots, player, badge)
    const newFilledCount = newSlots.filter(s => s.player !== null).length
    const complete = newFilledCount === totalSlots
    const ratings = complete ? calculateTeamRatings(newSlots) : null

    onUpdate({
      draftSlots: newSlots,
      currentSpinSquad: null,
      eligiblePlayers: [],
      ...(isNationalWC && {
        usedPlayerIds: [...usedPlayerIds, player.id],
      }),
      ...(complete && { phase: 'draft-complete', teamRatings: ratings }),
    })
  }, [
    currentSpinSquad,
    draftSlots,
    totalSlots,
    onUpdate,
    isNationalWC,
    usedPlayerIds,
  ])

  return (
    <div className="min-h-screen bg-[#0a0a12] flex flex-col">
      <div className="sticky top-0 z-20 bg-[#0a0a12]/95 backdrop-blur border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setShowQuitConfirm(true)}
          className="text-white/50 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors"
        >
          ← Quit Draft
        </button>
        <p className="text-white/30 text-xs uppercase tracking-widest">
          {filledCount} / {totalSlots} drafted
        </p>
      </div>

      {showQuitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-[#12121c] border border-white/10 rounded-2xl p-6 max-w-sm w-full text-center">
            <h3 className="text-white font-black text-xl uppercase tracking-tight">
              Quit Draft?
            </h3>
            <p className="text-white/40 text-sm mt-2">
              Your progress will be lost and you&apos;ll return to the main menu.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowQuitConfirm(false)}
                className="flex-1 py-3 rounded-xl bg-white/10 text-white font-bold text-sm uppercase tracking-wide hover:bg-white/20 transition-colors"
              >
                Keep Drafting
              </button>
              <button
                onClick={onExit}
                className="flex-1 py-3 rounded-xl bg-red-500/20 text-red-400 font-bold text-sm uppercase tracking-wide hover:bg-red-500/30 transition-colors"
              >
                Quit
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row flex-1">
      <div className="w-full lg:w-[45%] xl:w-[40%] px-3 py-4 lg:px-6 lg:py-8 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white font-black text-lg uppercase tracking-tight">
              Draft Your XI
            </h2>
            <p className="text-white/40 text-xs mt-0.5">
              {filledCount} / {totalSlots} players drafted
              {isNationalWC && state.selectedNation
                ? ` · ${state.selectedNation} only`
                : state.mode === 'world-cup' && state.selectedNation
                  ? ` · ${state.selectedNation}`
                  : ''}
            </p>
          </div>
          <div className="flex gap-1">
            {draftSlots.map((slot, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  slot.player ? 'bg-emerald-400' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 max-w-[320px] mx-auto w-full">
          <Pitch slots={draftSlots} nextSlotIndex={nextSlotIndex} />
        </div>
      </div>

      <div className="w-full lg:w-[55%] xl:w-[60%] px-3 py-4 lg:px-6 lg:py-8 flex flex-col">

        {!isDraftComplete && !currentSpinSquad && (
          <div className="flex flex-col items-center justify-center flex-1 gap-6">
            <button
              onClick={handleSpin}
              disabled={spinning}
              className="relative px-10 py-4 bg-white text-black font-black text-lg uppercase tracking-widest rounded-xl hover:bg-white/90 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {spinning ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Spinning...
                </span>
              ) : (
                'Spin Squad'
              )}
            </button>
            <p className="text-white/20 text-xs uppercase tracking-widest">
              {isNationalWC
                ? 'Classic & international squads · national players only'
                : 'Random classic squad'}
            </p>
            {spinFailed && (
              <p className="text-amber-400/80 text-xs text-center max-w-xs leading-relaxed">
                No eligible {state.selectedNation} players left for your open
                positions. Try a different formation or switch to Dream Team.
              </p>
            )}
          </div>
        )}

        {!isDraftComplete && currentSpinSquad && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest">
                  Choose one player
                </p>
                <h3 className="text-white font-black text-xl mt-0.5">
                  {currentSpinSquad.club}
                  <span className="text-white/30 font-normal text-sm ml-2">
                    {currentSpinSquad.season}
                  </span>
                </h3>
              </div>
              <span className="text-xs text-white/20 uppercase tracking-widest border border-white/10 rounded-full px-3 py-1">
                {currentSpinSquad.league}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {eligiblePlayers.map(player => (
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

        {isDraftComplete && (
          <div className="flex flex-col items-center justify-center flex-1 gap-6 text-center">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-2">
                Squad complete
              </p>
              <h3 className="text-white font-black text-3xl">
                Your XI is ready
              </h3>
            </div>
            {state.teamRatings && (
              <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                {[
                  { label: 'Attack', value: state.teamRatings.attack },
                  { label: 'Midfield', value: state.teamRatings.midfield },
                  { label: 'Defence', value: state.teamRatings.defence },
                  { label: 'GK', value: state.teamRatings.goalkeeper },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-white/40 text-xs uppercase tracking-widest">{label}</p>
                    <p className="text-white font-black text-3xl mt-1">{value}</p>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => onUpdate({ phase: 'playing' })}
              className="px-10 py-4 bg-white text-black font-black text-lg uppercase tracking-widest rounded-xl hover:bg-white/90 active:scale-95 transition-all duration-150"
            >
              Start {state.mode === 'league' ? 'Season' : state.mode === 'champions-league' ? 'Champions League' : 'World Cup'}
            </button>
          </div>
        )}

      </div>
      </div>
    </div>
  )
}
