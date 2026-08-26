from fastapi import APIRouter, HTTPException, Request

from app.schemas.prediction import (
    PredictionRequest,
    PredictionResponse,
    BatchPredictionRequest,
    BatchPredictionResponse,
    TrainRequest,
    TrainResponse,
)
import numpy as np

from app.services.feature_engineering import extract_features, FEATURE_LABELS


def risk_level_for(probability: float) -> str:
    if probability > 0.8:
        return "critical"
    if probability > 0.6:
        return "high"
    if probability > 0.4:
        return "medium"
    return "low"

router = APIRouter()


def get_model_manager(request: Request):
    return request.app.state.model_manager


@router.post("/predict", response_model=PredictionResponse)
async def predict(request: Request, body: PredictionRequest):
    manager = get_model_manager(request)
    if not manager.is_loaded():
        raise HTTPException(status_code=503, detail="Model not loaded")

    features = extract_features(body.features)
    probability, top_factors = manager.predict(features)

    return PredictionResponse(
        customer_id=body.customer_id,
        probability=round(probability, 4),
        risk_level=risk_level_for(probability),
        top_factors=top_factors,
        model_version=manager.get_version(),
    )


@router.post("/predict/batch", response_model=BatchPredictionResponse)
async def batch_predict(request: Request, body: BatchPredictionRequest):
    manager = get_model_manager(request)
    if not manager.is_loaded():
        raise HTTPException(status_code=503, detail="Model not loaded")

    if not body.customers:
        return BatchPredictionResponse(predictions=[], total=0)

    matrix = np.vstack([extract_features(c.features) for c in body.customers])
    probabilities, factors = manager.predict_batch(matrix)

    predictions = [
        PredictionResponse(
            customer_id=customer.customer_id,
            probability=round(probability, 4),
            risk_level=risk_level_for(probability),
            top_factors=top_factors,
            model_version=manager.get_version(),
        )
        for customer, probability, top_factors in zip(
            body.customers, probabilities, factors
        )
    ]

    return BatchPredictionResponse(predictions=predictions, total=len(predictions))


@router.post("/train", response_model=TrainResponse)
async def train_model(request: Request, body: TrainRequest):
    manager = get_model_manager(request)
    metrics = manager.train()

    return TrainResponse(
        message="Model trained successfully",
        model_version=manager.get_version(),
        metrics=metrics,
    )


@router.get("/features")
async def feature_schema():
    """The signals the model consumes, for mapping and documentation UIs."""
    return {
        "features": [
            {"name": name, "label": label}
            for name, label in FEATURE_LABELS.items()
        ]
    }


@router.get("/model/info")
async def model_info(request: Request):
    manager = get_model_manager(request)
    return {
        "loaded": manager.is_loaded(),
        "version": manager.get_version(),
        "metrics": manager.get_metrics(),
    }
