import Link from "next/link";

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen">
      <Link
        href="/bored"
        className="fixed top-4 left-4 z-50 rounded-full border border-white/15 bg-black/50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/70 backdrop-blur transition-colors hover:border-white/30 hover:text-white"
      >
        ← RDev Studio
      </Link>
      {children}
    </div>
  );
}
