import Link from "next/link";

const projects = [
  { name: "ShelterLink", type: "Volunteer platform", role: "Volunteer rotas, roles and admin dashboard", href: "https://shelterlink.online", detail: "A volunteer management platform for Assisi Animal Sanctuary, with shift scheduling, role management and an admin dashboard." },
  { name: "Rondo", type: "TODO: confirm", role: "TODO: confirm", href: "#work", detail: "TODO: add a factual description and real project link after Ryan confirms them." },
  { name: "Crosskennan", type: "TODO: confirm", role: "TODO: confirm", href: "https://crosskennan.vercel.app", detail: "TODO: add a factual description after Ryan confirms project details." },
  { name: "Assisi", type: "Website and brand", role: "Rebuilt site and identity", href: "/work/assisi", detail: "A rebuilt website and brand for Assisi Animal Sanctuary in Belfast. Built and ready for their feedback." },
  { name: "MGSL hub", type: "TODO: confirm", role: "TODO: confirm", href: "https://mgsl-hq-black.vercel.app", detail: "TODO: add a factual description after Ryan confirms project details." },
];

export default function MockCWork() {
  return <main className="work-page wrap" id="work"><header className="topbar"><Link className="wordmark" href="/mock-c">R<span>/</span>DEV <small>STUDIO</small></Link><nav aria-label="Project navigation"><Link href="/mock-c">Home</Link><Link href="/mock-c/services">Services</Link><Link href="/mock-c/contact">Contact ↗</Link></nav></header><section className="work-page-heading"><p className="eyebrow">Selected projects · 01—05</p><h1>Work in<br /><em>progress.</em></h1><p>A short index of selected studio work. Notes here use details currently documented in the repository; project details marked TODO need Ryan’s review.</p></section><div className="project-panels">{projects.map((project, index) => <article className="project-panel" key={project.name}><div className="panel-meta"><span>0{index + 1}</span><span>{project.type}</span><span>{project.role}</span></div><h2><a href={project.href} target={project.href.startsWith("http") ? "_blank" : undefined} rel={project.href.startsWith("http") ? "noreferrer" : undefined}>{project.name} <span aria-hidden="true">↗</span></a></h2><p>{project.detail}</p></article>)}</div><footer className="footer work-footer"><Link className="wordmark" href="/mock-c">R<span>/</span>DEV <small>STUDIO</small></Link><Link href="/mock-c/contact">Start a project ↗</Link></footer></main>;
}
