"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CHAMPIONS_DRAFT } from "@/lib/champions-draft-feature";
import { NAV_LINKS } from "@/lib/constants";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname.startsWith(href);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 z-[100] w-full transition-all duration-normal ease-out ${
          scrolled
            ? "border-b border-border bg-base/85 shadow-sm shadow-black/10 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-wide flex h-14 items-center justify-between gap-4 sm:h-16">
          <Logo />

          <nav
            className="hidden items-center gap-6 md:flex md:gap-8 lg:gap-10"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-normal ease-out hover:text-primary ${
                  "highlight" in link && link.highlight
                    ? `font-semibold ${
                        isActive(link.href) ? "text-emerald-400" : "text-emerald-400/90"
                      }`
                    : `font-medium ${
                        isActive(link.href) ? "text-accent" : "text-secondary"
                      }`
                }`}
              >
                <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-200 after:content-[''] hover:after:w-full">
                  {link.label}
                </span>
              </Link>
            ))}
            <Link
              href={CHAMPIONS_DRAFT.href}
              className="ml-2 hidden rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-emerald-400 lg:inline-flex"
            >
              Play
            </Link>
            <Link
              href="/contact"
              className="hidden rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent lg:inline-flex"
            >
              Contact
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
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={closeMobile} isActive={isActive} />
    </>
  );
}
