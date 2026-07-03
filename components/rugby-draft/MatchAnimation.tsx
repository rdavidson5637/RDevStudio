"use client";
import { useEffect, useState, useRef } from "react";
import type { MatchResult } from "@/types/rugby-draft";

interface AnimationProps {
  result: MatchResult;
  speedMode: "normal" | "fast" | "skip";
  onComplete: () => void;
  matchNumber: number;
  totalMatches: number;
  userTeam?: string;
}

function getUserResult(
  result: MatchResult,
  userTeam: string,
): "W" | "D" | "L" | null {
  const isHome = result.homeTeam === userTeam;
  const isAway = result.awayTeam === userTeam;
  if (!isHome && !isAway) return null;

  const userScore = isHome ? result.homeScore : result.awayScore;
  const oppScore = isHome ? result.awayScore : result.homeScore;
  if (userScore > oppScore) return "W";
  if (userScore < oppScore) return "L";
  return "D";
}

export function CompletedMatchCard({
  result,
  matchNumber,
  userTeam,
}: {
  result: MatchResult;
  matchNumber: number;
  userTeam?: string;
}) {
  const outcome = userTeam ? getUserResult(result, userTeam) : null;

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
      <span className="text-white/25 text-xs font-bold tabular-nums w-7 flex-shrink-0">
        {matchNumber}
      </span>
      <div className="flex-1 min-w-0 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-sm">
        <span
          className={`truncate text-right ${
            result.homeTeam === userTeam
              ? "text-emerald-400 font-semibold"
              : "text-white/70"
          }`}
        >
          {result.homeTeam}
        </span>
        <span className="text-white font-black tabular-nums text-base px-1">
          {result.homeScore}–{result.awayScore}
        </span>
        <span
          className={`truncate ${
            result.awayTeam === userTeam
              ? "text-emerald-400 font-semibold"
              : "text-white/70"
          }`}
        >
          {result.awayTeam}
        </span>
      </div>
      {outcome && (
        <span
          className={`text-[10px] font-black uppercase tracking-wide px-2 py-1 rounded-full flex-shrink-0 ${
            outcome === "W"
              ? "bg-emerald-400/20 text-emerald-400"
              : outcome === "D"
                ? "bg-white/10 text-white/50"
                : "bg-red-400/20 text-red-400"
          }`}
        >
          {outcome}
        </span>
      )}
    </div>
  );
}

export default function MatchAnimation({
  result,
  speedMode,
  onComplete,
  matchNumber,
  totalMatches,
  userTeam,
}: AnimationProps) {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [minute, setMinute] = useState(0);
  const [done, setDone] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    doneRef.current = false;
    setHomeScore(0);
    setAwayScore(0);
    setMinute(0);
    setDone(false);

    if (speedMode === "skip") {
      setHomeScore(result.homeScore);
      setAwayScore(result.awayScore);
      setMinute(90);
      setDone(true);
      doneRef.current = true;
      return;
    }

    const totalPoints = result.homeScore + result.awayScore;
    const pointMinutes = Array.from(
      { length: totalPoints },
      () => Math.floor(Math.random() * 85) + 1,
    ).sort((a, b) => a - b);

    let homePointsScored = 0;
    let awayPointsScored = 0;
    const pointQueue = [...pointMinutes];

    const duration = speedMode === "fast" ? 1200 : 3500;
    const intervalMs = duration / 90;
    let currentMinute = 0;

    const homePointProb = result.homeScore / Math.max(1, totalPoints);

    const tick = setInterval(() => {
      if (doneRef.current) {
        clearInterval(tick);
        return;
      }
      currentMinute++;
      setMinute(currentMinute);

      if (pointQueue.length > 0 && currentMinute >= pointQueue[0]) {
        pointQueue.shift();
        const isHome = Math.random() < homePointProb;
        if (isHome && homePointsScored < result.homeScore) {
          homePointsScored++;
          setHomeScore(homePointsScored);
        } else if (!isHome && awayPointsScored < result.awayScore) {
          awayPointsScored++;
          setAwayScore(awayPointsScored);
        }
      }

      if (currentMinute >= 90) {
        clearInterval(tick);
        setHomeScore(result.homeScore);
        setAwayScore(result.awayScore);
        setMinute(90);
        setDone(true);
        doneRef.current = true;
      }
    }, intervalMs);

    return () => {
      clearInterval(tick);
    };
  }, [result, speedMode, matchNumber]);

  useEffect(() => {
    if (done) {
      const delay =
        speedMode === "skip" ? 200 : speedMode === "fast" ? 300 : 600;
      const t = setTimeout(onComplete, delay);
      return () => clearTimeout(t);
    }
  }, [done, onComplete, speedMode]);

  const progressWidth = (minute / 90) * 100;

  return (
    <div className="bg-emerald-400/5 border border-emerald-400/30 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-emerald-400/80 text-xs uppercase tracking-widest font-bold">
          Live · Match {matchNumber} of {totalMatches}
        </p>
        <p className="text-white/30 text-xs tabular-nums">
          {done ? "FT" : `${minute}'`}
        </p>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 mb-3">
        <p
          className={`text-sm font-bold truncate text-right ${
            result.homeTeam === userTeam ? "text-emerald-400" : "text-white"
          }`}
        >
          {result.homeTeam}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-white font-black text-3xl tabular-nums">
            {homeScore}
          </span>
          <span className="text-white/30 font-black text-xl">–</span>
          <span className="text-white font-black text-3xl tabular-nums">
            {awayScore}
          </span>
        </div>
        <p
          className={`text-sm font-bold truncate ${
            result.awayTeam === userTeam ? "text-emerald-400" : "text-white"
          }`}
        >
          {result.awayTeam}
        </p>
      </div>

      <p className="text-white/25 text-[10px] uppercase tracking-widest text-center mb-2">
        Points
      </p>

      <div className="w-full bg-white/10 rounded-full h-1">
        <div
          className="bg-emerald-400 h-1 rounded-full transition-all duration-75"
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </div>
  );
}
