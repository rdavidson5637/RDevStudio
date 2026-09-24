import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy",
  description:
    "What rdevstudio.co.uk collects, why, who processes it, and how to get it deleted. Short and plain.",
  path: "/privacy",
});

const SECTIONS = [
  {
    title: "Who I am",
    body: [
      "RDev Studio is run by me, Ryan Davidson, in Carrickfergus, Northern Ireland. I decide what happens to the details you send through this site, so for UK data protection law I am the controller. Questions about any of this go to " +
        CONTACT_EMAIL +
        ".",
    ],
  },
  {
    title: "What I collect, and why",
    body: [
      "Contact form: your name, email, what the enquiry is about, and your message. I use them to reply and, if we work together, to run the job. The lawful basis is that you asked me to get back to you.",
      "Free tool reports: if you ask for a follow-up from one of the toolkit tools, I get your email, the tool you used and what you checked (for example the site address), so I can reply. Same basis.",
      "Game bug reports: whatever you type into the report box, so I can fix the bug.",
      "WhatsApp and email: if you message me directly, I get what you send. WhatsApp and your email provider have their own privacy terms.",
    ],
  },
  {
    title: "Who else handles it",
    body: [
      "Formspree receives the contact, tool and bug report forms and forwards them to my inbox. Formspree is based in the US and processes the data under its own data protection terms.",
      "Vercel hosts the site. Vercel Analytics counts page views without cookies and without identifying you.",
      "The Pub Quiz keeps a game's state, including the nicknames and answers in it, for up to four hours so the game works, then it is deleted automatically.",
      "I do not sell your details, and I do not add you to a mailing list.",
    ],
  },
  {
    title: "Stored in your browser",
    body: [
      "Some tools and games save things on your own device so they are still there next time: favourite tools, a Wardrobe AI shortlist, your Longest Word progress, and your Pub Quiz session. This stays in your browser. Clear your site data and it is gone.",
      "The site does not use advertising or tracking cookies.",
    ],
  },
  {
    title: "How long I keep it",
    body: [
      "Enquiries that do not turn into work are deleted within 12 months. If we work together, I keep project emails and invoices for as long as the law requires for tax records.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "You can ask to see what I hold about you, have it corrected, or have it deleted. Email " +
        CONTACT_EMAIL +
        " and I will sort it within a month. If you are not happy with how I have handled your data, you can complain to the Information Commissioner's Office at ico.org.uk.",
    ],
  },
] as const;

export default function PrivacyPage() {
  return (
    <div className="section-padding pt-28">
      <article className="container-wide px-6">
        <header className="border-b border-border pb-10">
          <p className="shell-label mb-3 text-accent">The small print</p>
          <h1 className="programme-h1">PRIVACY</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-primary sm:text-lg">
            What this site collects, why, and who else sees it. Last updated
            September 2026.
          </p>
        </header>

        <div className="max-w-3xl divide-y divide-border">
          {SECTIONS.map((section) => (
            <section key={section.title} className="py-8">
              <h2 className="mb-4 text-xl font-semibold text-primary">
                {section.title}
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-primary">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-6 text-sm text-secondary">
          Back to <Link href="/contact" className="underline underline-offset-4 hover:text-accent">contact</Link>.
        </p>
      </article>
    </div>
  );
}
