'use client'
import { getClubColour } from '@/lib/rugby-draft/utils'

interface Props {
  badge: string
  initials: string
  overall: number
  size?: 'sm' | 'md' | 'lg'
  dimmed?: boolean
}

export default function Kit({ badge, initials, overall, size = 'md', dimmed = false }: Props) {
  const colour = getClubColour(badge)
  const sizes = {
    sm: { outer: 36, shirt: 28, font: 8, ratingSize: 10, ratingOffset: 12 },
    md: { outer: 52, shirt: 40, font: 11, ratingSize: 13, ratingOffset: 17 },
    lg: { outer: 68, shirt: 52, font: 14, ratingSize: 16, ratingOffset: 22 },
  }
  const s = sizes[size]

  return (
    <div
      style={{ width: s.outer, height: s.outer }}
      className="relative flex items-center justify-center"
    >
      <svg
        width={s.shirt}
        height={s.shirt}
        viewBox="0 0 40 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: dimmed ? 0.35 : 1 }}
      >
        <path
          d="M14 2 L2 10 L6 16 L10 13 L10 42 L30 42 L30 13 L34 16 L38 10 L26 2 C26 2 24 6 20 6 C16 6 14 2 14 2Z"
          fill={colour}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.8"
        />
        <text
          x="20"
          y="28"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(255,255,255,0.9)"
          fontSize={s.font}
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.5"
        >
          {initials}
        </text>
      </svg>

      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: s.ratingSize,
          height: s.ratingSize,
          borderRadius: '50%',
          background: overall >= 90 ? '#f59e0b' : overall >= 80 ? '#10b981' : '#6b7280',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: s.ratingSize * 0.6,
          fontWeight: 700,
          color: '#fff',
          lineHeight: 1,
          opacity: dimmed ? 0.35 : 1,
        }}
      >
        {overall}
      </div>
    </div>
  )
}
