"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SHELL_NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
      {SHELL_NAV_LINKS.map((link) => {
        const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`relative inline-flex min-h-11 items-center text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text ${
              active ? "text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            {link.label}
            {active ? (
              <span className="absolute bottom-2 left-0 right-0 h-0.5 bg-studio-accent" aria-hidden="true" />
            ) : null}
          </Link>
        );
      })}
      <Button href="/contact" size="sm">
        Start a project
      </Button>
    </nav>
  );
}
