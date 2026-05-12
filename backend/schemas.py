"""
Pydantic schemas for request/response validation.
Keeps route files clean by centralizing data shapes.
"""

from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime


# ─── Prediction Schemas ──────────────────────────────────────────────────

class PredictionItem(BaseModel):
    index: int
    customer_data: Dict[str, Any]
    churn_prediction: str
    churn_probability: float
    risk_level: str


class PredictionSummary(BaseModel):
    churned: int
    not_churned: int
    churn_rate: float
    high_risk: int
    medium_risk: int
    low_risk: int


class UploadResponse(BaseModel):
    upload_id: int
    filename: str
    file_type: str
    total_customers: int
    summary: PredictionSummary
    predictions: List[PredictionItem]


# ─── Dashboard Schemas ───────────────────────────────────────────────────

class RiskDistribution(BaseModel):
    high: int
    medium: int
    low: int


class DashboardStats(BaseModel):
    total_customers: int
    churned: int
    not_churned: int
    churn_rate: float
    avg_churn_probability: float
    risk_distribution: RiskDistribution
    active_customers: int
    recent_uploads: int
    model_name: str


class ActivityDataPoint(BaseModel):
    date: Optional[str]
    filename: str
    total_customers: int
    churned: int
    not_churned: int
    churn_rate: float


class RiskDataPoint(BaseModel):
    level: str
    customers: int


# ─── User Schemas ────────────────────────────────────────────────────────

class UserProfile(BaseModel):
    id: int
    clerk_id: str
    email: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]
    avatar_url: Optional[str]
    created_at: Optional[str]


# ─── Future: Stripe Schemas ─────────────────────────────────────────────

class StripeCustomerData(BaseModel):
    """Placeholder for future Stripe integration."""
    stripe_customer_id: Optional[str] = None
    subscription_status: Optional[str] = None
    monthly_revenue: Optional[float] = None
    payment_failures: Optional[int] = None
    days_since_last_payment: Optional[int] = None


# ─── Future: Email Campaign Schemas ──────────────────────────────────────

class EmailCampaign(BaseModel):
    """Placeholder for future Resend email integration."""
    campaign_type: Optional[str] = None  # "retention", "win_back", "offer"
    subject: Optional[str] = None
    target_risk_level: Optional[str] = None  # "High", "Medium"
    discount_percentage: Optional[float] = None
