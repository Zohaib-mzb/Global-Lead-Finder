import {
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  UserRound,
  Instagram,
  Facebook,
  Linkedin,
  StickyNote,
  ExternalLink,
} from "lucide-react";
import StatusBadge from "./StatusBadge.jsx";
import CopyButton from "./CopyButton.jsx";

const PRIORITY_VARIANT = {
  High: "success",
  Medium: "warning",
  Low: "neutral",
};

// min-w-0 on both flex containers is what lets the text column actually
// shrink instead of forcing the row (and the whole card) to grow to fit
// long unbroken content. break-words lets long values like URLs wrap
// instead of overflowing past the card edge.
function ContactRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start justify-between gap-3 py-2.5">
      <div className="flex min-w-0 flex-1 items-start gap-2.5">
        <Icon size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-navy-400" />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium uppercase tracking-wide text-navy-400">
            {label}
          </p>
          <div className="mt-0.5 break-words text-sm text-sky-100">{children}</div>
        </div>
      </div>
    </div>
  );
}

function SocialLink({ icon: Icon, label, url }) {
  if (!url) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg border border-navy-700 px-2.5 py-1.5 text-xs text-navy-400">
        <Icon size={13} strokeWidth={2} />
        Not Found
      </span>
    );
  }
 return (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`${label} profile (opens in new tab)`}
    className="inline-flex items-center gap-1.5 rounded-lg border border-navy-700 bg-navy-800 px-2.5 py-1.5 text-xs font-medium text-sky-100 transition-colors hover:border-accent-500/40 hover:text-accent-400"
  >
    <Icon size={13} strokeWidth={2} />
    {label}
  </a>
);
}

export default function LeadCard({ business, index }) {
  const {
    name,
    rating,
    reviews,
    priority,
    opportunityScore,
    address,
    phone,
    email,
    ownerName,
    website,
    hasWebsite,
    note,
    socials,
    googleMapsUrl,
  } = business;

  return (
    <article
      className="animate-fade-up rounded-xl border border-navy-800 bg-navy-900 p-5 transition-colors hover:border-navy-600"
      style={{ animationDelay: `${Math.min(index, 10) * 40}ms` }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="break-words text-base font-semibold leading-snug text-sky-50">
            {name}
          </h3>
          <div className="mt-1.5 flex items-center gap-1.5 text-sm text-navy-300">
            <Star size={14} strokeWidth={0} className="fill-amber-400 text-amber-400" />
            <span className="font-medium text-sky-100">
              {rating ? rating.toFixed(1) : "—"}
            </span>
            <span className="text-navy-500">·</span>
            <span>{reviews.toLocaleString()} reviews</span>
          </div>
        </div>
        <StatusBadge variant={PRIORITY_VARIANT[priority]}>
          {priority} · {opportunityScore}
        </StatusBadge>
      </div>

      <div className="mt-3 flex items-start gap-2 text-sm text-navy-300">
        <MapPin size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-navy-400" />
        <span className="leading-relaxed break-words">
        {googleMapsUrl ? (
  <a
    href={googleMapsUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-accent-400 hover:underline"
  >
    {address}
  </a>
) : (
  address
)}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {hasWebsite ? (
          <StatusBadge variant="success" icon={Globe}>
            Has Website
          </StatusBadge>
        ) : (
          <StatusBadge variant="neutral" icon={Globe}>
            No Website
          </StatusBadge>
        )}
        {email ? (
          <StatusBadge variant="success" icon={Mail}>
            Email Found
          </StatusBadge>
        ) : (
          <StatusBadge variant="neutral" icon={Mail}>
            Email Not Found
          </StatusBadge>
        )}
        {ownerName ? (
          <StatusBadge variant="success" icon={UserRound}>
            Owner Found
          </StatusBadge>
        ) : (
          <StatusBadge variant="neutral" icon={UserRound}>
            Owner Not Found
          </StatusBadge>
        )}
      </div>

      <div className="mt-2 divide-y divide-navy-800/70 border-t border-navy-800/70">
        <ContactRow icon={Globe} label="Website">
          {website ? (
  <a
    href={website}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-start gap-1 text-accent-400 hover:underline"
  >
    <span className="break-all">
      {website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
    </span>

    <ExternalLink
      size={12}
      strokeWidth={2}
      className="mt-0.5 shrink-0"
    />
  </a>
) : (
  <span className="text-navy-400">Not found</span>
)}
        </ContactRow>

        <ContactRow icon={Phone} label="Phone">
          {phone ? (
            <div className="flex items-center gap-1.5">
              <span className="break-words">{phone}</span>
              <CopyButton value={phone} label="phone number" />
            </div>
          ) : (
            <span className="text-navy-400">Not found</span>
          )}
        </ContactRow>

        <ContactRow icon={Mail} label="Email">
          {email ? (
            <div className="flex min-w-0 items-center gap-1.5">
              <span className="break-all">{email}</span>
              <CopyButton value={email} label="email address" />
            </div>
          ) : (
            <span className="text-navy-400">Not found</span>
          )}
        </ContactRow>

        <ContactRow icon={UserRound} label="Owner">
          {ownerName ? (
            <span className="break-words">{ownerName}</span>
          ) : (
            <span className="text-navy-400">Not found</span>
          )}
        </ContactRow>
      </div>

      {note ? (
        <div className="mt-3 flex items-start gap-2.5 rounded-lg bg-navy-950/60 p-3 text-xs leading-relaxed text-navy-300">
          <StickyNote size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-navy-400" />
          <p className="min-w-0 break-words">{note}</p>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2 border-t border-navy-800/70 pt-4">
        <SocialLink icon={Instagram} label="Instagram" url={socials.instagram} />
        <SocialLink icon={Facebook} label="Facebook" url={socials.facebook} />
        <SocialLink icon={Linkedin} label="LinkedIn" url={socials.linkedin} />
      </div>
    </article>
  );
}