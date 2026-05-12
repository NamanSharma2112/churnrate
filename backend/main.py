"""
Churn Rate Backend — FastAPI Application Entry Point.

This backend bridges the ML churn prediction model with the Next.js frontend.
It provides:
  - File upload (CSV/XML) and batch prediction
  - Dashboard data aggregation (stats, risk, activity)
  - User management synced with Clerk auth
  - Prediction history and customer drill-down

Future integrations (architecture is ready):
  - Stripe: fetch subscription/payment data to feed into the model
  - AI Bot: automated churn risk analysis and retention planning
  - Resend: personalized email campaigns for at-risk customers
"""

import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import get_settings
from database import init_db
from services.model_service import model_service

# Import route modules
from routes.predict import router as predict_router
from routes.dashboard import router as dashboard_router
from routes.users import router as users_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan handler.
    Runs initialization on startup and cleanup on shutdown.
    """
    # ── Startup ──────────────────────────────────────────────
    print("=" * 50)
    print("  CHURN RATE BACKEND - Starting up...")
    print("=" * 50)

    # Initialize database tables
    print("\n[1/2] Initializing database...")
    init_db()
    print("  [OK] Database ready")

    # Initialize ML model
    print("\n[2/2] Initializing ML model...")
    model_service.initialize()
    print(f"  [OK] Model ready: {model_service.model_name}")

    # Create uploads directory
    settings = get_settings()
    os.makedirs(settings.upload_dir, exist_ok=True)

    print("\n" + "=" * 50)
    print("  [OK] Backend ready - http://localhost:8000")
    print("  [OK] API docs - http://localhost:8000/docs")
    print("=" * 50 + "\n")

    yield  # App is running

    # ── Shutdown ─────────────────────────────────────────────
    print("\nShutting down Churn Rate Backend...")


# ─── App Instance ────────────────────────────────────────────────────────

app = FastAPI(
    title="Churn Rate API",
    description=(
        "Backend API for the Customer Churn Prediction Dashboard. "
        "Upload CSV/XML files, run ML predictions, and visualize results."
    ),
    version="1.0.0",
    lifespan=lifespan,
)


# ─── CORS Middleware ─────────────────────────────────────────────────────

settings = get_settings()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.frontend_url,
        "http://localhost:3000",
        "http://localhost:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Register Routes ────────────────────────────────────────────────────

app.include_router(predict_router)
app.include_router(dashboard_router)
app.include_router(users_router)


# ─── Health Check ────────────────────────────────────────────────────────

@app.get("/", tags=["Health"])
async def root():
    return {
        "status": "ok",
        "service": "Churn Rate API",
        "version": "1.0.0",
        "model_ready": model_service.is_ready,
        "model_name": model_service.model_name,
    }


@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "model_ready": model_service.is_ready,
        "database": "connected",
    }


# ─── Future Integration Stubs ───────────────────────────────────────────
# These will be expanded when Stripe, AI Bot, and Resend are integrated.
# The route files will live in:
#   - routes/stripe.py     → Stripe subscription/payment data ingestion
#   - routes/ai_bot.py     → AI-powered retention planning
#   - routes/email.py      → Resend-based personalized email campaigns
