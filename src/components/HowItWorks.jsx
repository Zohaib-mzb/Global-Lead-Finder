import { Target, SearchCheck, Filter, UserSearch, ListOrdered } from "lucide-react";

const STEPS = [
  {
    icon: Target,
    title: "Define your target",
    text: "Set the business type, location, and lead filters you care about.",
  },
  {
    icon: SearchCheck,
    title: "Search global databases",
    text: "We query live maps data for matching businesses worldwide.",
  },
  {
    icon: Filter,
    title: "Filter and qualify",
    text: "Results are scored and de-duplicated down to real, unique leads.",
  },
  {
    icon: UserSearch,
    title: "Enrich business & owner data",
    text: "AI research fills in emails, owners, and social profiles.",
  },
  {
    icon: ListOrdered,
    title: "Get prioritized leads",
    text: "Every lead arrives ranked by opportunity score, ready for outreach.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto mt-20 max-w-5xl px-4">
      <h2 className="text-center text-xl font-semibold tracking-tight text-navy-950">
        How It Works
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {STEPS.map(({ icon: Icon, title, text }, i) => (
          <div
            key={title}
            className="animate-fade-up rounded-xl border border-navy-800 bg-navy-900 p-5 transition-colors hover:border-navy-600"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500/15">
              <Icon size={17} strokeWidth={2} className="text-accent-400" />
            </div>
            <p className="mt-3.5 text-sm font-semibold text-sky-50">
              {title}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-sky-300">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}