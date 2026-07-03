"use client";
import { useEffect } from "react";

type LogoVariant = "hero" | "compact";

interface Props {
  className?: string;
  variant?: LogoVariant;
  onLoad?: () => void;
}

const VARIANT_STYLES: Record<LogoVariant, { container: string; text: string }> =
  {
    hero: {
      container: "h-28 md:h-36 flex items-center justify-center px-4",
      text: "text-3xl md:text-5xl tracking-tight drop-shadow-[0_8px_32px_rgba(251,191,36,0.25)]",
    },
    compact: {
      container: "h-8 flex items-center justify-center",
      text: "text-[10px] tracking-[0.15em]",
    },
  };

export default function BrandLogo({
  className = "",
  variant = "hero",
  onLoad,
}: Props) {
  const styles = VARIANT_STYLES[variant];

  useEffect(() => {
    onLoad?.();
  }, [onLoad]);

  return (
    <div
      className={`relative flex items-center justify-center ${styles.container} ${className}`}
    >
      {variant === "hero" && (
        <div className="absolute inset-0 bg-amber-400/10 rounded-full blur-2xl scale-110" />
      )}
      <h1
        className={`relative font-black uppercase text-white whitespace-nowrap ${styles.text}`}
      >
        Rugby Draft
      </h1>
    </div>
  );
}
