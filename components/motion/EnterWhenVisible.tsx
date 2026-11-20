"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type EnterWhenVisibleProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section" | "li";
  /** Stagger delay in ms once the element is in view. */
  delayMs?: number;
};

/**
 * One entrance when the block enters the viewport.
 * Content stays visible with JS off or prefers-reduced-motion.
 * Agent-written - treat as unverified until Ryan has checked it.
 */
export function EnterWhenVisible({
  children,
  className = "",
  as = "div",
  delayMs = 0,
}: EnterWhenVisibleProps) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const reduce = usePrefersReducedMotion();
  const [motionReady, setMotionReady] = useState(false);
  const [shown, setShown] = useState(false);
  const Tag = as;

  useEffect(() => {
    if (reduce) {
      setShown(true);
      setMotionReady(false);
      return;
    }
    setMotionReady(true);
  }, [reduce]);

  useEffect(() => {
    if (!motionReady || shown || !node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setShown(true);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [motionReady, shown, node]);

  const classes = [
    className,
    motionReady && !shown ? "studio-enter-pending" : "",
    motionReady && shown ? "studio-enter-run" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const style: CSSProperties | undefined =
    motionReady && shown && delayMs > 0
      ? { animationDelay: `${delayMs}ms` }
      : undefined;

  return (
    <Tag ref={setNode} className={classes} style={style}>
      {children}
    </Tag>
  );
}
