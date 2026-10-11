import Link from "next/link";
import { DesktopNav } from "./DesktopNav";
import { HeaderFrame } from "./HeaderFrame";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <HeaderFrame>
      <div className="mx-auto flex h-20 max-w-studio items-center justify-between gap-4 px-6 md:px-8">
        <Link
          href="/"
          className="inline-flex h-11 items-center font-studio-display text-xl tracking-tight text-studio-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
          aria-label="RDev Studio - Home"
        >
          RDev Studio
        </Link>
        <DesktopNav />
        <MobileNav />
      </div>
    </HeaderFrame>
  );
}
