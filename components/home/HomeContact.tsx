import { WhatsAppContactOption } from "@/components/contact/WhatsAppContactOption";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HomeContactForm } from "./HomeContactForm";

export function HomeContact() {
  return (
    <section id="contact" className="section-padding border-t border-border bg-base">
      <div className="container-wide">
        <div className="mx-auto max-w-xl">
          <SectionHeader label="Contact" title="Let's talk." />

          <p className="mt-4 text-base leading-relaxed text-secondary sm:mt-6 sm:text-lg">
            Tell me about your business and what you need. I&apos;ll get back to
            you within 24 hours.
          </p>

          <div className="interactive-surface mt-8 bg-overlay p-6 sm:mt-10 sm:p-8">
            <HomeContactForm />
            <WhatsAppContactOption className="mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
}
