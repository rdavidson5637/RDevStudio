'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { GameState } from '@/types/champions-draft'
import BrandLogo from './BrandLogo'
import { InlineGameBugReport } from '@/components/games/GameBugReport'
import HowToPlayModal from './HowToPlayModal'

interface Props {
  onSelect: (updates: Partial<GameState>) => void
}

const MODES = [
  {
    id: 'league',
    title: 'League Season',
    subtitle: 'Draft your XI then compete in a full league season',
    icon: '🏆',
    detail: 'Pick a league. Play every team. Win the title.',
    accent: 'hover:border-emerald-400/40 group-hover:shadow-emerald-400/10',
    iconBg: 'bg-emerald-400/10',
  },
  {
    id: 'champions-league',
    title: 'Champions League',
    subtitle: 'Group stage through to the final',
    icon: '⭐',
    detail: 'League phase. Knockouts. Final. Glory.',
    accent: 'hover:border-amber-400/40 group-hover:shadow-amber-400/10',
    iconBg: 'bg-amber-400/10',
  },
  {
    id: 'world-cup',
    title: 'World Cup',
    subtitle: 'Represent a nation and win the World Cup',
    icon: '🌍',
    detail: 'Choose your nation. Draft your squad. Win it all.',
    accent: 'hover:border-sky-400/40 group-hover:shadow-sky-400/10',
    iconBg: 'bg-sky-400/10',
  },
]

export default function ModeSelect({ onSelect }: Props) {
  const [showHowToPlay, setShowHowToPlay] = useState(false)
  const [logoLoaded, setLogoLoaded] = useState(false)

  return (
    <div className="relative min-h-screen bg-[#0a0a12] flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      <Link
        href="/bored"
        className="fixed top-4 left-4 z-50 rounded-full border border-white/15 bg-black/50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/70 backdrop-blur transition-colors hover:border-white/30 hover:text-white"
      >
        ← RDev Studio
      </Link>
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-emerald-400/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-72 h-72 bg-amber-400/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mb-10 text-center max-w-xl">
        <div className="flex justify-center mb-4">
          <BrandLogo variant="hero" onLoad={() => setLogoLoaded(true)} />
        </div>
        {!logoLoaded && (
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-[0.95] mb-4">
            Champions
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-white to-amber-300">
              Draft
            </span>
          </h1>
        )}
        <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.25em] mb-3">
          Spin · Draft · Compete
        </p>
        <p className="text-white/45 text-sm md:text-base leading-relaxed">
          Spin iconic squads, draft your ultimate XI, and see how far you can go.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setShowHowToPlay(true)}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white/60 transition-all hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
          >
            <span>📖</span>
            How to Play
          </button>
          <InlineGameBugReport game="Champions Draft" context="mode-select" />
        </div>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {MODES.map(mode => (
          <button
            key={mode.id}
            onClick={() =>
              onSelect({
                mode: mode.id as GameState['mode'],
                phase:
                  mode.id === 'league'
                    ? 'league-select'
                    : mode.id === 'world-cup'
                    ? 'nation-select'
                    : 'formation-select',
              })
            }
            className={`group relative flex flex-col gap-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-2xl p-6 text-left transition-all duration-200 cursor-pointer hover:scale-[1.02] hover:shadow-xl ${mode.accent}`}
          >
            <span
              className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-2xl ${mode.iconBg}`}
            >
              {mode.icon}
            </span>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">
                {mode.title}
              </h2>
              <p className="text-white/40 text-sm mt-1.5 leading-snug">
                {mode.detail}
              </p>
            </div>
            <div className="mt-auto pt-4 border-t border-white/10">
              <span className="text-white/30 text-xs uppercase tracking-widest group-hover:text-white/70 transition-colors">
                Play →
              </span>
            </div>
          </button>
        ))}
      </div>

      <p className="relative text-white/20 text-xs mt-12 tracking-widest uppercase text-center">
        50 iconic squads · League · Champions League · World Cup
      </p>

      {showHowToPlay && (
        <HowToPlayModal onClose={() => setShowHowToPlay(false)} />
      )}
    </div>
  )
}
