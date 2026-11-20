import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ScreenArt } from "@/components/mock-a/ScreenArt";
import { WhatsAppIcon } from "@/components/mock-a/Shell";
import {
  MOCK_A_PROJECTS,
  MOCK_A_QUOTE_HREF,
  MOCK_A_WHATSAPP_HREF,
  type MockProject,
} from "@/components/mock-a/data";
import s from "@/components/mock-a/mockA.module.css";

export const metadata: Metadata = {
  title: { absolute: "Work | Mock A | RDev Studio" },
  robots: { index: false, follow: false },
};

function Panel({ project, index }: { project: MockProject; index: number }) {
  const { art } = project;
  const flip = index % 2 === 1;

  return (
    <article
      id={project.slug}
      className={`${s.panel} ${flip ? s.panelFlip : ""}`}
      aria-labelledby={`${project.slug}-title`}
    >
      <div data-reveal>
        <p className={`${s.panelIndex} ${s.mono}`} style={{ margin: 0 }}>
          {String(index + 1).padStart(2, "0")} / {project.type}
        </p>
        <h2 id={`${project.slug}-title`} className={s.panelName}>
          {project.name}
        </h2>
        {project.summary ? <p className={s.panelSummary}>{project.summary}</p> : null}

        <dl className={s.panelMeta}>
          <div>
            <dt className={s.mono}>Type</dt>
            <dd>{project.type}</dd>
          </div>
          <div>
            <dt className={s.mono}>Year</dt>
            <dd>{project.year ?? "To confirm"}</dd>
          </div>
          {project.status ? (
            <div>
              <dt className={s.mono}>Status</dt>
              <dd>{project.status}</dd>
            </div>
          ) : null}
          {project.stack ? (
            <div>
              <dt className={s.mono}>Stack</dt>
              <dd>{project.stack.join(", ")}</dd>
            </div>
          ) : null}
        </dl>

        {project.facts.length > 0 ? (
          <ul className={s.panelFacts} aria-label={`What ${project.name} includes`}>
            {project.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        ) : null}

        <div className={s.panelActions}>
          {project.link?.external ? (
            <a
              href={project.link.href}
              className={`${s.btn} ${s.btnLime}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit {project.link.label}
              <span className="sr-only"> (opens in a new tab)</span>
              <span className={s.btnArrow} aria-hidden="true">
                &#8599;
              </span>
            </a>
          ) : null}
          {project.caseStudy ? (
            <Link href={project.caseStudy.href} className={`${s.btn} ${s.btnGhost}`}>
              {project.caseStudy.label}
              <span className="sr-only"> for {project.name} on the live site</span>
            </Link>
          ) : null}
        </div>

        {project.todo ? (
          <p className={`${s.panelTodo} ${s.mono}`}>
            Mock note: {project.todo}
          </p>
        ) : null}
      </div>

      <div className={s.panelArt} data-reveal>
        <div className={s.devices}>
          <ScreenArt project={project} priority={index === 0} />
          {art.kind === "image" && art.secondary ? (
            <figure className={s.secondaryScreen} style={{ margin: 0 }}>
              <div className={s.screenBar} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className={s.screenBody}>
                <Image src={art.secondary.src} alt={art.secondary.alt} fill sizes="(min-width: 1000px) 22vw, 50vw" />
              </div>
            </figure>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function MockAWorkPage() {
  return (
    <>
      <section className={`${s.wrap} ${s.pageHero}`} aria-labelledby="work-page-title">
        <p className={`${s.eyebrow} ${s.mono}`}>Work</p>
        <h1 id="work-page-title" className={s.display} style={{ marginTop: "1rem" }}>
          Five <span className={s.displayAccent}>builds.</span>
        </h1>
        <p className={s.lede} style={{ marginTop: "1.5rem" }}>
          Charity platforms, websites and the studio&apos;s own products. Each panel says only what
          is confirmed so far.
        </p>
        <nav aria-label="Jump to a project">
          <ul className={s.filters}>
            {MOCK_A_PROJECTS.map((project) => (
              <li key={project.slug}>
                <a href={`#${project.slug}`}>{project.name}</a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <div className={s.wrap}>
        {MOCK_A_PROJECTS.map((project, index) => (
          <Panel key={project.slug} project={project} index={index} />
        ))}
      </div>

      <section className={`${s.wrap} ${s.section}`} aria-labelledby="work-cta-title">
        <h2 id="work-cta-title" className={s.closeDisplay}>
          Yours <span className={s.displayAccent}>next?</span>
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
          </a>
        </div>
      </section>
    </>
  );
}
