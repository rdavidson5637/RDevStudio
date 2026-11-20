import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { WHATSAPP_URL } from "@/lib/constants";

export const metadata = { title: "Start a project — RDev Studio", robots: { index: false, follow: false } };

export default function MockCContact() {
  return <main className="wrap mock-subpage">
    <header className="topbar"><Link className="wordmark" href="/mock-c">R<span>/</span>DEV <small>STUDIO</small></Link><nav aria-label="Main navigation"><Link href="/mock-c">Home</Link><Link href="/mock-c/services">Services</Link><Link href="/mock-c/work">Work</Link></nav></header>
    <section className="subpage-heading"><p className="eyebrow">Project enquiry · Carrickfergus, NI</p><h1>Start a<br /><em>project.</em></h1><p>Share a little about what you have in mind. We’ll use your details to respond to this enquiry.</p></section>
    <section className="contact-page-form" aria-labelledby="quote-title"><div><p className="eyebrow">A good place to begin</p><h2 id="quote-title">Tell us about it.</h2><p>Prefer a quick conversation? Message RDev Studio on WhatsApp.</p><a className="button button-dark" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Message on WhatsApp <span aria-hidden="true">↗</span></a></div><ContactForm /></section>
    <footer className="footer subpage-footer"><Link className="wordmark" href="/mock-c">R<span>/</span>DEV <small>STUDIO</small></Link><Link href="/mock-c">Back to the studio ↑</Link></footer>
  </main>;
}
