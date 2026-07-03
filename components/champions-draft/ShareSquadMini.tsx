"use client";
import {
  getPositionStyle,
  getSquadAvgOvr,
  sortSquadForDisplay,
  type ShareSquadPlayer,
} from "./shareHelpers";

interface Props {
  squad: ShareSquadPlayer[];
  formation?: string | null;
}

export default function ShareSquadMini({ squad, formation }: Props) {
  if (squad.length === 0) return null;

  const sorted = sortSquadForDisplay(squad);
  const avgOvr = getSquadAvgOvr(sorted);
  const starPlayer = sorted.reduce((best, p) =>
    p.overall > best.overall ? p : best,
  );

  return (
    <div className="mt-4 pt-4 border-t border-white/10">
      <div className="flex items-center justify-between mb-2.5">
        <p className="text-white/25 text-[9px] uppercase tracking-widest">
          My XI
        </p>
        <div className="flex items-center gap-2">
          {formation && (
            <span className="text-white/35 text-[9px] uppercase tracking-widest">
              {formation}
            </span>
          )}
          <span className="text-[9px] font-black uppercase tracking-wider text-white/50 bg-white/8 px-2 py-0.5 rounded-full tabular-nums">
            {avgOvr} Avg
          </span>
        </div>
      </div>

      <div className="space-y-1">
        {sorted.map((player, i) => {
          const isStar = player.name === starPlayer.name;
          return (
            <div
              key={`${player.name}-${i}`}
              className={`flex items-center gap-2 min-w-0 rounded-md px-1.5 py-0.5 ${
                isStar ? "bg-white/[0.06]" : ""
              }`}
            >
              <span
                className={`text-[8px] font-black w-6 text-center rounded px-0.5 py-0.5 flex-shrink-0 ${getPositionStyle(player.position)}`}
              >
                {player.position}
              </span>
              <span className="text-white/85 text-[10px] truncate flex-1">
                {isStar && <span className="mr-0.5">★</span>}
                {player.name}
              </span>
              <span
                className={`text-[9px] font-black tabular-nums flex-shrink-0 ${
                  isStar ? "text-amber-300" : "text-white/40"
                }`}
              >
                {player.overall}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
