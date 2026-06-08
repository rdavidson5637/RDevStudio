import { DirectContactOptions } from "@/components/contact/DirectContactOptions";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HomeContactForm } from "./HomeContactForm";

export function HomeContact() {
  return (
    <section id="contact" className="section-padding border-t border-border bg-base">
      <div className="container-wide">
        <div className="mx-auto max-w-xl">
          <SectionHeader title="Your new website starts here." />

          <p className="mt-4 text-base leading-relaxed text-secondary sm:text-lg">
            Tell me about your business. I&apos;ll reply within 24 hours.
          </p>

          <div className="interactive-surface mt-8 bg-overlay p-6 sm:mt-10 sm:p-8">
            <DirectContactOptions />
            <HomeContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
