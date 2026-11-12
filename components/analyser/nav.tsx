"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  ["/draft", "Desk"],
  ["/draft/squad", "Squad"],
  ["/draft/waivers", "Waivers"],
  ["/draft/defcon", "DefCon"],
  ["/draft/league", "League"],
  ["/draft/live", "Live"],
  ["/draft/how-it-works", "Method"],
];

export function Nav() {
  const path = usePathname();
  return (
    <nav className="nav" aria-label="Draft">
      {LINKS.map(([href, label]) => {
        const current = href === "/draft" ? path === "/draft" : path.startsWith(href);
        return (
          <Link key={href} href={href} aria-current={current ? "page" : undefined}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
