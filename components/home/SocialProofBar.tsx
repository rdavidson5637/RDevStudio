import { SOCIAL_PROOF_ITEMS } from "@/lib/constants";

export function SocialProofBar() {
  return (
    <section
      className="border-y border-slate-800 bg-navy py-5"
      aria-label="Key benefits"
    >
      <div className="container-narrow overflow-x-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex min-w-max items-center justify-center gap-8 sm:min-w-0 sm:flex-wrap sm:gap-x-10 sm:gap-y-3">
          {SOCIAL_PROOF_ITEMS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-white sm:text-base"
            >
              <svg
                className="h-4 w-4 shrink-0 text-accent"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
