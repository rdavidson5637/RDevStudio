import { Section } from "@/components/ui/Section";
import { CONTACT_EMAIL } from "@/lib/constants";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy",
  description:
    "What RDev Studio does with contact messages, page counts, and what the games keep. Ryan Davidson, Carrickfergus.",
  path: "/privacy",
});

const SECTIONS = [
  {
    title: "Messages",
    paragraphs: [
      "The contact form posts your name, email, the type of enquiry and the message to Formspree. Formspree emails that to me at ryan@rdevstudio.co.uk. I use it to reply. I do not sell it or pass it on for marketing.",
      "Bug reports on Champions Draft and Rugby Draft go to the same place. They include what you wrote, an email if you added one, the page address, which game it was, and the browser details the page can see.",
      "Some of the tools ask for an email after a check, with the tool name and a short note on what you ran. That email comes to me the same way. I reply with the breakdown. Nothing is sent to you automatically.",
    ],
  },
  {
    title: "Page counts",
    paragraphs: [
      "Vercel Web Analytics counts page views. It does not set a cookie and it does not follow you onto other sites. Visits from automated browsers are dropped before they are counted.",
    ],
  },
  {
    title: "Games and tools",
    paragraphs: [
      "Pub Quiz asks for a display name. That name, the answers, the score and any chat stay with the game. The game is kept in memory on the server and, when Redis is configured, in Upstash for four hours. Live updates go through Pusher. There is no account.",
      "Draft Analyser reads public Fantasy Premier League figures stored in Supabase so the tables can load. It does not ask you to sign in.",
      "Champions Draft and Rugby Draft run in the browser for that visit. They do not ask for an account.",
    ],
  },
  {
    title: "What stays on this device",
    paragraphs: [
      "Longest Word keeps today's attempt in this browser. Wardrobe AI keeps a shortlist of items in this browser. The tools remember which ones you have opened or marked, also in this browser. None of that is sent to me. Clearing this site's data in the browser removes it.",
    ],
  },
  {
    title: "Asking for something to be deleted",
    paragraphs: [
      `Email ${CONTACT_EMAIL} and say what you want removed. I will delete the message I hold. Formspree and Upstash keep their own copies for as long as their services do, and I can ask them to remove a message when you write.`,
    ],
  },
] as const;

export default function PrivacyPage() {
  return (
    <div className="bg-studio-bg text-studio-text">
      <Section>
        <h1 className="display-lg max-w-[14ch] text-balance">How I use what you send</h1>
        <p className="type-body mt-5 max-w-prose text-studio-muted">
          RDev Studio is Ryan Davidson, in Carrickfergus. This page matches what the site does today. The site does not set its own cookies, so there is no cookie banner.
        </p>
        <div className="mt-12 max-w-prose border-t border-studio-line">
          {SECTIONS.map((section) => (
            <section key={section.title} className="border-b border-studio-line py-8">
              <h2 className="type-h2 text-studio-text">{section.title}</h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="type-body text-studio-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Section>
    </div>
  );
}
