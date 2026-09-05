# ChurnRate — Customer Churn Prediction Platform

https://www.churnrate.fun/

Import customer data from any source, get ML-powered churn predictions with
per-customer explanations, and work an at-risk list ranked by revenue at stake.

## What it does

- **Import anything.** Upload any CSV — columns like `Account Name`,
  `Monthly Recurring Revenue` or `Last Login` are detected automatically by
  matching header names *and* the values underneath them. Review the mapping
  before anything is written; unrecognised columns are kept on the record rather
  than discarded.
- **Connect Stripe.** Sync customers, subscriptions and MRR directly. Failed
  payments and scheduled cancellations feed the model as risk signals, and
  webhooks re-score an account the moment its billing changes.
- **Score every account.** A gradient-boosted model returns a churn probability
  plus the factors that drove *that* customer's score — not one global chart
  repeated for everyone.
- **Act on it.** The at-risk view leads with MRR on the line.

## Architecture

```
[Next.js frontend]
       │  REST / WebSocket
       ▼
[Node.js / Express API]  ─────────────────────┐
  - Auth (JWT), tenants                       │
  - Flexible schema mapping + ingestion       │
  - Stripe sync + webhooks                    │
  - PostgreSQL via Prisma                     │
       │  Internal REST                       │
       ▼                                      │
[Python / FastAPI ML service]                 │
  - XGBoost churn model                       │
  - Per-customer SHAP explanations            │
  - Batch + real-time inference               │
       └────────── Shared PostgreSQL ─────────┘
```

The ML service is optional: when it is unreachable the API falls back to a
deterministic rule-based score, so rankings stay stable rather than changing on
every refresh.

## Tech stack

**Frontend** — Next.js 15 (App Router), TypeScript, Tailwind CSS 4, Recharts,
Zustand
**Backend** — Express 5, TypeScript, PostgreSQL + Prisma, Socket.IO, JWT
**ML service** — FastAPI, XGBoost, scikit-learn, pandas

## Local development

### Prerequisites

- Node.js 20+
- Python 3.11+
- PostgreSQL 16 (or Docker)

### 1. Start Postgres

```bash
docker compose up -d postgres
```

Or point `DATABASE_URL` at any Postgres you already run.

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env      # then set DATABASE_URL and JWT_SECRET
npx prisma migrate deploy
npm run dev               # http://localhost:3001
```

### 3. ML service (optional)

```bash
cd ml-service
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

The model trains itself on first boot (~30s) and is cached on disk.

### 4. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev               # http://localhost:3000
```

### Everything at once

```bash
docker compose up --build
```

### Seed demo data

```bash
cd backend && npm run db:seed
```

Signs in with `admin@churnrate.com` / `password123`.

## Importing your own data

Only an **email** column is required. Everything else is optional, and the more
signals you provide the sharper the predictions:

| Signal | Recognised headers include |
| --- | --- |
| Email *(required)* | `email`, `Work Email`, `Contact Email` |
| Company | `Company`, `Account Name`, `Organisation`, `Client` |
| Plan | `Plan`, `Tier`, `Subscription`, `Pricing Plan` |
| Revenue | `MRR`, `Monthly Revenue`, `ARR`, `Amount` |
| Last active | `Last Login`, `Last Seen`, `Last Activity Date` |
| Health | `Health Score`, `CSAT`, `Satisfaction` |
| Support load | `Tickets`, `Support Cases`, `Escalations` |
| Usage | `Feature Usage`, `Adoption`, `Sessions`, `Logins` |
| NPS | `NPS`, `Net Promoter Score` |

Values are normalised on the way in: `"Gold"`, `"Tier 3"` and `"Premium"` all
resolve to a plan tier; `"$1,299.00"`, `"€0"` and an annual figure all resolve to
monthly revenue; `03/14/2023`, `2024-06-30` and Unix timestamps all parse as
dates. Rows without a usable email are reported rather than silently dropped.

## API

| Endpoint | Purpose |
| --- | --- |
| `GET /api/health` | Service, database and ML status |
| `POST /api/auth/register` · `login` · `GET /me` | Auth |
| `GET /api/dashboard/stats` · `churn-trend` · `revenue` · `risk-distribution` · `activity` · `at-risk` | Dashboard data |
| `GET/POST/PATCH/DELETE /api/customers` | Customer CRUD |
| `POST /api/data/analyze` | Dry run: detect column mapping, preview rows |
| `POST /api/data/import` | Import rows and score them |
| `GET /api/data/schema` · `imports` | Field definitions, import history |
| `POST /api/predictions/predict` · `batch` | Score one customer or all |
| `GET /api/predictions/model/info` · `feature-importance` | Model metadata |
| `POST /api/integrations/stripe/connect` · `sync` · `webhook` | Stripe |

ML service docs are auto-generated at `http://localhost:8001/docs`.

## Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for step-by-step instructions covering
Render, Railway, Vercel and Docker, plus the CORS and environment-variable
wiring between the frontend and backend.

A `render.yaml` blueprint is included that provisions the API, ML service and
Postgres together.

## License

MIT
