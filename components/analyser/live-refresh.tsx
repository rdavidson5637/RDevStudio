"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function LiveRefresh() {
  const router = useRouter();
  useEffect(() => {
    let stop = false;
    const tick = async () => {
      if (stop) return;
      await fetch("/api/draft/live/refresh", { method: "POST" }).catch(() => null);
      if (!stop) router.refresh();
    };
    const id = window.setInterval(tick, 60_000);
    return () => {
      stop = true;
      window.clearInterval(id);
    };
  }, [router]);
  return null;
}
