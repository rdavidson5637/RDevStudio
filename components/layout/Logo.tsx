import Link from "next/link";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`font-display text-sm font-bold tracking-tight text-primary transition-colors duration-normal ease-out hover:text-accent active:text-accent sm:text-base ${className}`}
      aria-label="RDev Studio — Home"
    >
      RDev <span className="text-accent">Studio</span>
    </Link>
  );
}
