'use client'
import type { CLGroup } from '@/types/champions-draft'
import LeagueTable from './LeagueTable'

interface Props {
  groups: CLGroup[]
  userTeam: string
}

export default function CLGroupStage({ groups, userTeam }: Props) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {groups.map(group => (
          <div
            key={group.name}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">
              Group {group.name}
            </p>
            <LeagueTable
              table={group.table}
              userTeam={userTeam}
              title=""
            />
          </div>
        ))}
      </div>
    </div>
  )
}
