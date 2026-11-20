import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ScreenArt } from "@/components/mock-a/ScreenArt";
import { WhatsAppIcon } from "@/components/mock-a/Shell";
import {
  MOCK_A_BASE,
  MOCK_A_PROJECTS,
  MOCK_A_QUOTE_HREF,
  MOCK_A_WHATSAPP_HREF,
  mockACaseHref,
} from "@/components/mock-a/data";
import s from "@/components/mock-a/mockA.module.css";

/**
 * MOCK A case study pages. Facts only, from components/mock-a/data.ts (which cites its sources).
 * Anything not in the repo renders as a "TODO for Ryan" marker. Agent-written and unverified.
 */

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return MOCK_A_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = MOCK_A_PROJECTS.find((item) => item.slug === slug);
  return {
    title: { absolute: `${project?.name ?? "Work"} | Mock A | RDev Studio` },
    robots: { index: false, follow: false },
  };
}

function TodoMark({ children }: { children: React.ReactNode }) {
  return (
    <p className={s.todoMark}>
      <span className={`${s.todoTag} ${s.mono}`}>TODO for Ryan</span>
      <span>{children}</span>
    </p>
  );
}

function Chapter({
  number,
  id,
  title,
  children,
}: {
  number: string;
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={s.chapter} aria-labelledby={id} data-reveal>
      <p className={`${s.chapterNum} ${s.mono}`} aria-hidden="true">
        {number}
      </p>
      <div>
        <h2 id={id} className={s.chapterTitle}>
          {title}
        </h2>
        <div className={s.chapterBody}>{children}</div>
      </div>
    </section>
  );
}

function Paras({ items }: { items: readonly string[] }) {
  return (
    <>
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </>
  );
}

