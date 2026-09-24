import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BUILD_NOTES,
  getBuildNote,
  repoCommitUrl,
  repoFileUrl,
} from "@/lib/build-notes";
import { HIRE_CV_PATH } from "@/lib/hire-data";
import { createPageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const dynamicParams = false;

export function generateStaticParams() {
  return BUILD_NOTES.map((note) => ({ slug: note.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const note = getBuildNote(slug);
  if (!note) return {};
  return createPageMetadata({
    title: `How ${note.title} is built`,
    description: `${note.summary} Architecture, decisions, what broke, and how it's tested.`,
    path: `/build/${note.slug}`,
    ogEyebrow: "How it's built",
  });
}

function Section({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border py-10 sm:py-12">
      <p className="shell-label mb-2 text-accent">{label}</p>
      <h2 className="mb-6 font-display text-2xl uppercase tracking-tight text-primary sm:text-3xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 leading-relaxed text-primary">
          <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function BuildNotePage({ params }: PageProps) {
  const { slug } = await params;
  const note = getBuildNote(slug);
  if (!note) notFound();

  const others = BUILD_NOTES.filter((item) => item.slug !== note.slug);

  return (
    <div className="section-padding pt-28">
      <article className="container-wide px-6">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: "Home", href: "/" },
            { label: "For employers", href: "/hire" },
            { label: `How ${note.title} is built`, href: `/build/${note.slug}` },
          ]}
        />

        <header className="pb-10">
          <p className="shell-label mb-3 text-accent">
            How it&apos;s built - {note.kicker}
          </p>
          <h1 className="programme-h1">{note.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-primary sm:text-lg">
            {note.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {note.links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={index === 0 ? "btn-primary" : "btn-secondary"}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3 lg:grid-cols-5">
            {note.facts.map((fact) => (
              <div key={fact.label} className="bg-base px-4 py-3">
                <dt className="shell-label text-secondary">{fact.label}</dt>
                <dd className="mt-1 font-semibold text-primary">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
            {note.stack.map((item) => (
              <li
                key={item}
                className="rounded-md border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-secondary"
              >
                {item}
              </li>
            ))}
          </ul>
        </header>

        <section className="grid gap-4 border-t border-border py-10 md:grid-cols-3" aria-label="Summary">
          {[
            { label: "The problem", body: note.tldr.problem },
            { label: "What I built", body: note.tldr.built },
            { label: "The hard part", body: note.tldr.hardPart },
          ].map((item) => (
            <div key={item.label} className="rounded-[10px] border border-border bg-raised p-5">
              <p className="shell-label mb-2 text-accent">{item.label}</p>
              <p className="leading-relaxed text-primary">{item.body}</p>
            </div>
          ))}
        </section>

        <Section label="Context" title="The setting">
          <div className="max-w-3xl space-y-4 text-base leading-relaxed text-primary sm:text-lg">
            {note.context.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="shell-label mb-3 text-accent">Goals</h3>
              <Bullets items={note.goals} />
            </div>
            <div>
              <h3 className="shell-label mb-3 text-accent">Not goals</h3>
              <Bullets items={note.nonGoals} />
            </div>
          </div>
        </Section>

        <Section label="Architecture" title="How the pieces fit">
          <p className="max-w-3xl text-base leading-relaxed text-primary sm:text-lg">
            {note.architecture.summary}
          </p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {note.architecture.parts.map((part) => (
              <div key={part.name} className="rounded-[10px] border border-border bg-raised p-4">
                <dt className="font-semibold text-primary">{part.name}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-primary">{part.role}</dd>
              </div>
            ))}
          </dl>

          <h3 className="shell-label mb-4 mt-10 text-accent">
            {note.architecture.flowTitle}
          </h3>
          <ol className="relative max-w-3xl border-l-2 border-accent/30 pl-6">
            {note.architecture.flow.map((step, index) => (
              <li key={`${step.from}-${step.to}-${index}`} className="relative pb-6 last:pb-0">
                <span
                  className="absolute -left-[33px] top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent bg-base font-mono text-[11px] font-bold text-accent"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <p className="font-mono text-[12px] uppercase tracking-[0.06em] text-primary">
                  {step.from} <span className="text-accent" aria-hidden="true">→</span>
                  <span className="sr-only"> to </span> {step.to}
                </p>
                <p className="mt-1 leading-relaxed text-primary">{step.action}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section label="Decisions" title="Calls I made, and what they cost">
          <div className="space-y-5">
            {note.decisions.map((decision) => (
              <div key={decision.title} className="rounded-[10px] border border-border bg-raised p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-primary">{decision.title}</h3>
                <dl className="mt-4 grid gap-4 md:grid-cols-2">
                  {[
                    { label: "Context", body: decision.context },
                    { label: "Decision", body: decision.decision },
                    { label: "Alternatives", body: decision.alternatives },
                    { label: "Consequences", body: decision.consequences },
                  ].map((item) => (
                    <div key={item.label}>
                      <dt className="shell-label mb-1 text-secondary">{item.label}</dt>
                      <dd className="text-sm leading-relaxed text-primary">{item.body}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </Section>

        <Section label="Incidents" title="What broke">
          <div className="space-y-5">
            {note.incidents.map((incident) => (
              <div key={incident.title} className="rounded-[10px] border border-border bg-raised p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold text-primary">{incident.title}</h3>
                  {incident.commit ? (
                    <a
                      href={repoCommitUrl(incident.commit)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[12px] text-accent underline underline-offset-4"
                    >
                      {incident.commit}
                    </a>
                  ) : null}
                </div>
                <dl className="mt-4 grid gap-4 md:grid-cols-3">
                  {[
                    { label: "Symptom", body: incident.symptom },
                    { label: "Cause", body: incident.cause },
                    { label: "Fix", body: incident.fix },
                  ].map((item) => (
                    <div key={item.label}>
                      <dt className="shell-label mb-1 text-secondary">{item.label}</dt>
                      <dd className="text-sm leading-relaxed text-primary">{item.body}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </Section>

        <Section label="Quality" title="Testing">
          <Bullets items={note.testing} />
        </Section>

        {note.ai ? (
          <Section label="AI" title="Where Claude comes in">
            <Bullets items={note.ai} />
          </Section>
        ) : null}

        <Section label="Next" title="Known gaps">
          <Bullets items={note.gaps} />
        </Section>

        <Section label="Proof" title="Read the code">
          <ul className="grid gap-3 sm:grid-cols-2">
            {note.codeLinks.map((link) => (
              <li key={link.path}>
                <a
                  href={repoFileUrl(link.path)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-md border border-border bg-raised p-4 transition-colors hover:border-accent"
                >
                  <p className="font-semibold text-primary group-hover:text-accent">
                    {link.label}
                  </p>
                  <p className="mt-1 break-all font-mono text-[12px] text-secondary">
                    {link.path}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <section className="border-t border-border py-10">
          <div className="flex flex-col gap-6 rounded-[10px] border border-border bg-raised p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="shell-label mb-2 text-accent">Hiring?</p>
              <p className="text-primary">
                The CV is one click away. Or read how{" "}
                {others.map((item, index) => (
                  <span key={item.slug}>
                    {index > 0 ? " or " : ""}
                    <Link href={`/build/${item.slug}`} className="link-editorial">
                      {item.title}
                    </Link>
                  </span>
                ))}{" "}
                is built.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={HIRE_CV_PATH} download className="btn-primary">
                CV (PDF)
              </a>
              <Link href="/hire" className="btn-secondary">
                The long version
              </Link>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
