import Link from "next/link";
import { DRAFT_PROOF_ITEMS } from "@/lib/content/redesign-draft";

export function ProofStrip() {
  return (
    <section aria-label="Current client and charity work" className="border-b border-studio-line bg-studio-surface py-10 md:py-12">
      <div className="mx-auto max-w-studio px-6 md:px-8">
        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          {DRAFT_PROOF_ITEMS.map((item) => (
            <div key={item.name} className="border-l-2 border-studio-line-strong pl-5">
              <h2 className="font-studio-display text-2xl text-studio-text">
                <Link
                  href={item.href}
                  className="underline decoration-studio-line underline-offset-4 transition-colors hover:text-studio-accent hover:decoration-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
                >
                  {item.name}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-studio-muted">{item.role}</p>
              <p className="mt-2 text-sm font-bold text-studio-text">{item.status}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