export default async function MockACasePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const index = MOCK_A_PROJECTS.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();

  const project = MOCK_A_PROJECTS[index];
  const { story } = project;
  const next = MOCK_A_PROJECTS[(index + 1) % MOCK_A_PROJECTS.length];
  const related = story.related ? MOCK_A_PROJECTS.find((item) => item.slug === story.related) : undefined;
  const titleId = `${project.slug}-case-title`;

  return (
    <article aria-labelledby={titleId}>
      <header className={`${s.wrap} ${s.pageHero}`}>
        <nav aria-label="Breadcrumb">
          <ol className={`${s.crumbs} ${s.mono}`}>
            <li>
              <Link href={MOCK_A_BASE}>Home</Link>
            </li>
            <li>
              <Link href={`${MOCK_A_BASE}/work`}>Work</Link>
            </li>
            <li aria-current="page">{project.name}</li>
          </ol>
        </nav>
        <p className={`${s.panelIndex} ${s.mono}`} style={{ margin: "1.5rem 0 0" }}>
          {String(index + 1).padStart(2, "0")} / {project.type}
        </p>
        <h1 id={titleId} className={s.caseName}>
          {project.name}
          <span className={s.displayAccent}>.</span>
        </h1>
        {project.summary ? (
          <p className={s.lede} style={{ marginTop: "1.5rem" }}>
            {project.summary}
          </p>
        ) : (
          <div style={{ marginTop: "1.5rem", maxWidth: "40rem" }}>
            <TodoMark>A one-line description of {project.name}. Nothing in the repo describes it yet.</TodoMark>
          </div>
        )}

        <dl className={s.caseMeta}>
          <div>
            <dt className={s.mono}>Type</dt>
            <dd>{project.type}</dd>
          </div>
          <div>
            <dt className={s.mono}>Year</dt>
            <dd>{project.year ?? <span className={s.todoInline}>TODO for Ryan</span>}</dd>
          </div>
          <div>
            <dt className={s.mono}>Status</dt>
            <dd>{project.status ?? <span className={s.todoInline}>TODO for Ryan</span>}</dd>
          </div>
          <div>
            <dt className={s.mono}>Link</dt>
            <dd>
              {project.link?.external ? (
                <a href={project.link.href} className={s.inlineLink} target="_blank" rel="noopener noreferrer">
                  {project.link.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <span className={s.todoInline}>TODO for Ryan</span>
              )}
            </dd>
          </div>
        </dl>
      </header>

      <div className={`${s.wrap} ${s.caseArt}`} data-reveal>
        <ScreenArt project={project} priority sizes="(min-width: 1280px) 1200px, 100vw" />
      </div>

      <div className={s.wrap}>
        <Chapter number="01" id="case-problem" title="The problem">
          {story.problem?.length ? (
            <Paras items={story.problem} />
          ) : (
            <TodoMark>The problem {project.name} solves, and for whom.</TodoMark>
          )}
        </Chapter>

        <Chapter number="02" id="case-built" title="What was built">
          {story.built?.length ? (
            <>
              <Paras items={story.built} />
              {project.facts.length > 0 ? (
                <ul className={s.caseFacts} aria-label={`What ${project.name} includes`} data-reveal-stagger>
                  {project.facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              ) : null}
            </>
          ) : (
            <TodoMark>What was built for {project.name}: the main features or pages.</TodoMark>
          )}
          {story.why ? (
            <>
              <h3 className={`${s.svcLabel} ${s.mono}`} style={{ marginTop: "2rem" }}>
                {story.why.title}
              </h3>
              <Paras items={story.why.body} />
            </>
          ) : null}
        </Chapter>

        <Chapter number="03" id="case-stack" title="Stack">
          {project.stack?.length ? (
            <ul className={s.stackList}>
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <TodoMark>The stack used for {project.name}. It is not recorded in the repo.</TodoMark>
          )}
        </Chapter>

        <Chapter number="04" id="case-status" title="Status">
          {story.statusNote?.length ? (
            <Paras items={story.statusNote} />
          ) : (
            <TodoMark>Where {project.name} stands now: live, in progress, or a preview.</TodoMark>
          )}
        </Chapter>

        {story.gallery?.length ? (
          <section className={s.caseGallery} aria-labelledby="case-gallery">
            <h2 id="case-gallery" className="sr-only">
              Screens
            </h2>
            {story.gallery.map((shot) => (
              <figure key={shot.src} className={s.screen} style={{ margin: 0 }} data-reveal>
                <div className={s.screenBar} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div className={s.screenBody}>
                  <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 900px) 50vw, 100vw" />
                </div>
                <figcaption className={`${s.caseCaption} ${s.mono}`}>{shot.caption}</figcaption>
              </figure>
            ))}
          </section>
        ) : null}

        <section className={s.missing} aria-labelledby="case-missing" data-reveal>
          <h2 id="case-missing" className={`${s.svcLabel} ${s.mono}`}>
            Not in the repo yet. TODO for Ryan
          </h2>
          <ul>
            {story.missing.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={s.missingNote}>
            Nothing on this page is made up. Results, quotes and numbers stay off until Ryan
            supplies them.
          </p>
        </section>

        {project.caseStudy || related ? (
          <p className={s.svcProof}>
            {project.caseStudy ? (
              <>
                <span className={s.mono}>Live site: </span>
                <Link href={project.caseStudy.href} className={s.inlineLink}>
                  current {project.name} case study
                </Link>
              </>
            ) : null}
            {project.caseStudy && related ? <span aria-hidden="true"> &middot; </span> : null}
            {related ? (
              <>
                <span className={s.mono}>Same client: </span>
                <Link href={mockACaseHref(related.slug)} className={s.inlineLink}>
                  {related.name}
                </Link>
              </>
            ) : null}
          </p>
        ) : null}
      </div>

      <nav className={s.wrap} aria-label="Next project">
        <Link href={mockACaseHref(next.slug)} className={s.nextCase}>
          <span className={`${s.mono} ${s.nextLabel}`}>Next project</span>
          <span className={s.nextName}>
            {next.name}
            <span className={s.btnArrow} aria-hidden="true">
              &rarr;
            </span>
          </span>
        </Link>
      </nav>

      <section className={`${s.wrap} ${s.section}`} aria-labelledby="case-cta-title">
        <h2 id="case-cta-title" className={s.closeDisplay}>
          Got one <span className={s.displayAccent}>like it?</span>
        </h2>
        <div className={s.ctaRow} style={{ marginTop: "2rem" }}>
          <Link href={MOCK_A_QUOTE_HREF} className={`${s.btn} ${s.btnLime} ${s.btnLg}`}>
            Get a quote
            <span className={s.btnArrow} aria-hidden="true">
              &rarr;
            </span>
          </Link>
          <a
            href={MOCK_A_WHATSAPP_HREF}
            className={`${s.btn} ${s.btnGhost} ${s.btnLg}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            Message on WhatsApp
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </section>
    </article>
  );
}
