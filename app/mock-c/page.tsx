import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { LocalTime } from "./LocalTime";
import { WHATSAPP_URL } from "@/lib/constants";

const work = [
  { name: "ShelterLink", type: "Volunteer platform", year: "—", role: "Product design · build", href: "https://shelterlink.online", external: true, note: "Volunteer rotas, roles and an admin dashboard for Assisi Animal Sanctuary." },
  // TODO Ryan: confirm Rondo description, year, role and its public link. No URL was present in this repository.
  { name: "Rondo", type: "Details to confirm", year: "—", role: "Details to confirm", href: "#work", external: false, note: "Project details to confirm." },
  // TODO Ryan: confirm Crosskennan project description, year and role; those details are not in this repository.
  { name: "Crosskennan", type: "Details to confirm", year: "—", role: "Details to confirm", href: "https://crosskennan.vercel.app", external: true, note: "Project details to confirm." },
  { name: "Assisi", type: "Website · identity", year: "—", role: "Website and brand rebuild", href: "/work/assisi", external: false, note: "A rebuilt website and brand for Assisi Animal Sanctuary in Belfast; built and ready for their feedback." },
  // TODO Ryan: confirm MGSL hub description, year and role; those details are not in this repository.
  { name: "MGSL hub", type: "Details to confirm", year: "—", role: "Details to confirm", href: "https://mgsl-hq-black.vercel.app", external: true, note: "Project details to confirm." },
];

const services = [
  ["01", "Websites", "Clear, phone-first websites that make it easy to understand what you do and get in touch."],
  ["02", "Web apps", "Purpose-built digital products, from internal tools to public platforms."],
  ["03", "Google Business Profile", "Practical help getting a local business profile set up and in shape."],
  ["04", "Small business & charity", "Thoughtful digital work for local organisations, with charity builds welcomed."],
];

export default function MockCHome() {
  return <main id="top">
    <header className="topbar wrap">
      <Link className="wordmark" href="/mock-c" aria-label="RDev Studio home">R<span>/</span>DEV <small>STUDIO</small></Link>
      <nav aria-label="Main navigation"><a href="#work">Work</a><Link href="/mock-c/services">Services</Link><a href="#studio">Studio</a><a href="#contact">Contact <span aria-hidden="true">↗</span></a></nav>
    </header>

    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-kicker"><LocalTime /><span className="availability"><i aria-hidden="true" />Open to new projects</span></div>
      <h1 id="hero-title">Designs and builds<br />websites and <em>digital</em><br className="desktop-break" /> products.</h1>
      <div className="hero-bottom"><p>Independent digital studio for small businesses and charities, based in Northern Ireland.</p><div className="hero-actions"><a className="button button-dark" href="#contact">Start a project <span aria-hidden="true">↗</span></a><a className="text-link" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Message on WhatsApp <span aria-hidden="true">↗</span></a></div></div>
      <div className="hero-mark" aria-hidden="true">R<span>/</span></div>
    </section>

    <section className="section wrap" id="services" aria-labelledby="services-title">
      <div className="section-heading"><p className="eyebrow">What we do <span>01 — 04</span></p><h2 id="services-title">Good work, made<br />with intention.</h2></div>
      <div className="service-list">{services.map(([n, title, desc]) => <article className="service-row" key={n}><span className="row-number">{n}</span><h3>{title}</h3><p>{desc}</p><span className="row-arrow" aria-hidden="true">↗</span></article>)}</div>
    </section>

    <section className="section work-section" id="work" aria-labelledby="work-title"><div className="wrap">
      <div className="work-intro"><div><p className="eyebrow">Selected projects <span>05</span></p><h2 id="work-title">Latest work<span className="accent-dot">.</span></h2></div><Link className="text-link" href="/mock-c/work">View project notes <span aria-hidden="true">↗</span></Link></div>
      <div className="work-table" role="list">{work.map((item, index) => <a className="work-row" role="listitem" href={item.href} key={item.name} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined} aria-label={`${item.name}. ${item.note}`}><span className="work-index">0{index + 1}</span><span className="work-name">{item.name}<small>{item.note}</small></span><span className="work-type">{item.type}</span><span className="work-year">{item.year}</span><span className="work-role">{item.role}</span><span className="work-arrow" aria-hidden="true">↗</span></a>)}</div>
    </div></section>

    <section className="section studio-section wrap" id="studio" aria-labelledby="studio-title"><p className="eyebrow">A little about us <span>THE STUDIO</span></p><div><h2 id="studio-title">Small studio.<br /><em>Thoughtful work.</em></h2><p className="studio-copy">RDev Studio designs and builds useful things for the web. We work with small businesses and charities to make digital experiences that feel considered, clear and easy to use.</p></div></section>

    <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="wrap contact-top"><p className="eyebrow">Have something in mind? <span>LET’S TALK</span></p><h2 id="contact-title">Start a<br /><em>project.</em></h2><div className="contact-ctas"><a className="button button-light" href="#quote-form">Tell us what you need <span aria-hidden="true">↓</span></a><a className="text-link light-link" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Message on WhatsApp <span aria-hidden="true">↗</span></a></div></div><div className="wrap form-wrap" id="quote-form"><div className="form-intro"><p className="eyebrow">Project enquiry</p><p>A few details to start the conversation.</p></div><ContactForm /></div><footer className="wrap footer"><Link className="wordmark" href="/mock-c">R<span>/</span>DEV <small>STUDIO</small></Link><span>Carrickfergus, Northern Ireland</span><a href="#top">Back to top ↑</a></footer></section>
    <div className="mobile-cta"><a href="#contact">Start a project <span>↗</span></a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp <span>↗</span></a></div>
  </main>;
}
