"use client";

type ConnectionStatus = "connected" | "disconnected" | "unavailable";

interface ConnectionBadgeProps {
  status: ConnectionStatus;
}

const LABELS: Record<ConnectionStatus, string> = {
  connected: "Live",
  disconnected: "Reconnecting…",
  unavailable: "Offline mode",
};

const COLORS: Record<ConnectionStatus, string> = {
  connected: "bg-quiz-success",
  disconnected: "bg-quiz-amber animate-pulse",
  unavailable: "bg-quiz-muted",
};

export function ConnectionBadge({ status }: ConnectionBadgeProps) {
  return (
    <div className="fixed left-4 top-4 z-50 flex items-center gap-2 rounded-full border border-quiz-border bg-quiz-surface/90 px-3 py-1.5 text-xs text-quiz-muted backdrop-blur-sm">
      <span
        className={`h-2 w-2 rounded-full ${COLORS[status]}`}
        aria-hidden="true"
      />
      <span>{LABELS[status]}</span>
    </div>
  );
}
