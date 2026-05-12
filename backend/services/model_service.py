"""
Model Service — wraps the CustomerChurnPredictor for API usage.
Handles model initialization, training, and prediction requests.
"""

import pandas as pd
import numpy as np
import os
import sys
import pickle
from typing import Optional

# Add the model directory to path so we can import the predictor
MODEL_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "model")
sys.path.insert(0, MODEL_DIR)


class ModelService:
    """
    Singleton wrapper around CustomerChurnPredictor.
    Manages model lifecycle: load saved model or train fresh on startup.
    """

    _instance: Optional["ModelService"] = None
    _initialized: bool = False

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
        self._initialized = True
        self._predictor = None
        self._model_ready = False
        self._feature_names = []

    def initialize(self):
        """
        Initialize the model service.
        Tries to load a saved model, falls back to training on sample data.
        """
        # Import the predictor class from the model file
        try:
            # We'll recreate the essential parts inline to avoid import issues
            # with the interactive input() calls in the original code
            self._predictor = self._create_predictor()
            self._try_load_or_train()
            print("[OK] Model service initialized successfully")
        except Exception as e:
            print(f"[WARN] Model service initialization error: {e}")
            print("  Attempting fallback initialization with sample data...")
            self._fallback_init()

    def _create_predictor(self):
        """Create a fresh CustomerChurnPredictor instance."""
        from sklearn.preprocessing import StandardScaler, LabelEncoder
        from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
        from sklearn.linear_model import LogisticRegression
        from sklearn.svm import SVC
        from sklearn.model_selection import train_test_split
        from sklearn.metrics import f1_score

        class APIPredictor:
            """Streamlined predictor for API use (no interactive input)."""

            def __init__(self):
                self.models = {}
                self.scaler = StandardScaler()
                self.label_encoders = {}
                self.feature_names = []
                self.best_model = None
                self.best_model_name = None
                self.model_dir = os.path.join(
                    os.path.dirname(os.path.dirname(__file__)), "model_data"
                )
                os.makedirs(self.model_dir, exist_ok=True)

            def generate_sample_data(self, n_samples=2000):
                np.random.seed(42)
                data = {
                    "customer_id": [f"CUST{i:05d}" for i in range(1, n_samples + 1)],
                    "age": np.random.randint(18, 80, n_samples),
                    "gender": np.random.choice(["Male", "Female"], n_samples),
                    "tenure": np.random.randint(0, 72, n_samples),
                    "phone_service": np.random.choice(["Yes", "No"], n_samples, p=[0.9, 0.1]),
                    "multiple_lines": np.random.choice(
                        ["Yes", "No", "No phone service"], n_samples, p=[0.4, 0.5, 0.1]
                    ),
                    "internet_service": np.random.choice(
                        ["DSL", "Fiber optic", "No"], n_samples, p=[0.35, 0.45, 0.2]
                    ),
                    "online_security": np.random.choice(
                        ["Yes", "No", "No internet service"], n_samples, p=[0.3, 0.5, 0.2]
                    ),
                    "online_backup": np.random.choice(
                        ["Yes", "No", "No internet service"], n_samples, p=[0.35, 0.45, 0.2]
                    ),
                    "device_protection": np.random.choice(
                        ["Yes", "No", "No internet service"], n_samples, p=[0.35, 0.45, 0.2]
                    ),
                    "tech_support": np.random.choice(
                        ["Yes", "No", "No internet service"], n_samples, p=[0.3, 0.5, 0.2]
                    ),
                    "streaming_tv": np.random.choice(
                        ["Yes", "No", "No internet service"], n_samples, p=[0.4, 0.4, 0.2]
                    ),
                    "streaming_movies": np.random.choice(
                        ["Yes", "No", "No internet service"], n_samples, p=[0.4, 0.4, 0.2]
                    ),
                    "contract": np.random.choice(
                        ["Month-to-month", "One year", "Two year"],
                        n_samples,
                        p=[0.55, 0.21, 0.24],
                    ),
                    "paperless_billing": np.random.choice(
                        ["Yes", "No"], n_samples, p=[0.6, 0.4]
                    ),
                    "payment_method": np.random.choice(
                        ["Electronic check", "Mailed check", "Bank transfer", "Credit card"],
                        n_samples,
                        p=[0.34, 0.19, 0.22, 0.25],
                    ),
                    "monthly_charges": np.round(np.random.uniform(18, 120, n_samples), 2),
                    "total_charges": np.round(np.random.uniform(0, 8000, n_samples), 2),
                }
                df = pd.DataFrame(data)
                churn_prob = (
                    (df["tenure"] < 12) * 0.4
                    + (df["contract"] == "Month-to-month") * 0.3
                    + (df["monthly_charges"] > 80) * 0.2
                    + (df["online_security"] == "No") * 0.1
                    + np.random.random(n_samples) * 0.1
                )
                df["churn"] = (churn_prob > 0.5).astype(int)
                return df

            def preprocess_data(self, df, fit=True):
                df = df.copy()
                id_columns = [
                    col
                    for col in df.columns
                    if "id" in col.lower() and col.lower() != "churn"
                ]
                for col in id_columns:
                    df = df.drop(col, axis=1)

                if "churn" in df.columns:
                    y = df["churn"]
                    X = df.drop("churn", axis=1)
                else:
                    y = None
                    X = df

                X = X.fillna(0)
                categorical_cols = X.select_dtypes(include=["object"]).columns

                for col in categorical_cols:
                    if fit:
                        self.label_encoders[col] = LabelEncoder()
                        X[col] = self.label_encoders[col].fit_transform(X[col].astype(str))
                    else:
                        if col in self.label_encoders:
                            known = set(self.label_encoders[col].classes_)
                            X[col] = X[col].astype(str).apply(
                                lambda x, k=known, le=self.label_encoders[col]: x
                                if x in k
                                else le.classes_[0]
                            )
                            X[col] = self.label_encoders[col].transform(X[col])
                        else:
                            X[col] = pd.to_numeric(X[col], errors="coerce").fillna(0)

                self.feature_names = X.columns.tolist()

                if fit:
                    X_scaled = pd.DataFrame(
                        self.scaler.fit_transform(X), columns=X.columns
                    )
                else:
                    X_scaled = pd.DataFrame(
                        self.scaler.transform(X), columns=X.columns
                    )

                return X_scaled, y

            def train(self, df):
                X, y = self.preprocess_data(df, fit=True)
                X_train, X_test, y_train, y_test = train_test_split(
                    X, y, test_size=0.2, random_state=42, stratify=y
                )

                models = {
                    "Random Forest": RandomForestClassifier(
                        n_estimators=100, random_state=42, n_jobs=-1
                    ),
                    "Gradient Boosting": GradientBoostingClassifier(random_state=42),
                }

                best_f1 = 0
                for name, model in models.items():
                    model.fit(X_train, y_train)
                    preds = model.predict(X_test)
                    f1 = f1_score(y_test, preds)
                    print(f"  {name}: F1={f1:.4f}")
                    if f1 > best_f1:
                        best_f1 = f1
                        self.best_model = model
                        self.best_model_name = name
                    self.models[name] = model

                print(f"  [OK] Best model: {self.best_model_name} (F1={best_f1:.4f})")
                return best_f1

            def predict(self, df):
                """Run predictions on a DataFrame. Returns list of result dicts."""
                df = df.copy()

                # Remove churn column if present (we're predicting it)
                if "churn" in df.columns:
                    df = df.drop("churn", axis=1)

                # Align columns with training features
                # Drop ID columns
                id_columns = [
                    col for col in df.columns if "id" in col.lower()
                ]
                for col in id_columns:
                    df = df.drop(col, axis=1)

                # Handle missing/extra columns
                for feat in self.feature_names:
                    if feat not in df.columns:
                        # Try case-insensitive match
                        matched = False
                        for col in df.columns:
                            if col.lower() == feat.lower():
                                df = df.rename(columns={col: feat})
                                matched = True
                                break
                        if not matched:
                            df[feat] = 0

                # Keep only known features in correct order
                df = df[[f for f in self.feature_names if f in df.columns]]

                # Encode categoricals
                categorical_cols = df.select_dtypes(include=["object"]).columns
                for col in categorical_cols:
                    if col in self.label_encoders:
                        known = set(self.label_encoders[col].classes_)
                        df[col] = df[col].astype(str).apply(
                            lambda x, k=known, le=self.label_encoders[col]: x
                            if x in k
                            else le.classes_[0]
                        )
                        df[col] = self.label_encoders[col].transform(df[col])
                    else:
                        df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0)

                # Ensure numeric
                for col in df.columns:
                    if df[col].dtype == "object":
                        df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0)

                # Scale
                df_scaled = pd.DataFrame(
                    self.scaler.transform(df), columns=df.columns
                )

                # Predict
                predictions = self.best_model.predict(df_scaled)
                probabilities = self.best_model.predict_proba(df_scaled)[:, 1]

                results = []
                for i in range(len(df)):
                    prob = float(probabilities[i])
                    results.append(
                        {
                            "churn_prediction": "Yes" if predictions[i] == 1 else "No",
                            "churn_probability": round(prob, 4),
                            "risk_level": (
                                "Low" if prob < 0.3 else "Medium" if prob < 0.6 else "High"
                            ),
                        }
                    )
                return results

            def get_feature_importance(self, top_n=10):
                if self.best_model_name in ["Random Forest", "Gradient Boosting"]:
                    importances = self.best_model.feature_importances_
                    fi = pd.DataFrame(
                        {"feature": self.feature_names, "importance": importances}
                    ).sort_values("importance", ascending=False)
                    return fi.head(top_n).to_dict("records")
                return []

            def save(self):
                data = {
                    "model": self.best_model,
                    "model_name": self.best_model_name,
                    "feature_names": self.feature_names,
                    "scaler": self.scaler,
                    "label_encoders": self.label_encoders,
                    "models": self.models,
                }
                path = os.path.join(self.model_dir, "model.pkl")
                with open(path, "wb") as f:
                    pickle.dump(data, f)
                print(f"  [OK] Model saved to {path}")

            def load(self):
                path = os.path.join(self.model_dir, "model.pkl")
                if not os.path.exists(path):
                    return False
                with open(path, "rb") as f:
                    data = pickle.load(f)
                self.best_model = data["model"]
                self.best_model_name = data["model_name"]
                self.feature_names = data["feature_names"]
                self.scaler = data["scaler"]
                self.label_encoders = data["label_encoders"]
                self.models = data.get("models", {})
                print(f"  [OK] Model loaded: {self.best_model_name}")
                return True

        return APIPredictor()

    def _try_load_or_train(self):
        """Try to load a saved model, or train on sample data."""
        if self._predictor.load():
            self._model_ready = True
            self._feature_names = self._predictor.feature_names
        else:
            print("  No saved model found -- training on sample data...")
            df = self._predictor.generate_sample_data(2000)
            self._predictor.train(df)
            self._predictor.save()
            self._model_ready = True
            self._feature_names = self._predictor.feature_names

    def _fallback_init(self):
        """Last-resort initialization with fresh sample data."""
        try:
            self._predictor = self._create_predictor()
            df = self._predictor.generate_sample_data(2000)
            self._predictor.train(df)
            self._predictor.save()
            self._model_ready = True
            self._feature_names = self._predictor.feature_names
            print("  [OK] Fallback initialization succeeded")
        except Exception as e:
            print(f"  [FAIL] Fallback initialization failed: {e}")
            self._model_ready = False

    @property
    def is_ready(self) -> bool:
        return self._model_ready

    @property
    def feature_names(self) -> list:
        return self._feature_names

    @property
    def model_name(self) -> str:
        return self._predictor.best_model_name if self._predictor else "None"

    def predict(self, df: pd.DataFrame) -> list:
        """Run churn predictions on a DataFrame."""
        if not self._model_ready:
            raise RuntimeError("Model is not initialized")
        return self._predictor.predict(df)

    def get_feature_importance(self, top_n: int = 10) -> list:
        """Get top feature importances."""
        if not self._model_ready:
            return []
        return self._predictor.get_feature_importance(top_n)

    def train_on_data(self, df: pd.DataFrame) -> float:
        """Re-train the model on new data. Returns best F1 score."""
        if self._predictor is None:
            self._predictor = self._create_predictor()
        f1 = self._predictor.train(df)
        self._predictor.save()
        self._model_ready = True
        self._feature_names = self._predictor.feature_names
        return f1


# Global singleton
model_service = ModelService()
