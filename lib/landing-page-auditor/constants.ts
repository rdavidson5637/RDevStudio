export const AUDITOR_LOADING_STEPS = [
  { id: "fetch", label: "Loading landing page" },
  { id: "hero", label: "Scoring hero section" },
  { id: "cta", label: "Analysing calls to action" },
  { id: "copy", label: "Reviewing copywriting" },
  { id: "visual", label: "Evaluating visual hierarchy" },
  { id: "trust", label: "Checking trust signals" },
  { id: "ai", label: "Generating AI recommendations" },
] as const;
