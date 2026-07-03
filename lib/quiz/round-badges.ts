import { RoundFormat } from "./types";

export interface RoundFormatBadge {
  icon: string;
  label: string;
  className: string;
}

export const ROUND_FORMAT_BADGES: Partial<
  Record<RoundFormat, RoundFormatBadge>
> = {
  [RoundFormat.PICTURE]: {
    icon: "🖼",
    label: "Picture",
    className: "border-quiz-picture/40 bg-quiz-picture/10 text-quiz-picture",
  },
  [RoundFormat.MUSIC]: {
    icon: "♪",
    label: "Music",
    className: "border-quiz-music/40 bg-quiz-music/10 text-quiz-music",
  },
  [RoundFormat.BUZZER]: {
    icon: "⚡",
    label: "Buzzer",
    className: "border-quiz-buzzer/40 bg-quiz-buzzer/10 text-quiz-buzzer",
  },
  [RoundFormat.RISK]: {
    icon: "!",
    label: "Risk",
    className: "border-quiz-risk/40 bg-quiz-risk/10 text-quiz-risk",
  },
};

export function getRoundFormatBadge(
  format?: RoundFormat,
): RoundFormatBadge | null {
  if (!format) {
    return null;
  }

  return ROUND_FORMAT_BADGES[format] ?? null;
}
