"use client";
import ShareCardActions from "./ShareCardActions";
import ShareCardShell from "./ShareCardShell";
import {
  formatSquadShareLines,
  getShareUrl,
  SHARE_CARD_CAPTURE_ID,
  SHARE_CHALLENGE,
  type ShareSquadPlayer,
} from "./shareHelpers";

interface Props {
  result: "winner" | "eliminated";
  selectedNation: string;
  wcDraftMode?: "national" | "dream" | null;
  eliminatedAt?: string;
  groupFinish?: string;
  topScorer: string;
  topScorerGoals: number;
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

function buildShareText(props: Props, url: string): string {
  const {
    result,
    selectedNation,
    wcDraftMode,
    eliminatedAt,
    groupFinish,
    topScorer,
    topScorerGoals,
    playerOfTournament,
    playerOfTournamentOvr,
    formation,
    squad,
  } = props;

  const modeLabel =
    wcDraftMode === "national" ? "National Squad" : "Dream Team";
  const squadLines = formatSquadShareLines(squad);

  if (result === "winner") {
    return [
      "⚽ Champions Draft",
      "",
      `🏆 WORLD CUP WINNERS — ${selectedNation}`,
      `${modeLabel}${formation ? ` · ${formation}` : ""}`,
      "",
      "My XI:",
      squadLines,
      "",
      `Golden Ball: ${playerOfTournament} (${playerOfTournamentOvr} OVR)`,
      `Top Scorer: ${topScorer} (${topScorerGoals} goals)`,
      "",
      SHARE_CHALLENGE,
      "",
      `Play now → ${url}`,
    ]
      .filter((line) => line !== undefined)
      .join("\n");
  }

  const exitLine = eliminatedAt
    ? `Eliminated at ${eliminatedAt}`
    : groupFinish
      ? `Eliminated — ${groupFinish}`
      : "Eliminated";

  return [
    "⚽ Champions Draft",
    "",
    `World Cup · ${selectedNation}`,
    `${modeLabel}${formation ? ` · ${formation}` : ""}`,
    "",
    exitLine,
    "",
    "My XI:",
    squadLines,
    "",
    `Best Player: ${playerOfTournament} (${playerOfTournamentOvr} OVR)`,
    topScorerGoals > 0
      ? `Top Scorer: ${topScorer} (${topScorerGoals} goals)`
      : "",
    "",
    SHARE_CHALLENGE,
    "",
    `Play now → ${url}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export default function WCShareCard(props: Props) {
  const { result, selectedNation, eliminatedAt, groupFinish, wcDraftMode } =
    props;
  const shareText = buildShareText(props, getShareUrl());
  const modeSubtitle =
    wcDraftMode === "national" ? "National Squad" : "Dream Team";

  return (
    <div className="mb-8 w-full max-w-xs">
      <ShareCardShell
        captureId={SHARE_CARD_CAPTURE_ID}
        accent={result === "winner" ? "emerald" : "red"}
        modeIcon="🌍"
        title="World Cup"
        subtitle={`${selectedNation} · ${modeSubtitle}`}
        squad={props.squad}
        formation={props.formation}
        teamRatings={props.teamRatings}
        result={
          <div className="text-center">
            {result === "winner" ? (
              <>
                <p className="text-3xl mb-1">🏆</p>
                <p className="text-emerald-400 font-black text-base uppercase tracking-tight">
                  World Cup Winners
                </p>
              </>
            ) : (
              <>
                <p className="text-2xl mb-1">❌</p>
                <p className="text-red-400 font-black text-sm uppercase tracking-tight">
                  {eliminatedAt
                    ? `Out at ${eliminatedAt}`
                    : (groupFinish ?? "Eliminated")}
                </p>
              </>
            )}
          </div>
        }
      />

      <ShareCardActions
        captureId={SHARE_CARD_CAPTURE_ID}
        shareText={shareText}
        shareTitle="Champions Draft — World Cup"
        imageFilename="champions-draft-world-cup.png"
        primaryClassName={
          result === "winner"
            ? "bg-emerald-400 text-black hover:bg-emerald-300"
            : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
        }
      />
    </div>
  );
}
