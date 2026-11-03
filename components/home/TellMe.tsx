import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { EMAIL, WHATSAPP_URL } from "@/lib/constants";
import { DRAFT_CTAS } from "@/lib/content/redesign-draft";

export function TellMe() {
  return (
    <Section id="contact" className="border-t border-studio-line bg-studio-surface">
      <h2 className="display-lg max-w-[16ch] text-balance text-studio-text">
        Tell me what you need
      </h2>
      <p className="type-body mt-4 max-w-prose text-studio-muted">
        A site, help with posting, or something for a rescue. I will reply myself, ask a few questions about what you need, and send a fixed quote in writing.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Button href="/contact">{DRAFT_CTAS.primary}</Button>
        <a
          href={WHATSAPP_URL}
          className="inline-flex min-h-11 items-center text-base text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
          target="_blank"
          rel="noopener noreferrer"
        >
          {DRAFT_CTAS.lowCommitment}
        </a>
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex min-h-11 items-center text-base text-studio-muted underline decoration-studio-line underline-offset-4 hover:text-studio-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text"
        >
          {EMAIL}
        </a>
      </div>
    </Section>
  );
}
