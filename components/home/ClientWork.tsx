import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { BrowserFrame, PhoneFrame } from "@/components/work/BrowserFrame";
import { clientBySlug, type ClientWork as ClientJob } from "@/lib/content/products";

function domainOf(url?: string) {
  if (!url) return undefined;
  try {
    return new URL(url).host;
  } catch {
    return undefined;
  }
}

function JobCard({ job }: { job: ClientJob }) {
  const domain = domainOf(job.siteUrl);
  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <BrowserFrame
        src={job.image}
        alt={job.image ? `${job.name} website` : ""}
        domain={domain}
        sizes="(max-width: 768px) 100vw, 30vw"
        mutedLabel={job.slug === "assisi" ? "Preview after sign-off" : "Preview after sign-off"}
      />
      <div className="flex flex-1 flex-col p-5">
        <p className="type-label text-studio-muted">{job.statusLabel}</p>
        <h3 className="mt-2 font-studio-display text-2xl text-studio-text">{job.name}</h3>
        <p className="type-body mt-2 text-studio-muted">{job.summary}</p>
        {job.stack && job.stack.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {job.stack.slice(0, 3).map((chip) => (
              <li key={chip} className="rounded-full border border-studio-line px-2.5 py-1 font-studio-mono text-xs text-studio-muted">
                {chip}
              </li>
            ))}
          </ul>
        ) : null}
        {job.href && job.href !== "/work" ? (
          <Link
            href={job.href}
            className="mt-4 inline-flex min-h-11 items-center text-sm text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent"
          >
            Read the case study
          </Link>
        ) : null}
      </div>
    </article>
  );
}

export function ClientWork() {
  const feature = clientBySlug("rvs-cold-brew");
  const rest = ["shelterlink", "paintball-wales", "assisi"]
    .map((slug) => clientBySlug(slug))
    .filter((job) => job !== undefined);

  if (!feature) return null;

  return (
    <Section eyebrow="CLIENT WORK" heading="Real clients. Real sites.">
      <div className="mt-4 flex justify-end">
        <Link
          href="/work"
          className="type-label inline-flex min-h-11 items-center text-studio-muted underline-offset-4 hover:text-studio-accent hover:underline"
        >
          All work
        </Link>
      </div>
      <Reveal>
        <article className="card relative mt-6 overflow-hidden p-4 md:p-6">
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
            <div className="relative">
              <BrowserFrame
                src={feature.image}
                alt="RV's Cold Brew website, with the counter behind the headline"
                domain={domainOf(feature.siteUrl)}
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              <div className="absolute -bottom-2 -right-2 hidden md:block">
                <PhoneFrame
                  src={feature.mobileImage ?? feature.image}
                  alt="RV's Cold Brew website on a phone"
                  sizes="9rem"
                />
              </div>
            </div>
            <div className="pb-4 md:pb-16">
              <p className="type-label text-studio-muted">{feature.statusLabel}</p>
              <h3 className="mt-2 font-studio-display text-4xl text-studio-text">{feature.name}</h3>
              <p className="type-body mt-3 max-w-md text-studio-muted">{feature.summary}</p>
              {feature.stack ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {feature.stack.map((chip) => (
                    <li key={chip} className="rounded-full border border-studio-line px-2.5 py-1 font-studio-mono text-xs text-studio-muted">
                      {chip}
                    </li>
                  ))}
                </ul>
              ) : null}
              {feature.href ? (
                <Link
                  href={feature.href}
                  className="mt-5 inline-flex min-h-11 items-center text-sm text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent"
                >
                  Read the case study
                </Link>
              ) : null}
            </div>
          </div>
        </article>
      </Reveal>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {rest.map((job, index) => (
          <Reveal key={job.slug} delay={index * 60}>
            <JobCard job={job} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
