import json
import os
import time
import joblib
import numpy as np
from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
)
import xgboost as xgb
from xgboost import XGBClassifier

from app.services.feature_engineering import (
    generate_synthetic_data,
    FEATURE_COLUMNS,
    FEATURE_LABELS,
)

MODEL_DIR = Path(__file__).parent.parent.parent / "data" / "models"

# Bumped whenever the feature distribution or column set changes, so a stale
# model on disk is retrained instead of silently reused.
SCHEMA_VERSION = 2


class ModelManager:
    def __init__(self):
        self._model: XGBClassifier | None = None
        self._version: str = ""
        self._metrics: dict = {}

    def is_loaded(self) -> bool:
        return self._model is not None

    def get_version(self) -> str:
        return self._version

    def get_metrics(self) -> dict:
        return self._metrics

    def load_or_train(self) -> None:
        MODEL_DIR.mkdir(parents=True, exist_ok=True)
        model_path = MODEL_DIR / "churn_model.joblib"
        meta_path = MODEL_DIR / "churn_model.meta.json"

        if model_path.exists() and meta_path.exists():
            try:
                meta = json.loads(meta_path.read_text())
            except (OSError, ValueError):
                meta = {}

            # A model trained against an older feature distribution scores every
            # customer as low risk, so retrain rather than load it.
            if meta.get("schema_version") == SCHEMA_VERSION:
                self._model = joblib.load(model_path)
                self._version = os.environ.get("MODEL_VERSION", meta.get("version", "v2"))
                self._metrics = meta.get("metrics", {})
                print(f"Loaded model version {self._version}")
                return
            print("Stored model uses an outdated feature schema; retraining.")

        self.train()

    def train(self) -> dict:
        print("Training churn prediction model...")
        X, y = generate_synthetic_data(20000)

        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )

        model = XGBClassifier(
            n_estimators=200,
            max_depth=6,
            learning_rate=0.1,
            subsample=0.8,
            colsample_bytree=0.8,
            random_state=42,
            eval_metric="logloss",
        )

        model.fit(X_train, y_train)

        y_pred = model.predict(X_test)
        y_proba = model.predict_proba(X_test)[:, 1]

        self._metrics = {
            "accuracy": round(accuracy_score(y_test, y_pred), 4),
            "precision": round(precision_score(y_test, y_pred), 4),
            "recall": round(recall_score(y_test, y_pred), 4),
            "f1": round(f1_score(y_test, y_pred), 4),
            "auc_roc": round(roc_auc_score(y_test, y_proba), 4),
        }

        self._version = f"v2.0-{int(time.time())}"
        self._model = model

        MODEL_DIR.mkdir(parents=True, exist_ok=True)
        joblib.dump(model, MODEL_DIR / "churn_model.joblib")
        (MODEL_DIR / "churn_model.meta.json").write_text(
            json.dumps(
                {
                    "schema_version": SCHEMA_VERSION,
                    "version": self._version,
                    "metrics": self._metrics,
                    "features": FEATURE_COLUMNS,
                }
            )
        )

        print(f"Model trained: {self._version}")
        print(f"Metrics: {self._metrics}")

        return self._metrics

    def predict(self, features: np.ndarray) -> tuple[float, list[dict]]:
        probabilities, factors = self.predict_batch(features)
        return probabilities[0], factors[0]

    def predict_batch(
        self, features: np.ndarray
    ) -> tuple[list[float], list[list[dict]]]:
        """Scores a matrix of customers and explains each row individually.

        Global feature importances are identical for every customer, which makes
        a "why is this account at risk" panel meaningless. SHAP contributions
        from the booster are per-row, so each customer gets the factors that
        actually drove *their* score.
        """
        if self._model is None:
            raise RuntimeError("Model not loaded")

        probabilities = [float(p) for p in self._model.predict_proba(features)[:, 1]]

        try:
            booster = self._model.get_booster()
            dmatrix = xgb.DMatrix(features, feature_names=FEATURE_COLUMNS)
            # Last column is the bias term, which is not a feature.
            contributions = booster.predict(dmatrix, pred_contribs=True)[:, :-1]
        except Exception as exc:  # pragma: no cover - falls back to global view
            print(f"SHAP contributions unavailable ({exc}); using global importances")
            importances = self._model.feature_importances_
            shared = [
                {
                    "feature": name,
                    "label": FEATURE_LABELS.get(name, name),
                    "impact": round(float(imp), 4),
                    "direction": "unknown",
                }
                for name, imp in sorted(
                    zip(FEATURE_COLUMNS, importances), key=lambda x: x[1], reverse=True
                )[:5]
            ]
            return probabilities, [shared for _ in probabilities]

        factors: list[list[dict]] = []
        for row in contributions:
            total = float(np.abs(row).sum()) or 1.0
            ranked = sorted(
                zip(FEATURE_COLUMNS, row),
                key=lambda pair: abs(pair[1]),
                reverse=True,
            )[:5]
            factors.append(
                [
                    {
                        "feature": name,
                        "label": FEATURE_LABELS.get(name, name),
                        "impact": round(float(value) / total, 4),
                        # Whether this signal pushed the customer toward or away
                        # from churn, so the UI can colour it.
                        "direction": "increases_risk" if value > 0 else "reduces_risk",
                    }
                    for name, value in ranked
                ]
            )

        return probabilities, factors
