"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header className="sticky top-0 z-[100] border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="container-narrow flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-200 hover:text-accent ${
                  isActive(link.href) ? "text-accent" : "text-slate-text"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-accent" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link href="/contact" className="btn-primary text-sm">
              Get a Free Quote
            </Link>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-navy transition-colors hover:bg-slate-100 md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={closeMobile} isActive={isActive} />
    </>
  );
}
