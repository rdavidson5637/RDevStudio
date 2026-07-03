"use client";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import type {
  GameState,
  MatchResult,
  RugbyGroup,
  TournamentRound,
  TeamRatings,
  Squad,
} from "@/types/rugby-draft";
import { getDraftPool, findSquadByClub } from "@/lib/rugby-draft/data";
import {
  buildLeagueTable,
  updateTableWithResult,
  sortTable,
} from "@/lib/rugby-draft/utils";
import {
  simulateFullMatch,
  simulateKnockoutFullMatch,
  generateOpponentVsOpponentResult,
  generateKnockoutOpponentResult,
  getSquadRatings,
  getTopTryScorer,
} from "@/lib/rugby-draft/matchEngine";
import MatchAnimation, { CompletedMatchCard } from "./MatchAnimation";
import LeagueTable from "./LeagueTable";
import KnockoutBracket from "./KnockoutBracket";
import QuitButton from "./QuitButton";
import QuitConfirmModal from "./QuitConfirmModal";
import SpeedControls from "./SpeedControls";
import ResultsScreen from "./ResultsScreen";
import ShareCard from "./ShareCard";
import {
  getKnockoutUserAwards,
  getPlayerOfTournament,
  getPoolWinnerAward,
  getTryScorerCandidates,
} from "./shareHelpers";

interface Props {
  state: GameState;
  onUpdate: (updates: Partial<GameState>) => void;
  onExit: () => void;
}

const CHAMPIONS_CUP_CLUBS = [
  "Leinster",
  "Munster",
  "Ulster",
  "Connacht",
  "Glasgow Warriors",
  "Edinburgh",
  "Cardiff Rugby",
  "Dragons RFC",
  "Saracens",
  "Exeter Chiefs",
  "Bath Rugby",
  "Northampton Saints",
  "Sale Sharks",
  "Leicester Tigers",
  "Harlequins",
  "Bristol Bears",
  "Toulouse",
  "La Rochelle",
  "Bordeaux-Bègles",
  "Stade Français",
  "Clermont",
  "Racing 92",
  "Toulon",
  "Lyon",
];

const CLUB_BADGES: Record<string, string> = {
  Leinster: "LNS",
  Munster: "MUN",
  Ulster: "ULS",
  Connacht: "CON",
  "Glasgow Warriors": "GLA",
  Edinburgh: "EDI",
  "Cardiff Rugby": "CAR",
  "Dragons RFC": "DRA",
  Saracens: "SAR",
  "Exeter Chiefs": "EXE",
  "Bath Rugby": "BAT",
  "Northampton Saints": "NOR",
  "Sale Sharks": "SAL",
  "Leicester Tigers": "LEI",
  Harlequins: "HAR",
  "Bristol Bears": "BRI",
  Toulouse: "TOU",
  "La Rochelle": "LRO",
  "Bordeaux-Bègles": "BOR",
  "Stade Français": "SFR",
  Clermont: "CLE",
  "Racing 92": "RAC",
  Toulon: "TVN",
  Lyon: "LYO",
};

const CLUB_LEAGUES: Record<string, string> = {
  LNS: "URC",
  MUN: "URC",
  ULS: "URC",
  CON: "URC",
  GLA: "URC",
  EDI: "URC",
  CAR: "URC",
  DRA: "URC",
  SAR: "Prem",
  EXE: "Prem",
  BAT: "Prem",
  NOR: "Prem",
  SAL: "Prem",
  LEI: "Prem",
  HAR: "Prem",
  BRI: "Prem",
  TOU: "Top 14",
  LRO: "Top 14",
  BOR: "Top 14",
  SFR: "Top 14",
  CLE: "Top 14",
  RAC: "Top 14",
  TVN: "Top 14",
  LYO: "Top 14",
};

type CCPhase =
  | "pool-draw"
  | "pool-stage"
  | "last-16-draw"
  | "last-16"
  | "quarter-final-draw"
  | "knockouts"
  | "results";

type KnockoutRoundKey = "quarter-final" | "semi-final" | "final";
type UserPoolOutcome = "qf-direct" | "last-16" | "eliminated";

