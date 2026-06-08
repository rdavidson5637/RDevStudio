import Image from "next/image";
import Link from "next/link";

const LOGO_SRC = "/images/logo/rdevstudio-logo.png";

const SIZE_CLASSES = {
  sm: "h-8 w-8",
  md: "h-9 w-9 sm:h-10 sm:w-10",
  lg: "h-12 w-12",
} as const;

type LogoProps = {
  className?: string;
  size?: keyof typeof SIZE_CLASSES;
};

export function Logo({ className = "", size = "md" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 transition-opacity duration-normal ease-out hover:opacity-85 ${className}`}
      aria-label="RDev Studio — Home"
    >
      <Image
        src={LOGO_SRC}
        alt="RDev Studio"
        width={500}
        height={500}
        className={`${SIZE_CLASSES[size]} object-contain`}
        priority={size === "md"}
      />
    </Link>
  );
}
