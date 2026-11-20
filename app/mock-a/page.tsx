import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/constants";
import { LocalTime } from "@/components/mock-a/LocalTime";
import { QuoteForm } from "@/components/mock-a/QuoteForm";
import { ScreenArt } from "@/components/mock-a/ScreenArt";
import { WhatsAppIcon } from "@/components/mock-a/Shell";
import {
  MOCK_A_BASE,
  MOCK_A_PROJECTS,
  MOCK_A_QUOTE_HREF,
  MOCK_A_SERVICES,
  MOCK_A_STEPS,
  MOCK_A_WHATSAPP_HREF,
} from "@/components/mock-a/data";
import s from "@/components/mock-a/mockA.module.css";

const MARQUEE = [
  ...MOCK_A_PROJECTS.map((p) => p.name),
  "Websites",
  "Web apps",
  "Google Business Profile",
] as const;

const STUDIO_FACTS = [
  { label: "Based", value: "Carrickfergus, Northern Ireland" },
  { label: "Makes", value: "Websites, web apps, Google Business Profile set-up" },
  { label: "Stack", value: "Next.js, Tailwind, Node.js, Express, MySQL, Supabase, Vercel" },
  { label: "Checks", value: "Every build on a real phone before launch" },
  { label: "You own", value: "The domain, the content and the code" },
] as const;

