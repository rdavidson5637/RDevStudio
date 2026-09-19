"use client";

import { useEffect, useState } from "react";

export function DeadlineNotifier({
  deadline,
  flags,
}: {
  deadline: string | null;
  flags: string[];
}) {
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">("default");

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      setPermission("unsupported");
      return;
    }
    setPermission(Notification.permission);
  }, []);

  useEffect(() => {
    if (permission !== "granted" || !deadline || flags.length === 0) return;
    const deadlineMs = new Date(deadline).getTime();
    if (Number.isNaN(deadlineMs)) return;
    const fireAt = deadlineMs - 2 * 60 * 60 * 1000;
    const key = `draft-deadline-${deadline}`;

    const fire = () => {
      try {
        if (sessionStorage.getItem(key)) return;
        sessionStorage.setItem(key, "1");
      } catch {
        return;
      }
      new Notification("FPL Draft deadline", {
        body: `Your XI currently has ${flags.join(", ")}. Change it in the FPL app.`,
      });
    };

    const now = Date.now();
    if (now >= fireAt && now < deadlineMs) {
      fire();
      return;
    }
    const delay = fireAt - now;
    if (delay <= 0 || delay > 48 * 60 * 60 * 1000) return;
    const timer = window.setTimeout(fire, delay);
    return () => window.clearTimeout(timer);
  }, [permission, deadline, flags]);

  if (permission === "unsupported" || !deadline) return null;

  if (permission === "granted") {
    return (
      <p className="mt-2 text-xs text-secondary">
        Browser alerts on for this tab - they fire about two hours before the deadline if the XI still looks wrong.
      </p>
    );
  }

  return (
    <button
      type="button"
      className="mt-3 text-xs text-accent hover:underline"
      onClick={async () => {
        const next = await Notification.requestPermission();
        setPermission(next);
      }}
    >
      Enable deadline alerts in this browser
    </button>
  );
}
