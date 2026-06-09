"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Please.",
  "Seriously.",
  "Look at all these qualifications.",
  "I built this entire page.",
  "The dog approves.",
  "I have read the entire employee handbook. Twice. For fun.",
  "Statistically speaking, you should hire me.",
  "I can also make you a website. Just saying.",
  "This number cannot legally go higher.",
] as const;

type HireMeterProps = {
  prefersReducedMotion?: boolean;
};

export function HireMeter({ prefersReducedMotion = false }: HireMeterProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((current) => (current + 1) % MESSAGES.length);
        setVisible(true);
      }, 300);
    }, 1800);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <div
      aria-live="polite"
      className={`mx-auto mt-10 max-w-sm rounded-xl border-2 border-amber-400 bg-[#0A0A0A] p-8 text-center shadow-[0_0_60px_rgba(245,158,11,0.3)] ${
        prefersReducedMotion ? "" : "hire-meter-glow"
      }`}
    >
      <p
        className={`text-3xl ${prefersReducedMotion ? "" : "animate-pulse"}`}
        aria-hidden="true"
      >
        🔥🔥🔥
      </p>
      <p className="mt-4 font-mono text-xs uppercase tracking-widest text-amber-400">
        Hire Probability
      </p>
      <p className="mt-4 font-display text-8xl font-bold text-white">99.9%</p>
      <p
        className={`mt-4 text-sm font-medium text-amber-400 ${
          prefersReducedMotion
            ? ""
            : `transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`
        }`}
      >
        {prefersReducedMotion ? MESSAGES[0] : MESSAGES[index]}
      </p>
    </div>
  );
}
