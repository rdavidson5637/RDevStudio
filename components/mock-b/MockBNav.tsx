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
      className="flex items-center justify-center gap-1 border-t border-[var(--mb-line)] bg-[var(--mb-bg)] px-3 py-0.5 md:hidden"
    >
      {NAV_ITEMS.map((item) => {
        const active = isRouteActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex min-h-[44px] items-center px-3 text-xs font-bold transition-colors ${
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
