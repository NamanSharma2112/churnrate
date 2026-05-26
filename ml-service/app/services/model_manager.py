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
from xgboost import XGBClassifier

from app.services.feature_engineering import (
    generate_synthetic_data,
    FEATURE_COLUMNS,
)

MODEL_DIR = Path(__file__).parent.parent.parent / "data" / "models"


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

        if model_path.exists():
            self._model = joblib.load(model_path)
            self._version = os.environ.get(
                "MODEL_VERSION",
                f"v1.0-{int(model_path.stat().st_mtime)}",
            )
            print(f"Loaded model version {self._version}")
        else:
            self.train()

    def train(self) -> dict:
        print("Training churn prediction model...")
        X, y = generate_synthetic_data(5000)

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
            use_label_encoder=False,
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

        self._version = f"v1.0-{int(time.time())}"
        self._model = model

        MODEL_DIR.mkdir(parents=True, exist_ok=True)
        joblib.dump(model, MODEL_DIR / "churn_model.joblib")

        print(f"Model trained: {self._version}")
        print(f"Metrics: {self._metrics}")

        return self._metrics

    def predict(self, features: np.ndarray) -> tuple[float, list[dict]]:
        if self._model is None:
            raise RuntimeError("Model not loaded")

        probability = float(self._model.predict_proba(features)[0][1])

        importances = self._model.feature_importances_
        feature_impacts = sorted(
            zip(FEATURE_COLUMNS, importances),
            key=lambda x: x[1],
            reverse=True,
        )

        top_factors = [
            {"feature": name, "impact": round(float(imp), 4)}
            for name, imp in feature_impacts[:5]
        ]

        return probability, top_factors
