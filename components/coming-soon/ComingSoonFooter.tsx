import { ComingSoonFadeIn } from "@/components/coming-soon/ComingSoonFadeIn";
import { ComingSoonNewsletterForm } from "@/components/coming-soon/ComingSoonNewsletterForm";

export function ComingSoonFooter() {
  return (
    <section id="footer" className="px-6 pb-8 pt-16">
      <div className="mx-auto w-full max-w-[1200px]">
        <ComingSoonFadeIn y={20} duration={0.6}>
          <div className="mx-auto max-w-[640px] rounded-2xl border border-[#1F1F2E] bg-[#111118] px-8 py-12 text-center">
            <h2 className="text-[1.75rem] font-bold text-[#F9FAFB]">
              Get Early Access
            </h2>
            <p className="mt-2 text-base text-[#9CA3AF]">
              Get early access to new tools before they launch.
            </p>
            <ComingSoonNewsletterForm />
          </div>
        </ComingSoonFadeIn>

        <footer className="py-8 text-center">
          <p className="text-sm text-[#9CA3AF]">Built by RDev Studio</p>
          <a
            href="https://rdevstudio.co.uk"
            className="mt-2 inline-block text-sm text-[#9CA3AF] transition-colors hover:text-[#F59E0B]"
          >
            rdevstudio.co.uk
          </a>
        </footer>
      </div>
    </section>
  );
}
