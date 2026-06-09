"use client";

import Link from "next/link";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CHAMPIONS_DRAFT } from "@/lib/champions-draft-feature";
import { RUGBY_DRAFT } from "@/lib/rugby-draft-feature";
import { NAV_LINKS } from "@/lib/constants";
import Wordmark from "@/components/Logo";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
};

function NavItem({
  href,
  label,
  onClose,
  active,
  highlight,
  highlightColor = "emerald",
}: {
  href: string;
  label: string;
  onClose: () => void;
  active: boolean;
  highlight?: boolean;
  highlightColor?: "emerald" | "sky";
}) {
  const highlightActive =
    highlightColor === "sky" ? "text-sky-400" : "text-emerald-400";
  const highlightIdle =
    highlightColor === "sky" ? "text-sky-400/90" : "text-emerald-400/90";

  return (
    <Link
      href={href}
      onClick={onClose}
      className={`group flex items-center gap-3 rounded-lg px-3 py-3 text-[0.95rem] font-medium transition-colors duration-normal ease-out ${
        highlight
          ? active
            ? `${highlightActive} bg-white/5`
            : `${highlightIdle} hover:bg-white/5`
          : active
            ? "bg-accent/10 text-accent"
            : "text-primary hover:bg-white/5 hover:text-accent"
      }`}
    >
      <span
        className={`h-4 w-0.5 shrink-0 rounded-full transition-all duration-normal ease-out ${
          active
            ? highlight
              ? highlightColor === "sky"
                ? "bg-sky-400"
                : "bg-emerald-400"
              : "bg-accent"
            : "bg-transparent group-hover:bg-border-strong"
        }`}
        aria-hidden="true"
      />
      {label}
    </Link>
  );
}

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
        className="fixed inset-0 z-[200] bg-base/70 backdrop-blur-md"
        onClick={onClose}
        aria-label="Close menu"
      />

      <nav
        className="fixed inset-y-0 right-0 z-[201] flex w-[min(100%,21rem)] flex-col border-l border-border bg-raised shadow-2xl animate-slide-in-right"
        aria-label="Mobile navigation"
        style={{
          background:
            "linear-gradient(180deg, var(--color-bg-raised) 0%, var(--color-bg-base) 100%)",
        }}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <Link
            href="/"
            onClick={onClose}
            className="transition-opacity duration-normal ease-out hover:opacity-85"
            aria-label="RDev Studio — Home"
          >
            <Wordmark size="sm" dark />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-secondary transition-colors hover:bg-white/5 hover:text-primary"
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="border-b border-border p-4">
            <Link
              href="/bored"
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-lg bg-emerald-500 px-4 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-emerald-400"
            >
              Play free games
            </Link>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link
                href={CHAMPIONS_DRAFT.href}
                onClick={onClose}
                className="rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-3 py-2.5 text-center text-xs font-semibold text-emerald-300 transition-colors hover:bg-emerald-400/15"
              >
                Champions Draft
              </Link>
              <Link
                href={RUGBY_DRAFT.href}
                onClick={onClose}
                className="rounded-lg border border-sky-400/25 bg-sky-400/10 px-3 py-2.5 text-center text-xs font-semibold text-sky-300 transition-colors hover:bg-sky-400/15"
              >
                Rugby Draft
              </Link>
            </div>
          </div>

          <div className="p-3">
            <p className="px-3 pb-2 pt-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-tertiary">
              Pages
            </p>
            <div className="flex flex-col gap-0.5">
              {NAV_LINKS.map((link) => (
                <NavItem
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  onClose={onClose}
                  active={isActive(link.href)}
                  highlight={"highlight" in link && link.highlight}
                  highlightColor={
                    link.href === "/rugby-draft" ? "sky" : "emerald"
                  }
                />
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border p-4">
          <Link
            href="/contact"
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-lg border border-border-strong px-4 py-3 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent"
          >
            Get in touch
          </Link>
        </div>
      </nav>
    </div>,
    document.body
  );
}
