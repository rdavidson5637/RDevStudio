"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const GAME_ROUTES = [
  "/champions-draft",
  "/rugby-draft",
  "/pub-quiz",
  "/games/longest-word",
  "/draft",
  "/wardrobe-ai",
];

function isGameRoute(pathname: string) {
  return GAME_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export function BackToTop() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isGameRoute(pathname) || !visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-studio-line-strong bg-studio-bg text-studio-text shadow-sm sm:bottom-6 sm:right-6 transition-colors duration-200 hover:border-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
      aria-label="Scroll to top"
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}
