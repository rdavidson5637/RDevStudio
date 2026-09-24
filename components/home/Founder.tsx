import Image from "next/image";
import Link from "next/link";
import { REPLY_PROMISE } from "@/lib/constants";

/** One person is the whole offer, so show him. */
export function Founder() {
  return (
    <section className="section-padding border-t border-border bg-base">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-[220px,1fr] lg:grid-cols-[260px,1fr] lg:gap-16">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[220px] overflow-hidden rounded-[10px] border border-border bg-raised md:max-w-none">
            <Image
              src="/images/ryan-davidson.jpg"
              alt="Ryan Davidson, who runs RDev Studio"
              fill
              sizes="(max-width: 768px) 220px, 260px"
              className="object-cover object-center"
            />
          </div>

          <div className="max-w-2xl">
            <p className="section-label">The manager</p>
            <h2 className="section-heading mb-6">One person. The whole job.</h2>
            <div className="space-y-4 text-base leading-relaxed text-primary sm:text-lg">
              <p>
                I&apos;m Ryan. I design the site, build it, launch it, and
                I&apos;m the one who answers when you message. No account
                manager, no handoffs, nobody new to explain your business to.
              </p>
              <p>
                MSc in Software Development from Queen&apos;s, with
                Commendation. Based in Carrickfergus, working with businesses
                and charities across Northern Ireland. {REPLY_PROMISE}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/about" className="btn-secondary">
                More about me
              </Link>
              <Link href="/contact" className="link-editorial text-sm">
                Tell me what you need
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
