import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { EMAIL, WHATSAPP_URL } from "@/lib/constants";

export function TellMe() {
  return (
    <Section id="contact" className="studio-band">
      <div className="grid max-w-2xl gap-6 sm:grid-cols-2">
        <figure>
          <div className="relative aspect-[4/5] overflow-hidden bg-studio-surface">
            <Image
              src="/images/ryan-davidson.jpg"
              alt="Ryan Davidson in graduation gown outside Queen's University Belfast"
              fill
              sizes="(max-width: 640px) 100vw, 40vw"
              className="object-cover object-center"
            />
          </div>
          <figcaption className="mt-3 text-sm text-studio-faint">Me. MSc Software Development, Queen&apos;s.</figcaption>
        </figure>
        <figure>
          <div className="relative aspect-[4/5] overflow-hidden bg-studio-surface">
            <Image
              src="/images/rudi/rudi-scarf.jpg"
              alt="Rudi, a black and white dog, wearing an Arsenal scarf"
              fill
              sizes="(max-width: 640px) 100vw, 40vw"
              className="object-cover object-center"
            />
          </div>
          <figcaption className="mt-3 text-sm text-studio-faint">Rudi, from Assisi Animal Sanctuary.</figcaption>
        </figure>
      </div>
      <h2 className="display-lg mt-12 max-w-[16ch] text-balance text-studio-text">Tell me what you need</h2>
      <p className="type-body mt-4 max-w-prose text-studio-muted">
        A site, help with posting, or something that doesn&apos;t fit a package. I&apos;ll reply myself, ask a few questions about what you need, then send a fixed quote.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button href="/contact">Get a quote</Button>
        <a
          href={WHATSAPP_URL}
          className="inline-flex min-h-11 items-center text-sm text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex min-h-11 items-center text-sm text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent"
        >
          {EMAIL}
        </a>
      </div>
    </Section>
  );
}
