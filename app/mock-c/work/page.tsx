import Link from "next/link";
import { projects, type Fact } from "./projects";

export const metadata = { title: "Work - RDev Studio", robots: { index: false, follow: false } };

const show = (fact: Fact) => ("text" in fact ? fact.text : "To confirm");

export default function MockCWork() {
  return (
    <main className="work-page wrap" id="work">
      <header className="topbar">
        <Link className="wordmark" href="/mock-c">R<span>/</span>DEV <small>STUDIO</small></Link>
        <nav aria-label="Main navigation">
          <Link href="/mock-c">Home</Link>
          <Link href="/mock-c/services">Services</Link>
          <Link href="/mock-c/contact">Contact ↗</Link>
        </nav>
      </header>
      <section className="work-page-heading">
        <p className="eyebrow">Selected projects · 01-05</p>
        <h1>Selected<br /><em>work.</em></h1>
        <p>A short index of studio work. Each project has its own page with the facts we can stand behind; anything marked TODO is waiting on Ryan.</p>
      </section>
      <div className="project-panels">
        {projects.map((project, index) => (
          <article className="project-panel" key={project.slug}>
            <div className="panel-meta">
              <span>0{index + 1}</span>
              <span>{show(project.type)}</span>
              <span>{show(project.status)}</span>
            </div>
            <h2>
              <Link href={`/mock-c/work/${project.slug}`}>
                {project.name} <span aria-hidden="true">→</span>
              </Link>
            </h2>
            <p>{"text" in project.summary ? project.summary.text : "TODO: description to confirm with Ryan."}</p>
          </article>
        ))}
      </div>
      <footer className="footer work-footer">
        <Link className="wordmark" href="/mock-c">R<span>/</span>DEV <small>STUDIO</small></Link>
        <Link href="/mock-c/contact">Start a project ↗</Link>
      </footer>
    </main>
  );
}
