"use client";

import { useEffect, useState } from "react";

export function Countdown({ deadline, initial }: { deadline: string; initial: string }) {
  const [label, setLabel] = useState(initial);

  useEffect(() => {
    const tick = () => {
      const diff = new Date(deadline).getTime() - Date.now();
      if (diff <= 0) {
        setLabel("Deadline passed");
        return;
      }
      const total = Math.floor(diff / 1000);
      const days = Math.floor(total / 86400);
      const hours = Math.floor((total % 86400) / 3600);
      const mins = Math.floor((total % 3600) / 60);
      const secs = total % 60;
      setLabel(days > 0 ? `${days}d ${hours}h ${mins}m` : `${hours}h ${mins}m ${secs}s`);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [deadline]);

  return (
    <span className="t-small nums" title={initial}>
      {label}
    </span>
  );
}
