import type { ReactNode } from "react";

type CoverFrameProps = {
  children: ReactNode;
};

export function CoverFrame({ children }: CoverFrameProps) {
  return (
    <div className="noise relative aspect-[16/10] w-full overflow-hidden bg-studio-surface" aria-hidden="true">
      <svg viewBox="0 0 320 200" className="absolute inset-0 h-full w-full" fill="none">
        {children}
      </svg>
    </div>
  );
}

export const line = "var(--color-studio-line-strong)";
export const faint = "var(--color-studio-line)";
export const amber = "var(--color-studio-amber)";
