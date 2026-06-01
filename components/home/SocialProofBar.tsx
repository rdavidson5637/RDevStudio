import { SOCIAL_PROOF_ITEMS } from "@/lib/constants";

export function SocialProofBar() {
  return (
    <section
      className="border-y border-slate-200 bg-navy py-4"
      aria-label="Key benefits"
    >
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-sm font-medium text-white sm:text-base">
          {SOCIAL_PROOF_ITEMS.map((item, index) => (
            <li key={item} className="flex items-center gap-6">
              <span>{item}</span>
              {index < SOCIAL_PROOF_ITEMS.length - 1 && (
                <span
                  className="hidden text-accent sm:inline"
                  aria-hidden="true"
                >
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