function Marquee() {
  const group = (hidden: boolean) => (
    <ul className={s.marqueeGroup} aria-hidden={hidden || undefined}>
      {MARQUEE.map((item) => (
        <li key={item} className={s.marqueeItem}>
          {item}
          <span className={s.marqueeStar} aria-hidden="true">
            &#10022;
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={s.marquee}>
      <h2 className="sr-only">Projects and services</h2>
      <div className={s.marqueeTrack}>
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}

export default function MockAHomePage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className={`${s.wrap} ${s.hero}`} aria-labelledby="hero-title">
        <div className={s.statusRow}>
          <p className={`${s.chip} ${s.mono}`} style={{ margin: 0 }}>
            Carrickfergus, NI <span aria-hidden="true">/</span>
            <LocalTime className={s.time} />
            <span className="sr-only">local time</span>
          </p>
          <p className={`${s.chip} ${s.chipLive} ${s.mono}`} style={{ margin: 0 }}>
            <span className={s.pulse} aria-hidden="true" />
            Open to new projects
          </p>
        </div>

        <h1 id="hero-title" className={s.display}>
          <span className={s.displayAccent}>Websites</span> and web apps,{" "}
          <span className={s.displayOutline}>designed</span> and built in NI.
        </h1>

        <div className={s.heroFoot}>
          <p className={s.lede}>
            <strong>RDev Studio</strong> is a small web studio in Carrickfergus. Phone-first
            websites, custom web apps and Google Business Profile help for small businesses and
            charities.
          </p>
          <div className={s.ctaRow}>
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
        </div>
      </section>

      <Marquee />

      {/* ---------- Services ---------- */}
      <section id="services" className={`${s.wrap} ${s.section}`} aria-labelledby="services-title">
        <div className={s.sectionHead} data-reveal>
          <p className={`${s.eyebrow} ${s.mono}`}>What the studio does</p>
          <h2 id="services-title" className={s.h2}>
            Four things, done properly.
          </h2>
          <p className={s.sectionIntro}>
            From a five-page site to a volunteer rota system. Tell the studio what the job is and
            get a written quote back.
          </p>
        </div>
        <ul className={s.services} data-reveal>
          {MOCK_A_SERVICES.map((service) => (
            <li key={service.title} className={s.service}>
              <span className={s.serviceBar} aria-hidden="true" />
              <span className={`${s.serviceNum} ${s.mono}`}>{service.number}</span>
              <h3 className={s.serviceTitle}>{service.title}</h3>
              <p className={s.serviceBody}>{service.body}</p>
              <ul className={s.servicePoints}>
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Work ---------- */}
      <section id="work" className={`${s.workSection} ${s.section}`} aria-labelledby="work-title">
        <div className={s.wrap}>
          <div className={s.sectionHead} data-reveal>
            <p className={`${s.eyebrow} ${s.mono}`}>Latest work</p>
            <h2 id="work-title" className={s.h2}>
              Selected projects.
            </h2>
            <p className={s.sectionIntro}>
              Charity platforms, websites and the studio&apos;s own products. Open one for the details.
            </p>
          </div>

          <div className={`${s.workHeadRow} ${s.mono}`} aria-hidden="true">
            <span>No.</span>
            <span>Project</span>
            <span>Type</span>
            <span>Year</span>
            <span />
          </div>
          <ol className={s.workList}>
            {MOCK_A_PROJECTS.map((project, i) => (
              <li key={project.slug} className={s.workItem} data-reveal>
                <Link href={`${MOCK_A_BASE}/work#${project.slug}`} className={s.workLink}>
                  <span className={`${s.workNum} ${s.mono}`} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={s.workName}>{project.name}</h3>
                  <span className={s.workMeta}>
                    <span className={s.workType}>{project.type}</span>
                    <span className={`${s.workYear} ${s.mono}`}>
                      {project.year ?? <span aria-label="Year to confirm">-</span>}
                    </span>
                  </span>
                  <span className={s.workArrow} aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
                <div className={s.workPreview} aria-hidden="true">
                  <ScreenArt project={project} sizes="420px" showUrl={false} />
                </div>
              </li>
            ))}
          </ol>

          <div className={s.workFoot}>
            <p className={`${s.workNote} ${s.mono}`}>
              {/* TODO(Ryan): remove this line once Rondo, Crosskennan and MGSL hub have copy. */}
              Mock note: Rondo, Crosskennan and MGSL hub need descriptions and years from Ryan.
            </p>
            <Link href={`${MOCK_A_BASE}/work`} className={`${s.btn} ${s.btnInk} ${s.btnLg}`}>
              See all work
              <span className={s.btnArrow} aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Studio ---------- */}
      <section id="studio" className={`${s.wrap} ${s.section}`} aria-labelledby="studio-title">
        <div className={s.about}>
          <div className={s.sectionHead} style={{ marginBottom: 0 }} data-reveal>
            <p className={`${s.eyebrow} ${s.mono}`}>The studio</p>
            <h2 id="studio-title" className={s.aboutStatement}>
              One small studio. The person you talk to is <em>the person who builds it.</em>
            </h2>
          </div>

          <div className={s.aboutCols}>
            <ul className={s.factList} data-reveal>
              {STUDIO_FACTS.map((fact) => (
                <li key={fact.label}>
                  <span className={`${s.factLabel} ${s.mono}`}>{fact.label}</span>
                  <span>{fact.value}</span>
                </li>
              ))}
            </ul>
            <div data-reveal>
              <h3 className={`${s.eyebrow} ${s.mono}`} style={{ marginBottom: "1.25rem" }}>
                How a project runs
              </h3>
              <ol className={s.steps}>
                {MOCK_A_STEPS.map((step) => (
                  <li key={step.number} className={s.step}>
                    <span className={`${s.stepNum} ${s.mono}`} aria-hidden="true">
                      {step.number}
                    </span>
                    <h4 className={s.stepTitle}>{step.title}</h4>
                    <p className={s.stepBody}>{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Contact close ---------- */}
      <section id="quote" className={`${s.close} ${s.section}`} aria-labelledby="quote-title">
        <div className={s.wrap}>
          <p className={`${s.eyebrow} ${s.mono}`}>Contact</p>
          <h2 id="quote-title" className={s.closeDisplay} data-reveal>
            Start a <span className={s.displayAccent}>project.</span>
          </h2>

          <div className={s.closeGrid}>
            <div className={s.formCard}>
              <h3 className={s.formTitle}>Ask for a quote</h3>
              <p className={s.formSub}>A few lines is plenty. The studio replies by email.</p>
              <QuoteForm idPrefix="home" />
            </div>

            <div>
              <div className={s.waCard}>
                <h3 className={s.waTitle}>Rather just message?</h3>
                <p className={s.waBody}>
                  Send a WhatsApp with what you need. A photo of an old site or a voice note is fine.
                </p>
                <a
                  href={MOCK_A_WHATSAPP_HREF}
                  className={`${s.btn} ${s.btnInk} ${s.btnLg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                  Message on WhatsApp
                </a>
              </div>
              <div className={s.otherWays}>
                <p className={s.small}>
                  Or email{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className={s.inlineLink}>
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
