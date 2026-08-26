import numpy as np
import pandas as pd

from app.schemas.prediction import CustomerFeatures

PLAN_ENCODING = {"free": 0, "starter": 1, "pro": 2, "enterprise": 3}

FEATURE_COLUMNS = [
    "mrr",
    "health_score",
    "plan_encoded",
    "days_since_signup",
    "days_since_active",
    "support_tickets",
    "feature_usage_pct",
    "login_frequency",
    "nps_score",
    "activity_ratio",
    "engagement_score",
]

# Human-readable labels for the dashboard, so charts don't show raw column names.
FEATURE_LABELS = {
    "mrr": "Monthly revenue",
    "health_score": "Health score",
    "plan_encoded": "Plan tier",
    "days_since_signup": "Account age",
    "days_since_active": "Days since last active",
    "support_tickets": "Support tickets",
    "feature_usage_pct": "Feature usage",
    "login_frequency": "Login frequency",
    "nps_score": "NPS score",
    "activity_ratio": "Inactivity vs tenure",
    "engagement_score": "Engagement score",
}


def _engagement_score(
    health_score: float,
    feature_usage_pct: float,
    login_frequency: float,
    nps_score: float,
    days_since_active: float,
) -> float:
    return (
        health_score * 0.3
        + feature_usage_pct * 0.25
        + login_frequency * 2.0
        + nps_score * 3.0
        - days_since_active * 1.5
    )


def extract_features(features: CustomerFeatures) -> np.ndarray:
    plan_encoded = PLAN_ENCODING.get(str(features.plan).lower(), 0)
    activity_ratio = features.days_since_active / max(features.days_since_signup, 1)
    engagement_score = _engagement_score(
        features.health_score,
        features.feature_usage_pct,
        features.login_frequency,
        features.nps_score,
        features.days_since_active,
    )

    return np.array(
        [
            [
                features.mrr,
                features.health_score,
                plan_encoded,
                features.days_since_signup,
                features.days_since_active,
                features.support_tickets,
                features.feature_usage_pct,
                features.login_frequency,
                features.nps_score,
                activity_ratio,
                engagement_score,
            ]
        ]
    )


def generate_synthetic_data(n_samples: int = 20000) -> tuple[pd.DataFrame, pd.Series]:
    """Cold-start training set.

    Ranges deliberately span what real customer exports contain — including
    long-dormant accounts and high-ticket enterprise contracts — because a
    tree model cannot extrapolate beyond the values it was trained on. An
    earlier version capped inactivity at 90 days, which made every genuinely
    lapsed account score as low risk.
    """
    rng = np.random.default_rng(42)

    # Mixture of pricing shapes: self-serve tiers plus a long tail of
    # negotiated contracts, so large MRR values are in-distribution.
    mrr = np.where(
        rng.random(n_samples) < 0.75,
        rng.choice([0, 29, 49, 99, 299, 499], size=n_samples),
        rng.lognormal(mean=6.5, sigma=0.9, size=n_samples).clip(100, 50000),
    )

    days_since_signup = rng.integers(15, 2200, n_samples)
    # Most customers are recently active; a meaningful tail has gone quiet for
    # months, which is exactly the population the product needs to catch.
    days_since_active = np.where(
        rng.random(n_samples) < 0.7,
        rng.exponential(12, n_samples),
        rng.uniform(60, 500, n_samples),
    )
    days_since_active = np.minimum(days_since_active, days_since_signup).astype(int)

    health_score = rng.uniform(0, 100, n_samples)
    support_tickets = rng.poisson(2.5, n_samples).clip(0, 40)
    feature_usage_pct = rng.uniform(0, 100, n_samples)
    login_frequency = rng.exponential(6, n_samples).clip(0, 60)
    nps_score = rng.uniform(0, 10, n_samples)

    data = {
        "mrr": mrr,
        "health_score": health_score,
        "plan_encoded": rng.choice([0, 1, 2, 3], size=n_samples, p=[0.3, 0.3, 0.25, 0.15]),
        "days_since_signup": days_since_signup,
        "days_since_active": days_since_active,
        "support_tickets": support_tickets,
        "feature_usage_pct": feature_usage_pct,
        "login_frequency": login_frequency,
        "nps_score": nps_score,
    }

    df = pd.DataFrame(data)
    df["activity_ratio"] = df["days_since_active"] / df["days_since_signup"].clip(lower=1)
    df["engagement_score"] = _engagement_score(
        df["health_score"],
        df["feature_usage_pct"],
        df["login_frequency"],
        df["nps_score"],
        df["days_since_active"],
    )

    # Inactivity saturates rather than growing without bound: a customer silent
    # for a year is not twice as likely to churn as one silent for six months,
    # they are simply gone.
    inactivity = np.tanh(df["days_since_active"] / 45.0) * 4.2

    logit = (
        -1.9
        + inactivity
        + df["activity_ratio"] * 1.4
        - df["health_score"] * 0.035
        - df["login_frequency"] * 0.09
        + df["support_tickets"] * 0.13
        - df["nps_score"] * 0.22
        - np.log1p(df["mrr"]) * 0.18
        - df["feature_usage_pct"] * 0.015
    )

    churn_prob = 1 / (1 + np.exp(-logit))
    labels = (rng.random(n_samples) < churn_prob).astype(int)

    return df[FEATURE_COLUMNS], pd.Series(labels, name="churned")