interface PoolFixture {
  pool: string;
  home: string;
  away: string;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getLeagueLabel(club: string): string {
  const badge = CLUB_BADGES[club];
  return badge ? (CLUB_LEAGUES[badge] ?? "") : "";
}

function buildChampionsCupPools(userClub: string): RugbyGroup[] {
  const others = shuffleArray(
    CHAMPIONS_CUP_CLUBS.filter((c) => c !== userClub),
  );
  const pool1 = [userClub, ...others.slice(0, 5)];
  const remaining = others.slice(5);
  const pool2 = remaining.slice(0, 6);
  const pool3 = remaining.slice(6, 12);
  const pool4 = remaining.slice(12, 18);

  return [
    { name: "1", teams: pool1, table: buildLeagueTable(pool1), fixtures: [] },
    { name: "2", teams: pool2, table: buildLeagueTable(pool2), fixtures: [] },
    { name: "3", teams: pool3, table: buildLeagueTable(pool3), fixtures: [] },
    { name: "4", teams: pool4, table: buildLeagueTable(pool4), fixtures: [] },
  ];
}

function generatePoolFixtures(groups: RugbyGroup[]): PoolFixture[] {
  const fixtures: PoolFixture[] = [];
  for (const group of groups) {
    for (let i = 0; i < group.teams.length; i++) {
      for (let j = i + 1; j < group.teams.length; j++) {
        fixtures.push({
          pool: group.name,
          home: group.teams[i],
          away: group.teams[j],
        });
      }
    }
  }
  return fixtures;
}

function getClubSquads(): Squad[] {
  return getDraftPool("champions-cup");
}

function getTeamRatings(
  team: string,
  userClub: string,
  userRatings: TeamRatings,
  squads: Squad[],
): TeamRatings {
  if (team === userClub) return userRatings;
  const squad = findSquadByClub(squads, team);
  return squad
    ? getSquadRatings(squad)
    : { forwards: 80, backs: 80, overall: 80 };
}

function simulatePoolMatch(
  fixture: PoolFixture,
  userClub: string,
  userRatings: TeamRatings,
  squads: Squad[],
): MatchResult {
  const { home, away } = fixture;
  if (home === userClub || away === userClub) {
    const isHome = home === userClub;
    const opponent = isHome ? away : home;
    const oppRatings = getTeamRatings(opponent, userClub, userRatings, squads);
    return simulateFullMatch(
      userRatings,
      oppRatings,
      userClub,
      opponent,
      isHome,
    );
  }
  return generateOpponentVsOpponentResult(home, away, squads);
}

function simulateKnockoutMatch(
  home: string,
  away: string,
  userClub: string,
  userRatings: TeamRatings,
  squads: Squad[],
  neutralVenue: boolean,
): MatchResult {
  if (home === userClub || away === userClub) {
    const isHome = home === userClub;
    const opponent = isHome ? away : home;
    const oppRatings = getTeamRatings(opponent, userClub, userRatings, squads);
    return simulateKnockoutFullMatch(
      userRatings,
      oppRatings,
      userClub,
      opponent,
      isHome,
      neutralVenue,
    );
  }
  return generateKnockoutOpponentResult(home, away, squads, neutralVenue);
}

function updateGroupsWithResult(
  groups: RugbyGroup[],
  pool: string,
  result: MatchResult,
): RugbyGroup[] {
  return groups.map((g) => {
    if (g.name !== pool) return g;
    return {
      ...g,
      table: sortTable(updateTableWithResult(g.table, result)),
      fixtures: [...g.fixtures, result],
    };
  });
}

function isPoolComplete(group: RugbyGroup): boolean {
  const expected = (group.teams.length * (group.teams.length - 1)) / 2;
  return group.fixtures.length >= expected;
}

function getUserPoolPosition(groups: RugbyGroup[], userClub: string): number {
  const userPool = groups.find((g) => g.teams.includes(userClub));
  if (!userPool) return 0;
  const sorted = sortTable(userPool.table);
  return sorted.findIndex((r) => r.club === userClub) + 1;
}

function getUserPoolOutcome(position: number): UserPoolOutcome {
  if (position <= 2) return "qf-direct";
  if (position <= 4) return "last-16";
  return "eliminated";
}

function poolFinisher(groups: RugbyGroup[], pool: string, pos: number): string {
  const sorted = sortTable(groups.find((g) => g.name === pool)!.table);
  return sorted[pos - 1].club;
}

function buildLast16Draw(groups: RugbyGroup[]): TournamentRound {
  return {
    name: "Last 16",
    fixtures: [
      {
        homeTeam: poolFinisher(groups, "1", 3),
        awayTeam: poolFinisher(groups, "2", 4),
        homeScore: 0,
        awayScore: 0,
      },
      {
        homeTeam: poolFinisher(groups, "2", 3),
        awayTeam: poolFinisher(groups, "1", 4),
        homeScore: 0,
        awayScore: 0,
      },
      {
        homeTeam: poolFinisher(groups, "3", 3),
        awayTeam: poolFinisher(groups, "4", 4),
        homeScore: 0,
        awayScore: 0,
      },
      {
        homeTeam: poolFinisher(groups, "4", 3),
        awayTeam: poolFinisher(groups, "3", 4),
        homeScore: 0,
        awayScore: 0,
      },
    ],
  };
}

function buildQuarterFinalDraw(
  groups: RugbyGroup[],
  last16Round: TournamentRound,
): TournamentRound {
  const l16Winners = last16Round.fixtures.map(getMatchWinner);

  function secondForQF(pool: string): string {
    const second = poolFinisher(groups, pool, 2);
    const third = poolFinisher(groups, pool, 3);
    const fourth = poolFinisher(groups, pool, 4);
    if (l16Winners.includes(third)) return third;
    if (l16Winners.includes(fourth)) return fourth;
    return second;
  }

  return {
    name: "Quarter-Final",
    fixtures: [
      {
        homeTeam: poolFinisher(groups, "1", 1),
        awayTeam: secondForQF("2"),
        homeScore: 0,
        awayScore: 0,
      },
      {
        homeTeam: poolFinisher(groups, "2", 1),
        awayTeam: secondForQF("1"),
        homeScore: 0,
        awayScore: 0,
      },
      {
        homeTeam: poolFinisher(groups, "3", 1),
        awayTeam: secondForQF("4"),
        homeScore: 0,
        awayScore: 0,
      },
      {
        homeTeam: poolFinisher(groups, "4", 1),
        awayTeam: secondForQF("3"),
        homeScore: 0,
        awayScore: 0,
      },
    ],
  };
}

function buildSemiFinalDraw(qfRound: TournamentRound): TournamentRound {
  const winners = qfRound.fixtures.map(getMatchWinner);
  return {
    name: "Semi-Final",
    fixtures: [
      {
        homeTeam: winners[0],
        awayTeam: winners[1],
        homeScore: 0,
        awayScore: 0,
      },
      {
        homeTeam: winners[2],
        awayTeam: winners[3],
        homeScore: 0,
        awayScore: 0,
      },
    ],
  };
}

function buildFinalDraw(sfRound: TournamentRound): TournamentRound {
  const winners = sfRound.fixtures.map(getMatchWinner);
  return {
    name: "Final",
    fixtures: [
      {
        homeTeam: winners[0],
        awayTeam: winners[1],
        homeScore: 0,
        awayScore: 0,
      },
    ],
  };
}

function getMatchWinner(result: MatchResult): string {
  return result.homeScore > result.awayScore
    ? result.homeTeam
    : result.awayTeam;
}

function fastSimulateKnockoutRound(
  round: TournamentRound,
  fromIndex: number,
  userClub: string,
  userRatings: TeamRatings,
  squads: Squad[],
  neutralVenue: boolean,
): TournamentRound {
  const fixtures: MatchResult[] = [];

  for (let i = 0; i < round.fixtures.length; i++) {
    if (i < fromIndex) {
      fixtures.push(round.fixtures[i]);
      continue;
    }
    const pairing = round.fixtures[i];
    fixtures.push(
      simulateKnockoutMatch(
        pairing.homeTeam,
        pairing.awayTeam,
        userClub,
        userRatings,
        squads,
        neutralVenue,
      ),
    );
  }

  return { name: round.name, fixtures };
}

function fastSimulateEntireKnockouts(
  groups: RugbyGroup[],
  userClub: string,
  userRatings: TeamRatings,
  squads: Squad[],
): { rounds: TournamentRound[]; winner: string } {
  const l16 = fastSimulateKnockoutRound(
    buildLast16Draw(groups),
    0,
    userClub,
    userRatings,
    squads,
    false,
  );
  const qf = buildQuarterFinalDraw(groups, l16);
  const qfSim = fastSimulateKnockoutRound(
    qf,
    0,
    userClub,
    userRatings,
    squads,
    false,
  );
  const sf = buildSemiFinalDraw(qfSim);
  const sfSim = fastSimulateKnockoutRound(
    sf,
    0,
    userClub,
    userRatings,
    squads,
    true,
  );
  const final = buildFinalDraw(sfSim);
  const finalSim = fastSimulateKnockoutRound(
    final,
    0,
    userClub,
    userRatings,
    squads,
    true,
  );
  return {
    rounds: [l16, qfSim, sfSim, finalSim],
    winner: getMatchWinner(finalSim.fixtures[0]),
  };
}

function getUserProgressSummary(
  userClub: string,
  winner: string,
  eliminatedAt: string | null,
): string {
  if (winner === userClub) return "You won the Champions Cup";
  if (eliminatedAt === "Pool Stage") {
    return "You were eliminated in the Pool Stage";
  }
  if (eliminatedAt === "Last 16") {
    return "You reached the Last 16";
  }
  if (eliminatedAt === "Quarter-Final") {
    return "You reached the Quarter-Finals";
  }
  if (eliminatedAt === "Semi-Final") {
    return "You reached the Semi-Finals";
  }
  if (eliminatedAt === "Final") {
    return "You reached the Final";
  }
  return "Tournament complete";
}

const KNOCKOUT_ROUND_NAMES: Record<KnockoutRoundKey | "last-16", string> = {
  "last-16": "Last 16",
  "quarter-final": "Quarter-Final",
  "semi-final": "Semi-Final",
  final: "Final",
};

function ClubLabel({ club, highlight }: { club: string; highlight?: boolean }) {
  const league = getLeagueLabel(club);
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={highlight ? "text-emerald-400 font-semibold" : ""}>
        {club}
      </span>
      {league && (
        <span className="text-white/25 text-[10px] uppercase tracking-wider">
          {league}
        </span>
      )}
    </span>
  );
}

