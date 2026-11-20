import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/constants";

export const metadata = { title: "Services — RDev Studio", robots: { index: false, follow: false } };
const services = [
  ["01", "Websites", "Clear, phone-first websites that explain what you do and make it easy for people to get in touch."],
  ["02", "Web apps", "Purpose-built digital products for a particular need, from internal tools to public platforms."],
  ["03", "Google Business Profile help", "Practical support to set up or improve a local business profile and make its information easier to find."],
  ["04", "Charity & small-business builds", "Considered digital work for small businesses and charities, shaped around the organisation and its audience."],
];

function Actions() { return <div className="service-actions"><Link className="button button-dark" href="/mock-c/contact">Start a project <span aria-hidden="true">↗</span></Link><a className="text-link" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Message on WhatsApp <span aria-hidden="true">↗</span></a></div>; }

export default function MockCServices() {
  return <main className="wrap mock-subpage"><header className="topbar"><Link className="wordmark" href="/mock-c">R<span>/</span>DEV <small>STUDIO</small></Link><nav aria-label="Main navigation"><Link href="/mock-c">Home</Link><Link href="/mock-c/work">Work</Link><Link href="/mock-c/contact">Contact</Link></nav></header>
    <section className="subpage-heading"><p className="eyebrow">What we do · 01—04</p><h1>Digital work,<br /><em>made useful.</em></h1><p>RDev Studio designs and builds for small businesses and charities, with a focus on clear, useful experiences.</p><Actions /></section>
    <div className="services-page-list">{services.map(([number, title, description]) => <article className="service-detail" key={number}><span className="row-number">{number}</span><div><h2>{title}</h2><p>{description}</p><Actions /></div></article>)}</div>
    <footer className="footer subpage-footer"><Link className="wordmark" href="/mock-c">R<span>/</span>DEV <small>STUDIO</small></Link><Link href="/mock-c/contact">Start a project ↗</Link></footer>
  </main>;
}
