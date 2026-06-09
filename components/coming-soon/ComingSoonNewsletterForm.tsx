"use client";

import { FormEvent, useState } from "react";

export function ComingSoonNewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="text-center text-[#F9FAFB]" role="status">
        You&apos;re on the list. We&apos;ll be in touch.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 flex w-full flex-col gap-3 min-[480px]:flex-row"
    >
      <label htmlFor="coming-soon-email" className="sr-only">
        Email address
      </label>
      <input
        id="coming-soon-email"
        type="email"
        name="email"
        required
        placeholder="your@email.com"
        className="w-full flex-grow rounded-lg border border-[#1F1F2E] bg-[#0A0A0F] px-4 py-3 text-[0.9rem] text-[#F9FAFB] outline-none transition-colors placeholder:text-[#6B7280] focus:border-[#F59E0B] min-[480px]:min-w-0"
      />
      <button
        type="submit"
        className="shrink-0 cursor-pointer rounded-lg border-none bg-[#F59E0B] px-6 py-3 text-sm font-semibold whitespace-nowrap text-[#0A0A0F] transition-colors hover:bg-[#D97706]"
      >
        Join Waitlist
      </button>
    </form>
  );
}
