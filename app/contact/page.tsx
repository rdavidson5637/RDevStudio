import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { WhatsAppContactOption } from "@/components/contact/WhatsAppContactOption";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Get in touch with RDev Studio for a free quote on your business website. Based in Carrickfergus, serving businesses across Northern Ireland.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="section-padding pt-28">
      <div className="container-narrow">
        <PageHeader
          title="Let's Talk"
          subtitle="Based in Carrickfergus — serving businesses across Northern Ireland"
        />
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
            <WhatsAppContactOption className="mt-10" />
          </div>
          <div className="lg:col-span-2">
            <ContactDetails />
          </div>
        </div>
      </div>
    </div>
  );
}
