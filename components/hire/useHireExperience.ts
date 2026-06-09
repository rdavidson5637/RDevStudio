"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS } from "@/lib/hire-data";

type SectionKey = "qualifications" | "experience" | "testimonials" | "final-cta";

export function useHireExperience() {
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const [motionReduced, setMotionReduced] = useState(prefersReducedMotion);
  const [chaosStarted, setChaosStarted] = useState(false);
  const [finaleReached, setFinaleReached] = useState(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [recentAchievement, setRecentAchievement] = useState<string | null>(null);
  const [celebrationKey, setCelebrationKey] = useState(0);
  const sectionRefs = useRef<Record<SectionKey, HTMLElement | null>>({
    qualifications: null,
    experience: null,
    testimonials: null,
    "final-cta": null,
  });
  const unlockedRef = useRef<Set<string>>(new Set());

  const unlockAchievement = useCallback((id: string, title: string) => {
    if (unlockedRef.current.has(id)) return;
    unlockedRef.current.add(id);
    setUnlockedAchievements((prev) => [...prev, id]);
    setRecentAchievement(title);
    window.setTimeout(() => setRecentAchievement(null), 4200);
  }, []);

  const registerSection = useCallback(
    (key: SectionKey) => (node: HTMLElement | null) => {
      sectionRefs.current[key] = node;
    },
    [],
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setMotionReduced(media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);

    return () => media.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const observe = (key: SectionKey, onEnter: () => void, threshold = 0.45) => {
      const node = sectionRefs.current[key];
      if (!node) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) onEnter();
          });
        },
        { threshold },
      );

      observer.observe(node);
      observers.push(observer);
    };

    const setupObservers = () => {
      observers.forEach((observer) => observer.disconnect());
      observers.length = 0;

      observe("qualifications", () => {
        const achievement = ACHIEVEMENTS.find((item) => item.id === "qualifications");
        if (achievement) unlockAchievement(achievement.id, achievement.title);
      });

      observe(
        "experience",
        () => {
          const achievement = ACHIEVEMENTS.find((item) => item.id === "experience");
          if (achievement) unlockAchievement(achievement.id, achievement.title);
        },
        0,
      );

      observe(
        "testimonials",
        () => {
          setChaosStarted(true);
          setCelebrationKey((value) => value + 1);
          const achievement = ACHIEVEMENTS.find((item) => item.id === "full-cv");
          if (achievement) unlockAchievement(achievement.id, achievement.title);
        },
        0,
      );

      observe(
        "final-cta",
        () => {
          setFinaleReached(true);
          setCelebrationKey((value) => value + 1);
          const achievement = ACHIEVEMENTS.find((item) => item.id === "the-end");
          if (achievement) unlockAchievement(achievement.id, achievement.title);
        },
        0.2,
      );
    };

    setupObservers();
    const retry = window.setTimeout(setupObservers, 250);

    return () => {
      window.clearTimeout(retry);
      observers.forEach((observer) => observer.disconnect());
    };
  }, [unlockAchievement]);

  return {
    chaosStarted,
    finaleReached,
    unlockedAchievements,
    recentAchievement,
    celebrationKey,
    prefersReducedMotion: motionReduced,
    registerSection,
  };
}
