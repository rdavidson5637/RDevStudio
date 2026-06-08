interface Props {
  ratings: {
    attack: number
    midfield: number
    defence: number
    goalkeeper: number
  }
}

export default function ShareTeamRatings({ ratings }: Props) {
  return (
    <div className="mt-3 grid grid-cols-4 gap-1.5">
      {[
        { label: 'ATK', value: ratings.attack },
        { label: 'MID', value: ratings.midfield },
        { label: 'DEF', value: ratings.defence },
        { label: 'GK', value: ratings.goalkeeper },
      ].map(({ label, value }) => (
        <div
          key={label}
          className="text-center rounded-lg bg-white/[0.04] border border-white/[0.06] py-1.5"
        >
          <p className="text-white/25 text-[8px] uppercase tracking-wider">
            {label}
          </p>
          <p className="text-white font-black text-sm tabular-nums">{value}</p>
        </div>
      ))}
    </div>
  )
}
