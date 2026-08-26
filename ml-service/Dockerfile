FROM python:3.11-slim

WORKDIR /app

# libgomp is required by XGBoost at runtime.
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential libgomp1 && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Train the model at build time so the first request is not blocked by a
# cold-start training run.
RUN python -c "from app.services.model_manager import ModelManager; ModelManager().load_or_train()"

EXPOSE 8001

CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8001}"]
