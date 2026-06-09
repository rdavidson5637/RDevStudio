"use client";

import { type CSSProperties, type ReactNode, useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type ComingSoonFadeInProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
  fadeOnly?: boolean;
};

export function ComingSoonFadeIn({
  children,
  className = "",
  y = 20,
  duration = 0.6,
  delay = 0,
  fadeOnly = false,
}: ComingSoonFadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.15 });
  const prefersReducedMotion = usePrefersReducedMotion();

  const useTransform = !prefersReducedMotion && !fadeOnly;
  const hiddenTransform = useTransform ? `translateY(${y}px)` : "none";

  const style: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : hiddenTransform,
    transition: useTransform
      ? `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`
      : `opacity ${duration}s ease ${delay}s`,
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
