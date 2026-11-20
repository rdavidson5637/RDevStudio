"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const targets = document.querySelectorAll<HTMLElement>(".mock-c main > section, .mock-c .service-row, .mock-c .work-row, .mock-c .project-panel, .mock-c .service-detail");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -36px 0px" });
    targets.forEach((target) => {
      target.classList.add("mock-c-reveal-ready");
      observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);
  return null;
}
