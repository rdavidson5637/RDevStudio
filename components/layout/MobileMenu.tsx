"use client";

import Link from "next/link";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { SHELL_NAV_LINKS } from "@/lib/constants";

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
    <div
      className="md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      id="mobile-menu"
    >
      <button
        type="button"
        className="fixed inset-0 z-[200] bg-black/30"
        onClick={onClose}
        aria-label="Close menu"
      />

      <nav
        className="fixed inset-0 z-[201] flex flex-col bg-base px-6 pb-8 pt-6"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={onClose}
            className="text-lg font-semibold tracking-tight text-primary"
            aria-label="RDev Studio — Home"
          >
            RDev Studio
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center text-secondary transition-colors hover:text-primary"
            aria-label="Close menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="programme-rule mt-6" />

        <div className="flex flex-1 flex-col justify-center gap-5">
          {SHELL_NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={`rounded-sm font-display text-5xl uppercase leading-none tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base ${
                  active
                    ? "text-accent"
                    : "text-primary hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/hire"
            onClick={onClose}
            className="mt-2 inline-flex w-fit rounded-md bg-primary px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-[#d22b2b]"
          >
            Hire me
          </Link>
        </div>
        <div className="programme-rule" />
        <div className="shell-label pt-5">KICK-OFF</div>
        <div className="text-sm text-secondary">
          Designed and built in Carrickfergus. No template. No page builder.
        </div>
      </nav>
    </div>,
    document.body,
  );
}
