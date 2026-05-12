"""
Dashboard Routes — aggregated stats, activity trends, and risk distribution.
Serves the data that powers the frontend dashboard charts.
"""

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional
from datetime import datetime, timedelta, timezone

from database import get_db, User, FileUpload, PredictionResult
from auth import get_current_user_id
from services.model_service import model_service

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])


@router.get("/stats")
async def get_dashboard_stats(
    clerk_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    """
    Get top-level dashboard stats:
    - Churn rate (overall)
    - Total customers analyzed
    - Revenue churn estimate
    - Active (non-churned) customers
    - Risk distribution
    """
    user = db.query(User).filter(User.clerk_id == clerk_id).first()
    if not user:
        return _empty_stats()

    # Get all predictions for this user
    preds = (
        db.query(PredictionResult)
        .join(FileUpload)
        .filter(FileUpload.user_id == user.id)
        .all()
    )

    if not preds:
        return _empty_stats()

    total = len(preds)
    churned = sum(1 for p in preds if p.churn_prediction == "Yes")
    not_churned = total - churned
    churn_rate = round(churned / total * 100, 2) if total > 0 else 0

    # Risk breakdown
    high_risk = sum(1 for p in preds if p.risk_level == "High")
    medium_risk = sum(1 for p in preds if p.risk_level == "Medium")
    low_risk = sum(1 for p in preds if p.risk_level == "Low")

    # Average churn probability
    avg_probability = round(
        sum(p.churn_probability for p in preds) / total, 4
    ) if total > 0 else 0

    # Recent uploads count (last 30 days)
    thirty_days_ago = datetime.now(timezone.utc) - timedelta(days=30)
    recent_uploads = (
        db.query(FileUpload)
        .filter(
            FileUpload.user_id == user.id,
            FileUpload.created_at >= thirty_days_ago,
        )
        .count()
    )

    return {
        "total_customers": total,
        "churned": churned,
        "not_churned": not_churned,
        "churn_rate": churn_rate,
        "avg_churn_probability": avg_probability,
        "risk_distribution": {
            "high": high_risk,
            "medium": medium_risk,
            "low": low_risk,
        },
        "active_customers": not_churned,
        "recent_uploads": recent_uploads,
        "model_name": model_service.model_name,
    }


@router.get("/activity")
async def get_activity_data(
    clerk_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
    days: int = Query(default=30, ge=7, le=365),
):
    """
    Get churn activity over time — used for the line chart.
    Returns data points grouped by upload date.
    """
    user = db.query(User).filter(User.clerk_id == clerk_id).first()
    if not user:
        return {"activity": []}

    start_date = datetime.now(timezone.utc) - timedelta(days=days)

    uploads = (
        db.query(FileUpload)
        .filter(
            FileUpload.user_id == user.id,
            FileUpload.created_at >= start_date,
        )
        .order_by(FileUpload.created_at)
        .all()
    )

    activity = []
    for upload in uploads:
        preds = (
            db.query(PredictionResult)
            .filter(PredictionResult.upload_id == upload.id)
            .all()
        )
        total = len(preds)
        churned = sum(1 for p in preds if p.churn_prediction == "Yes")

        activity.append({
            "date": upload.created_at.strftime("%Y-%m-%d") if upload.created_at else None,
            "filename": upload.original_filename,
            "total_customers": total,
            "churned": churned,
            "not_churned": total - churned,
            "churn_rate": round(churned / total * 100, 2) if total > 0 else 0,
        })

    return {"activity": activity}


@router.get("/risk")
async def get_risk_distribution(
    clerk_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
    upload_id: Optional[int] = Query(default=None),
):
    """
    Get risk level distribution — used for the bar chart.
    Optionally filter by a specific upload.
    """
    user = db.query(User).filter(User.clerk_id == clerk_id).first()
    if not user:
        return {"risk": [
            {"level": "Low", "customers": 0},
            {"level": "Medium", "customers": 0},
            {"level": "High", "customers": 0},
        ]}

    query = (
        db.query(PredictionResult)
        .join(FileUpload)
        .filter(FileUpload.user_id == user.id)
    )

    if upload_id:
        query = query.filter(PredictionResult.upload_id == upload_id)

    preds = query.all()

    high = sum(1 for p in preds if p.risk_level == "High")
    medium = sum(1 for p in preds if p.risk_level == "Medium")
    low = sum(1 for p in preds if p.risk_level == "Low")

    return {
        "risk": [
            {"level": "Low", "customers": low},
            {"level": "Medium", "customers": medium},
            {"level": "High", "customers": high},
        ],
        "total": len(preds),
    }


@router.get("/customers")
async def get_customer_list(
    clerk_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
    upload_id: Optional[int] = Query(default=None),
    risk_level: Optional[str] = Query(default=None),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
):
    """
    Get paginated list of customers with their predictions.
    Can filter by upload_id and/or risk_level.
    """
    user = db.query(User).filter(User.clerk_id == clerk_id).first()
    if not user:
        return {"customers": [], "total": 0, "page": page, "page_size": page_size}

    query = (
        db.query(PredictionResult)
        .join(FileUpload)
        .filter(FileUpload.user_id == user.id)
    )

    if upload_id:
        query = query.filter(PredictionResult.upload_id == upload_id)
    if risk_level:
        query = query.filter(PredictionResult.risk_level == risk_level)

    total = query.count()
    offset = (page - 1) * page_size
    preds = (
        query
        .order_by(PredictionResult.churn_probability.desc())
        .offset(offset)
        .limit(page_size)
        .all()
    )

    customers = [
        {
            "id": p.id,
            "upload_id": p.upload_id,
            "index": p.customer_index,
            "customer_data": p.customer_data,
            "churn_prediction": p.churn_prediction,
            "churn_probability": p.churn_probability,
            "risk_level": p.risk_level,
        }
        for p in preds
    ]

    return {
        "customers": customers,
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
    }


@router.get("/feature-importance")
async def get_feature_importance():
    """Get feature importance data for the dashboard chart."""
    importance = model_service.get_feature_importance(10)
    return {"feature_importance": importance}


def _empty_stats():
    """Return empty stats when no data exists."""
    return {
        "total_customers": 0,
        "churned": 0,
        "not_churned": 0,
        "churn_rate": 0,
        "avg_churn_probability": 0,
        "risk_distribution": {"high": 0, "medium": 0, "low": 0},
        "active_customers": 0,
        "recent_uploads": 0,
        "model_name": model_service.model_name,
    }
