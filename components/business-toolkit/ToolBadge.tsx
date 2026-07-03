import type { ToolBadge } from "@/types/business-toolkit";

type ToolBadgeProps = {
  badge: ToolBadge;
};

const BADGE_STYLES: Record<ToolBadge, string> = {
  new: "border-accent/40 bg-accent/10 text-accent",
  "coming-soon": "border-border-strong bg-base text-secondary",
};

const BADGE_LABELS: Record<ToolBadge, string> = {
  new: "New",
  "coming-soon": "Coming soon",
};

export function ToolBadge({ badge }: ToolBadgeProps) {
  return (
    <span
      className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${BADGE_STYLES[badge]}`}
    >
      {BADGE_LABELS[badge]}
    </span>
  );
}
