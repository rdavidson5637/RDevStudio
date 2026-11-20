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
            className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-3.5 text-sm font-semibold transition-colors ${
              active
                ? "border border-[var(--mb-line-strong)] bg-[var(--mb-butter-soft)] text-[var(--mb-ink)]"
                : "text-[var(--mb-ink-soft)] hover:bg-[var(--mb-cream-deep)] hover:text-[var(--mb-ink)]"
            }`}
          >
            {active ? (
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[var(--mb-terracotta)]"
              />
            ) : null}
            <span>{item.label}</span>
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
      className="flex items-center justify-center gap-1 border-t border-[var(--mb-line)] bg-[var(--mb-paper)]/85 px-3 py-1 md:hidden"
    >
      {NAV_ITEMS.map((item) => {
        const active = isRouteActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-colors ${
              active
                ? "bg-[var(--mb-butter-soft)] text-[var(--mb-ink)] ring-1 ring-[var(--mb-line-strong)]"
                : "text-[var(--mb-ink-soft)] hover:text-[var(--mb-ink)]"
            }`}
          >
            {active ? (
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[var(--mb-terracotta)]"
              />
            ) : null}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
