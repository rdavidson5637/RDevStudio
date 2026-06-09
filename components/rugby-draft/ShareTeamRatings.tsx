interface Props {
  ratings: {
    forwards: number
    backs: number
    overall: number
  }
}

export default function ShareTeamRatings({ ratings }: Props) {
  return (
    <div className="mt-3 grid grid-cols-3 gap-1.5">
      {[
        { label: 'FWD', value: ratings.forwards },
        { label: 'BCK', value: ratings.backs },
        { label: 'OVR', value: ratings.overall },
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
