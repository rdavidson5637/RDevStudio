'use client'
import type { GameState, GameMode } from '@/types/rugby-draft'
import { RUGBY_POSITIONS } from '@/lib/rugby-draft/utils'
import ShareCardActions from './ShareCardActions'
import {
  formatAwardsForShare,
  formatSquadShareLines,
  getShareSquadFromSlots,
  getShareUrl,
  SHARE_CARD_CAPTURE_ID,
  SHARE_CHALLENGE,
  sortSquadForDisplay,
  type ShareAward,
} from './shareHelpers'

interface Props {
  state: GameState
  userTeam: string
  result: string
  awards?: ShareAward[]
  onClose: () => void
}

const AWARD_TONE_STYLES: Record<ShareAward['tone'], string> = {
  gold: 'bg-amber-400/10 border-amber-400/30 text-amber-300',
  silver: 'bg-white/10 border-white/20 text-white/80',
  bronze: 'bg-orange-400/10 border-orange-400/25 text-orange-200',
  muted: 'bg-white/5 border-white/10 text-white/45',
}

const MODE_LABELS: Record<GameMode, string> = {
  'world-cup': 'Rugby World Cup',
  'six-nations': 'Six Nations',
  'champions-cup': 'Champions Cup',
}

function buildShareText(
  userTeam: string,
  modeLabel: string,
  result: string,
  awards: ShareAward[],
  squadLines: string,
  ratings: { forwards: number; backs: number; overall: number } | null,
  url: string
): string {
  const ratingLine = ratings
    ? `FWD ${ratings.forwards} · BCK ${ratings.backs} · OVR ${ratings.overall}`
    : ''
  const awardsLine = formatAwardsForShare(awards)

  return [
    '🏉 Rugby Draft',
    '',
    `${userTeam} · ${modeLabel}`,
    result,
    awardsLine,
    '',
    'My XV:',
    squadLines,
    '',
    ratingLine,
    '',
    SHARE_CHALLENGE,
    '',
    `Play now → ${url}`,
  ]
    .filter(Boolean)
    .join('\n')
}

export default function ShareCard({
  state,
  userTeam,
  result,
  awards = [],
  onClose,
}: Props) {
  const mode = state.mode ?? 'world-cup'
  const modeLabel = MODE_LABELS[mode]
  const squad = sortSquadForDisplay(getShareSquadFromSlots(state.draftSlots))
  const ratings = state.teamRatings
  const shareUrl = getShareUrl()
  const shareText = buildShareText(
    userTeam,
    modeLabel,
    result,
    awards,
    formatSquadShareLines(squad),
    ratings,
    shareUrl
  )

  const slotsByPosition = RUGBY_POSITIONS.map(pos => {
    const slot = state.draftSlots.find(s => s.position === pos)
    return { position: pos, player: slot?.player ?? null }
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8 overflow-y-auto">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <p className="text-white/40 text-xs uppercase tracking-widest">
            Share Card
          </p>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white text-sm uppercase tracking-widest"
          >
            Close
          </button>
        </div>

        <div
          id={SHARE_CARD_CAPTURE_ID}
          className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d1a14] via-[#0a0a12] to-[#0a1218] p-5"
        >
          <p className="text-emerald-400/90 text-[10px] font-black uppercase tracking-[0.2em]">
            Rugby Draft
          </p>
          <h3 className="text-white font-black text-xl uppercase tracking-tight mt-1">
            {userTeam}
          </h3>
          <p className="text-white/45 text-xs mt-0.5">{modeLabel}</p>

          {awards.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {awards.map(award => (
                <span
                  key={award.label}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${AWARD_TONE_STYLES[award.tone]}`}
                >
                  <span>{award.icon}</span>
                  {award.label}
                </span>
              ))}
            </div>
          )}

          {ratings && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { label: 'Forwards', value: ratings.forwards },
                { label: 'Backs', value: ratings.backs },
                { label: 'Overall', value: ratings.overall },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="text-center rounded-lg bg-white/[0.04] border border-white/[0.06] py-2"
                >
                  <p className="text-white/25 text-[8px] uppercase tracking-wider">
                    {label}
                  </p>
                  <p className="text-white font-black text-sm tabular-nums">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5">
            <p className="text-white/25 text-[9px] uppercase tracking-widest mb-2">
              My XV
            </p>
            {slotsByPosition.map(({ position, player }) => (
              <div
                key={position}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <span className="text-white/30 text-[10px] font-bold w-6">
                  {position}
                </span>
                <span className="text-white/85 flex-1 truncate text-xs">
                  {player?.name ?? '—'}
                </span>
                <span className="text-white/40 font-black text-xs tabular-nums">
                  {player?.overall ?? '—'}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-center text-white/50 text-xs leading-relaxed">
            {result}
          </p>
        </div>

        <ShareCardActions
          shareText={shareText}
          shareTitle={`Rugby Draft — ${userTeam}`}
          captureId={SHARE_CARD_CAPTURE_ID}
        />
      </div>
    </div>
  )
}
