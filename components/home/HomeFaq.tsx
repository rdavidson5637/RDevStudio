import { Section } from "@/components/ui/Section";
import {
  PRICE_CARE_PLAN_GBP,
  PRICE_CONTENT_GBP,
  PRICE_SOCIAL_GBP,
  PRICE_WEBSITE_GBP,
  WHATSAPP_URL,
} from "@/lib/constants";

const FAQ = [
  {
    question: "How much does a website cost?",
    answer: `Websites start at £${PRICE_WEBSITE_GBP}, one-off. Social media starts at £${PRICE_SOCIAL_GBP} a month and content at £${PRICE_CONTENT_GBP} a project. You get the quote in writing before anything starts.`,
  },
  {
    question: "How do payments work?",
    answer: "50% upfront and 50% at launch.",
  },
  {
    question: "Who owns the site?",
    answer: "You do. The domain, the content and the code are yours outright.",
  },
  {
    question: "What happens after launch?",
    answer:
      `You can look after it yourself, or take the optional £${PRICE_CARE_PLAN_GBP} a month care plan: hosting, security updates and small changes.`,
  },
  {
    question: "Do charities pay?",
    answer: "Registered charities get the packages free. Say you are registered when you get in touch.",
  },
  {
    question: "Who will I be dealing with?",
    answer: "Me, Ryan, from first message to launch.",
  },
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export function HomeFaq() {
  return (
    <Section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <h2 className="display-lg text-balance text-studio-text">Questions people ask</h2>
          <a
            href={WHATSAPP_URL}
            className="inline-flex min-h-11 items-center text-sm text-studio-text underline decoration-studio-line-strong underline-offset-4 hover:text-studio-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            Still stuck? WhatsApp me
          </a>
        </div>
        <div className="border-t border-studio-line">
          {FAQ.map((item) => (
            <details key={item.question} className="group border-b border-studio-line">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-studio-sans text-lg text-studio-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="faq-plus inline-flex h-5 w-5 shrink-0 items-center justify-center text-studio-muted" aria-hidden="true">
                  <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M10 4v12M4 10h12" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <div className="faq-panel">
                <div className="overflow-hidden">
                  <p className="type-body max-w-2xl pb-5 text-studio-muted">{item.answer}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
