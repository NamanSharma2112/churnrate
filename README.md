# ChurnRate - Customer Churn Prediction Platform

https://www.churnrate.fun/

A full-stack SaaS application for predicting and managing customer churn with an interactive dashboard, real-time analytics, and ML-powered predictions.

## Architecture

```
[Next.js Frontend]
       │
       │  REST / WebSocket
       ▼
[Node.js / Express Backend]  ──────────────────────────────┐
  - Auth (JWT / OAuth)                                      │
  - User & Tenant Management                                │
  - Data Ingestion & Preprocessing                          │
  - Job Queue (Bull/BullMQ)                                 │
  - DB: PostgreSQL + Redis                                  │
       │                                                    │
       │  Internal REST / gRPC                              │
       ▼                                                    │
[Python / FastAPI Backend]                                  │
  - Churn Prediction Model (scikit-learn / XGBoost)         │
  - Model Versioning (MLflow)                               │
  - Feature Engineering                                     │
  - Batch + Real-time Inference                             │
       │                                                    │
       └──────────────── Shared DB / Object Storage ────────┘
                        (PostgreSQL, S3/MinIO)
```

## Tech Stack

### Frontend
- **Next.js 15** (App Router) with TypeScript
- **Tailwind CSS 4** for styling
- **Recharts** for data visualization
- **Zustand** for state management

### Backend (Node.js)
- **Express.js** with TypeScript
- **PostgreSQL** with Prisma ORM
- **Redis** for caching and session management
- **BullMQ** for job queues
- **JWT** authentication
- **Socket.IO** for real-time updates

### ML Service (Python)
- **FastAPI** for REST API
- **scikit-learn / XGBoost** for churn prediction
- **MLflow** for model versioning
- **pandas / numpy** for data processing

### Infrastructure
- **Docker Compose** for local development
- **PostgreSQL** shared database
- **Redis** for caching, queues, and pub/sub

## Getting Started

### Prerequisites
- Node.js 20+
- Python 3.11+
- Docker & Docker Compose
- PostgreSQL 16
- Redis 7

### Quick Start

1. Clone the repository:
```bash
git clone https://github.com/NamanSharma2112/churnrate.git
cd churnrate
```

2. Start infrastructure services:
```bash
docker-compose up -d postgres redis
```

3. Set up the backend:
```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

4. Set up the ML service:
```bash
cd ml-service
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

5. Set up the frontend:
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
churnrate/
├── frontend/          # Next.js 15 frontend
├── backend/           # Node.js/Express API server
├── ml-service/        # Python/FastAPI ML service
├── docker-compose.yml # Infrastructure services
└── README.md
```

## API Documentation

- **Backend API**: http://localhost:3001/api/docs
- **ML Service API**: http://localhost:8001/docs (FastAPI auto-generated)

## License

MIT
