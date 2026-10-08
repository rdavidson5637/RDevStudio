import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function ClosingCta() {
  return (
    <section className="bg-bg py-14 text-studio-text md:py-20">
      <Container>
        <h2 className="display-lg max-w-3xl text-balance text-studio-text">
          Need a site, help with posting, or something that does not fit a package?
        </h2>
        <p className="type-body mt-4 max-w-xl text-studio-muted">
          Send a note and I will come back with next steps.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Button href="/contact">Start a project</Button>
          <Button href="https://wa.me/447378420418" variant="secondary">
            WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  );
}
