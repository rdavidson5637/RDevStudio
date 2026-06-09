"use client";

type AchievementNotificationProps = {
  title: string | null;
  prefersReducedMotion?: boolean;
};

export function AchievementNotification({
  title,
  prefersReducedMotion = false,
}: AchievementNotificationProps) {
  if (!title) return null;

  return (
    <div
      role="status"
      className={`fixed right-4 top-24 z-[85] w-[min(20rem,calc(100vw-2rem))] rounded-xl border border-emerald-500/30 bg-base/95 p-4 shadow-lg backdrop-blur-md sm:right-6 ${
        prefersReducedMotion ? "" : "animate-slide-in-right"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
        Achievement Unlocked
      </p>
      <p className="mt-2 font-display text-lg font-bold text-primary">{title}</p>
    </div>
  );
}
