"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/draft", label: "Overview" },
  { href: "/draft/squad", label: "Squad" },
  { href: "/draft/waivers", label: "Waivers" },
  { href: "/draft/league", label: "League" },
  { href: "/draft/live", label: "Live" },
  { href: "/draft/how-it-works", label: "How it's built" },
] as const;

export function DraftSubNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Draft analyser sections"
      className="-mx-4 flex gap-1 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
    >
      {ITEMS.map((item) => {
        const active =
          item.href === "/draft" ? pathname === "/draft" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`shell-label shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 transition-colors ${
              active
                ? "border-accent bg-accent text-on-accent"
                : "border-border text-secondary hover:border-accent hover:text-accent"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
