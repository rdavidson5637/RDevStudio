import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { DirectContactOptions } from "@/components/contact/DirectContactOptions";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Get in touch with Ryan Davidson — questions, collaborations, or just saying hello.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-narrow">
        <PageHeader
          title="Say hello"
          subtitle="Questions, ideas, or collaboration — I reply to most messages within a day."
        />
        <p className="editorial-note -mt-8 mb-12 max-w-2xl text-center sm:mx-auto">
          Taking on freelance website and web app work. If something in my
          portfolio resonated, I&apos;d love to hear what you&apos;re building.
        </p>
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <DirectContactOptions />
            <ContactForm />
          </div>
          <div className="lg:col-span-2">
            <ContactDetails />
          </div>
        </div>
      </div>
    </div>
  );
}
