import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Circle, Loader2, AlertTriangle } from "lucide-react";

const STEPS = [
  "Searching Google Maps database",
  "Paginating through results",
  "Applying filters",
  "Finding business websites",
  "Enriching business data",
  "Finding owner information",
  "Finding social profiles",
  "Calculating opportunity scores",
];

// status: "running" | "done" | "error"
export default function PipelineLoader({ status, errorMessage, onRetry }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  // Advance one step at a time while the real request is in flight, capped
  // just short of the final step so it never claims "done" before the
  // backend actually responds.
  useEffect(() => {
    if (status !== "running") return;
    timerRef.current = setInterval(() => {
      setActiveIndex((i) => Math.min(i + 1, STEPS.length - 2));
    }, 1900);
    return () => clearInterval(timerRef.current);
  }, [status]);

  // Once the real data has arrived, fast-forward through any remaining
  // steps so the UI visibly "catches up" rather than jumping abruptly.
  useEffect(() => {
    if (status !== "done") return;
    clearInterval(timerRef.current);
    let i = activeIndex;
    const fastForward = setInterval(() => {
      i += 1;
      setActiveIndex(Math.min(i, STEPS.length - 1));
      if (i >= STEPS.length - 1) clearInterval(fastForward);
    }, 180);
    return () => clearInterval(fastForward);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status === "error") {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/10">
          <AlertTriangle size={26} strokeWidth={2} className="text-rose-500" />
        </div>
        <h2 className="mt-5 text-xl font-semibold text-navy-950">
          The search didn't complete
        </h2>
        <p className="mt-2 max-w-sm text-sm text-navy-600">
          {errorMessage || "Something went wrong while contacting the research backend."}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 rounded-lg bg-accent-500 px-5 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-accent-400"
        >
          Back to search
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4">
      <div className="animate-fade-up flex flex-col items-center text-center">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute h-16 w-16 animate-spin-slow rounded-full border-2 border-navy-200 border-t-accent-500" />
          <Loader2 size={22} className="animate-pulse-soft text-accent-500" />
        </div>
        <h2 className="mt-6 text-xl font-semibold tracking-tight text-navy-950 md:text-2xl">
          Running Intelligence Pipeline
        </h2>
        <p className="mt-2 text-sm text-navy-600">
          This may take 2–3 minutes.
        </p>
      </div>

      <ol className="mt-10 w-full max-w-md space-y-1 rounded-2xl border border-navy-800 bg-navy-900 p-3">
        {STEPS.map((step, i) => {
          const isComplete = i < activeIndex || (status === "done" && i <= activeIndex);
          const isActive = i === activeIndex && status !== "done";
          return (
            <li
              key={step}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                isActive ? "bg-navy-800/70" : ""
              }`}
            >
              {isComplete ? (
                <CheckCircle2
                  size={17}
                  strokeWidth={2}
                  className="shrink-0 text-accent-400"
                />
              ) : isActive ? (
                <Loader2
                  size={17}
                  strokeWidth={2}
                  className="shrink-0 animate-spin text-accent-400"
                />
              ) : (
                <Circle size={17} strokeWidth={2} className="shrink-0 text-navy-600" />
              )}
              <span
                className={
                  isComplete
                    ? "text-sky-100"
                    : isActive
                    ? "font-medium text-white"
                    : "text-navy-300"
                }
              >
                {step}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}