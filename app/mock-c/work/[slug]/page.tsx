import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WHATSAPP_URL } from "@/lib/constants";
import { getProject, projects, type Fact } from "../projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    title: project ? `${project.name} - RDev Studio` : "Not found - RDev Studio",
    robots: { index: false, follow: false },
  };
}

function Todo({ children }: { children: React.ReactNode }) {
  return (
    <span className="case-todo">
      <strong>TODO for Ryan</strong> {children}
    </span>
  );
}

function FactText({ fact }: { fact: Fact }) {
  return "text" in fact ? <>{fact.text}</> : <Todo>{fact.todo}</Todo>;
}

export default async function MockCCaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const link = "href" in project.link ? project.link : null;
  const external = link?.href.startsWith("http");

  return (
    <main className="wrap mock-subpage case-page">
      <header className="topbar">
        <Link className="wordmark" href="/mock-c">R<span>/</span>DEV <small>STUDIO</small></Link>
        <nav aria-label="Main navigation">
          <Link href="/mock-c/work">Work</Link>
          <Link href="/mock-c/services">Services</Link>
          <Link href="/mock-c/contact">Contact</Link>
        </nav>
      </header>

      <section className="subpage-heading case-heading" aria-labelledby="case-title">
        <p className="eyebrow">
          <Link className="case-back" href="/mock-c/work">Work</Link> / 0{index + 1}
        </p>
        <h1 id="case-title">{project.name}<span className="accent-dot">.</span></h1>
        <p className="case-summary"><FactText fact={project.summary} /></p>
        <dl className="case-meta">
          <div><dt>Type</dt><dd><FactText fact={project.type} /></dd></div>
          <div><dt>Role</dt><dd><FactText fact={project.role} /></dd></div>
          <div><dt>Year</dt><dd><FactText fact={project.year} /></dd></div>
          <div><dt>Status</dt><dd><FactText fact={project.status} /></dd></div>
        </dl>
        <p className="case-link">
          {link ? (
            <a className="text-link" href={link.href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
              {link.label} <span aria-hidden="true">↗</span>
              {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
            </a>
          ) : (
            <Todo>{"todo" in project.link ? project.link.todo : null}</Todo>
          )}
        </p>
      </section>

      {project.shots?.length ? (
        <section className="case-shots" aria-label={`${project.name} screenshots`}>
          {project.shots.map((shot, i) => (
            <figure key={shot.src} className={i === 0 ? "case-shot case-shot-lead" : "case-shot"}>
              <div className="case-frame">
                <span className="case-frame-bar" aria-hidden="true"><i /><i /><i /></span>
                <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} priority={i === 0} sizes={i === 0 ? "(max-width: 1240px) 100vw, 1240px" : "(max-width: 760px) 100vw, 620px"} />
              </div>
              <figcaption>{shot.caption}</figcaption>
            </figure>
          ))}
        </section>
      ) : (
        <section className="case-shots" aria-label="Screenshots">
          <div className="case-placeholder">
            <p className="eyebrow">Screenshots</p>
            <Todo>Add approved screenshots from public/. None are in the repo for this project yet.</Todo>
          </div>
        </section>
      )}

      <section className="case-section" aria-labelledby="case-problem">
        <h2 id="case-problem" className="eyebrow">01 · The problem</h2>
        <div className="case-body">
          {project.problem.map((fact, i) => <p key={i}><FactText fact={fact} /></p>)}
        </div>
      </section>

      <section className="case-section" aria-labelledby="case-built">
        <h2 id="case-built" className="eyebrow">02 · What was built</h2>
        <div className="case-body">
          {project.built.map((fact, i) => <p key={i}><FactText fact={fact} /></p>)}
          {project.features ? (
            <ul className="case-features">
              {project.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          ) : null}
        </div>
      </section>

      <section className="case-section" aria-labelledby="case-stack">
        <h2 id="case-stack" className="eyebrow">03 · Stack</h2>
        <div className="case-body"><p><FactText fact={project.stack} /></p></div>
      </section>

      <section className="case-section" aria-labelledby="case-results">
        <h2 id="case-results" className="eyebrow">04 · Results and quotes</h2>
        <div className="case-body">
          <p><Todo>No results, metrics or client quotes are recorded in the repo. Add them only if the client has agreed, or leave this section out.</Todo></p>
        </div>
      </section>

      <section className="case-cta" aria-labelledby="case-cta-title">
        <h2 id="case-cta-title">Got something<br /><em>similar in mind?</em></h2>
        <div className="service-actions">
          <Link className="button button-dark" href="/mock-c/contact">Start a project <span aria-hidden="true">↗</span></Link>
          <a className="text-link" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Message on WhatsApp <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <nav className="case-next" aria-label="Next project">
        <span className="eyebrow">Next project</span>
        <Link href={`/mock-c/work/${next.slug}`}>{next.name} <span aria-hidden="true">→</span></Link>
      </nav>

      <footer className="footer subpage-footer">
        <Link className="wordmark" href="/mock-c">R<span>/</span>DEV <small>STUDIO</small></Link>
        <Link href="/mock-c/contact">Start a project ↗</Link>
      </footer>
    </main>
  );
}
