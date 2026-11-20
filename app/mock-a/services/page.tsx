import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/mock-a/Shell";
import {
  MOCK_A_SERVICES,
  MOCK_A_WHATSAPP_HREF,
  mockAQuoteHrefFor,
} from "@/components/mock-a/data";
import s from "@/components/mock-a/mockA.module.css";

export const metadata: Metadata = {
  title: { absolute: "Services | Mock A | RDev Studio" },
  robots: { index: false, follow: false },
};

export default function MockAServicesPage() {
  return (
    <>
      <section className={`${s.wrap} ${s.pageHero}`} aria-labelledby="services-page-title">
        <p className={`${s.eyebrow} ${s.mono}`}>Services</p>
        <h1 id="services-page-title" className={s.display} style={{ marginTop: "1rem" }}>
          Four things, <span className={s.displayOutline}>done</span>{" "}
          <span className={s.displayAccent}>properly.</span>
        </h1>
        <p className={s.lede} style={{ marginTop: "1.5rem" }}>
          Websites, web apps, Google Business Profile help, and builds for charities and small
          businesses. Every job starts with a written quote for that job, with scope and timeline
          agreed before anything is built.
        </p>
        <nav aria-label="Jump to a service">
          <ul className={s.filters}>
            {MOCK_A_SERVICES.map((service) => (
              <li key={service.slug}>
                <a href={`#${service.slug}`}>{service.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <div className={s.wrap}>
        {MOCK_A_SERVICES.map((service) => (
          <article
            key={service.slug}
            id={service.slug}
            className={s.svc}
            aria-labelledby={`${service.slug}-title`}
          >
            <div className={s.svcHead} data-reveal>
              <span className={`${s.svcNum} ${s.mono}`} aria-hidden="true">
                {service.number}
              </span>
              <h2 id={`${service.slug}-title`} className={s.svcTitle}>
                {service.title}
              </h2>
              <p className={s.svcLede}>{service.detail.lede}</p>
            </div>

            <div className={s.svcBody} data-reveal>
              <div className={s.svcCols}>
                <div>
                  <h3 className={`${s.svcLabel} ${s.mono}`}>What you get</h3>
                  <ul className={s.svcList} data-reveal-stagger>
                    {service.detail.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className={`${s.svcLabel} ${s.mono}`}>Good for</h3>
                  <ul className={s.svcList} data-reveal-stagger>
                    {service.detail.goodFor.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {service.detail.proof ? (
                    <p className={s.svcProof}>
                      <span className={s.mono}>See it: </span>
                      <Link href={service.detail.proof.href} className={s.inlineLink}>
                        {service.detail.proof.label}
                      </Link>
                    </p>
                  ) : null}
                </div>
              </div>

              {service.detail.todo ? (
                <p className={`${s.panelTodo} ${s.mono}`}>Mock note: {service.detail.todo}</p>
              ) : null}

              <div className={s.svcCtas}>
                <Link
                  href={mockAQuoteHrefFor(service.enquiry)}
                  className={`${s.btn} ${s.btnLime} ${s.btnLg}`}
                >
                  Get a quote
                  <span className="sr-only"> for {service.title.toLowerCase()}</span>
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
                  <span className="sr-only"> about {service.title.toLowerCase()} (opens in a new tab)</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
