// Maps the backend's priority_tier (1 = best opportunity, 4 = lowest) plus
// review count into a 0-99 opportunity score and a High/Medium/Low label
// for the frontend. This is presentation logic only — the actual ranking
// decision already happened in n8n's Filter and Score node.

const TIER_BASE_SCORE = { 1: 92, 2: 74, 3: 52, 4: 34 };

export function computeOpportunity(tier, reviewCount = 0) {
  const base = TIER_BASE_SCORE[tier] ?? 50;
  // Within a tier, fewer reviews = slightly higher opportunity (smaller / newer business)
  const reviewPenalty = Math.min(Math.round(reviewCount / 40), 15);
  const score = Math.max(5, Math.min(99, base - reviewPenalty));

  let label = "Low";
  if (score >= 75) label = "High";
  else if (score >= 50) label = "Medium";

  return { score, label };
}
