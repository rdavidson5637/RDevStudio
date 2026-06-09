'use client'
import { useState, useCallback, type ReactNode } from 'react'
import type { GameState } from '@/types/rugby-draft'
import { GameBugReport } from '@/components/games/GameBugReport'
import { buildDraftSlots } from '@/lib/rugby-draft/utils'
import ModeSelect from './ModeSelect'
import NationSelect from './NationSelect'
import ClubSelect from './ClubSelect'
import DraftEngine from './DraftEngine'
import SixNations from './SixNations'
import WorldCup from './WorldCup'
import ChampionsCup from './ChampionsCup'

const initialState: GameState = {
  phase: 'mode-select',
  mode: null,
  selectedNation: null,
  selectedClub: null,
  draftSlots: [],
  currentSpinSquad: null,
  eligiblePlayers: [],
  usedSquadIds: [],
  usedPlayerIds: [],
  teamRatings: null,
  leagueTable: [],
  fixtures: [],
  groups: [],
  knockoutRounds: [],
  endStats: null,
  speedMode: 'normal',
}

export default function GameShell() {
  const [state, setState] = useState<GameState>(initialState)

  const update = useCallback((updates: Partial<GameState>) => {
    setState(prev => {
      const next = { ...prev, ...updates }
      if (next.phase === 'drafting' && next.draftSlots.length === 0) {
        next.draftSlots = buildDraftSlots()
      }
      return next
    })
  }, [])

  const exitDraft = useCallback(() => {
    setState(initialState)
  }, [])

  const goBack = useCallback(() => {
    setState(prev => {
      if (prev.phase === 'nation-select') {
        return { ...prev, phase: 'mode-select', mode: null, selectedNation: null }
      }
      if (prev.phase === 'club-select') {
        return { ...prev, phase: 'mode-select', mode: null, selectedClub: null }
      }
      if (prev.phase === 'drafting') {
        if (prev.mode === 'champions-cup') {
          return {
            ...prev,
            phase: 'club-select',
            draftSlots: [],
            currentSpinSquad: null,
            eligiblePlayers: [],
            usedSquadIds: [],
            usedPlayerIds: [],
            teamRatings: null,
          }
        }
        return {
          ...prev,
          phase: 'nation-select',
          draftSlots: [],
          currentSpinSquad: null,
          eligiblePlayers: [],
          usedSquadIds: [],
          usedPlayerIds: [],
          teamRatings: null,
        }
      }
      return prev
    })
  }, [])

  const { phase } = state
  const bugContext = [phase, state.mode, state.selectedNation, state.selectedClub]
    .filter(Boolean)
    .join(' · ')

  const showBugFab = phase !== 'mode-select' && phase !== 'results'
  const bugReport = showBugFab ? (
    <GameBugReport game="Rugby Draft" context={bugContext} />
  ) : null

  let content: ReactNode

  if (phase === 'mode-select' || phase === 'results') {
    content = <ModeSelect onSelect={update} />
  } else if (phase === 'nation-select' && state.mode) {
    content = (
      <NationSelect mode={state.mode} onSelect={update} onBack={goBack} />
    )
  } else if (phase === 'club-select') {
    content = <ClubSelect onSelect={update} onBack={goBack} />
  } else if (phase === 'drafting' || phase === 'draft-complete') {
    content = <DraftEngine state={state} onUpdate={update} onExit={exitDraft} />
  } else if (phase === 'playing' && state.mode === 'six-nations') {
    content = <SixNations state={state} onUpdate={update} onExit={exitDraft} />
  } else if (phase === 'playing' && state.mode === 'world-cup') {
    content = <WorldCup state={state} onUpdate={update} onExit={exitDraft} />
  } else if (phase === 'playing' && state.mode === 'champions-cup') {
    content = <ChampionsCup state={state} onUpdate={update} onExit={exitDraft} />
  } else {
    content = (
      <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center">
        <p className="text-white/40 text-sm uppercase tracking-widest">
          Phase: {phase}
        </p>
      </div>
    )
  }

  return (
    <>
      {content}
      {bugReport}
    </>
  )
}
