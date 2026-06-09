import { ComingSoonFadeIn } from "@/components/coming-soon/ComingSoonFadeIn";
import { ComingSoonNewsletterForm } from "@/components/coming-soon/ComingSoonNewsletterForm";

export function ComingSoonFooter() {
  return (
    <section id="footer" className="section-padding pb-8">
      <div className="container-wide">
        <ComingSoonFadeIn y={20} duration={0.6}>
          <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-raised px-8 py-12 text-center">
            <h2 className="heading-display text-2xl sm:text-3xl">
              Get Early Access
            </h2>
            <p className="lead-text mt-2 text-base">
              Get early access to new tools before they launch.
            </p>
            <ComingSoonNewsletterForm />
          </div>
        </ComingSoonFadeIn>
      </div>
    </section>
  );
}
