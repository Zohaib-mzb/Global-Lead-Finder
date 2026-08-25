# Global Lead Finder

AI-powered business lead research frontend. Users search by country, city,
and business type, apply lead filters, and get an enriched, prioritized list
of leads — sourced from Google Maps and enriched by an n8n + Gemini backend.

## Stack

- React 18 + Vite
- Tailwind CSS v4
- Lucide icons
- jsPDF + jspdf-autotable for the PDF report

## Setup

```bash
npm install
cp .env.example .env
```

Open `.env` and set your own n8n production webhook URL:

```
VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.example.com/webhook/find-leads
```

Then run locally:

```bash
npm run dev
```

## How the backend call works

`src/lib/api.js` POSTs the search form as JSON to `VITE_N8N_WEBHOOK_URL`:

```json
{
  "country": "United States",
  "city": "New York",
  "keyword": "roofing contractor",
  "websiteFilter": "both",
  "minRating": "4",
  "maxReviewCount": "500"
}
```

Your n8n workflow should respond with:

```json
{ "businesses": [ { "place_id": "...", "name": "...", "...": "..." } ] }
```

(the same shape the workflow's `Aggregate` node already produces).
`src/lib/normalize.js` maps that raw shape into the UI's internal model, so
if you rename backend fields later, that's the only file you need to touch.
