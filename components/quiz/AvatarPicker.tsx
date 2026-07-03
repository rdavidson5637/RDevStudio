"use client";

import { PLAYER_AVATARS, PLAYER_COLOURS } from "@/lib/quiz/types";

interface AvatarPickerProps {
  selectedAvatar: string;
  selectedColour: string;
  onAvatarChange: (avatar: string) => void;
  onColourChange: (colour: string) => void;
}

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4 text-white"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function AvatarPicker({
  selectedAvatar,
  selectedColour,
  onAvatarChange,
  onColourChange,
}: AvatarPickerProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium text-white">Pick your avatar</p>
        <div className="grid grid-cols-6 gap-2 sm:grid-cols-12">
          {PLAYER_AVATARS.map((avatar) => {
            const isSelected = avatar === selectedAvatar;

            return (
              <button
                key={avatar}
                type="button"
                onClick={() => onAvatarChange(avatar)}
                className={`flex h-12 w-full items-center justify-center rounded-xl text-2xl transition-all ${
                  isSelected
                    ? "ring-2 ring-quiz-amber ring-offset-2 ring-offset-quiz-surface"
                    : "bg-quiz-bg hover:bg-white/5"
                }`}
                aria-label={`Avatar ${avatar}`}
                aria-pressed={isSelected}
              >
                {avatar}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-white">Pick your colour</p>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
          {PLAYER_COLOURS.map((colour) => {
            const isSelected = colour === selectedColour;

            return (
              <button
                key={colour}
                type="button"
                onClick={() => onColourChange(colour)}
                className={`flex h-12 w-full items-center justify-center rounded-xl transition-all ${
                  isSelected
                    ? "ring-2 ring-white ring-offset-2 ring-offset-quiz-surface"
                    : ""
                }`}
                style={{ backgroundColor: colour }}
                aria-label={`Colour ${colour}`}
                aria-pressed={isSelected}
              >
                {isSelected ? <CheckIcon /> : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
