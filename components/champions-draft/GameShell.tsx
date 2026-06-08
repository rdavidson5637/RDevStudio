'use client'
import { useState, useCallback } from 'react'
import type { GameState } from '@/types/champions-draft'
import { buildDraftSlots } from '@/lib/champions-draft/utils'
import ModeSelect from './ModeSelect'
import LeagueSelect from './LeagueSelect'
import NationSelect from './NationSelect'
import WCDraftModeSelect from './WCDraftModeSelect'
import FormationSelect from './FormationSelect'
import DraftEngine from './DraftEngine'
import LeagueSeason from './LeagueSeason'
import ChampionsLeague from './ChampionsLeague'
import WorldCup from './WorldCup'

const initialState: GameState = {
  phase: 'mode-select',
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
  speedMode: 'normal',
}

export default function GameShell() {
  const [state, setState] = useState<GameState>(initialState)

  const update = useCallback((updates: Partial<GameState>) => {
    setState(prev => {
      const next = { ...prev, ...updates }
      if (updates.formation && !prev.formation) {
        next.draftSlots = buildDraftSlots(updates.formation)
      }
      return next
    })
  }, [])

  const exitDraft = useCallback(() => {
    setState(initialState)
  }, [])

  const goBack = useCallback(() => {
    setState(prev => {
      if (
        prev.phase === 'league-select' ||
        prev.phase === 'nation-select' ||
        prev.phase === 'wc-draft-mode-select' ||
        prev.phase === 'formation-select'
      ) {
        if (prev.phase === 'formation-select' && prev.mode === 'league') {
          return { ...prev, phase: 'league-select', selectedLeague: null }
        }
        if (prev.phase === 'formation-select' && prev.mode === 'world-cup') {
          return { ...prev, phase: 'wc-draft-mode-select', formation: null, draftSlots: [] }
        }
        if (prev.phase === 'wc-draft-mode-select') {
          return { ...prev, phase: 'nation-select', selectedNation: null, wcDraftMode: null }
        }
        return { ...prev, phase: 'mode-select', mode: null }
      }
      return prev
    })
  }, [])

  const { phase } = state

  if (phase === 'mode-select') return <ModeSelect onSelect={update} />
  if (phase === 'league-select') return <LeagueSelect onSelect={update} onBack={goBack} />
  if (phase === 'nation-select') return <NationSelect onSelect={update} onBack={goBack} />
  if (phase === 'wc-draft-mode-select' && state.selectedNation) {
    return (
      <WCDraftModeSelect
        selectedNation={state.selectedNation}
        onSelect={update}
        onBack={goBack}
      />
    )
  }
  if (phase === 'formation-select') {
    return (
      <FormationSelect
        onSelect={update}
        onBack={goBack}
        mode={state.mode}
        selectedNation={state.selectedNation}
        wcDraftMode={state.wcDraftMode}
      />
    )
  }
  if (phase === 'drafting' || phase === 'draft-complete') {
    return <DraftEngine state={state} onUpdate={update} onExit={exitDraft} />
  }

  if (phase === 'playing' && state.mode === 'league') {
    return <LeagueSeason state={state} onUpdate={update} onExit={exitDraft} />
  }

  if (phase === 'playing' && state.mode === 'champions-league') {
    return (
      <ChampionsLeague state={state} onUpdate={update} onExit={exitDraft} />
    )
  }

  if (phase === 'playing' && state.mode === 'world-cup') {
    return <WorldCup state={state} onUpdate={update} onExit={exitDraft} />
  }

  return (
    <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center">
      <p className="text-white/40 text-sm uppercase tracking-widest">
        Phase: {phase}
      </p>
    </div>
  )
}
