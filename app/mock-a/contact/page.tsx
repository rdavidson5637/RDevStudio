import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/constants";
import { QuoteForm } from "@/components/mock-a/QuoteForm";
import { WhatsAppIcon } from "@/components/mock-a/Shell";
import {
  MOCK_A_ENQUIRY_OPTIONS,
  MOCK_A_STEPS,
  MOCK_A_WHATSAPP_HREF,
} from "@/components/mock-a/data";
import s from "@/components/mock-a/mockA.module.css";

export const metadata: Metadata = {
  title: { absolute: "Get a quote | Mock A | RDev Studio" },
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ type?: string | string[] }> };

export default async function MockAContactPage({ searchParams }: Props) {
  const { type } = await searchParams;
  const requested = Array.isArray(type) ? type[0] : type;
  // Only preselect values the select actually offers.
  const defaultEnquiry = (MOCK_A_ENQUIRY_OPTIONS as readonly string[]).includes(requested ?? "")
    ? (requested as string)
    : "";

  return (
    <>
      <section className={`${s.wrap} ${s.pageHero}`} aria-labelledby="contact-title">
        <p className={`${s.eyebrow} ${s.mono}`}>Contact</p>
        <h1 id="contact-title" className={s.display} style={{ marginTop: "1rem" }}>
          Start a <span className={s.displayAccent}>project.</span>
        </h1>
        <p className={s.lede} style={{ marginTop: "1.5rem" }}>
          Two ways in. Fill in the quote form and get a written reply by email, or send a WhatsApp
          if that is easier.
        </p>
      </section>

      <div className={`${s.wrap} ${s.section} ${s.contactSection}`}>
        <div className={s.closeGrid}>
          <section className={s.formCard} aria-labelledby="contact-form-title" data-reveal>
            <h2 id="contact-form-title" className={s.formTitle}>
              Ask for a quote
            </h2>
            <p className={s.formSub}>A few lines is plenty. The studio replies by email.</p>
            <QuoteForm idPrefix="contact" defaultEnquiry={defaultEnquiry} headingLevel={2} />
          </section>

          <div className={s.contactAside}>
            <section className={s.waCard} aria-labelledby="contact-wa-title" data-reveal>
              <h2 id="contact-wa-title" className={s.waTitle}>
                Rather just message?
              </h2>
              <p className={s.waBody}>
                Send a WhatsApp with what you need. A photo of an old site or a voice note is fine.
              </p>
              <a
                href={MOCK_A_WHATSAPP_HREF}
                className={`${s.btn} ${s.btnInk} ${s.btnLg}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                Message on WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </section>

            <p className={`${s.small} ${s.otherWays}`}>
              Or email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className={s.inlineLink}>
                {CONTACT_EMAIL}
              </a>
            </p>

            <section aria-labelledby="contact-next-title" className={s.contactNext} data-reveal>
              <h2 id="contact-next-title" className={`${s.eyebrow} ${s.mono}`}>
                What happens next
              </h2>
              <ol className={s.steps}>
                {MOCK_A_STEPS.map((step) => (
                  <li key={step.number} className={s.step}>
                    <span className={`${s.stepNum} ${s.mono}`} aria-hidden="true">
                      {step.number}
                    </span>
                    <h3 className={s.stepTitle}>{step.title}</h3>
                    <p className={s.stepBody}>{step.body}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
