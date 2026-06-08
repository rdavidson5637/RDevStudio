import { DirectContactOptions } from "@/components/contact/DirectContactOptions";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HomeContactForm } from "./HomeContactForm";

export function HomeContact() {
  return (
    <section id="contact" className="section-padding border-t border-border bg-base">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          <SectionHeader label="Contact" title="Say hello" />

          <p className="lead-text mt-4">
            Working on something, want to collaborate, or just fancy a chat?
            Drop me a message — I usually reply within a day.
          </p>
          <p className="editorial-note mt-4">
            Interested in my services? I take on a small number of website and
            web projects — happy to talk if something here caught your eye.
          </p>

          <div className="mt-8 rounded-xl border border-border bg-raised/80 p-6 sm:mt-10 sm:p-8">
            <DirectContactOptions />
            <HomeContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
