const VARIANTS = {
  success: "bg-accent-500/10 text-accent-400 ring-1 ring-accent-500/30",
  neutral: "bg-navy-800 text-navy-200 ring-1 ring-navy-600",
  warning: "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/30",
  danger: "bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/30",
};

export default function StatusBadge({ variant = "neutral", icon: Icon, children }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${VARIANTS[variant]}`}
    >
      {Icon ? <Icon size={12} strokeWidth={2} aria-hidden="true" /> : null}
      {children}
    </span>
  );
}