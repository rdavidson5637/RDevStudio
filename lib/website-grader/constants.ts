export const GRADER_LOADING_STEPS = [
  { id: "fetch", label: "Fetching page" },
  { id: "seo", label: "Checking SEO" },
  { id: "a11y", label: "Checking language and alt text" },
  { id: "perf", label: "Timing the server response" },
  { id: "security", label: "Checking HTTPS and headers" },
  { id: "practices", label: "Reviewing best practices" },
] as const;
