'use client'
import ShareCardActions from './ShareCardActions'
import ShareCardShell from './ShareCardShell'
import ShareStatPills from './ShareStatPills'
import {
  formatSquadShareLines,
  getShareUrl,
  SHARE_CHALLENGE,
  type ShareSquadPlayer,
} from './shareHelpers'

interface Props {
  leagueName: string
  position: number
  points: number
  won: number
  drawn: number
  lost: number
  goalDifference: number
  topScorer: string
  topScorerGoals: number
  playerOfSeason: string
  playerOfSeasonOvr: number
  formation?: string | null
  teamRatings?: {
    attack: number
    midfield: number
    defence: number
    goalkeeper: number
  }
  squad: ShareSquadPlayer[]
}

function getPositionSuffix(pos: number): string {
  if (pos === 1) return 'st'
  if (pos === 2) return 'nd'
  if (pos === 3) return 'rd'
  return 'th'
}

function buildShareText(props: Props, url: string): string {
  const {
    leagueName,
    position,
    points,
    won,
    drawn,
    lost,
    goalDifference,
    topScorer,
    topScorerGoals,
    playerOfSeason,
    playerOfSeasonOvr,
    formation,
    squad,
  } = props

  const gd = goalDifference > 0 ? `+${goalDifference}` : `${goalDifference}`
  const title =
    position === 1
      ? '🏆 CHAMPIONS!'
      : `Finished ${position}${getPositionSuffix(position)}`
  const squadLines = formatSquadShareLines(squad)

  return [
    '⚽ Champions Draft',
    '',
    `${leagueName} Season`,
    '',
    title,
    `${points} pts · ${won}W ${drawn}D ${lost}L · GD ${gd}`,
    formation ? `Formation: ${formation}` : '',
    '',
    'My XI:',
    squadLines,
    '',
    `Top Scorer: ${topScorer} (${topScorerGoals} goals)`,
    `Player of Season: ${playerOfSeason} (${playerOfSeasonOvr} OVR)`,
    '',
    SHARE_CHALLENGE,
    '',
    `Play now → ${url}`,
  ]
    .filter(Boolean)
    .join('\n')
}

export default function SeasonShareCard(props: Props) {
  const { leagueName, position, points, won, drawn, lost, goalDifference } =
    props
  const gd = goalDifference > 0 ? `+${goalDifference}` : `${goalDifference}`
  const shareText = buildShareText(props, getShareUrl())

  return (
    <div className="mb-8 w-full max-w-xs mx-auto">
      <ShareCardShell
        accent="emerald"
        modeIcon="🏆"
        title={leagueName}
        subtitle="League Season"
        squad={props.squad}
        formation={props.formation}
        teamRatings={props.teamRatings}
        result={
          <div className="flex items-end justify-center gap-2">
            <p className="text-white font-black text-4xl tabular-nums leading-none">
              {position}
              <span className="text-xl text-white/50">
                {getPositionSuffix(position)}
              </span>
            </p>
            {position === 1 && <span className="text-3xl mb-0.5">🏆</span>}
          </div>
        }
        stats={
          <ShareStatPills
            pills={[
              { label: `${points} pts`, highlight: true },
              { label: `${won}W ${drawn}D ${lost}L` },
              { label: `GD ${gd}` },
            ]}
          />
        }
      />

      <ShareCardActions
        shareText={shareText}
        shareTitle="Champions Draft — My Season"
      />
    </div>
  )
}
