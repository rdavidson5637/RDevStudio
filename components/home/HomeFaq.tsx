import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const FAQ = [
  {
    question: "How much does a website cost?",
    answer:
      "Websites start at £650, one-off. Social media starts at £150 a month and content at £200 a project. You get the quote in writing before anything starts.",
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
      "You can look after it yourself, or take the optional £30 a month care plan: hosting, security updates and small changes.",
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
    <section className="bg-bg py-14 text-studio-text md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Container>
        <SectionHeader tone="studio" label="Questions" heading="The usual ones." />
        <div className="mt-10 border-t border-studio-border">
          {FAQ.map((item) => (
            <details key={item.question} className="group border-b border-studio-border">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left type-h3 text-studio-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="type-label text-studio-muted" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="type-body max-w-2xl pb-5 text-studio-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
