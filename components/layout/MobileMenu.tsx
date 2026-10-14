"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { SHELL_NAV_LINKS, WHATSAPP_URL } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
};

export function MobileMenu({ open, onClose, isActive }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const focusable = panel
      ? Array.from(panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"))
      : [];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 z-[200] flex flex-col bg-studio-bg px-6 pb-8 pt-6 text-studio-text md:hidden"
    >
      <div className="flex items-center justify-between">
        <Link
          href="/"
          onClick={onClose}
          className="font-studio-display text-xl"
          aria-label="RDev Studio - Home"
        >
          RDev Studio
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center text-studio-muted hover:text-studio-text"
          aria-label="Close menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="flex flex-1 flex-col justify-center gap-5" aria-label="Mobile navigation">
        {SHELL_NAV_LINKS.map((link, index) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
              className={`menu-item font-studio-display text-3xl tracking-tight ${
                active ? "text-studio-accent" : "text-studio-text"
              }`}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="menu-item" style={{ animationDelay: `${SHELL_NAV_LINKS.length * 60}ms` }}>
        <Button href="/contact" className="w-full" onClick={onClose}>
          Start a project
        </Button>
        <a
          href={WHATSAPP_URL}
          className="mt-3 inline-flex min-h-11 w-full items-center justify-center text-sm text-studio-muted underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
      </div>
    </div>,
    document.body,
  );
}
