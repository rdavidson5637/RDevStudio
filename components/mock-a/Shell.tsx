import Link from "next/link";
import { MobileMenu } from "@/components/mock-a/MobileMenu";
import { CONTACT_EMAIL, GITHUB_URL } from "@/lib/constants";
import { MOCK_A_BASE, MOCK_A_QUOTE_HREF, MOCK_A_WHATSAPP_HREF } from "@/components/mock-a/data";
import s from "@/components/mock-a/mockA.module.css";

const NAV = [
  { href: `${MOCK_A_BASE}/work`, label: "Work" },
  { href: `${MOCK_A_BASE}/services`, label: "Services" },
  { href: `${MOCK_A_BASE}#studio`, label: "Studio" },
  { href: MOCK_A_QUOTE_HREF, label: "Contact" },
] as const;

export function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-8.66 15.02L2 22l5.1-1.32A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.03.78.81-2.95-.2-.31A8.2 8.2 0 1 1 12 20.2Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.04 4.76 4.76 0 0 0 1 2.53 10.9 10.9 0 0 0 4.18 3.69c1.55.67 2.16.73 2.94.61.47-.07 1.46-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.28Z"
      />
    </svg>
  );
}

export function MockHeader() {
  return (
    <>
      <p className={`${s.banner} ${s.mono}`}>Mock A preview. Not the live site.</p>
      <header className={s.header}>
        <div className={`${s.wrap} ${s.headerInner}`}>
          <Link href={MOCK_A_BASE} className={s.wordmark} aria-label="RDev Studio, mock A home">
            <span className={s.wordmarkDot} aria-hidden="true" />
            RDev Studio
          </Link>
          <nav className={s.nav} aria-label="Main">
            <ul className={s.navList}>
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={s.navLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={s.headerCtas}>
            <a
              href={MOCK_A_WHATSAPP_HREF}
              className={`${s.btn} ${s.btnGhost} ${s.btnSm} ${s.hideSmall}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
            <Link href={MOCK_A_QUOTE_HREF} className={`${s.btn} ${s.btnLime} ${s.btnSm}`}>
              Get a quote
            </Link>
            <MobileMenu items={NAV} />
          </div>
        </div>
        <div className={s.progress} aria-hidden="true" />
      </header>
    </>
  );
}

/** Fixed bottom bar on phones so both main actions are always one tap away. */
export function MockActionBar() {
  return (
    <nav className={s.actionBar} aria-label="Quick contact">
      <Link href={MOCK_A_QUOTE_HREF} className={`${s.btn} ${s.btnLime}`}>
        Get a quote
      </Link>
      <a href={MOCK_A_WHATSAPP_HREF} className={`${s.btn} ${s.btnBlue}`} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon />
        WhatsApp
      </a>
    </nav>
  );
}

export function MockFooter() {
  return (
    <footer className={s.footer}>
      <div className={`${s.wrap} ${s.footerInner}`}>
        <p className={s.small}>
          RDev Studio. Carrickfergus, Northern Ireland.
          <br />
          <span className={s.mono}>Mock A. Agent-built for comparison. Not indexed.</span>
        </p>
        <ul className={s.footerLinks}>
          <li>
            <Link href={`${MOCK_A_BASE}/work`}>Work</Link>
          </li>
          <li>
            <Link href={`${MOCK_A_BASE}/services`}>Services</Link>
          </li>
          <li>
            <Link href={MOCK_A_QUOTE_HREF}>Get a quote</Link>
          </li>
          <li>
            <a href={`mailto:${CONTACT_EMAIL}`}>Email</a>
          </li>
          <li>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <Link href="/privacy">Privacy</Link>
          </li>
          <li>
            <Link href="/">Live site</Link>
          </li>
        </ul>
      </div>
      <div className={s.wrap} aria-hidden="true">
        <p className={s.footerGiant}>RDev Studio</p>
      </div>
    </footer>
  );
}
