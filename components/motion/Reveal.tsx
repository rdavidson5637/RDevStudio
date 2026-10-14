"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  immediate?: boolean;
};

export function Reveal({ children, delay = 0, as: Tag = "div", className = "", immediate = false }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [mode, setMode] = useState<"plain" | "hidden" | "shown">("plain");

  useLayoutEffect(() => {
    if (!immediate) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    setMode("hidden");
    const id = requestAnimationFrame(() => setMode("shown"));
    return () => cancelAnimationFrame(id);
  }, [immediate]);

  useEffect(() => {
    if (immediate) return;
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const rect = node.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) return;

    setMode("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setMode("shown");
        observer.disconnect();
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate]);

  const motionClass = mode === "hidden" ? "reveal-hidden" : mode === "shown" ? "reveal-shown" : "";

  return (
    <Tag
      ref={ref}
      className={`${motionClass} ${className}`.trim()}
      style={mode === "shown" && delay > 0 ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
