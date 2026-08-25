import { Users, Flame, Mail, UserCheck } from "lucide-react";

export default function SummaryCards({ businesses }) {
  const total = businesses.length;
  const highPriority = businesses.filter((b) => b.priority === "High").length;
  const emailsFound = businesses.filter((b) => b.email).length;
  const ownersFound = businesses.filter((b) => b.ownerName).length;

  const cards = [
    { icon: Users, label: "Total Results", value: total },
    { icon: Flame, label: "High Priority", value: highPriority },
    { icon: Mail, label: "Emails Found", value: emailsFound },
    { icon: UserCheck, label: "Owners Found", value: ownersFound },
  ];

  return (
    <div className="animate-fade-up mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map(({ icon: Icon, label, value }) => (
        <div
          key={label}
          className="rounded-xl border border-navy-800 bg-navy-900 p-4"
        >
          <div className="flex items-center gap-2 text-navy-300">
            <Icon size={14} strokeWidth={2} />
            <span className="text-xs font-medium uppercase tracking-wide">
              {label}
            </span>
          </div>
          <p className="mt-2 font-mono text-2xl font-semibold text-sky-50">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}