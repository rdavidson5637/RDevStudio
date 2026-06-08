'use client'
import type { LeagueTableRow } from '@/types/champions-draft'

interface Props {
  table: LeagueTableRow[]
  userTeam: string
  title?: string
}

export default function LeagueTable({ table, userTeam, title = 'League Table' }: Props) {
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-white font-black text-lg uppercase tracking-tight mb-3">
          {title}
        </h3>
      )}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-white/30 text-xs uppercase tracking-widest border-b border-white/10">
              <th className="text-left py-2 pr-2 w-6">#</th>
              <th className="text-left py-2 pr-4">Club</th>
              <th className="text-center py-2 px-2">P</th>
              <th className="text-center py-2 px-2">W</th>
              <th className="text-center py-2 px-2">D</th>
              <th className="text-center py-2 px-2">L</th>
              <th className="text-center py-2 px-2">GD</th>
              <th className="text-center py-2 px-2 font-bold">Pts</th>
            </tr>
          </thead>
          <tbody>
            {table.map((row, index) => {
              const isUser = row.club === userTeam
              return (
                <tr
                  key={row.club}
                  className={`border-b border-white/5 transition-colors ${
                    isUser
                      ? 'bg-emerald-400/10 text-emerald-400'
                      : 'text-white/70 hover:bg-white/5'
                  }`}
                >
                  <td className="py-2.5 pr-2 text-white/30 text-xs">{index + 1}</td>
                  <td className="py-2.5 pr-4">
                    <span className={`font-semibold ${isUser ? 'text-emerald-400' : 'text-white'}`}>
                      {row.club}
                      {isUser && (
                        <span className="ml-2 text-[10px] bg-emerald-400/20 text-emerald-400 px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                          You
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="py-2.5 px-2 text-center tabular-nums">{row.played}</td>
                  <td className="py-2.5 px-2 text-center tabular-nums">{row.won}</td>
                  <td className="py-2.5 px-2 text-center tabular-nums">{row.drawn}</td>
                  <td className="py-2.5 px-2 text-center tabular-nums">{row.lost}</td>
                  <td className="py-2.5 px-2 text-center tabular-nums">
                    {row.goalDifference > 0 ? '+' : ''}{row.goalDifference}
                  </td>
                  <td className="py-2.5 px-2 text-center tabular-nums font-black text-white">
                    {row.points}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
