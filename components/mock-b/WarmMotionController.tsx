"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Lightweight coastal motion & reveal controller for Mock B (/mock-b/**).
 * - Single IntersectionObserver + scroll-sweep across [data-mb-reveal] and [data-mb-wave] elements.
 * - Only animates elements below the initial viewport fold so LCP stays instant.
 * - Immediately reveals anything scrolled past (e.g. anchor jumps like #quote or #rondo).
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

    const revealElement = (el: HTMLElement) => {
      if (el.hasAttribute("data-mb-reveal")) {
        el.classList.remove("mb-reveal-pending");
        el.classList.add("mb-reveal-in");
      }
      if (el.hasAttribute("data-mb-wave")) {
        el.classList.remove("mb-wave-pending");
        el.classList.add("mb-wave-in");
      }
    };

    const resetAllVisible = () => {
      document.querySelectorAll<HTMLElement>("[data-mb-reveal], [data-mb-wave]").forEach(revealElement);
      if (bar) {
        bar.style.transform = "scaleX(0)";
      }
    };

    if (mediaQuery.matches) {
      resetAllVisible();
      return;
    }

    // Collect targets and mark only below-the-fold items as pending
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-mb-reveal], [data-mb-wave]"),
    );
    const pendingSet = new Set<HTMLElement>();
    const foldY = window.innerHeight * 0.94;

    for (const el of targets) {
      const rect = el.getBoundingClientRect();
      if (rect.top > foldY) {
        if (el.hasAttribute("data-mb-reveal")) {
          el.classList.remove("mb-reveal-in");
          el.classList.add("mb-reveal-pending");
        }
        if (el.hasAttribute("data-mb-wave")) {
          el.classList.remove("mb-wave-in");
          el.classList.add("mb-wave-pending");
        }
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
          threshold: 0.05,
          rootMargin: "0px 0px -24px 0px",
        },
      );

      pendingSet.forEach((el) => observer?.observe(el));
    } else {
      resetAllVisible();
    }

    // Coastal tide reading-progress ribbon + scroll sweep for fast scrolls / hash jumps
    let rafId = 0;
    const updateOnScroll = () => {
      rafId = 0;
      if (bar) {
        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - window.innerHeight;
        const ratio = scrollable > 24 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
        bar.style.transform = `scaleX(${ratio.toFixed(4)})`;
      }
      sweepVisibleAndPassed();
    };

    const scheduleUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateOnScroll);
    };

    updateOnScroll();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    window.addEventListener("hashchange", scheduleUpdate, { passive: true });

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
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
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
