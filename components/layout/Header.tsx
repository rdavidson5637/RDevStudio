"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SHELL_NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-[100] bg-bg/80 text-studio-text backdrop-blur-md ${
          scrolled ? "border-b border-studio-border" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-studio items-center justify-between gap-4 px-6 md:px-8">
          <Link
            href="/"
            className="font-studio-display text-xl tracking-tight text-studio-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
            aria-label="RDev Studio - Home"
          >
            RDev Studio
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
            {SHELL_NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`type-label relative py-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber ${
                    active ? "text-studio-text" : "text-studio-muted hover:text-studio-text"
                  }`}
                >
                  {link.label}
                  {active ? (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-amber" aria-hidden="true" />
                  ) : null}
                </Link>
              );
            })}
            <Button href="/contact" size="sm">
              Start a project
            </Button>
          </nav>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center text-studio-text md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} isActive={isActive} />
    </>
  );
}
