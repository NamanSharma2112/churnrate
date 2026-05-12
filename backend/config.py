"""
Configuration settings for the Churn Rate Backend.
Loads values from .env file using pydantic-settings.
"""

from pydantic_settings import BaseSettings
from functools import lru_cache
import os


class Settings(BaseSettings):
    # Clerk Auth
    clerk_publishable_key: str = "pk_test_your_key_here"
    clerk_secret_key: str = "sk_test_your_key_here"

    # Database
    database_url: str = "sqlite:///./churn_app.db"

    # File uploads
    upload_dir: str = "./uploads"
    max_file_size_mb: int = 50

    # CORS
    frontend_url: str = "http://localhost:3000"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
