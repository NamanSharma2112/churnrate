# Deploying ChurnRate

Three pieces have to end up online and pointed at each other:

| Piece | What it is | Needs |
| --- | --- | --- |
| **Postgres** | All application data | A managed database |
| **Backend API** | Express + Prisma, port 3001 | `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGINS` |
| **ML service** | FastAPI + XGBoost, port 8001 | Nothing — trains itself on first boot |
| **Frontend** | Next.js | `NEXT_PUBLIC_API_URL` |

The ML service is **optional**. If it is unreachable the API falls back to a
deterministic rule-based score, so you can ship the backend first and add the
model later.

---

## Step 1 — Create the database

Any managed Postgres 16 works. Two quick options:

**Neon** (free tier, serverless)
1. Sign up at [neon.tech](https://neon.tech) → Create project
2. Copy the connection string from the dashboard
3. It already includes `?sslmode=require` — keep that

**Supabase**
1. [supabase.com](https://supabase.com) → New project
2. Settings → Database → Connection string → **URI**
3. Use the **connection pooler** string (port 6543) if your host is serverless

Save the string. It looks like:

```
postgresql://user:password@host.neon.tech/churnrate?sslmode=require
```

---

## Step 2 — Deploy the backend

### Option A: Render blueprint (fastest — API, ML service and database together)

This repo ships a `render.yaml`. It provisions all three and wires
`DATABASE_URL` and `ML_SERVICE_URL` between them automatically.

1. Push this branch to GitHub
2. [dashboard.render.com](https://dashboard.render.com) → **New → Blueprint**
3. Select this repository, apply the blueprint
4. When it asks for `CORS_ORIGINS`, leave it blank for now — you will not know
   the frontend URL until Step 4
5. Wait for `churnrate-api` to go live and note its URL, e.g.
   `https://churnrate-api.onrender.com`

Migrations run automatically on every deploy (`npm run start:migrate`).

### Option B: Render / Railway, backend only

Create a **Web Service** from this repo with:

| Setting | Value |
| --- | --- |
| Root directory | `backend` |
| Build command | `npm ci && npm run build` |
| Start command | `npm run start:migrate` |
| Health check path | `/api/health` |

Environment variables:

```bash
DATABASE_URL=postgresql://...        # from Step 1
JWT_SECRET=...                       # openssl rand -base64 32
ENCRYPTION_KEY=...                   # openssl rand -hex 32
CORS_ORIGINS=https://your-frontend.vercel.app
NODE_ENV=production
# Optional, only if you deploy the ML service:
ML_SERVICE_URL=https://churnrate-ml.onrender.com
```

`PORT` is injected by the platform — do not set it yourself.

### Option C: Docker anywhere (Fly.io, a VPS, ECS)

```bash
cd backend
docker build -t churnrate-api .
docker run -p 3001:3001 \
  -e DATABASE_URL="postgresql://..." \
  -e JWT_SECRET="..." \
  -e ENCRYPTION_KEY="..." \
  -e CORS_ORIGINS="https://your-frontend.vercel.app" \
  churnrate-api
```

The image runs `prisma migrate deploy` before starting, so a fresh database is
set up on first boot.

### Verify it

```bash
curl https://your-api-url.onrender.com/api/health
```

Expected:

```json
{"status":"ok","database":"ok","mlService":"unavailable","timestamp":"..."}
```

`database: ok` is the one that matters. `mlService: unavailable` is fine until
Step 3.

If you get `database: unavailable`, the `DATABASE_URL` is wrong or the database
is not accepting connections from your host — check whether it needs
`?sslmode=require`.

---

## Step 3 — Deploy the ML service (optional but recommended)

Without it, predictions still work but use the rule-based fallback rather than
the trained model.

**Render / Railway**

| Setting | Value |
| --- | --- |
| Root directory | `ml-service` |
| Runtime | Python 3.11 |
| Build command | `pip install -r requirements.txt` |
| Start command | `uvicorn app.main:app --host 0.0.0.0 --port $PORT` |
| Health check path | `/health` |

**Docker**

```bash
cd ml-service
docker build -t churnrate-ml .
docker run -p 8001:8001 churnrate-ml
```

The first boot trains the model (~30s) unless you use the Docker image, which
bakes a trained model in at build time.

Then set `ML_SERVICE_URL` on the backend to this service's URL and redeploy the
backend. Re-check `/api/health` — `mlService` should now read `ok`.

> Give this service at least 512 MB of memory. XGBoost training is the peak, and
> it will be OOM-killed on a 256 MB instance.

---

## Step 4 — Connect the frontend

The frontend talks to the API through `NEXT_PUBLIC_API_URL`. **This is inlined
into the browser bundle at build time**, so it must be set *before* the build —
setting it afterwards and restarting does nothing.

### Vercel

1. [vercel.com](https://vercel.com) → **Add New → Project** → import this repo
2. Set **Root Directory** to `frontend`
3. Add environment variables:

   ```
   NEXT_PUBLIC_API_URL = https://your-api-url.onrender.com
   NEXT_PUBLIC_WS_URL  = https://your-api-url.onrender.com
   ```

   No trailing slash. Include `https://`.
4. Deploy, and note the resulting URL

### Close the loop: CORS

Go back to the backend and set:

```
CORS_ORIGINS=https://your-frontend.vercel.app
```

Multiple origins are comma-separated — include your preview domain if you use
one:

```
CORS_ORIGINS=https://churnrate.vercel.app,https://churnrate-git-main-you.vercel.app
```

Redeploy the backend. **This step is not optional** — without it the browser
blocks every API call and the app looks broken while the backend logs show
nothing wrong.

---

## Step 5 — Verify the whole chain

1. Open your frontend URL — the landing page should load
2. Click **Get started** and create an account
   - Failure here almost always means CORS or a wrong `NEXT_PUBLIC_API_URL`
3. You should land on an empty dashboard prompting you to import data
4. Go to **Data Import** and upload a CSV with at least an email column
5. The dashboard should now show real numbers

A quick backend-only check:

```bash
curl -X POST https://your-api-url.onrender.com/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

A `201` with a token means the API and database are healthy, and any remaining
problem is in the frontend wiring.

---

## Troubleshooting

**"Cannot reach the server" on the login page**
`NEXT_PUBLIC_API_URL` is wrong, or was changed without rebuilding. On Vercel,
changing an env var requires a **redeploy**, not just a restart.

**Requests fail in the browser but `curl` works**
CORS. Set `CORS_ORIGINS` on the backend to the exact frontend origin — scheme
included, no trailing slash — and redeploy.

**`database: unavailable` in `/api/health`**
Wrong `DATABASE_URL`, or SSL not enabled. Most managed Postgres needs
`?sslmode=require`.

**Login works, then everything 401s**
`JWT_SECRET` changed between deploys, which invalidates existing tokens. Set it
to a fixed value rather than regenerating it on each deploy. (Render's
`generateValue: true` only generates once, on first provision.)

**First request after idle is very slow**
Free tiers sleep. Render's starter plan and Neon's free tier both cold-start.

**Stripe sync returns a network error**
The backend must be able to reach `api.stripe.com` outbound. Some sandboxed or
firewalled environments block it.

---

## Environment variable reference

### Backend

| Variable | Required | Notes |
| --- | --- | --- |
| `DATABASE_URL` | Yes | Postgres connection string |
| `JWT_SECRET` | Yes | `openssl rand -base64 32`; keep stable across deploys |
| `CORS_ORIGINS` | Yes in production | Comma-separated frontend origins |
| `ENCRYPTION_KEY` | Recommended | `openssl rand -hex 32`; encrypts Stripe keys at rest |
| `ML_SERVICE_URL` | No | Falls back to rule-based scoring when unset |
| `JWT_EXPIRY` | No | Defaults to `7d` |
| `PORT` | No | Injected by the host |
| `REDIS_URL` | No | Reserved for future queue-backed jobs |

### Frontend

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Yes | Public backend URL; inlined at build time |
| `NEXT_PUBLIC_WS_URL` | Yes | Usually identical to the above |

---

## Connecting Stripe

Once deployed, in the app:

1. **Integrations → Stripe**
2. Paste a Stripe secret key. Prefer a **restricted key** (`rk_…`) with read
   access to Customers and Subscriptions over a full secret key — the app only
   reads.
3. **Sync now** imports customers, normalises subscriptions to monthly revenue,
   and scores everything.

For live re-scoring, add a webhook in Stripe → Developers → Webhooks:

- **URL**: `https://your-api-url.onrender.com/api/integrations/stripe/webhook`
- **Events**: `customer.subscription.created`, `customer.subscription.updated`,
  `customer.subscription.deleted`, `invoice.payment_failed`,
  `invoice.payment_succeeded`
- Copy the signing secret (`whsec_…`) back into the Integrations page so
  incoming webhooks are verified

Keys are encrypted with `ENCRYPTION_KEY` before being stored and are never
returned to the browser — only a masked hint is.
