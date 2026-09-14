import { useMemo, useRef, useState } from "react";
import { Radar } from "lucide-react";
import { Analytics } from "@vercel/analytics/react";
import Hero from "./components/Hero.jsx";
import SearchForm from "./components/SearchForm.jsx";
import FeatureBadges from "./components/FeatureBadges.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import PipelineLoader from "./components/PipelineLoader.jsx";
import ResultsHeader from "./components/ResultsHeader.jsx";
import SummaryCards from "./components/SummaryCards.jsx";
import LeadCard from "./components/LeadCard.jsx";
import { fetchLeads, LeadSearchError } from "./lib/api.js";
import { generateLeadsPDF } from "./lib/pdf.js";

export default function App() {
  const [view, setView] = useState("search");
  const [pipelineStatus, setPipelineStatus] = useState("running");
  const [errorMessage, setErrorMessage] = useState("");
  const [businesses, setBusinesses] = useState([]);
  const [searchMeta, setSearchMeta] = useState({ keyword: "", location: "" });
  const [sortBy, setSortBy] = useState("opportunity-desc");
  const lastFormValues = useRef(null);

  async function runSearch(formValues) {
    lastFormValues.current = formValues;
    setSearchMeta({
      keyword: formValues.keyword,
      location: [formValues.city, formValues.country].filter(Boolean).join(", "),
    });
    setPipelineStatus("running");
    setView("pipeline");

    try {
      const results = await fetchLeads(formValues);
      setBusinesses(results);
      setPipelineStatus("done");
    
      setTimeout(() => setView("results"), 550);
    } catch (err) {
      const message =
        err instanceof LeadSearchError
          ? err.message
          : "An unexpected error occurred. Please try again.";
      setErrorMessage(message);
      setPipelineStatus("error");
    }
  }

  function handleRetry() {
    setView("search");
    setErrorMessage("");
  }

  function handleNewSearch() {
    setView("search");
  }

  const sortedBusinesses = useMemo(() => {
    const list = [...businesses];
    switch (sortBy) {
      case "opportunity-asc":
        return list.sort((a, b) => a.opportunityScore - b.opportunityScore);
      case "rating-desc":
        return list.sort((a, b) => b.rating - a.rating);
      case "reviews-asc":
        return list.sort((a, b) => a.reviews - b.reviews);
      case "opportunity-desc":
      default:
        return list.sort((a, b) => b.opportunityScore - a.opportunityScore);
    }
  }, [businesses, sortBy]);

  function handleDownloadPdf() {
    generateLeadsPDF(sortedBusinesses, searchMeta);
  }

  if (view === "pipeline") {
    return (
      <>
        <PipelineLoader
          status={pipelineStatus}
          errorMessage={errorMessage}
          onRetry={handleRetry}
        />
        <Analytics />
      </>
    );
  }

  if (view === "results") {
    return (
      <>
        <div className="min-h-[100dvh]">
          <TopBar />
          <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
            <ResultsHeader
              count={sortedBusinesses.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onDownloadPdf={handleDownloadPdf}
              onNewSearch={handleNewSearch}
            />
            <SummaryCards businesses={sortedBusinesses} />
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {sortedBusinesses.map((business, i) => (
                <LeadCard key={business.id} business={business} index={i} />
              ))}
            </div>
          </main>
        </div>
        <Analytics />
      </>
    );
  }

  return (
    <>
      <div className="min-h-[100dvh]">
        <TopBar />
        <main className="px-4 pb-24 pt-16 md:pt-24">
          <Hero />
          <SearchForm
            onSubmit={runSearch}
            isSubmitting={view === "pipeline"}
          />
          <FeatureBadges />
          <HowItWorks />
        </main>
      </div>
      <Analytics />
    </>
  );
}

function TopBar() {
  return (
    <header className="border-b border-navy-800 bg-navy-900">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-4 md:px-6">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent-500/15">
          <Radar size={15} strokeWidth={2.25} className="text-accent-400" />
        </div>
        <span className="text-sm font-semibold tracking-tight text-sky-50">
          Global Lead Finder
        </span>
      </div>
    </header>
  );
}
