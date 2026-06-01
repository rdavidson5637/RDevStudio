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
    <div className="md:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <button
        type="button"
        className="fixed inset-0 z-[200] bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close menu"
      />

      <nav
        className="fixed inset-y-0 right-0 z-[201] flex w-[min(100%,20rem)] flex-col bg-white shadow-2xl animate-slide-in-right"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <span className="text-sm font-semibold uppercase tracking-wider text-slate-muted">
            Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-navy transition-colors hover:bg-slate-100"
            aria-label="Close menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`rounded-xl px-4 py-4 text-lg font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-accent text-white shadow-sm"
                  : "text-navy hover:bg-slate-50 active:bg-slate-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="border-t border-slate-100 p-4">
          <Link
            href="/contact"
            onClick={onClose}
            className="btn-primary w-full py-4 text-center text-base"
          >
            Get a Free Quote
          </Link>
        </div>
      </nav>
    </div>,
    document.body
  );
}
