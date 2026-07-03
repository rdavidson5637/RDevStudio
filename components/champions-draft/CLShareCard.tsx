"use client";
import ShareCardActions from "./ShareCardActions";
import ShareCardShell from "./ShareCardShell";
import ShareStatPills from "./ShareStatPills";
import {
  formatSquadShareLines,
  getShareUrl,
  SHARE_CARD_CAPTURE_ID,
  SHARE_CHALLENGE,
  type ShareSquadPlayer,
} from "./shareHelpers";

interface Props {
  result: "winner" | "eliminated";
  leaguePhasePosition: number;
  leaguePhaseSize: number;
  points: number;
  won: number;
  drawn: number;
  lost: number;
  goalDifference: number;
  eliminatedAt?: string;
  playerOfTournament: string;
  playerOfTournamentOvr: number;
  formation?: string | null;
  teamRatings?: {
    attack: number;
    midfield: number;
    defence: number;
    goalkeeper: number;
  };
  squad: ShareSquadPlayer[];
}

function getPositionSuffix(pos: number): string {
  if (pos === 1) return "st";
  if (pos === 2) return "nd";
  if (pos === 3) return "rd";
  return "th";
}

function buildShareText(props: Props, url: string): string {
  const {
    result,
    leaguePhasePosition,
    leaguePhaseSize,
    points,
    won,
    drawn,
    lost,
    goalDifference,
    eliminatedAt,
    playerOfTournament,
    playerOfTournamentOvr,
    formation,
    squad,
  } = props;

  const gd = goalDifference > 0 ? `+${goalDifference}` : `${goalDifference}`;
  const leagueLine = `League Phase: ${leaguePhasePosition}${getPositionSuffix(leaguePhasePosition)} of ${leaguePhaseSize} · ${points} pts · ${won}W ${drawn}D ${lost}L · GD ${gd}`;
  const squadLines = formatSquadShareLines(squad);

  if (result === "winner") {
    return [
      "⚽ Champions Draft",
      "",
      "UEFA Champions League",
      "",
      "🏆 CHAMPIONS OF EUROPE!",
      leagueLine,
      formation ? `Formation: ${formation}` : "",
      "",
      "My XI:",
      squadLines,
      "",
      `Player of Tournament: ${playerOfTournament} (${playerOfTournamentOvr} OVR)`,
      "",
      SHARE_CHALLENGE,
      "",
      `Play now → ${url}`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  return [
    "⚽ Champions Draft",
    "",
    "UEFA Champions League",
    "",
    eliminatedAt
      ? `Eliminated at ${eliminatedAt}`
      : "Eliminated in League Phase",
    leagueLine,
    formation ? `Formation: ${formation}` : "",
    "",
    "My XI:",
    squadLines,
    "",
    `Best Player: ${playerOfTournament} (${playerOfTournamentOvr} OVR)`,
    "",
    SHARE_CHALLENGE,
    "",
    `Play now → ${url}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export default function CLShareCard(props: Props) {
  const {
    result,
    leaguePhasePosition,
    leaguePhaseSize,
    points,
    won,
    drawn,
    lost,
    goalDifference,
    eliminatedAt,
  } = props;
  const gd = goalDifference > 0 ? `+${goalDifference}` : `${goalDifference}`;
  const shareText = buildShareText(props, getShareUrl());

  return (
    <div className="mb-8 w-full max-w-xs">
      <ShareCardShell
        captureId={SHARE_CARD_CAPTURE_ID}
        accent={result === "winner" ? "amber" : "red"}
        modeIcon="⭐"
        title="Champions League"
        subtitle="UEFA"
        squad={props.squad}
        formation={props.formation}
        teamRatings={props.teamRatings}
        result={
          <div className="text-center">
            {result === "winner" ? (
              <>
                <p className="text-3xl mb-1">🏆</p>
                <p className="text-amber-400 font-black text-base uppercase tracking-tight">
                  Champions of Europe
                </p>
              </>
            ) : (
              <>
                <p className="text-2xl mb-1">❌</p>
                <p className="text-red-400 font-black text-sm uppercase tracking-tight">
                  {eliminatedAt
                    ? `Out at ${eliminatedAt}`
                    : "League Phase Exit"}
                </p>
              </>
            )}
          </div>
        }
        stats={
          <ShareStatPills
            pills={[
              {
                label: `${leaguePhasePosition}${getPositionSuffix(leaguePhasePosition)} / ${leaguePhaseSize}`,
                highlight: true,
              },
              { label: `${points} pts` },
              { label: `${won}W ${drawn}D ${lost}L` },
              { label: `GD ${gd}` },
            ]}
          />
        }
      />

      <ShareCardActions
        captureId={SHARE_CARD_CAPTURE_ID}
        shareText={shareText}
        shareTitle="Champions Draft — Champions League"
        imageFilename="champions-draft-champions-league.png"
        primaryClassName={
          result === "winner"
            ? "bg-amber-400 text-black hover:bg-amber-300"
            : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
        }
      />
    </div>
  );
}
