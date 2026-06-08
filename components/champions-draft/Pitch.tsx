'use client'
import PitchSlot from './PitchSlot'
import type { DraftSlot } from '@/types/champions-draft'

interface Props {
  slots: DraftSlot[]
  nextSlotIndex?: number
}

export default function Pitch({ slots, nextSlotIndex }: Props) {
  return (
    <div className="relative w-full" style={{ paddingBottom: '140%' }}>
      <div className="absolute inset-0 rounded-xl overflow-hidden">

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 140"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="100" height="140" fill="#2d5a27" />
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <rect
              key={i}
              x="0" y={i * 20} width="100" height="20"
              fill={i % 2 === 0 ? '#2d5a27' : '#305e2a'}
            />
          ))}
          <rect x="1" y="1" width="98" height="138" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
          <line x1="1" y1="70" x2="99" y2="70" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
          <circle cx="50" cy="70" r="10" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
          <circle cx="50" cy="70" r="0.8" fill="rgba(255,255,255,0.4)" />
          <rect x="21" y="1" width="58" height="18" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
          <rect x="34" y="1" width="32" height="9" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
          <rect x="21" y="121" width="58" height="18" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
          <rect x="34" y="130" width="32" height="9" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
          <circle cx="50" cy="11" r="1" fill="rgba(255,255,255,0.4)" />
          <circle cx="50" cy="129" r="1" fill="rgba(255,255,255,0.4)" />
        </svg>

        {slots.map((slot, index) => {
          const x = slot.coordinates.x
          const y = slot.coordinates.y
          const isNext = index === nextSlotIndex
          return (
            <div
              key={index}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <PitchSlot slot={slot} isNext={isNext} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
