import Link from "next/link";
import Image from "next/image";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "UC Caseworker Assistant",
  description:
    "Case study: an AI assistant for Universal Credit caseworkers, built around safeguarding and human-in-the-loop review.",
  path: "/work/uc-caseworker-tool",
});

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="shell-label mb-3 text-accent">{children}</h2>;
}

function ScreenshotSlot({
  caption,
  src,
  alt,
}: {
  caption: string;
  src: string;
  alt: string;
}) {
  return (
    <figure className="space-y-3">
      <div className="relative h-64 w-full overflow-hidden rounded-lg border border-border bg-raised sm:h-96">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1120px) 100vw, 1120px"
          className="object-cover object-top"
        />
      </div>
      <figcaption className="shell-label text-secondary">{caption}</figcaption>
    </figure>
  );
}

const BUILD_FEATURES = [
  "Journal response assistant",
  "Safeguarding classification",
  "Deterministic letter generation",
  "Case note assistant",
  "GOV.UK Design System frontend",
  "Synthetic data only",
] as const;

export default function UcCaseworkerToolCaseStudyPage() {
  return (
    <div className="section-padding pt-28">
      <article className="container-wide px-6">
        <header className="space-y-6 border-b border-border pb-10">
          <p className="shell-label text-accent">CASE STUDY - 05</p>
          <h1 className="programme-h1">UC CASEWORKER ASSISTANT</h1>
          <p className="max-w-2xl text-lg text-primary">
            An AI assistant for Universal Credit caseworkers, built by a
            working caseworker with an MSc in Software Development.
          </p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-border pt-5 font-mono text-[11px] uppercase tracking-[0.08em] text-secondary lg:grid-cols-4">
            <p>ROLE - Design & development (solo)</p>
            <p>STACK - Node.js · Express · Claude API</p>
            <p>STATUS - Portfolio prototype</p>
            <p>YEAR - 2026</p>
          </div>
        </header>

        <section
          className="border-b border-border py-12"
          aria-label="Hero screenshot"
        >
          <div className="relative h-72 w-full overflow-hidden rounded-lg border border-border bg-raised sm:h-[34rem]">
            <Image
              src="/images/work/uc-caseworker-journal.jpg"
              alt="UC Caseworker Assistant journal response tool with a synthetic overpayment example loaded"
              fill
              priority
              sizes="(max-width: 1120px) 100vw, 1120px"
              className="object-cover object-top"
            />
          </div>
          <p className="shell-label mt-3 text-secondary">
            Journal response assistant, synthetic example
          </p>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading>THE PROBLEM</SectionHeading>
          <p className="max-w-3xl text-base leading-relaxed text-primary sm:text-lg">
            Caseworkers answer a high volume of claimant journal messages,
            write handover case notes, and populate repetitive standard
            letters every day. Each task carries real weight: a journal
            response has to be accurate against policy and right in tone, a
            case note has to be factual for the next person on the case, and
            a letter has to be populated without transposition errors. A
            message that looks routine can also be a safeguarding risk -
            suicide, domestic abuse, a child protection concern - and those
            can&apos;t be answered with a generic policy reply.
          </p>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading>THE BUILD</SectionHeading>
          <div className="max-w-3xl space-y-5 text-base leading-relaxed text-primary sm:text-lg">
            <p>
              Three tools, one principle throughout: the AI drafts, the
              caseworker decides. The journal assistant classifies a pasted
              message for safeguarding and topic first, loads only the
              matching GOV.UK guidance, then returns a claimant-facing draft,
              a guidance reference, a review checklist and a suggested case
              note - grounded only in the guidance it was given, never
              invented. The letter tool lets a caseworker paste a case to-do
              and has the AI extract values into a form; generating the
              actual letter is deterministic string replacement, not a model
              rewriting legal wording. The case note assistant turns a
              situation summary into a factual, third-person internal note.
            </p>
            <p>
              Every output lands in an editable review area, not an outbox -
              nothing is ever sent or posted automatically. All example data
              shipped with the project, including a labelled safeguarding
              demo, is fabricated for the purpose.
            </p>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {BUILD_FEATURES.map((feature) => (
              <li
                key={feature}
                className="shell-label rounded-lg border border-border bg-raised px-4 py-3 text-primary"
              >
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-8">
            <ScreenshotSlot
              caption="Letter population, demonstration template"
              src="/images/work/uc-caseworker-letter.jpg"
              alt="UC Caseworker Assistant letter population tool with a synthetic hardship payment case pasted in"
            />
          </div>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading>DECISIONS</SectionHeading>
          <div className="grid gap-8">
            <section className="space-y-3">
              <h3 className="text-[1.25rem] font-semibold text-primary">
                Synthetic data, from the first commit
              </h3>
              <p className="max-w-3xl text-base leading-relaxed text-primary sm:text-lg">
                This tool never uses, contains or assumes real claimant data.
                Every example message, name and case detail is fabricated,
                and operational values - account numbers, sort codes,
                references - are obvious placeholders. A portfolio project
                that handled real benefit data, even by accident, would be a
                serious data protection failure. Building the constraint in
                from the start was the point, not an afterthought.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-[1.25rem] font-semibold text-primary">
                The AI never invents policy
              </h3>
              <p className="max-w-3xl text-base leading-relaxed text-primary sm:text-lg">
                Classification picks the relevant guidance files so the model
                is never asked to search a dump of every policy area, and its
                system prompt constrains it to draft only from the guidance
                it was handed. If that guidance doesn&apos;t clearly cover a
                topic, the tool says so rather than guessing at figures,
                dates or amounts.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-[1.25rem] font-semibold text-primary">
                Letters are code, not a model
              </h3>
              <p className="max-w-3xl text-base leading-relaxed text-primary sm:text-lg">
                The AI may extract values from pasted text into a form; it
                never drafts the letter itself. Generating the letter is
                deterministic string replacement, so fixed legal wording and
                rights information can&apos;t drift between runs. Dates and
                amounts are formatted in code, and inconsistencies - an end
                date before a start date, a zero amount - are flagged above
                the letter rather than silently written into it.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-[1.25rem] font-semibold text-primary">
                Safeguarding is flagged, not delegated
              </h3>
              <p className="max-w-3xl text-base leading-relaxed text-primary sm:text-lg">
                A message that reads as suicide risk, domestic abuse, child
                safeguarding, homelessness or a fraud admission surfaces a
                banner before any draft is shown, pointing the caseworker to
                the Six Point Plan or the relevant local procedure. The model
                is constrained to flag, not to counsel, investigate or invent
                next steps - that judgement stays with the caseworker.
              </p>
            </section>
          </div>
        </section>

        <section className="border-b border-border py-12">
          <SectionHeading>THE RESULT</SectionHeading>
          <p className="max-w-3xl text-base leading-relaxed text-primary sm:text-lg">
            A working prototype that argues two things at once: real
            understanding of the caseworker workflow it was built for, and
            the discipline to build safe, compliant software around an LLM
            rather than just a wrapper around a chat API. Not an official DWP
            product - a demonstration of how one would be built responsibly.
          </p>
        </section>

        <footer className="py-12">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/work"
              className="shell-label text-lg text-primary transition-colors hover:text-accent"
            >
              BACK TO THE FIXTURE LIST →
            </Link>
            <Link
              href="/contact"
              className="text-base text-primary underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent"
            >
              Got a similar problem? Get in touch.
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}
