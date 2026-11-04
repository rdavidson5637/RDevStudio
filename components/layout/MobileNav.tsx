"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./MobileMenu";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Closing by Escape or the close button hands focus back to the menu button.
  // Closing by following a link leaves focus to the route change.
  const closeAndRestoreFocus = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const isActive = (href: string) =>
    href === "/services"
      ? pathname === "/services" || pathname.startsWith("/services/businesses")
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="flex h-11 w-11 items-center justify-center text-studio-text md:hidden"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Open menu"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        onDismiss={closeAndRestoreFocus}
        isActive={isActive}
      />
    </>
  );
}
