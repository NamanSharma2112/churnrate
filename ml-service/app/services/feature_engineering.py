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


def extract_features(features: CustomerFeatures) -> np.ndarray:
    plan_encoded = PLAN_ENCODING.get(features.plan, 0)
    activity_ratio = (
        features.days_since_active / max(features.days_since_signup, 1)
    )
    engagement_score = (
        features.health_score * 0.3
        + features.feature_usage_pct * 0.25
        + features.login_frequency * 2.0
        + features.nps_score * 3.0
        - features.days_since_active * 1.5
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


def generate_synthetic_data(n_samples: int = 5000) -> tuple[pd.DataFrame, pd.Series]:
    rng = np.random.default_rng(42)

    data = {
        "mrr": rng.choice([0, 49, 299, 899], size=n_samples, p=[0.3, 0.3, 0.25, 0.15]),
        "health_score": rng.normal(60, 20, n_samples).clip(0, 100),
        "plan_encoded": rng.choice([0, 1, 2, 3], size=n_samples, p=[0.3, 0.3, 0.25, 0.15]),
        "days_since_signup": rng.integers(30, 730, n_samples),
        "days_since_active": rng.exponential(10, n_samples).astype(int).clip(0, 90),
        "support_tickets": rng.poisson(2, n_samples),
        "feature_usage_pct": rng.normal(50, 25, n_samples).clip(0, 100),
        "login_frequency": rng.exponential(5, n_samples).clip(0, 30),
        "nps_score": rng.normal(7, 2, n_samples).clip(0, 10),
    }

    df = pd.DataFrame(data)
    df["activity_ratio"] = df["days_since_active"] / df["days_since_signup"].clip(lower=1)
    df["engagement_score"] = (
        df["health_score"] * 0.3
        + df["feature_usage_pct"] * 0.25
        + df["login_frequency"] * 2.0
        + df["nps_score"] * 3.0
        - df["days_since_active"] * 1.5
    )

    churn_prob = 1 / (
        1
        + np.exp(
            -(
                -3
                + df["days_since_active"] * 0.08
                - df["health_score"] * 0.04
                - df["login_frequency"] * 0.1
                + df["support_tickets"] * 0.15
                - df["nps_score"] * 0.2
                - df["mrr"] * 0.001
                - df["feature_usage_pct"] * 0.02
            )
        )
    )

    labels = (rng.random(n_samples) < churn_prob).astype(int)

    return df[FEATURE_COLUMNS], pd.Series(labels, name="churned")
