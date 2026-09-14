import { SectionHeader } from "@/components/ui/SectionHeader";

const TESTIMONIALS = [
  {
    quote:
      "Ryan delivered exactly what we needed — a clean, professional site that actually works on mobile. No fuss, just results.",
    author: "RV's Cold Brew",
    role: "Belfast coffee brand",
    featured: true,
  },
  {
    quote:
      "The ShelterLink platform has transformed how we manage volunteers. Shifts, roles, everything in one place.",
    author: "Assisi Animal Sanctuary",
    role: "Belfast charity",
    featured: true,
  },
] as const;

const TRUST_SIGNALS = [
  { value: "100%", label: "Client satisfaction" },
  { value: "24hr", label: "Response time" },
  { value: "NI", label: "Based locally" },
] as const;

export function SocialProof() {
  return (
    <section className="section-padding border-t border-border bg-raised">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <SectionHeader
          className="section-heading-gap max-w-2xl"
          label="Proof"
          title="What clients say"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.author}
              className="rounded-xl border border-border bg-base p-6 sm:p-8"
            >
              <blockquote className="text-lg leading-relaxed text-primary">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="text-sm font-bold text-accent">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-primary">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-secondary">{testimonial.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4 rounded-xl border border-border bg-base p-6 sm:p-8">
          {TRUST_SIGNALS.map((signal) => (
            <div key={signal.label} className="text-center">
              <p className="font-display text-2xl text-primary sm:text-3xl">
                {signal.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-secondary sm:text-sm">
                {signal.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
