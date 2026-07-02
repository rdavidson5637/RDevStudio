"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SHELL_NAV_LINKS } from "@/lib/constants";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
        <header className="sticky top-0 z-[100] min-h-20 border-b border-border bg-base/95 backdrop-blur-sm">
        <div className="container-wide flex h-20 items-center justify-between gap-4 px-6">
          <Link
            href="/"
            className="pitch-link inline-flex shrink-0 text-lg font-semibold tracking-tight text-primary transition-colors hover:text-accent"
            aria-label="RDev Studio — Home"
          >
            RDev Studio
          </Link>

          <nav
            className="hidden items-center gap-7 md:flex"
            aria-label="Main navigation"
          >
            {SHELL_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`pitch-link shell-label transition-colors ${
                  isActive(link.href) ? "text-accent" : "text-secondary hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/hire"
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-base transition-colors hover:bg-[#d22b2b]"
            >
              Hire me
            </Link>
          </nav>

          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center text-primary transition-colors hover:text-accent md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label="Open menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={closeMobile} isActive={isActive} />
    </>
  );
}
