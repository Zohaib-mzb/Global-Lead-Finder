import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard API can fail in insecure contexts — fail silently, no crash
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className="inline-flex items-center justify-center rounded-md p-1.5 text-navy-400 transition-colors hover:bg-navy-800 hover:text-sky-100 active:scale-95"
    >
      {copied ? (
        <Check size={14} strokeWidth={2.5} className="text-accent-400" />
      ) : (
        <Copy size={14} strokeWidth={2} />
      )}
    </button>
  );
}