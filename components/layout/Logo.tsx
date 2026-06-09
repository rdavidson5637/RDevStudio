import Link from "next/link";
import Wordmark, { LogoMark } from "@/components/Logo";

type LogoSize = "sm" | "md" | "lg" | "xl";

type LogoProps = {
  className?: string;
  size?: LogoSize;
};

export function Logo({ className = "", size = "md" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 transition-opacity duration-normal ease-out hover:opacity-85 ${className}`}
      aria-label="RDev Studio — Home"
    >
      <Wordmark size={size} dark />
    </Link>
  );
}

export { LogoMark };
