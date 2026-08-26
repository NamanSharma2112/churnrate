from pydantic import BaseModel, ConfigDict


class CustomerFeatures(BaseModel):
    # Companies send whatever columns they have; unknown extras are ignored
    # rather than rejected so an import never fails on a stray field.
    model_config = ConfigDict(extra="ignore")

    mrr: float = 0.0
    health_score: float = 50.0
    plan: str = "free"
    days_since_signup: int = 0
    days_since_active: int = 0
    support_tickets: int = 0
    feature_usage_pct: float = 50.0
    login_frequency: float = 5.0
    nps_score: float = 7.0


class PredictionRequest(BaseModel):
    customer_id: str
    features: CustomerFeatures


class PredictionFactor(BaseModel):
    feature: str
    impact: float
    label: str | None = None
    direction: str | None = None


class PredictionResponse(BaseModel):
    customer_id: str
    probability: float
    risk_level: str
    top_factors: list[PredictionFactor]
    model_version: str


class BatchPredictionRequest(BaseModel):
    customers: list[PredictionRequest]


class BatchPredictionResponse(BaseModel):
    predictions: list[PredictionResponse]
    total: int


class TrainRequest(BaseModel):
    force: bool = False


class TrainResponse(BaseModel):
    message: str
    model_version: str
    metrics: dict
