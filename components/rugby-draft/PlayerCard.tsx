'use client'
import Kit from './Kit'
import type { Player } from '@/types/rugby-draft'

interface Props {
  player: Player
  onSelect: (player: Player) => void
  badge: string
}

const STAT_LABELS: Record<string, string> = {
  str: 'STR',
  spd: 'SPD',
  hnd: 'HND',
  kck: 'KCK',
  tck: 'TCK',
  stm: 'STM',
}

const STAT_ORDER = ['str', 'spd', 'hnd', 'kck', 'tck', 'stm'] as const

const POSITION_NAMES: Record<string, string> = {
  LH: 'Loosehead',
  HK: 'Hooker',
  TH: 'Tighthead',
  LL: 'Lock',
  RL: 'Lock',
  BF: 'Blindside',
  OF: 'Openside',
  N8: 'No.8',
  SH: 'Scrum-half',
  FH: 'Fly-half',
  IC: 'Inside Centre',
  OC: 'Outside Centre',
  LW: 'Wing',
  RW: 'Wing',
  FB: 'Fullback',
}

function getInitials(name: string): string {
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function PlayerCard({ player, onSelect, badge }: Props) {
  const positionName = POSITION_NAMES[player.position] ?? player.position

  return (
    <button
      onClick={() => onSelect(player)}
      className="group flex flex-col items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-xl p-3 transition-all duration-150 cursor-pointer w-full"
    >
      <Kit
        badge={badge}
        initials={getInitials(player.name)}
        overall={player.overall}
        size="lg"
      />

      <div className="text-center w-full">
        <p className="text-white font-bold text-sm leading-tight truncate">
          {player.name}
        </p>
        <p className="text-white/40 text-xs mt-0.5">
          {player.position} · {positionName}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-x-3 gap-y-1 w-full mt-1">
        {STAT_ORDER.map(key => (
          <div key={key} className="flex justify-between items-center">
            <span className="text-white/30 text-[9px] font-bold uppercase tracking-wide">
              {STAT_LABELS[key]}
            </span>
            <span className="text-white/80 text-[10px] font-bold">
              {player.stats[key]}
            </span>
          </div>
        ))}
      </div>
    </button>
  )
}
