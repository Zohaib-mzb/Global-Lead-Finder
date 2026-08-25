import { computeOpportunity } from "./scoring.js";

// Treat the backend's literal "Not found" / "Not listed" strings as empty.
function cleanValue(value) {
  if (!value) return null;
  const trimmed = String(value).trim();
  if (!trimmed) return null;
  if (/^not found$/i.test(trimmed)) return null;
  if (/^not listed$/i.test(trimmed)) return null;
  return trimmed;
}

// Accepts one raw business record as returned by the n8n workflow
// (place_id, name, address, phone, website, has_website, rating,
// review_count, google_maps_url, business_status, category,
// priority_tier, owner_name, email, instagram, facebook, linkedin,
// additional_notes) and returns the shape the UI actually renders.
export function normalizeBusiness(raw, index) {
  const reviews = Number(raw.review_count ?? raw.reviews ?? 0) || 0;
  const rating = Number(raw.rating ?? 0) || 0;
  const tier = raw.priority_tier ?? raw.priorityTier ?? 4;
  const { score, label } = computeOpportunity(tier, reviews);

  return {
    id: raw.place_id || raw.id || `lead-${index}`,
    name: raw.name || "Unknown business",
    address: cleanValue(raw.address) || "Address not available",
    phone: cleanValue(raw.phone),
    website: cleanValue(raw.website),
    hasWebsite: Boolean(raw.has_website ?? raw.website),
    rating,
    reviews,
    priorityTier: tier,
    opportunityScore: score,
    priority: label,
    ownerName: cleanValue(raw.owner_name),
    email: cleanValue(raw.email),
    note: cleanValue(raw.additional_notes) || "",
    category: cleanValue(raw.category),
    businessStatus: cleanValue(raw.business_status),
    googleMapsUrl: cleanValue(raw.google_maps_url),
    socials: {
      instagram: cleanValue(raw.instagram),
      facebook: cleanValue(raw.facebook),
      linkedin: cleanValue(raw.linkedin),
    },
  };
}

export function normalizeResponse(payload) {
  const list = Array.isArray(payload)
    ? payload
    : payload?.businesses ||
      payload?.enriched_businesses ||
      payload?.data?.businesses ||
      [];

  // Never let one malformed record crash the whole results page — skip it
  // and keep going, instead of throwing during render.
  return list
    .filter(Boolean)
    .map((raw, index) => {
      try {
        return normalizeBusiness(raw, index);
      } catch (err) {
        console.error("Skipped a business record that failed to parse:", raw, err);
        return null;
      }
    })
    .filter(Boolean);
}
