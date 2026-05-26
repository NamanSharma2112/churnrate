from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router as api_router
from app.services.model_manager import ModelManager

app = FastAPI(
    title="ChurnRate ML Service",
    description="Machine learning service for customer churn prediction",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_manager = ModelManager()


@app.on_event("startup")
async def startup():
    model_manager.load_or_train()


@app.get("/health")
async def health():
    return {
        "status": "ok",
        "model_loaded": model_manager.is_loaded(),
        "model_version": model_manager.get_version(),
    }


app.state.model_manager = model_manager
app.include_router(api_router, prefix="/api")
