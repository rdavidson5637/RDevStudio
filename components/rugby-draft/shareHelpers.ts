import type { DraftSlot, LeagueTableRow } from '@/types/rugby-draft'
import { SITE_URL } from '@/lib/constants'
import { sortTable } from '@/lib/rugby-draft/utils'

export interface ShareAward {
  label: string
  icon: string
  tone: 'gold' | 'silver' | 'bronze' | 'muted'
}

export interface SixNationsAwards {
  championship: string
  grandSlam: string | null
  tripleCrown: string | null
  woodenSpoon: string
}

export function getSixNationsUserAwards(
  userTeam: string,
  awards: SixNationsAwards
): ShareAward[] {
  const earned: ShareAward[] = []

  if (awards.championship === userTeam) {
    earned.push({
      label: 'Six Nations Champions',
      icon: '🏆',
      tone: 'gold',
    })
  }
  if (awards.grandSlam === userTeam) {
    earned.push({ label: 'Grand Slam', icon: '⭐', tone: 'gold' })
  }
  if (awards.tripleCrown === userTeam) {
    earned.push({ label: 'Triple Crown', icon: '👑', tone: 'gold' })
  }
  if (awards.woodenSpoon === userTeam) {
    earned.push({ label: 'Wooden Spoon', icon: '🥄', tone: 'muted' })
  }

  return earned
}

export function getKnockoutUserAwards(
  userTeam: string,
  winner: string,
  eliminatedAt: string | null,
  tournamentLabel: string
): ShareAward[] {
  const earned: ShareAward[] = []

  if (winner === userTeam) {
    earned.push({
      label: `${tournamentLabel} Champions`,
      icon: '🏆',
      tone: 'gold',
    })
    return earned
  }

  const milestoneAwards: Record<string, ShareAward> = {
    Final: { label: 'Finalists', icon: '🥈', tone: 'silver' },
    'Semi-Final': { label: 'Semi-Finalists', icon: '🏟️', tone: 'silver' },
    'Quarter-Final': { label: 'Quarter-Finalists', icon: '🏟️', tone: 'bronze' },
    'Last 16': { label: 'Last 16', icon: '🏟️', tone: 'bronze' },
    'Pool Stage': { label: 'Eliminated in Pool Stage', icon: '📋', tone: 'muted' },
  }

  if (eliminatedAt && milestoneAwards[eliminatedAt]) {
    earned.push(milestoneAwards[eliminatedAt])
  }

  return earned
}

export function getPoolWinnerAward(
  userTeam: string,
  poolTable: LeagueTableRow[]
): ShareAward | null {
  const sorted = sortTable(poolTable)
  if (sorted[0]?.club !== userTeam) return null
  return { label: 'Pool Winners', icon: '📊', tone: 'gold' }
}

export function formatAwardsForShare(awards: ShareAward[]): string {
  if (awards.length === 0) return ''
  return awards.map(a => `${a.icon} ${a.label}`).join(' · ')
}

export function getPlayerOfTournament(draftSlots: DraftSlot[]): {
  playerName: string
  club: string
  overall: number
} {
  const best = draftSlots
    .filter(s => s.player)
    .sort((a, b) => (b.player?.overall ?? 0) - (a.player?.overall ?? 0))[0]
  return {
    playerName: best?.player?.name ?? '—',
    club: best?.player?.club ?? best?.player?.nationality ?? '',
    overall: best?.player?.overall ?? 0,
  }
}

const TRY_SCORER_POSITIONS = ['LW', 'RW', 'IC', 'OC', 'FB', 'FH']

export function getTryScorerCandidates(
  slots: DraftSlot[]
): { name: string; weight: number }[] {
  return slots
    .filter(
      s => s.player && TRY_SCORER_POSITIONS.includes(s.player.position)
    )
    .map(s => ({
      name: s.player!.name,
      weight: s.player!.stats.spd + s.player!.stats.hnd,
    }))
}

export interface ShareSquadPlayer {
  name: string
  position: string
  overall: number
}

export const SHARE_PLAY_URL =
  process.env.NEXT_PUBLIC_GAME_URL?.trim() ||
  `${SITE_URL}/rugby-draft`

export const SHARE_CHALLENGE = 'Think you can beat my XV?'

export const SHARE_CARD_CAPTURE_ID = 'rugby-draft-share-card'

const POSITION_ORDER: Record<string, number> = {
  LH: 0,
  HK: 1,
  TH: 2,
  LL: 3,
  RL: 4,
  BF: 5,
  OF: 6,
  N8: 7,
  SH: 8,
  FH: 9,
  IC: 10,
  OC: 11,
  LW: 12,
  RW: 13,
  FB: 14,
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
  if (['LH', 'HK', 'TH', 'LL', 'RL', 'BF', 'OF', 'N8'].includes(position)) {
    return 'text-sky-300 bg-sky-400/15'
  }
  if (['SH', 'FH'].includes(position)) {
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
    return `${window.location.origin}/rugby-draft`
  }
  return '/rugby-draft'
}
