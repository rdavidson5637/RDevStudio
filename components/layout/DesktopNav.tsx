"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HEADER_NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-4 md:flex lg:gap-7" aria-label="Main navigation">
      {HEADER_NAV_LINKS.map((link) => {
        const active =
          link.href === "/services"
            ? pathname === "/services" || pathname.startsWith("/services/businesses")
            : pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`relative inline-flex min-h-11 items-center font-studio-sans text-sm transition-colors lg:text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text ${
              active ? "text-studio-text" : "text-studio-muted hover:text-studio-text"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
      <Button href="/contact" size="sm" aria-current={pathname === "/contact" ? "page" : undefined}>
        Contact
      </Button>
    </nav>
  );
}
