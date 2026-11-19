"use client";

import { useEffect, useState } from "react";

export function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London", hour: "2-digit", minute: "2-digit", hour12: false,
    }).format(new Date()));
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);
  return <span className="time-chip"><span className="time-dot" aria-hidden="true" />Carrickfergus, NI <time>{time || "··:··"}</time></span>;
}
