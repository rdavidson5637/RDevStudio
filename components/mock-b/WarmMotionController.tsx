"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Lightweight coastal motion & reveal controller for Mock B (/mock-b/**).
 * - Single IntersectionObserver across [data-mb-reveal] and [data-mb-wave] elements.
 * - Only animates elements below the initial viewport fold so LCP stays instant.
 * - Re-initialises cleanly on client-side route transitions via usePathname().
 * - Drives a subtle 3px coastal tide progress line along the sticky header.
 * - Completely disabled under prefers-reduced-motion: reduce.
 */
export function WarmMotionController() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const bar = barRef.current;

    const resetAllVisible = () => {
      document.querySelectorAll<HTMLElement>("[data-mb-reveal]").forEach((el) => {
        el.classList.remove("mb-reveal-pending");
        el.classList.add("mb-reveal-in");
      });
      document.querySelectorAll<HTMLElement>("[data-mb-wave]").forEach((el) => {
        el.classList.remove("mb-wave-pending");
        el.classList.add("mb-wave-in");
      });
      if (bar) {
        bar.style.transform = "scaleX(0)";
      }
    };

    if (mediaQuery.matches) {
      resetAllVisible();
      return;
    }

    // 1. Subtle coastal tide reading-progress ribbon
    let rafId = 0;
    const updateProgress = () => {
      rafId = 0;
      if (!bar) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const ratio = scrollable > 24 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      bar.style.transform = `scaleX(${ratio.toFixed(4)})`;
    };

    const scheduleProgress = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", scheduleProgress, { passive: true });
    window.addEventListener("resize", scheduleProgress, { passive: true });

    // 2. Single IntersectionObserver for below-the-fold reveals & hand-drawn waves
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>("[data-mb-reveal]"));
    const waveEls = Array.from(document.querySelectorAll<HTMLElement>("[data-mb-wave]"));
    const foldY = window.innerHeight * 0.94;

    const pendingTargets: HTMLElement[] = [];

    for (const el of revealEls) {
      const rect = el.getBoundingClientRect();
      if (rect.top > foldY) {
        el.classList.remove("mb-reveal-in");
        el.classList.add("mb-reveal-pending");
        pendingTargets.push(el);
      } else {
        el.classList.remove("mb-reveal-pending");
        el.classList.add("mb-reveal-in");
      }
    }

    for (const el of waveEls) {
      const rect = el.getBoundingClientRect();
      if (rect.top > foldY) {
        el.classList.remove("mb-wave-in");
        el.classList.add("mb-wave-pending");
        pendingTargets.push(el);
      } else {
        el.classList.remove("mb-wave-pending");
        el.classList.add("mb-wave-in");
      }
    }

    let observer: IntersectionObserver | null = null;

    if ("IntersectionObserver" in window && pendingTargets.length > 0) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const target = entry.target as HTMLElement;
            if (target.hasAttribute("data-mb-reveal")) {
              target.classList.remove("mb-reveal-pending");
              target.classList.add("mb-reveal-in");
            }
            if (target.hasAttribute("data-mb-wave")) {
              target.classList.remove("mb-wave-pending");
              target.classList.add("mb-wave-in");
            }
            observer?.unobserve(target);
          }
        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -32px 0px",
        },
      );

      for (const el of pendingTargets) {
        observer.observe(el);
      }
    } else {
      resetAllVisible();
    }

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        observer?.disconnect();
        resetAllVisible();
      }
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleProgress);
      window.removeEventListener("resize", scheduleProgress);
      mediaQuery.removeEventListener("change", handleMotionChange);
      observer?.disconnect();
    };
  }, [pathname]);

  return (
    <div className="mb-tide-track" aria-hidden="true">
      <div ref={barRef} className="mb-tide-bar" />
    </div>
  );
}
