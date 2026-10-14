import { FAQStructuredData } from "@/components/FAQStructuredData";
import { FAQ_ITEMS } from "@/lib/constants";

export function FAQ() {
  return (
    <section>
      <FAQStructuredData items={FAQ_ITEMS} />
      <h2 className="font-studio-display text-3xl text-studio-text">Questions</h2>
      <div className="mt-8 border-t border-studio-line">
        {FAQ_ITEMS.map((item) => (
          <details key={item.question} className="border-b border-studio-line">
            <summary className="flex min-h-14 cursor-pointer list-none items-center py-4 text-left font-studio-sans text-lg text-studio-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-studio-text [&::-webkit-details-marker]:hidden">
              {item.question}
            </summary>
            <p className="type-body max-w-prose pb-5 text-studio-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
