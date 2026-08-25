import { FileDown, ArrowLeft } from "lucide-react";

const SORT_OPTIONS = [
  { value: "opportunity-desc", label: "Opportunity Score (High to Low)" },
  { value: "opportunity-asc", label: "Opportunity Score (Low to High)" },
  { value: "rating-desc", label: "Rating (High to Low)" },
  { value: "reviews-asc", label: "Reviews (Low to High)" },
];

export default function ResultsHeader({
  count,
  sortBy,
  onSortChange,
  onDownloadPdf,
  onNewSearch,
}) {
  return (
    <div className="animate-fade-up flex flex-col gap-5 border-b border-navy-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <button
          type="button"
          onClick={onNewSearch}
          className="mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-navy-500 transition-colors hover:text-navy-800"
        >
          <ArrowLeft size={13} strokeWidth={2} />
          New search
        </button>
        <h1 className="text-2xl font-semibold tracking-tight text-navy-950 md:text-3xl">
          {count} {count === 1 ? "Lead" : "Leads"} Found
        </h1>
        <p className="mt-1 text-sm text-navy-600">
          Sorted by Opportunity Score
        </p>
      </div>

      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <select
          aria-label="Sort results"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-lg border border-navy-800 bg-navy-900 px-3 py-2 text-xs font-medium text-sky-100 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={onDownloadPdf}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-navy-950 transition-colors hover:bg-accent-400 active:translate-y-px"
        >
          <FileDown size={15} strokeWidth={2.25} />
          Download PDF Report
        </button>
      </div>
    </div>
  );
}