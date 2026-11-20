"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import s from "@/components/mock-a/mockA.module.css";

/** Native <details> menu. Works without JS; with JS it also closes on link tap and Escape. */
export function MobileMenu({ items }: { items: readonly { href: string; label: string }[] }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const el = ref.current;
      if (event.key === "Escape" && el?.open) {
        el.open = false;
        el.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const close = () => {
    if (ref.current) ref.current.open = false;
  };

  return (
    <details ref={ref} className={s.menu}>
      <summary className={`${s.btn} ${s.btnGhost} ${s.btnSm}`}>
        <span className={s.menuIcon} aria-hidden="true" />
        <span className="sr-only">Menu</span>
      </summary>
      <nav className={s.menuPanel} aria-label="Main">
        <ul>
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={close}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
