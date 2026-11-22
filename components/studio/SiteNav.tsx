"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Header menu. Contact sits in the header button, so it is not repeated here. */
export const SITE_NAV_ITEMS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/games", label: "Games" },
  { href: "/toolkit", label: "Tools" },
  { href: "/about", label: "About" },
] as const;

function isRouteActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteDesktopNav() {
  const pathname = usePathname() ?? "/";

  return (
    <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
      {SITE_NAV_ITEMS.map((item) => {
        const active = isRouteActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className="mb-nav-link"
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function SiteMobileNav() {
  const pathname = usePathname() ?? "/";

  return (
    <nav
      aria-label="Mobile navigation"
      className="flex items-center justify-between gap-0.5 border-t border-[var(--mb-line)] bg-[var(--mb-bg)] px-1 py-0.5 sm:justify-center sm:gap-1 sm:px-3 md:hidden"
    >
      {SITE_NAV_ITEMS.map((item) => {
        const active = isRouteActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className="mb-nav-link mb-nav-link-mobile"
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
