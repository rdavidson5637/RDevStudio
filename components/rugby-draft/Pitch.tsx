'use client'
import PitchSlot from './PitchSlot'
import { RUGBY_POSITIONS, POSITION_COORDINATES } from '@/lib/rugby-draft/utils'
import type { DraftSlot } from '@/types/rugby-draft'

interface Props {
  slots: DraftSlot[]
  nextSlotIndex?: number
}

export default function Pitch({ slots, nextSlotIndex }: Props) {
  return (
    <div
      className="relative w-full max-w-full mx-auto overflow-hidden"
      style={{ paddingBottom: 'min(140%, 70vh)' }}
    >
      <div className="absolute inset-0 rounded-xl overflow-hidden max-w-full">

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
          <line x1="1" y1="46.67" x2="99" y2="46.67" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
          <line x1="1" y1="93.33" x2="99" y2="93.33" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
        </svg>

        {RUGBY_POSITIONS.map((position, index) => {
          const slot = slots[index] ?? { position, player: null, coordinates: POSITION_COORDINATES[index] }
          const coord = POSITION_COORDINATES[index]
          const isNext = index === nextSlotIndex
          return (
            <div
              key={position}
              className="absolute"
              style={{
                left: `${coord.x}%`,
                top: `${coord.y}%`,
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
