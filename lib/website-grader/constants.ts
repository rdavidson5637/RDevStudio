export const GRADER_LOADING_STEPS = [
  { id: "fetch", label: "Fetching page" },
  { id: "seo", label: "Checking SEO" },
  { id: "a11y", label: "Testing accessibility" },
  { id: "perf", label: "Measuring performance" },
  { id: "security", label: "Scanning security" },
  { id: "practices", label: "Reviewing best practices" },
] as const;
