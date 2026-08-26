# Global Lead Finder 🌍🔍

*AI-powered B2B lead generation — from "business type + country" to enriched, ready-to-contact leads.*

[![n8n](https://img.shields.io/badge/n8n-automation-EA4B71?style=for-the-badge&logo=n8n&logoColor=white)](https://n8n.io)
[![Gemini](https://img.shields.io/badge/Gemini-AI_research-4285F4?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev)
[![React](https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vercel](https://img.shields.io/badge/Vercel-deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

[Live Demo](#) · [How it works](#how-it-works) · [Tech Stack](#tech-stack) · [Setup](#setup) · [Roadmap](#roadmap)

---

## Overview

Finding and qualifying B2B leads is usually a manual grind: search Google Maps, open each listing, guess which ones are worth contacting, then hunt for an email or a decision-maker's name one tab at a time.

**Global Lead Finder** automates the whole loop. Give it a business type and a country, and it searches Google Maps, ranks results by how "worth contacting" they look, and enriches the promising ones with owner name, email, and social handles — all exportable as a PDF report.

## How it works

```
Business type + Country (React UI)
              │
              ▼
   Webhook → n8n orchestration
              │
              ▼
┌─────────────────────────────┐
│ 1. Search Google Maps        │  → Google Places API, paginated (up to 60 results)
└──────────────┬───────────────┘
               ▼
┌─────────────────────────────┐
│ 2. Priority scoring          │  → ranked by review count + rating
└──────────────┬───────────────┘
               ▼
┌─────────────────────────────┐
│ 3. Enrichment                │  → Serper API + Gemini AI research
│    owner name · email ·      │
│    social handles            │
└──────────────┬───────────────┘
               ▼
   Enriched leads → React dashboard → PDF export (jsPDF)
```

## Features

- 🗺️ **Google Maps search with pagination** — pulls up to 60 businesses per query via the Google Places API
- 📈 **Priority scoring** — surfaces the leads most worth contacting first, based on review count and rating
- 🤖 **AI-powered enrichment** — Gemini AI + Serper API research each business for owner name, email, and social media handles
- ⚙️ **n8n-orchestrated backend** — the entire search → score → enrich pipeline runs as one automation
- 💻 **React (Vite) dashboard** — clean UI to browse and manage results
- 📄 **One-click PDF export** — generate a shareable lead report with jsPDF

## Tech Stack

| Layer | Technology |
|---|---|
| Orchestration | n8n |
| Lead search | Google Places API |
| AI research / enrichment | Gemini API, Serper API |
| Frontend | React + Vite |
| PDF export | jsPDF |
| Deployment | Vercel |
| Integration | Webhooks |

## Setup

> Requires an n8n instance, a Google Places API key, a Serper API key, and a Gemini API key.

```bash
# 1. Clone the repo
git clone https://github.com/Zohaib-mzb/lead-finder-frontend.git
cd lead-finder-frontend

# 2. Install frontend dependencies
npm install

# 3. Import the n8n workflow
#    n8n → Workflows → Import from File → n8n/workflow.json

# 4. Add your credentials in n8n
#    - Google Places API key
#    - Serper API key
#    - Gemini API key

# 5. Configure environment variables
cp .env.example .env
# edit .env and set VITE_N8N_WEBHOOK_URL=<your n8n webhook url>

# 6. Run the app locally
npm run dev
```

## Project Structure

```
lead-finder-frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── App.jsx
├── n8n/
│   └── workflow.json       # exported n8n lead-enrichment workflow
├── public/
├── package.json
├── .env.example
└── README.md
```

## Roadmap

- [ ] CRM export (CSV / HubSpot / Airtable)
- [ ] Save and revisit past searches
- [ ] Bulk enrichment queue with progress tracking
- [ ] Configurable scoring weights (reviews vs. rating vs. category)

## Author

**Muhammad Zohaib**
[GitHub](https://github.com/Zohaib-mzb)

## License

Distributed under the MIT License. See `LICENSE` for details.
