import { ABOUT_BLURB } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function AboutClose() {
  return (
    <section id="about" className="section-padding border-t border-border bg-raised">
      <div className="container-wide">
        <div className="mx-auto max-w-3xl">
          <SectionHeader label="About" />

          <p className="mt-6 text-lg leading-relaxed text-primary sm:mt-8 sm:text-xl lg:text-2xl lg:leading-relaxed">
            {ABOUT_BLURB}
          </p>

          <p className="mt-8 font-display text-xs uppercase tracking-widest text-secondary">
            £650 websites · £30/month retainer
          </p>
        </div>
      </div>
    </section>
  );
}
