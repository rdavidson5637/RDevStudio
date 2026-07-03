"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/constants";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mt-20">
      <h2 className="mb-8 text-center heading-display text-2xl sm:text-3xl">
        Frequently asked questions
      </h2>
      <div className="mx-auto max-w-2xl space-y-3">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;
          const buttonId = `faq-button-${index}`;

          return (
            <div
              key={item.question}
              className="overflow-hidden border border-border bg-raised"
            >
              <button
                id={buttonId}
                type="button"
                className="flex w-full min-h-[3.5rem] items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-overlay active:bg-overlay sm:px-6 sm:py-5"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="pr-2 font-semibold text-primary">
                  {item.question}
                </span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center border border-border-accent text-accent transition-transform duration-normal ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="grid transition-[grid-template-rows] duration-normal ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 leading-relaxed text-secondary sm:px-6 sm:pb-6">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
