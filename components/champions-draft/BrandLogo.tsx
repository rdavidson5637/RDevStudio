"use client";
import Image from "next/image";
import { useState } from "react";
import { BRAND_LOGO_PATH } from "@/lib/champions-draft/branding";

type LogoVariant = "hero" | "compact";

interface Props {
  className?: string;
  variant?: LogoVariant;
  onLoad?: () => void;
}

const VARIANT_STYLES: Record<
  LogoVariant,
  { container: string; width: number; height: number; image: string }
> = {
  hero: {
    container: "h-28 w-28 md:h-36 md:w-36",
    width: 288,
    height: 288,
    image:
      "h-full w-full object-contain drop-shadow-[0_8px_32px_rgba(251,191,36,0.25)]",
  },
  compact: {
    container: "h-8 w-8",
    width: 32,
    height: 32,
    image: "h-full w-full object-contain",
  },
};

export default function BrandLogo({
  className = "",
  variant = "hero",
  onLoad,
}: Props) {
  const [failed, setFailed] = useState(false);
  const styles = VARIANT_STYLES[variant];

  if (failed) return null;

  return (
    <div
      className={`relative flex items-center justify-center ${styles.container} ${className}`}
    >
      {variant === "hero" && (
        <div className="absolute inset-0 bg-amber-400/10 rounded-full blur-2xl scale-110" />
      )}
      <Image
        src={BRAND_LOGO_PATH}
        alt="Champions Draft"
        width={styles.width}
        height={styles.height}
        className={`relative ${styles.image}`}
        onLoad={() => onLoad?.()}
        onError={() => setFailed(true)}
        priority={variant === "hero"}
      />
    </div>
  );
}
