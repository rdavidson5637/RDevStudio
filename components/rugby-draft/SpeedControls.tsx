'use client'

type SpeedMode = 'normal' | 'fast' | 'skip'

interface Props {
  speedMode: SpeedMode
  onChange: (mode: SpeedMode) => void
  className?: string
}

export default function SpeedControls({
  speedMode,
  onChange,
  className = '',
}: Props) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {(['normal', 'fast', 'skip'] as const).map(s => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
            speedMode === s
              ? 'bg-white text-black'
              : 'bg-white/10 text-white/40 hover:bg-white/20'
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  )
}
