import { normalizeResponse } from "./normalize.js";

// The n8n production URL lives only in your local .env (VITE_N8N_WEBHOOK_URL)
// or in your hosting provider's environment variables — never in this file,
// so it's safe to push this repo to a public GitHub.
const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

export class LeadSearchError extends Error {}

export async function fetchLeads(formValues, { signal } = {}) {
  if (!WEBHOOK_URL) {
    throw new LeadSearchError(
      "No n8n webhook URL configured. Set VITE_N8N_WEBHOOK_URL in your .env file."
    );
  }

  const body = {
    country: formValues.country,
    city: formValues.city,
    keyword: formValues.keyword,
    websiteFilter: formValues.websiteFilter,
    minRating: formValues.minRating,
    maxReviewCount: formValues.maxReviewCount,
  };

  let res;
  try {
    res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal,
    });
  } catch (err) {
    if (err.name === "AbortError") throw err;
    throw new LeadSearchError(
      "Could not reach the search backend. Check your connection and the webhook URL."
    );
  }

  if (!res.ok) {
    throw new LeadSearchError(
      `Search failed (status ${res.status}). Please try again in a moment.`
    );
  }

  let payload;
  try {
    payload = await res.json();
  } catch {
    throw new LeadSearchError("The backend returned an unexpected response.");
  }

  // Temporary but harmless debug aid — open DevTools (F12) → Console to see
  // exactly what your n8n workflow sent back. Safe to remove once things
  // are working end-to-end.
  console.log("Raw response from n8n webhook:", payload);

  return normalizeResponse(payload);
}
