import type { DraftSlot } from '@/types/champions-draft'
import { SITE_URL } from '@/lib/constants'

export interface ShareSquadPlayer {
  name: string
  position: string
  overall: number
}

export const SHARE_PLAY_URL =
  process.env.NEXT_PUBLIC_GAME_URL?.trim() ||
  `${SITE_URL}/champions-draft`;

export const SHARE_CHALLENGE = 'Think you can beat my XI?'

const POSITION_ORDER: Record<string, number> = {
  GK: 0,
  CB: 1,
  LB: 2,
  RB: 3,
  CDM: 4,
  CM: 5,
  CAM: 6,
  LM: 7,
  RM: 8,
  LW: 9,
  RW: 10,
  CF: 11,
  ST: 12,
}

export function getShareSquadFromSlots(slots: DraftSlot[]): ShareSquadPlayer[] {
  return slots
    .filter(s => s.player)
    .map(s => ({
      name: s.player!.name,
      position: s.position,
      overall: s.player!.overall,
    }))
}

export function sortSquadForDisplay(
  players: ShareSquadPlayer[]
): ShareSquadPlayer[] {
  return [...players].sort(
    (a, b) =>
      (POSITION_ORDER[a.position] ?? 99) - (POSITION_ORDER[b.position] ?? 99)
  )
}

export function getSquadAvgOvr(players: ShareSquadPlayer[]): number {
  if (players.length === 0) return 0
  const total = players.reduce((sum, p) => sum + p.overall, 0)
  return Math.round(total / players.length)
}

export function getPositionStyle(position: string): string {
  if (position === 'GK') return 'text-amber-300 bg-amber-400/15'
  if (['CB', 'LB', 'RB'].includes(position)) return 'text-sky-300 bg-sky-400/15'
  if (['CDM', 'CM', 'CAM', 'LM', 'RM'].includes(position)) {
    return 'text-emerald-300 bg-emerald-400/15'
  }
  return 'text-rose-300 bg-rose-400/15'
}

export function formatSquadShareLines(players: ShareSquadPlayer[]): string {
  if (players.length === 0) return ''
  return sortSquadForDisplay(players)
    .map(p => `${p.position} ${p.name} (${p.overall})`)
    .join('\n')
}

export function getShareUrl(): string {
  if (SHARE_PLAY_URL) return SHARE_PLAY_URL
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/champions-draft`
  }
  return '/champions-draft'
}
