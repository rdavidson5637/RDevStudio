"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps the mock. Content is visible without JS. Once mounted, it opts the tree into
 * scroll reveals and marks each [data-reveal] element as shown when it enters the viewport.
 * Skips all of it when the visitor prefers reduced motion.
 */
export function RevealRoot({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-shown", "");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    const targets = root.querySelectorAll("[data-reveal]");
    // Anything already on screen shows straight away, so the first paint never blanks.
    const fold = window.innerHeight;
    targets.forEach((el) => {
      if (el.getBoundingClientRect().top < fold) el.setAttribute("data-shown", "");
      else observer.observe(el);
    });
    root.setAttribute("data-reveal-ready", "");

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
