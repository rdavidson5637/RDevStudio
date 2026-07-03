"use client";
import type { WorldCupGroup } from "@/types/champions-draft";
import LeagueTable from "./LeagueTable";

interface Props {
  groups: WorldCupGroup[];
  userTeam: string;
  preview?: boolean;
}

function GroupTeamsList({
  teams,
  userTeam,
}: {
  teams: string[];
  userTeam: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      {teams.map((team) => (
        <div
          key={team}
          className={`rounded-lg px-3 py-2 text-sm font-semibold ${
            team === userTeam
              ? "bg-emerald-400/15 text-emerald-400 border border-emerald-400/20"
              : "bg-white/5 text-white border border-white/10"
          }`}
        >
          {team}
        </div>
      ))}
    </div>
  );
}

export default function WCGroupStage({
  groups,
  userTeam,
  preview = false,
}: Props) {
  const userGroup = groups.find((g) => g.teams.includes(userTeam));
  const otherGroups = groups.filter((g) => !g.teams.includes(userTeam));

  return (
    <div className="w-full flex flex-col gap-6">
      {userGroup && (
        <div className="bg-emerald-400/10 border border-emerald-400/20 rounded-xl p-4">
          <p className="text-emerald-400 text-xs uppercase tracking-widest mb-3 font-bold">
            Your Group · Group {userGroup.name}
          </p>
          {preview ? (
            <GroupTeamsList teams={userGroup.teams} userTeam={userTeam} />
          ) : (
            <LeagueTable table={userGroup.table} userTeam={userTeam} title="" />
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {otherGroups.map((group) => (
          <div
            key={group.name}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">
              Group {group.name}
            </p>
            {preview ? (
              <GroupTeamsList teams={group.teams} userTeam={userTeam} />
            ) : (
              <LeagueTable table={group.table} userTeam={userTeam} title="" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
