import Link from "next/link";

export default function MockCNotFound() {
  return <main className="wrap mock-not-found"><Link className="wordmark" href="/mock-c">R<span>/</span>DEV <small>STUDIO</small></Link><p className="eyebrow">404 · Page not found</p><h1>That page<br /><em>isn’t here.</em></h1><Link className="button button-dark" href="/mock-c">Return to the studio <span aria-hidden="true">↗</span></Link></main>;
}
