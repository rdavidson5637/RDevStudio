import Link from "next/link";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`font-display text-sm font-semibold tracking-tight text-primary transition-opacity duration-normal ease-out hover:opacity-80 sm:text-base ${className}`}
      aria-label="RDev Studio — Home"
    >
      <span className="font-bold tracking-tight text-accent">RDev</span>
      <span> Studio</span>
    </Link>
  );
}
