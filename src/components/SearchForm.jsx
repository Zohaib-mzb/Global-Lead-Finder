import { useState } from "react";
import { Search, Loader2, ChevronDown } from "lucide-react";

const WEBSITE_OPTIONS = [
  { value: "both", label: "Any" },
  { value: "no_website", label: "No Website" },
  { value: "has_website", label: "Has Website" },
];

const RATING_OPTIONS = [
  { value: "", label: "Any rating" },
  { value: "3", label: "3+" },
  { value: "3.5", label: "3.5+" },
  { value: "4", label: "4+" },
  { value: "4.5", label: "4.5+" },
];

const REVIEW_OPTIONS = [
  { value: "", label: "Any" },
  { value: "20", label: "Under 20" },
  { value: "50", label: "Under 50" },
  { value: "200", label: "Under 200" },
  { value: "500", label: "Under 500" },
];

const fieldLabel =
  "text-xs font-medium uppercase tracking-wide text-sky-300";
const inputBase =
  "w-full rounded-lg border border-navy-700 bg-navy-800 px-3.5 py-2.5 text-sm text-sky-50 placeholder:text-navy-400 transition-colors focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30";
const selectBase = `${inputBase} appearance-none pr-9`;

// Wraps a <select> with its own absolutely-positioned chevron, avoiding
// fragile background-image data-URI arbitrary values.
function SelectField({ id, label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={fieldLabel}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={selectBase}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={15}
          strokeWidth={2}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sky-300"
        />
      </div>
    </div>
  );
}

export default function SearchForm({ onSubmit, isSubmitting }) {
  const [values, setValues] = useState({
    country: "",
    city: "",
    keyword: "",
    websiteFilter: "both",
    minRating: "",
    maxReviewCount: "",
  });
  const [error, setError] = useState("");

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.country.trim() || !values.keyword.trim()) {
      setError("Country and business type are required.");
      return;
    }
    setError("");
    onSubmit(values);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-up mx-auto mt-10 max-w-3xl rounded-2xl border border-navy-800 bg-navy-900 p-6 shadow-2xl shadow-navy-950/30 md:p-8"
      noValidate
    >
      <fieldset>
        <legend className="text-sm font-semibold text-sky-100">
          Location
        </legend>
        <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="country" className={fieldLabel}>
              Country <span className="text-accent-400">*</span>
            </label>
            <input
              id="country"
              type="text"
              required
              placeholder="United States"
              value={values.country}
              onChange={(e) => update("country", e.target.value)}
              className={inputBase}
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="city" className={fieldLabel}>
              City or Area <span className="normal-case text-sky-400">(optional)</span>
            </label>
            <input
              id="city"
              type="text"
              placeholder="New York, Manhattan, etc."
              value={values.city}
              onChange={(e) => update("city", e.target.value)}
              className={inputBase}
              autoComplete="off"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="mt-7">
        <legend className="text-sm font-semibold text-sky-100">
          Business Type
        </legend>
        <div className="mt-3 flex flex-col gap-1.5">
          <label htmlFor="keyword" className={fieldLabel}>
            Keyword <span className="text-accent-400">*</span>
          </label>
          <input
            id="keyword"
            type="text"
            required
            placeholder="bakery, dentist, roofing contractor, gym…"
            value={values.keyword}
            onChange={(e) => update("keyword", e.target.value)}
            className={inputBase}
            autoComplete="off"
          />
          <p className="text-xs text-sky-400">
            Enter any business category you want to prospect
          </p>
        </div>
      </fieldset>

      <fieldset className="mt-7">
        <legend className="text-sm font-semibold text-sky-100">
          Lead Filters
        </legend>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SelectField
            id="websiteFilter"
            label="Website Presence"
            value={values.websiteFilter}
            onChange={(e) => update("websiteFilter", e.target.value)}
            options={WEBSITE_OPTIONS}
          />
          <SelectField
            id="minRating"
            label="Minimum Rating"
            value={values.minRating}
            onChange={(e) => update("minRating", e.target.value)}
            options={RATING_OPTIONS}
          />
          <SelectField
            id="maxReviewCount"
            label="Max Review Count"
            value={values.maxReviewCount}
            onChange={(e) => update("maxReviewCount", e.target.value)}
            options={REVIEW_OPTIONS}
          />
        </div>

        <div className="mt-4 rounded-lg border border-navy-700 bg-navy-950/60 p-3.5 text-xs leading-relaxed text-sky-300">
          <span className="font-medium text-sky-100">Priority ranking:</span>{" "}
          Results are automatically ranked — businesses with fewer reviews
          appear first as they represent higher-opportunity leads.
          Established businesses with 1,000+ reviews and 4.5+ ratings are
          excluded as low-priority by default.
        </div>
      </fieldset>

      {error ? (
        <p role="alert" className="mt-4 text-sm font-medium text-rose-400">
          {error}
        </p>
      ) : null}

      <div className="mt-7">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent-500 px-5 py-3 text-sm font-semibold text-navy-950 transition-all hover:bg-accent-400 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Running search…
            </>
          ) : (
            <>
              <Search size={16} strokeWidth={2.25} />
              Find Leads
            </>
          )}
        </button>
      </div>
    </form>
  );
}