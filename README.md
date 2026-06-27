# UGIE Dashboard

Institutional admin dashboard for the [Universal Growth Intelligence Engine](https://github.com/Eugine336/universal-growth-engine) (UGIE).

## Stack

- **Next.js 14** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS** + **shadcn/ui**
- **Recharts** for data visualization
- **TanStack Query** for data fetching

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment config
cp .env.local.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Requires a running UGIE API at `http://localhost:8000`.

## Pages

| Route | Description |
|-------|-------------|
| `/dashboard` | Platform overview — funnel, engagement, RFM, churn, predictions, growth |
| `/audiences` | Behavioral audience segmentation and ad platform export |
| `/experiments` | A/B testing management — create, start, pause, view results |
| `/referrals` | Referral program management — codes, tracking, conversion rates |
| `/budget` | Budget allocator — channel performance, CAC, ROI, auto-optimization |
| `/identities` | Cross-platform identity graph — linked users across platforms |
| `/admin` | System health, registered platforms, global statistics |

## Docker

```bash
docker compose up
```

Runs the dashboard on `:3000` connected to the UGIE API on `:8000`.

## Architecture

```
src/
├── app/            # Next.js pages (App Router)
├── components/
│   ├── ui/         # shadcn/ui design system
│   ├── layout/     # Sidebar, header, page header
│   └── dashboard/  # Chart widgets (funnel, engagement, RFM, churn, etc.)
├── hooks/          # TanStack Query data hooks
├── lib/            # API client, utilities
├── providers/      # React context (query client, platform selection)
└── types/          # TypeScript interfaces matching UGIE API responses
```