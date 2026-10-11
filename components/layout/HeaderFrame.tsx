"use client";

import { useEffect, useState, type ReactNode } from "react";

export function HeaderFrame({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`studio-header sticky top-0 z-[100] border-b text-studio-text backdrop-blur-md ${
        scrolled ? "border-studio-line" : "border-transparent"
      }`}
    >
      {children}
    </header>
  );
}
