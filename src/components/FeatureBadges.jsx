import { Globe2, Database, Bot, MapPinned, Workflow } from "lucide-react";

const FEATURES = [
  { icon: Globe2, label: "Global Coverage" },
  { icon: Database, label: "Enriched Business Data" },
  { icon: Bot, label: "AI Enriched Data" },
  { icon: MapPinned, label: "Web & Maps Data" },
  { icon: Workflow, label: "Automated Research" },
];

export default function FeatureBadges() {
  return (
    <div className="animate-fade-up mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2">
      {FEATURES.map(({ icon: Icon, label }) => (
        <span
          key={label}
          className="inline-flex items-center gap-1.5 rounded-full border border-navy-800 bg-navy-900 px-3 py-1.5 text-xs font-medium text-sky-200"
        >
          <Icon size={13} strokeWidth={2} className="text-accent-400" />
          {label}
        </span>
      ))}
    </div>
  );
}