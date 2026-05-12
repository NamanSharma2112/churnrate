"""
Prediction Routes — Upload CSV/XML files and run churn predictions.
"""

from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional

from database import get_db, User, FileUpload, PredictionResult
from auth import get_current_user_id
from services.model_service import model_service
from services.file_service import save_uploaded_file, parse_file, get_file_type

router = APIRouter(prefix="/api/predict", tags=["Predictions"])


@router.post("/upload")
async def upload_and_predict(
    file: UploadFile = File(...),
    clerk_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    """
    Upload a CSV or XML file and run churn predictions on all rows.
    
    Returns prediction results for each customer in the file.
    """
    if not model_service.is_ready:
        raise HTTPException(status_code=503, detail="Model is not ready. Please try again later.")

    # Validate file type
    try:
        file_type = get_file_type(file.filename or "unknown")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Read and save file
    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="Uploaded file is empty")

    saved_filename, file_path = save_uploaded_file(content, file.filename or "upload")

    # Parse file into DataFrame
    try:
        df = parse_file(file_path, file_type)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse file: {str(e)}")

    if df.empty:
        raise HTTPException(status_code=400, detail="No data found in the uploaded file")

    # Get or create user
    user = db.query(User).filter(User.clerk_id == clerk_id).first()
    if not user:
        user = User(clerk_id=clerk_id)
        db.add(user)
        db.commit()
        db.refresh(user)

    # Create file upload record
    upload = FileUpload(
        user_id=user.id,
        filename=saved_filename,
        original_filename=file.filename or "upload",
        file_type=file_type,
        file_size=len(content),
        file_path=file_path,
        row_count=len(df),
    )
    db.add(upload)
    db.commit()
    db.refresh(upload)

    # Run predictions
    try:
        predictions = model_service.predict(df)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

    # Store prediction results
    prediction_records = []
    for i, pred in enumerate(predictions):
        # Build customer data dict from original row
        row_data = df.iloc[i].to_dict()
        # Convert numpy types to native Python types for JSON storage
        clean_data = {}
        for k, v in row_data.items():
            try:
                if hasattr(v, "item"):
                    clean_data[k] = v.item()
                else:
                    clean_data[k] = v
            except Exception:
                clean_data[k] = str(v)

        record = PredictionResult(
            upload_id=upload.id,
            customer_index=i,
            customer_data=clean_data,
            churn_prediction=pred["churn_prediction"],
            churn_probability=pred["churn_probability"],
            risk_level=pred["risk_level"],
        )
        prediction_records.append(record)

    db.add_all(prediction_records)
    db.commit()

    # Build response
    results = []
    for i, pred in enumerate(predictions):
        row_data = df.iloc[i].to_dict()
        clean_data = {}
        for k, v in row_data.items():
            try:
                if hasattr(v, "item"):
                    clean_data[k] = v.item()
                else:
                    clean_data[k] = v
            except Exception:
                clean_data[k] = str(v)

        results.append({
            "index": i,
            "customer_data": clean_data,
            **pred,
        })

    # Summary statistics
    total = len(predictions)
    churned = sum(1 for p in predictions if p["churn_prediction"] == "Yes")
    high_risk = sum(1 for p in predictions if p["risk_level"] == "High")
    medium_risk = sum(1 for p in predictions if p["risk_level"] == "Medium")
    low_risk = sum(1 for p in predictions if p["risk_level"] == "Low")

    return {
        "upload_id": upload.id,
        "filename": file.filename,
        "file_type": file_type,
        "total_customers": total,
        "summary": {
            "churned": churned,
            "not_churned": total - churned,
            "churn_rate": round(churned / total * 100, 2) if total > 0 else 0,
            "high_risk": high_risk,
            "medium_risk": medium_risk,
            "low_risk": low_risk,
        },
        "predictions": results,
    }


@router.get("/history")
async def get_prediction_history(
    clerk_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
    limit: int = Query(default=10, ge=1, le=100),
):
    """Get the user's past file uploads and prediction summaries."""
    user = db.query(User).filter(User.clerk_id == clerk_id).first()
    if not user:
        return {"uploads": []}

    uploads = (
        db.query(FileUpload)
        .filter(FileUpload.user_id == user.id)
        .order_by(FileUpload.created_at.desc())
        .limit(limit)
        .all()
    )

    results = []
    for upload in uploads:
        preds = db.query(PredictionResult).filter(PredictionResult.upload_id == upload.id).all()
        total = len(preds)
        churned = sum(1 for p in preds if p.churn_prediction == "Yes")
        high_risk = sum(1 for p in preds if p.risk_level == "High")

        results.append({
            "id": upload.id,
            "filename": upload.original_filename,
            "file_type": upload.file_type,
            "row_count": upload.row_count,
            "uploaded_at": upload.created_at.isoformat() if upload.created_at else None,
            "summary": {
                "total": total,
                "churned": churned,
                "churn_rate": round(churned / total * 100, 2) if total > 0 else 0,
                "high_risk": high_risk,
            },
        })

    return {"uploads": results}


@router.get("/history/{upload_id}")
async def get_upload_details(
    upload_id: int,
    clerk_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    """Get detailed predictions for a specific upload."""
    user = db.query(User).filter(User.clerk_id == clerk_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    upload = (
        db.query(FileUpload)
        .filter(FileUpload.id == upload_id, FileUpload.user_id == user.id)
        .first()
    )
    if not upload:
        raise HTTPException(status_code=404, detail="Upload not found")

    preds = (
        db.query(PredictionResult)
        .filter(PredictionResult.upload_id == upload.id)
        .order_by(PredictionResult.customer_index)
        .all()
    )

    predictions = [
        {
            "index": p.customer_index,
            "customer_data": p.customer_data,
            "churn_prediction": p.churn_prediction,
            "churn_probability": p.churn_probability,
            "risk_level": p.risk_level,
        }
        for p in preds
    ]

    total = len(predictions)
    churned = sum(1 for p in preds if p.churn_prediction == "Yes")
    high_risk = sum(1 for p in preds if p.risk_level == "High")
    medium_risk = sum(1 for p in preds if p.risk_level == "Medium")
    low_risk = sum(1 for p in preds if p.risk_level == "Low")

    return {
        "upload": {
            "id": upload.id,
            "filename": upload.original_filename,
            "file_type": upload.file_type,
            "row_count": upload.row_count,
            "uploaded_at": upload.created_at.isoformat() if upload.created_at else None,
        },
        "summary": {
            "total": total,
            "churned": churned,
            "not_churned": total - churned,
            "churn_rate": round(churned / total * 100, 2) if total > 0 else 0,
            "high_risk": high_risk,
            "medium_risk": medium_risk,
            "low_risk": low_risk,
        },
        "predictions": predictions,
    }


@router.get("/features")
async def get_model_features():
    """Get the feature names the model expects (useful for frontend forms)."""
    return {
        "model_name": model_service.model_name,
        "model_ready": model_service.is_ready,
        "features": model_service.feature_names,
        "feature_importance": model_service.get_feature_importance(10),
    }
