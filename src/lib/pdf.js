import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const ACCENT = [16, 185, 129]; // emerald-500, matches the app's single accent
const INK = [10, 28, 48]; // navy-900 — matches the app's card/header surface color
const MUTED = [95, 122, 153]; // navy-400-ish, for secondary text

export function generateLeadsPDF(businesses, meta = {}) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;

  doc.setFillColor(...INK);
  doc.rect(0, 0, pageWidth, 90, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Global Lead Finder", margin, 40);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...ACCENT);
  const subtitle = [meta.keyword, meta.location].filter(Boolean).join(" — ");
  doc.text(subtitle || "Lead Report", margin, 62);

  doc.setTextColor(...MUTED);
  doc.setFontSize(9);
  const generatedAt = new Date().toLocaleString();
  doc.text(`Generated ${generatedAt}`, margin, 78);

  // --- Summary line ---
  let y = 112;
  doc.setTextColor(...INK);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  const emailsFound = businesses.filter((b) => b.email).length;
  const ownersFound = businesses.filter((b) => b.ownerName).length;
  const highPriority = businesses.filter((b) => b.priority === "High").length;
  doc.text(
    `${businesses.length} leads  ·  ${highPriority} high priority  ·  ${emailsFound} emails found  ·  ${ownersFound} owners found`,
    margin,
    y
  );

  // --- Table ---
  autoTable(doc, {
    startY: y + 16,
    margin: { left: margin, right: margin },
    styles: {
      font: "helvetica",
      fontSize: 8.5,
      cellPadding: 5,
      textColor: INK,
      lineColor: [228, 228, 231],
      lineWidth: 0.5,
      overflow: "linebreak",
    },
    headStyles: {
      fillColor: INK,
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: { fillColor: [250, 250, 250] },
    columnStyles: {
      0: { cellWidth: 90 }, // name
      1: { cellWidth: 40 }, // score
      2: { cellWidth: 40 }, // rating/reviews
      3: { cellWidth: 100 }, // address
      4: { cellWidth: 80 }, // phone
      5: { cellWidth: 90 }, // email
      6: { cellWidth: 70 }, // owner
      7: { cellWidth: 70 }, // website
    },
    head: [
      [
        "Business",
        "Priority",
        "Rating",
        "Address",
        "Phone",
        "Email",
        "Owner",
        "Website",
      ],
    ],
    body: businesses.map((b) => [
      b.name,
      `${b.priority} (${b.opportunityScore})`,
      `${b.rating.toFixed(1)} (${b.reviews})`,
      b.address,
      b.phone || "Not found",
      b.email || "Not found",
      b.ownerName || "Not found",
      b.hasWebsite ? "Has website" : "No website",
    ]),
    didParseCell: (data) => {
      if (data.section === "body" && data.column.index === 1) {
        const text = data.cell.raw;
        if (typeof text === "string" && text.startsWith("High")) {
          data.cell.styles.textColor = ACCENT;
          data.cell.styles.fontStyle = "bold";
        }
      }
    },
  });

  const filenameParts = [
    "global-lead-finder",
    meta.keyword,
    meta.location,
  ]
    .filter(Boolean)
    .map((s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-"));

  doc.save(`${filenameParts.join("-") || "leads-report"}.pdf`);
}
