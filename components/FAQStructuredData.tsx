import { FAQ_ITEMS } from "@/lib/constants";

type FAQItem = {
  readonly question: string;
  readonly answer: string;
};

type FAQStructuredDataProps = {
  items?: readonly FAQItem[];
};

export function FAQStructuredData({ items = FAQ_ITEMS }: FAQStructuredDataProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
