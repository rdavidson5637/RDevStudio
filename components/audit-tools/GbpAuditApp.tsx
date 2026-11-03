const CHECKS = [
  {
    title: "Name, address, and phone",
    line: "The listing should match the website. A different phone number or a missing street is what people notice first.",
  },
  {
    title: "Hours",
    line: "Include the days you are shut, and bank holidays. A listing that says open when the door is locked gets bad reviews.",
  },
  {
    title: "Category",
    line: "The primary category should be the thing you actually sell. Add a second category only if you really do that work.",
  },
  {
    title: "Photos",
    line: "The outside, the inside, and the work. A logo on its own is not enough.",
  },
  {
    title: "Reviews",
    line: "Reply to the recent ones in your own words. Say what the person booked, not a stock thank-you.",
  },
  {
    title: "Posts",
    line: "If nothing has gone up in a month, the listing looks unattended.",
  },
] as const;

export function GbpAuditApp() {
  return (
    <div>
      <p className="font-studio-sans text-sm text-studio-muted">Local listings</p>
      <h1 className="mt-3 font-studio-display text-4xl text-studio-text md:text-5xl">Google Business Profile</h1>
      <p className="type-body mt-5 max-w-prose text-studio-muted">
        I cannot see your Google listing from a website address, so this page does not invent a score. This is the list I use when I check one with you.
      </p>
      <ol className="mt-10 border-t border-studio-line">
        {CHECKS.map((check, index) => (
          <li key={check.title} className="border-b border-studio-line py-6">
            <p className="font-studio-display text-2xl text-studio-text">
              {index + 1}. {check.title}
            </p>
            <p className="type-body mt-2 max-w-prose text-studio-muted">{check.line}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
