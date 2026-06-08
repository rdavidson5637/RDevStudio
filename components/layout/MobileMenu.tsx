"use client";

import Link from "next/link";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { NAV_LINKS } from "@/lib/constants";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
};

export function MobileMenu({ open, onClose, isActive }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="md:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu" id="mobile-menu">
      <button
        type="button"
        className="fixed inset-0 z-[200] bg-base/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close menu"
      />

      <nav
        className="fixed inset-y-0 right-0 z-[201] flex w-[min(100%,20rem)] flex-col border-l border-border bg-raised shadow-2xl animate-slide-in-right"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="font-display text-xs font-semibold uppercase tracking-widest text-tertiary">
            Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center text-primary transition-colors hover:text-accent"
            aria-label="Close menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`rounded-none px-4 py-4 font-display text-lg font-bold transition-colors duration-normal ease-out ${
                isActive(link.href)
                  ? "text-accent"
                  : "text-primary hover:bg-overlay hover:text-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>,
    document.body
  );
}
