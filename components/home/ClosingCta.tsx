import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WHATSAPP_URL } from "@/lib/constants";

export function ClosingCta() {
  return (
    <section className="bg-bg py-20 text-studio-text md:py-28">
      <Container>
        <h2 className="display-lg max-w-3xl text-balance text-studio-text">
          Tell me what you need
        </h2>
        <p className="type-body mt-4 max-w-xl text-studio-muted">
          Send a note and I will come back with next steps.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Button href="/contact">Start a project</Button>
          <Button href={WHATSAPP_URL} variant="secondary">
            WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  );
}
