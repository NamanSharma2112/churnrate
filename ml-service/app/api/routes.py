from fastapi import APIRouter, HTTPException, Request

from app.schemas.prediction import (
    PredictionRequest,
    PredictionResponse,
    BatchPredictionRequest,
    BatchPredictionResponse,
    TrainRequest,
    TrainResponse,
)
from app.services.feature_engineering import extract_features

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

    risk_level = (
        "critical"
        if probability > 0.8
        else "high"
        if probability > 0.6
        else "medium"
        if probability > 0.4
        else "low"
    )

    return PredictionResponse(
        customer_id=body.customer_id,
        probability=round(probability, 4),
        risk_level=risk_level,
        top_factors=top_factors,
        model_version=manager.get_version(),
    )


@router.post("/predict/batch", response_model=BatchPredictionResponse)
async def batch_predict(request: Request, body: BatchPredictionRequest):
    manager = get_model_manager(request)
    if not manager.is_loaded():
        raise HTTPException(status_code=503, detail="Model not loaded")

    predictions = []
    for customer in body.customers:
        features = extract_features(customer.features)
        probability, top_factors = manager.predict(features)

        risk_level = (
            "critical"
            if probability > 0.8
            else "high"
            if probability > 0.6
            else "medium"
            if probability > 0.4
            else "low"
        )

        predictions.append(
            PredictionResponse(
                customer_id=customer.customer_id,
                probability=round(probability, 4),
                risk_level=risk_level,
                top_factors=top_factors,
                model_version=manager.get_version(),
            )
        )

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


@router.get("/model/info")
async def model_info(request: Request):
    manager = get_model_manager(request)
    return {
        "loaded": manager.is_loaded(),
        "version": manager.get_version(),
        "metrics": manager.get_metrics(),
    }
