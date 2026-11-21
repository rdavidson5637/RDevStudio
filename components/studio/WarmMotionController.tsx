"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Minimal reveal controller for the site pages.
 * - Fades in below-the-fold [data-mb-reveal] elements once via IntersectionObserver.
 * - Above-the-fold content is never hidden so LCP stays immediate.
 * - Immediately reveals anything scrolled past (including anchor jumps).
 * - Disabled under prefers-reduced-motion: reduce.
 */
export function WarmMotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const revealElement = (el: HTMLElement) => {
      el.classList.remove("mb-reveal-pending");
      el.classList.add("mb-reveal-in");
    };

    const resetAllVisible = () => {
      document.querySelectorAll<HTMLElement>("[data-mb-reveal]").forEach(revealElement);
    };

    if (mediaQuery.matches) {
      resetAllVisible();
      return;
    }

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-mb-reveal]"));
    const pendingSet = new Set<HTMLElement>();
    const foldY = window.innerHeight * 0.94;

    for (const el of targets) {
      if (el.getBoundingClientRect().top > foldY) {
        el.classList.remove("mb-reveal-in");
        el.classList.add("mb-reveal-pending");
        pendingSet.add(el);
      } else {
        revealElement(el);
      }
    }

    let observer: IntersectionObserver | null = null;

    const markRevealed = (el: HTMLElement) => {
      revealElement(el);
      pendingSet.delete(el);
      observer?.unobserve(el);
    };

    const sweepVisibleAndPassed = () => {
      if (pendingSet.size === 0) return;
      const thresholdY = window.innerHeight * 0.96;
      pendingSet.forEach((el) => {
        if (el.getBoundingClientRect().top <= thresholdY) {
          markRevealed(el);
        }
      });
    };

    if ("IntersectionObserver" in window && pendingSet.size > 0) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            markRevealed(entry.target as HTMLElement);
          }
        },
        {
          threshold: 0.01,
          rootMargin: "80px 0px 80px 0px",
        },
      );

      pendingSet.forEach((el) => observer?.observe(el));
    } else {
      resetAllVisible();
    }

    let rafId = 0;
    const scheduleSweep = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        sweepVisibleAndPassed();
      });
    };

    window.addEventListener("scroll", scheduleSweep, { passive: true });
    window.addEventListener("resize", scheduleSweep, { passive: true });
    window.addEventListener("hashchange", scheduleSweep, { passive: true });

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        observer?.disconnect();
        pendingSet.clear();
        resetAllVisible();
      }
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleSweep);
      window.removeEventListener("resize", scheduleSweep);
      window.removeEventListener("hashchange", scheduleSweep);
      mediaQuery.removeEventListener("change", handleMotionChange);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
