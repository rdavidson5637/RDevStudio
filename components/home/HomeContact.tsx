import Link from "next/link";
import { REPLY_PROMISE } from "@/lib/constants";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";

export function HomeContact() {
  return (
    <section className="section-padding border-t border-border bg-base">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <p className="shell-label mb-3 text-accent">Full time</p>
        <div className="flex flex-col gap-6 border-t border-border pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="text-base leading-relaxed text-primary sm:text-lg">
              Need a site, help with posting, or something that does not fit a
              package? Send a note or a WhatsApp. {REPLY_PROMISE}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/contact" className="btn-primary">
              Start a project
            </Link>
            <WhatsAppLink />
          </div>
        </div>
      </div>
    </section>
  );
}
