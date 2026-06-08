import { SectionHeader } from "@/components/ui/SectionHeader";

type FeatureIconProps = {
  className?: string;
};

function UserIcon({ className = "h-5 w-5" }: FeatureIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

function ZapIcon({ className = "h-5 w-5" }: FeatureIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );
}

function CodeIcon({ className = "h-5 w-5" }: FeatureIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  );
}

function SmartphoneIcon({ className = "h-5 w-5" }: FeatureIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  );
}

function MapPinIcon({ className = "h-5 w-5" }: FeatureIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function ShieldIcon({ className = "h-5 w-5" }: FeatureIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );
}

const FEATURES = [
  {
    title: "No agency markup",
    description:
      "You deal directly with the person building your site. No account managers, no inflated costs.",
    Icon: UserIcon,
  },
  {
    title: "Live in 7 days",
    description:
      "Most sites go from first call to launch in a week. No drawn-out timelines.",
    Icon: ZapIcon,
  },
  {
    title: "Built with modern tech",
    description:
      "Next.js, Tailwind, and Vercel. Fast, secure, and easy to update.",
    Icon: CodeIcon,
  },
  {
    title: "Mobile-first always",
    description:
      "Every site is designed for phones first, then scaled up for desktop.",
    Icon: SmartphoneIcon,
  },
  {
    title: "NI-based, UK-ready",
    description:
      "Local knowledge, available across the UK. Easy to reach, quick to respond.",
    Icon: MapPinIcon,
  },
  {
    title: "Ongoing support available",
    description:
      "£30/month keeps your site updated, secure, and running smoothly.",
    Icon: ShieldIcon,
  },
] as const;

export function WhyWorkWithUs() {
  return (
    <section className="section-padding border-t border-border bg-base">
      <div className="container-wide">
        <SectionHeader
          className="section-heading-gap max-w-2xl"
          title="Why work with us?"
        />

        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-10 md:gap-y-10 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-12">
          {FEATURES.map(({ title, description, Icon }) => (
            <li key={title}>
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-raised text-accent">
                <Icon />
              </div>
              <h3 className="heading-display mt-4 text-lg font-bold sm:text-xl">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary sm:text-base">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