export default function ChampionsCup({ state, onUpdate, onExit }: Props) {
  const [phase, setPhase] = useState<CCPhase>("pool-draw");
  const [groups, setGroups] = useState<RugbyGroup[]>([]);
  const [poolFixtures, setPoolFixtures] = useState<PoolFixture[]>([]);
  const [poolMatchIndex, setPoolMatchIndex] = useState(0);
  const [poolResults, setPoolResults] = useState<MatchResult[]>([]);
  const [pendingResult, setPendingResult] = useState<MatchResult | null>(null);
  const [last16Draw, setLast16Draw] = useState<TournamentRound | null>(null);
  const [last16Round, setLast16Round] = useState<TournamentRound | null>(null);
  const [last16MatchIndex, setLast16MatchIndex] = useState(0);
  const [quarterFinalDraw, setQuarterFinalDraw] =
    useState<TournamentRound | null>(null);
  const [knockoutRounds, setKnockoutRounds] = useState<TournamentRound[]>([]);
  const [activeKnockoutRound, setActiveKnockoutRound] =
    useState<TournamentRound | null>(null);
  const [knockoutRoundKey, setKnockoutRoundKey] =
    useState<KnockoutRoundKey>("quarter-final");
  const [knockoutMatchIndex, setKnockoutMatchIndex] = useState(0);
  const [winner, setWinner] = useState<string>("");
  const [showShareCard, setShowShareCard] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const speedMode = state.speedMode;
  const [eliminatedAt, setEliminatedAt] = useState<string | null>(null);
  const [userPoolOutcome, setUserPoolOutcome] =
    useState<UserPoolOutcome>("qf-direct");
  const [userPoolEliminated, setUserPoolEliminated] = useState(false);
  const userPoolEliminatedRef = useRef(false);

  const userClub = state.selectedClub ?? "Leinster";
  const userRatings = state.teamRatings!;
  const clubSquads = useMemo(() => getClubSquads(), []);

  const tryScorerCandidates = useMemo(
    () => getTryScorerCandidates(state.draftSlots),
    [state.draftSlots],
  );

  const userPool = groups.find((g) => g.teams.includes(userClub));

  useEffect(() => {
    const built = buildChampionsCupPools(userClub);
    setGroups(built);
    setPoolFixtures(generatePoolFixtures(built));
  }, [userClub]);

  useEffect(() => {
    if (phase !== "pool-stage" || poolMatchIndex >= poolFixtures.length) return;
    const result = simulatePoolMatch(
      poolFixtures[poolMatchIndex],
      userClub,
      userRatings,
      clubSquads,
    );
    setPendingResult(result);
  }, [phase, poolMatchIndex, poolFixtures, userClub, userRatings, clubSquads]);

  useEffect(() => {
    if (phase !== "last-16" || !last16Round) return;
    if (last16MatchIndex >= last16Round.fixtures.length) return;

    const pairing = last16Round.fixtures[last16MatchIndex];
    const involvesUser =
      pairing.homeTeam === userClub || pairing.awayTeam === userClub;

    if (!involvesUser) return;

    const result = simulateKnockoutMatch(
      pairing.homeTeam,
      pairing.awayTeam,
      userClub,
      userRatings,
      clubSquads,
      false,
    );
    setPendingResult(result);
  }, [phase, last16Round, last16MatchIndex, userClub, userRatings, clubSquads]);

  useEffect(() => {
    if (phase !== "knockouts" || !activeKnockoutRound) return;
    if (knockoutMatchIndex >= activeKnockoutRound.fixtures.length) return;

    const pairing = activeKnockoutRound.fixtures[knockoutMatchIndex];
    const neutral = knockoutRoundKey !== "quarter-final";
    const result = simulateKnockoutMatch(
      pairing.homeTeam,
      pairing.awayTeam,
      userClub,
      userRatings,
      clubSquads,
      neutral,
    );
    setPendingResult(result);
  }, [
    phase,
    activeKnockoutRound,
    knockoutMatchIndex,
    knockoutRoundKey,
    userClub,
    userRatings,
    clubSquads,
  ]);

  const finishTournament = useCallback(
    (
      rounds: TournamentRound[],
      finalWinner: string,
      exitStage: string | null,
    ) => {
      setKnockoutRounds(rounds);
      setWinner(finalWinner);
      if (exitStage) setEliminatedAt(exitStage);
      setPhase("results");
      onUpdate({ knockoutRounds: rounds, groups });
    },
    [groups, onUpdate],
  );

  const handleBeginPoolStage = useCallback(() => {
    setPoolMatchIndex(0);
    setPoolResults([]);
    setPendingResult(null);
    setUserPoolEliminated(false);
    userPoolEliminatedRef.current = false;
    setPhase("pool-stage");
  }, []);

  const handlePoolStageComplete = useCallback(
    (updatedGroups: RugbyGroup[], newResults: MatchResult[]) => {
      const position = getUserPoolPosition(updatedGroups, userClub);
      const outcome = getUserPoolOutcome(position);
      setUserPoolOutcome(outcome);

      const l16 = buildLast16Draw(updatedGroups);
      setLast16Draw(l16);

      if (outcome === "eliminated") {
        const { rounds, winner: tournamentWinner } =
          fastSimulateEntireKnockouts(
            updatedGroups,
            userClub,
            userRatings,
            clubSquads,
          );
        setKnockoutRounds(rounds);
        setWinner(tournamentWinner);
        setEliminatedAt("Pool Stage");
        setPhase("results");
        onUpdate({
          groups: updatedGroups,
          fixtures: newResults,
          knockoutRounds: rounds,
        });
      } else {
        setPhase("last-16-draw");
        onUpdate({ groups: updatedGroups, fixtures: newResults });
      }
    },
    [userClub, userRatings, clubSquads, onUpdate],
  );

  const handlePoolMatchComplete = useCallback(() => {
    if (!pendingResult) return;

    const fixture = poolFixtures[poolMatchIndex];
    const result = pendingResult;
    setPendingResult(null);

    const updatedGroups = updateGroupsWithResult(groups, fixture.pool, result);
    const newResults = [...poolResults, result];

    setGroups(updatedGroups);
    setPoolResults(newResults);

    const userGroup = updatedGroups.find((g) => g.teams.includes(userClub));
    if (
      userGroup &&
      isPoolComplete(userGroup) &&
      !userPoolEliminatedRef.current
    ) {
      const position = getUserPoolPosition(updatedGroups, userClub);
      if (position >= 5) {
        userPoolEliminatedRef.current = true;
        setUserPoolEliminated(true);
        setEliminatedAt("Pool Stage");
      }
    }

    const nextIndex = poolMatchIndex + 1;
    if (nextIndex >= poolFixtures.length) {
      handlePoolStageComplete(updatedGroups, newResults);
    } else {
      setPoolMatchIndex(nextIndex);
    }
  }, [
    pendingResult,
    poolFixtures,
    poolMatchIndex,
    poolResults,
    groups,
    userClub,
    handlePoolStageComplete,
  ]);

  const proceedToQuarterFinalDraw = useCallback(
    (completedL16: TournamentRound, updatedGroups: RugbyGroup[]) => {
      setLast16Round(completedL16);
      setKnockoutRounds([completedL16]);
      setQuarterFinalDraw(buildQuarterFinalDraw(updatedGroups, completedL16));
      setPhase("quarter-final-draw");
    },
    [],
  );

  const processLast16NonUserMatches = useCallback(
    (startIndex: number, round: TournamentRound) => {
      let currentRound = { ...round, fixtures: [...round.fixtures] };
      let index = startIndex;

      while (index < currentRound.fixtures.length) {
        const pairing = currentRound.fixtures[index];
        const involvesUser =
          pairing.homeTeam === userClub || pairing.awayTeam === userClub;

        if (involvesUser) {
          setLast16Round(currentRound);
          setLast16MatchIndex(index);
          setPendingResult(null);
          return;
        }

        const result = simulateKnockoutMatch(
          pairing.homeTeam,
          pairing.awayTeam,
          userClub,
          userRatings,
          clubSquads,
          false,
        );
        currentRound = {
          ...currentRound,
          fixtures: currentRound.fixtures.map((f, i) =>
            i === index ? result : f,
          ),
        };
        index++;
      }

      proceedToQuarterFinalDraw(currentRound, groups);
    },
    [userClub, userRatings, clubSquads, groups, proceedToQuarterFinalDraw],
  );

  const handleBeginLast16 = useCallback(() => {
    if (!last16Draw) return;
    setLast16Round(last16Draw);
    setLast16MatchIndex(0);
    setPendingResult(null);
    setPhase("last-16");
    processLast16NonUserMatches(0, last16Draw);
  }, [last16Draw, processLast16NonUserMatches]);

  const handleSkipLast16 = useCallback(() => {
    const l16 = fastSimulateKnockoutRound(
      last16Draw!,
      0,
      userClub,
      userRatings,
      clubSquads,
      false,
    );
    proceedToQuarterFinalDraw(l16, groups);
  }, [
    last16Draw,
    userClub,
    userRatings,
    clubSquads,
    groups,
    proceedToQuarterFinalDraw,
  ]);

  const fastSimulateFromKnockout = useCallback(
    (
      currentRound: TournamentRound,
      fromMatchIndex: number,
      existingRounds: TournamentRound[],
      roundKey: KnockoutRoundKey | "last-16",
    ) => {
      const exitStage = KNOCKOUT_ROUND_NAMES[roundKey];
      setEliminatedAt(exitStage);

      const neutral = roundKey === "semi-final" || roundKey === "final";
      const completedRound = fastSimulateKnockoutRound(
        currentRound,
        fromMatchIndex,
        userClub,
        userRatings,
        clubSquads,
        neutral,
      );
      const roundsSoFar = [...existingRounds, completedRound];

      if (roundKey === "last-16") {
        const qf = buildQuarterFinalDraw(groups, completedRound);
        const qfSim = fastSimulateKnockoutRound(
          qf,
          0,
          userClub,
          userRatings,
          clubSquads,
          false,
        );
        const sf = buildSemiFinalDraw(qfSim);
        const sfSim = fastSimulateKnockoutRound(
          sf,
          0,
          userClub,
          userRatings,
          clubSquads,
          true,
        );
        const final = buildFinalDraw(sfSim);
        const finalSim = fastSimulateKnockoutRound(
          final,
          0,
          userClub,
          userRatings,
          clubSquads,
          true,
        );
        finishTournament(
          [...roundsSoFar, qfSim, sfSim, finalSim],
          getMatchWinner(finalSim.fixtures[0]),
          exitStage,
        );
        return;
      }

      if (roundKey === "quarter-final") {
        const sf = buildSemiFinalDraw(completedRound);
        const sfSim = fastSimulateKnockoutRound(
          sf,
          0,
          userClub,
          userRatings,
          clubSquads,
          true,
        );
        const final = buildFinalDraw(sfSim);
        const finalSim = fastSimulateKnockoutRound(
          final,
          0,
          userClub,
          userRatings,
          clubSquads,
          true,
        );
        finishTournament(
          [...roundsSoFar, sfSim, finalSim],
          getMatchWinner(finalSim.fixtures[0]),
          exitStage,
        );
        return;
      }

      if (roundKey === "semi-final") {
        const final = buildFinalDraw(completedRound);
        const finalSim = fastSimulateKnockoutRound(
          final,
          0,
          userClub,
          userRatings,
          clubSquads,
          true,
        );
        finishTournament(
          [...roundsSoFar, finalSim],
          getMatchWinner(finalSim.fixtures[0]),
          exitStage,
        );
        return;
      }

      finishTournament(
        roundsSoFar,
        getMatchWinner(completedRound.fixtures[0]),
        exitStage,
      );
    },
    [userClub, userRatings, clubSquads, groups, finishTournament],
  );

  const handleLast16MatchComplete = useCallback(() => {
    if (!pendingResult || !last16Round) return;

    const result = pendingResult;
    const userLost =
      (result.homeTeam === userClub || result.awayTeam === userClub) &&
      getMatchWinner(result) !== userClub;

    const updatedFixtures = [...last16Round.fixtures];
    updatedFixtures[last16MatchIndex] = result;
    const updatedRound: TournamentRound = {
      name: last16Round.name,
      fixtures: updatedFixtures,
    };
    setPendingResult(null);

    if (userLost) {
      fastSimulateFromKnockout(
        updatedRound,
        last16MatchIndex + 1,
        [],
        "last-16",
      );
      return;
    }

    const nextIndex = last16MatchIndex + 1;
    if (nextIndex >= updatedRound.fixtures.length) {
      proceedToQuarterFinalDraw(updatedRound, groups);
    } else {
      processLast16NonUserMatches(nextIndex, updatedRound);
    }
  }, [
    pendingResult,
    last16Round,
    last16MatchIndex,
    userClub,
    fastSimulateFromKnockout,
    proceedToQuarterFinalDraw,
    groups,
    processLast16NonUserMatches,
  ]);

  const advanceKnockoutRound = useCallback(
    (
      completedRound: TournamentRound,
      existingRounds: TournamentRound[],
      nextKey: KnockoutRoundKey | null,
    ) => {
      const rounds = [...existingRounds, completedRound];

      if (nextKey === "semi-final") {
        const sf = buildSemiFinalDraw(completedRound);
        setKnockoutRounds(rounds);
        setActiveKnockoutRound(sf);
        setKnockoutRoundKey("semi-final");
        setKnockoutMatchIndex(0);
        setPendingResult(null);
        return;
      }

      if (nextKey === "final") {
        const finalRound = buildFinalDraw(completedRound);
        setKnockoutRounds(rounds);
        setActiveKnockoutRound(finalRound);
        setKnockoutRoundKey("final");
        setKnockoutMatchIndex(0);
        setPendingResult(null);
        return;
      }

      finishTournament(
        rounds,
        getMatchWinner(completedRound.fixtures[0]),
        null,
      );
    },
    [finishTournament],
  );

  const handleBeginKnockouts = useCallback(() => {
    if (!quarterFinalDraw) return;
    setActiveKnockoutRound(quarterFinalDraw);
    setKnockoutRoundKey("quarter-final");
    setKnockoutMatchIndex(0);
    setPendingResult(null);
    setPhase("knockouts");
  }, [quarterFinalDraw]);

  const handleKnockoutMatchComplete = useCallback(() => {
    if (!pendingResult || !activeKnockoutRound) return;

    const result = pendingResult;
    const userLost =
      (result.homeTeam === userClub || result.awayTeam === userClub) &&
      getMatchWinner(result) !== userClub;

    const updatedFixtures = [...activeKnockoutRound.fixtures];
    updatedFixtures[knockoutMatchIndex] = result;
    const updatedRound: TournamentRound = {
      name: activeKnockoutRound.name,
      fixtures: updatedFixtures,
    };
    setActiveKnockoutRound(updatedRound);
    setPendingResult(null);

    const nextIndex = knockoutMatchIndex + 1;

    if (userLost) {
      fastSimulateFromKnockout(
        updatedRound,
        nextIndex,
        knockoutRounds,
        knockoutRoundKey,
      );
      return;
    }

    if (nextIndex >= updatedRound.fixtures.length) {
      if (knockoutRoundKey === "quarter-final") {
        advanceKnockoutRound(updatedRound, knockoutRounds, "semi-final");
      } else if (knockoutRoundKey === "semi-final") {
        advanceKnockoutRound(updatedRound, knockoutRounds, "final");
      } else {
        finishTournament(
          [...knockoutRounds, updatedRound],
          getMatchWinner(result),
          null,
        );
      }
      return;
    }

    setKnockoutMatchIndex(nextIndex);
  }, [
    pendingResult,
    activeKnockoutRound,
    knockoutMatchIndex,
    knockoutRounds,
    knockoutRoundKey,
    userClub,
    fastSimulateFromKnockout,
    advanceKnockoutRound,
    finishTournament,
  ]);

  const quitModal = showQuitConfirm ? (
    <QuitConfirmModal
      title="Quit Tournament?"
      message="Your progress will be lost and you'll return to the main menu."
      cancelLabel="Keep Playing"
      onCancel={() => setShowQuitConfirm(false)}
      onConfirm={onExit}
    />
  ) : null;

  const PoolDrawView = () => (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
      {groups.map((group) => (
        <div
          key={group.name}
          className={`bg-white/5 border rounded-xl p-4 ${
            group.teams.includes(userClub)
              ? "border-emerald-400/30"
              : "border-white/10"
          }`}
        >
          <h3 className="text-white font-black text-sm uppercase tracking-tight mb-3">
            Pool {group.name}
          </h3>
          <ul className="space-y-2">
            {group.teams.map((team) => (
              <li
                key={team}
                className={`text-sm ${
                  team === userClub ? "text-emerald-400" : "text-white/80"
                }`}
              >
                <ClubLabel club={team} highlight={team === userClub} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const PoolTables = () => (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
      {groups.map((group) => (
        <div
          key={group.name}
          className={`bg-white/5 border rounded-xl p-3 ${
            group.teams.includes(userClub)
              ? "border-emerald-400/30"
              : "border-white/10"
          }`}
        >
          <LeagueTable
            table={sortTable(group.table)}
            userTeam={userClub}
            title={`Pool ${group.name}`}
          />
        </div>
      ))}
    </div>
  );

  const FixtureRow = ({ home, away }: { home: string; away: string }) => {
    const involvesUser = home === userClub || away === userClub;
    return (
      <div
        className={`flex items-center justify-between rounded-xl px-4 py-3 border ${
          involvesUser
            ? "bg-emerald-400/10 border-emerald-400/30"
            : "bg-white/5 border-white/10"
        }`}
      >
        <ClubLabel club={home} highlight={home === userClub} />
        <span className="text-white/30 text-xs font-bold uppercase px-2">
          vs
        </span>
        <ClubLabel club={away} highlight={away === userClub} />
      </div>
    );
  };

  if (phase === "pool-draw") {
    return (
      <div className="relative min-h-screen bg-[#0a0a12] px-4 py-12">
        {quitModal}
        <QuitButton
          onQuit={() => setShowQuitConfirm(true)}
          className="absolute top-6 left-6 z-10"
        />
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-2">
              Champions Cup · {userClub}
            </p>
            <h2 className="text-white font-black text-4xl uppercase tracking-tight">
              Pool Draw
            </h2>
            <p className="text-white/40 text-sm mt-2">
              4 pools of 6 · Top 2 to QF · 3rd/4th to Last 16
            </p>
          </div>

          {groups.length > 0 && (
            <div className="mb-8">
              <PoolDrawView />
            </div>
          )}

          <div className="flex flex-col gap-3 w-full max-w-xs mx-auto mb-6">
            <p className="text-white/30 text-xs uppercase tracking-widest text-center">
              Match speed
            </p>
            <SpeedControls
              speedMode={speedMode}
              onChange={(s) => onUpdate({ speedMode: s })}
              className="justify-center flex-wrap"
            />
          </div>

          <div className="text-center">
            <button
              onClick={handleBeginPoolStage}
              disabled={groups.length === 0}
              className="px-10 py-4 bg-white text-black font-black text-lg uppercase tracking-widest rounded-xl hover:bg-white/90 active:scale-95 transition-all disabled:opacity-40"
            >
              Begin Pool Stage
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "pool-stage" && !pendingResult) {
    return (
      <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center">
        <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (phase === "pool-stage" && pendingResult) {
    const completedMatches = poolResults.slice().reverse();

    return (
      <div className="relative min-h-screen bg-[#0a0a12] flex flex-col">
        {quitModal}
        <QuitButton
          onQuit={() => setShowQuitConfirm(true)}
          className="absolute top-4 left-4 z-20"
        />
        <div className="absolute top-4 right-4 z-20">
          <SpeedControls
            speedMode={speedMode}
            onChange={(s) => onUpdate({ speedMode: s })}
            className="flex-wrap"
          />
        </div>
        <div className="sticky top-0 z-10 bg-[#0a0a12]/95 backdrop-blur border-b border-white/10 px-4 py-4 pt-14">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-white/30 text-xs uppercase tracking-widest">
              Pool Stage
            </p>
            <h2 className="text-white font-black text-lg uppercase tracking-tight">
              Match {poolMatchIndex + 1} of {poolFixtures.length}
            </h2>
            {userPoolEliminated && (
              <p className="text-amber-400/80 text-xs mt-2 uppercase tracking-widest">
                Eliminated from Pool {userPool?.name} — remaining matches
                continue
              </p>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            <MatchAnimation
              key={poolMatchIndex}
              result={pendingResult}
              speedMode={speedMode}
              onComplete={handlePoolMatchComplete}
              matchNumber={poolMatchIndex + 1}
              totalMatches={poolFixtures.length}
              userTeam={userClub}
            />

            <PoolTables />

            {completedMatches.length > 0 && (
              <div className="space-y-2">
                <p className="text-white/30 text-xs uppercase tracking-widest">
                  Completed
                </p>
                {completedMatches.slice(0, 5).map((match, i) => (
                  <CompletedMatchCard
                    key={poolResults.length - i}
                    result={match}
                    matchNumber={poolResults.length - i}
                    userTeam={userClub}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (phase === "last-16-draw" && last16Draw) {
    return (
      <div className="relative min-h-screen bg-[#0a0a12] px-4 py-12">
        {quitModal}
        <QuitButton
          onQuit={() => setShowQuitConfirm(true)}
          className="absolute top-6 left-6 z-10"
        />
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-2">
              Knockout Play-In
            </p>
            <h2 className="text-white font-black text-4xl uppercase tracking-tight">
              Last 16
            </h2>
            <p className="text-white/40 text-sm mt-2">
              3rd & 4th from each pool · 4 matches
            </p>
          </div>

          {userPoolOutcome === "qf-direct" && (
            <div className="bg-emerald-400/10 border border-emerald-400/30 rounded-xl p-4 mb-6 text-center">
              <p className="text-emerald-400 font-bold text-sm">
                You qualified directly to the Quarter-Finals
              </p>
            </div>
          )}

          <div className="space-y-2 mb-8">
            {last16Draw.fixtures.map((fixture, i) => (
              <FixtureRow
                key={i}
                home={fixture.homeTeam}
                away={fixture.awayTeam}
              />
            ))}
          </div>

          <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
            {userPoolOutcome === "qf-direct" ? (
              <button
                onClick={handleSkipLast16}
                className="px-10 py-4 bg-white text-black font-black text-lg uppercase tracking-widest rounded-xl hover:bg-white/90 active:scale-95 transition-all"
              >
                Continue
              </button>
            ) : (
              <>
                <SpeedControls
                  speedMode={speedMode}
                  onChange={(s) => onUpdate({ speedMode: s })}
                  className="justify-center flex-wrap"
                />
                <button
                  onClick={handleBeginLast16}
                  className="px-10 py-4 bg-white text-black font-black text-lg uppercase tracking-widest rounded-xl hover:bg-white/90 active:scale-95 transition-all"
                >
                  Begin Last 16
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (phase === "last-16" && !pendingResult) {
    return (
      <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center">
        <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (phase === "last-16" && pendingResult && last16Round) {
    return (
      <div className="relative min-h-screen bg-[#0a0a12] flex flex-col">
        {quitModal}
        <QuitButton
          onQuit={() => setShowQuitConfirm(true)}
          className="absolute top-4 left-4 z-20"
        />
        <div className="absolute top-4 right-4 z-20">
          <SpeedControls
            speedMode={speedMode}
            onChange={(s) => onUpdate({ speedMode: s })}
            className="flex-wrap"
          />
        </div>
        <div className="sticky top-0 z-10 bg-[#0a0a12]/95 backdrop-blur border-b border-white/10 px-4 py-4 pt-14">
          <div className="max-w-lg mx-auto text-center">
            <p className="text-white/30 text-xs uppercase tracking-widest">
              Last 16
            </p>
            <h2 className="text-white font-black text-lg uppercase tracking-tight">
              Match {last16MatchIndex + 1} of {last16Round.fixtures.length}
            </h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="max-w-lg mx-auto">
            <MatchAnimation
              key={last16MatchIndex}
              result={pendingResult}
              speedMode={speedMode}
              onComplete={handleLast16MatchComplete}
              matchNumber={last16MatchIndex + 1}
              totalMatches={last16Round.fixtures.length}
              userTeam={userClub}
            />
          </div>
        </div>
      </div>
    );
  }

  if (phase === "quarter-final-draw" && quarterFinalDraw) {
    return (
      <div className="relative min-h-screen bg-[#0a0a12] px-4 py-12">
        {quitModal}
        <QuitButton
          onQuit={() => setShowQuitConfirm(true)}
          className="absolute top-6 left-6 z-10"
        />
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-2">
              Knockout Stage
            </p>
            <h2 className="text-white font-black text-4xl uppercase tracking-tight">
              Quarter-Finals
            </h2>
            <p className="text-white/40 text-sm mt-2">
              1st vs cross-pool 2nd / L16 winner
            </p>
          </div>

          <div className="space-y-2 mb-8">
            {quarterFinalDraw.fixtures.map((fixture, i) => (
              <FixtureRow
                key={i}
                home={fixture.homeTeam}
                away={fixture.awayTeam}
              />
            ))}
          </div>

          <div className="flex flex-col gap-3 w-full max-w-xs mx-auto mb-6">
            <SpeedControls
              speedMode={speedMode}
              onChange={(s) => onUpdate({ speedMode: s })}
              className="justify-center flex-wrap"
            />
          </div>

          <div className="text-center">
            <button
              onClick={handleBeginKnockouts}
              className="px-10 py-4 bg-white text-black font-black text-lg uppercase tracking-widest rounded-xl hover:bg-white/90 active:scale-95 transition-all"
            >
              Begin Quarter-Finals
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "knockouts" && !pendingResult) {
    return (
      <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center">
        <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (phase === "knockouts" && pendingResult && activeKnockoutRound) {
    const completedInRound = activeKnockoutRound.fixtures.slice(
      0,
      knockoutMatchIndex,
    );

    return (
      <div className="relative min-h-screen bg-[#0a0a12] flex flex-col">
        {quitModal}
        <QuitButton
          onQuit={() => setShowQuitConfirm(true)}
          className="absolute top-4 left-4 z-20"
        />
        <div className="absolute top-4 right-4 z-20">
          <SpeedControls
            speedMode={speedMode}
            onChange={(s) => onUpdate({ speedMode: s })}
            className="flex-wrap"
          />
        </div>
        <div className="sticky top-0 z-10 bg-[#0a0a12]/95 backdrop-blur border-b border-white/10 px-4 py-4 pt-14">
          <div className="max-w-lg mx-auto text-center">
            <p className="text-white/30 text-xs uppercase tracking-widest">
              {activeKnockoutRound.name}
            </p>
            <h2 className="text-white font-black text-lg uppercase tracking-tight">
              Match {knockoutMatchIndex + 1} of{" "}
              {activeKnockoutRound.fixtures.length}
            </h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="max-w-lg mx-auto flex flex-col gap-4">
            <MatchAnimation
              key={`${knockoutRoundKey}-${knockoutMatchIndex}`}
              result={pendingResult}
              speedMode={speedMode}
              onComplete={handleKnockoutMatchComplete}
              matchNumber={knockoutMatchIndex + 1}
              totalMatches={activeKnockoutRound.fixtures.length}
              userTeam={userClub}
            />

            {knockoutRounds.length > 0 && (
              <KnockoutBracket rounds={knockoutRounds} userTeam={userClub} />
            )}

            {completedInRound.length > 0 && (
              <div className="space-y-2">
                <p className="text-white/30 text-xs uppercase tracking-widest">
                  {activeKnockoutRound.name} — Completed
                </p>
                {completedInRound.map((match, i) => (
                  <CompletedMatchCard
                    key={i}
                    result={match}
                    matchNumber={i + 1}
                    userTeam={userClub}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    const allResults = [
      ...poolResults,
      ...knockoutRounds.flatMap((r) => r.fixtures),
    ];
    const topScorer = getTopTryScorer(
      userClub,
      tryScorerCandidates,
      allResults,
    );
    const playerOfTournament = getPlayerOfTournament(state.draftSlots);
    const finalWinner =
      winner ||
      (knockoutRounds.length > 0
        ? getMatchWinner(knockoutRounds[knockoutRounds.length - 1].fixtures[0])
        : "");
    const userResult =
      finalWinner === userClub
        ? "You are the Champions!"
        : getUserProgressSummary(userClub, winner, eliminatedAt);
    const poolAward = userPool
      ? getPoolWinnerAward(userClub, userPool.table)
      : null;
    const shareAwards = [
      ...getKnockoutUserAwards(
        userClub,
        finalWinner,
        eliminatedAt,
        "Champions Cup",
      ),
      ...(poolAward ? [poolAward] : []),
    ];

    return (
      <div className="min-h-screen bg-[#0a0a12] px-4 py-12">
        {quitModal}
        {showShareCard && (
          <ShareCard
            state={state}
            userTeam={userClub}
            result={userResult}
            awards={shareAwards}
            onClose={() => setShowShareCard(false)}
          />
        )}
        <div className="max-w-lg mx-auto">
          <ResultsScreen
            winner={finalWinner}
            userResult={userResult}
            userTeam={userClub}
            topTryScorer={topScorer}
            playerOfTournament={playerOfTournament}
            mode="champions-cup"
            onPlayAgain={onExit}
            onShare={() => setShowShareCard(true)}
          />

          {userPool && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 mt-6">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-white font-black text-sm uppercase tracking-tight">
                  Your Pool ({userPool.name}) — Final Standings
                </h3>
                <span className="text-white/25 text-[10px] uppercase">
                  {getLeagueLabel(userClub)}
                </span>
              </div>
              <LeagueTable
                table={sortTable(userPool.table)}
                userTeam={userClub}
                title=""
              />
            </div>
          )}

          {knockoutRounds.length > 0 && (
            <div className="mb-6">
              <KnockoutBracket rounds={knockoutRounds} userTeam={userClub} />
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
