import type { LandingPageAuditResult } from "@/types/landing-page-auditor";
import { getHostname } from "@/lib/toolkit-audit/utils";

export function getPlaceholderAuditResult(url: string): LandingPageAuditResult {
  const host = getHostname(url);

  const sections: LandingPageAuditResult["sections"] = [
    {
      id: "cta",
      title: "CTA Analysis",
      score: 72,
      summary:
        "Primary CTA is visible above the fold, but secondary actions compete for attention.",
      highlights: [
        "Main button uses strong contrast against the hero",
        "Action label is verb-led and specific",
      ],
      issues: [
        "Two buttons share similar visual weight",
        "Mobile CTA sits below a long hero scroll",
      ],
    },
    {
      id: "copywriting",
      title: "Copywriting",
      score: 81,
      summary: `Messaging on ${host} is clear about what you offer, with room to sharpen the value proposition.`,
      highlights: [
        "Headline communicates the core offer",
        "Benefits are written in plain language",
        "Tone feels consistent across sections",
      ],
      issues: [
        "Subhead repeats the headline without adding detail",
        "Feature bullets lean on jargon",
        "Social proof line is buried mid-page",
      ],
    },
    {
      id: "colour",
      title: "Colour Analysis",
      score: 76,
      summary:
        "Palette feels on-brand, though accent colour usage could guide the eye more deliberately.",
      highlights: [
        "Brand colours used consistently in buttons",
        "Background contrast keeps text readable",
      ],
      issues: [
        "Accent colour appears on non-interactive elements",
        "Secondary sections introduce a third highlight colour",
      ],
    },
    {
      id: "trust",
      title: "Trust Signals",
      score: 68,
      summary:
        "Some credibility markers are present, but testimonials and logos could be surfaced earlier.",
      highlights: [
        "Contact details are easy to find",
        "Privacy policy link is in the footer",
      ],
      issues: [
        "No client logos above the fold",
        "Testimonials lack names or roles",
        "Security or guarantee badges are missing",
      ],
    },
    {
      id: "hierarchy",
      title: "Visual Hierarchy",
      score: 74,
      summary:
        "Layout guides the eye reasonably well, but dense mid-page sections flatten the scan path.",
      highlights: [
        "Hero headline is the largest element on the page",
        "Section headings create clear breaks",
      ],
      issues: [
        "Three-column feature grid has equal visual weight",
        "Important stats lack emphasis",
        "Footer competes with the final CTA block",
      ],
    },
    {
      id: "accessibility",
      title: "Accessibility",
      score: 70,
      summary:
        "Basics are covered, but form labels and focus states need polish for keyboard users.",
      highlights: [
        "Page has a lang attribute",
        "Images in the hero include alt text",
      ],
      issues: [
        "Muted text fails contrast on overlay backgrounds",
        "Icon-only controls lack accessible names",
      ],
    },
    {
      id: "ux",
      title: "UX",
      score: 77,
      summary:
        "Flow from landing to enquiry is straightforward, with minor friction on mobile navigation.",
      highlights: [
        "Single primary goal per screen section",
        "Form fields are grouped logically",
      ],
      issues: [
        "Sticky header covers focused inputs on small screens",
        "No confirmation state after CTA click",
      ],
    },
  ];

  const average = Math.round(
    [85, ...sections.map((s) => s.score)].reduce((a, b) => a + b, 0) /
      (sections.length + 1),
  );

  return {
    url,
    scannedAt: new Date().toISOString(),
    hero: {
      id: "hero",
      title: "Hero Score",
      score: 85,
      summary: `The hero on ${host} makes a strong first impression — clear headline, relevant imagery, and a visible CTA.`,
      highlights: [
        "Value proposition visible within 3 seconds",
        "Hero image supports the offer",
        "Headline length works on mobile",
      ],
      issues: [
        "Subhead could clarify who the page is for",
        "Hero image file size may slow first paint",
      ],
    },
    sections,
    recommendations: [
      "Move one testimonial or client logo into the hero or immediately below it.",
      "Demote secondary CTAs to text links so the primary action stands out.",
      "Rewrite the subhead to answer “who is this for?” in one short line.",
      "Compress hero imagery and serve a smaller asset on mobile.",
      "Add aria-labels to icon-only navigation and social buttons.",
      "Introduce a single contrasting stat or proof point between hero and features.",
    ],
  };
}
