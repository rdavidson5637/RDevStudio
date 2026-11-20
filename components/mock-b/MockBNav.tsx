"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/mock-b/work", label: "Work" },
  { href: "/mock-b/services", label: "Services" },
  { href: "/mock-b#about", label: "Studio" },
  { href: "/mock-b/contact", label: "Contact" },
] as const;

function isRouteActive(pathname: string, href: string): boolean {
  if (href.includes("#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MockBDesktopNav() {
  const pathname = usePathname() ?? "/mock-b";

  return (
    <nav aria-label="Studio navigation" className="hidden items-center gap-1 md:flex">
      {NAV_ITEMS.map((item) => {
        const active = isRouteActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex min-h-[44px] items-center rounded-[var(--mb-radius-sm)] px-3 text-sm font-medium transition-colors ${
              active
                ? "font-bold text-[var(--mb-link)] underline decoration-[var(--mb-link)] decoration-2 underline-offset-8"
                : "text-[var(--mb-muted)] hover:text-[var(--mb-ink)]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function MockBMobileNav() {
  const pathname = usePathname() ?? "/mock-b";

  return (
    <nav
      aria-label="Mobile section navigation"
      className="flex items-center justify-between gap-0.5 border-t border-[var(--mb-line)] bg-[var(--mb-bg)] px-1 py-0.5 sm:justify-center sm:gap-1 sm:px-3 md:hidden"
    >
      {NAV_ITEMS.map((item) => {
        const active = isRouteActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex min-h-[44px] flex-1 items-center justify-center px-1.5 text-[11px] font-bold transition-colors sm:flex-none sm:px-3 sm:text-xs ${
              active
                ? "text-[var(--mb-link)] underline decoration-[var(--mb-link)] decoration-2 underline-offset-8"
                : "text-[var(--mb-muted)] hover:text-[var(--mb-ink)]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
