"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

const SELECTOR = "[data-reveal], [data-reveal-stagger]";

/**
 * Wraps the mock. Content is visible without JS. Once mounted, it opts the tree into
 * scroll reveals and marks each [data-reveal] element as shown when it enters the viewport.
 * [data-reveal-stagger] lists reveal their children one after another (CSS reads --i).
 * Skips all of it when the visitor prefers reduced motion.
 *
 * It sits in the layout, which persists across client-side navigation, so it re-scans on
 * every route change and whenever new nodes stream in. Anything at or above the viewport
 * is shown straight away so nothing can be left hidden.
 */
export function RevealRoot({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const show = (el: Element) => el.setAttribute("data-shown", "");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Also catch elements the visitor has already scrolled past (fast scroll, jump links).
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            show(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    const scan = () => {
      root.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((list) => {
        Array.from(list.children).forEach((child, i) => {
          (child as HTMLElement).style.setProperty("--i", String(Math.min(i, 8)));
        });
      });
      const fold = window.innerHeight;
      root.querySelectorAll(SELECTOR).forEach((el) => {
        if (el.hasAttribute("data-shown")) return;
        if (el.getBoundingClientRect().top < fold) show(el);
        else observer.observe(el);
      });
    };

    scan();
    root.setAttribute("data-reveal-ready", "");

    const mutations = new MutationObserver(scan);
    mutations.observe(root, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
