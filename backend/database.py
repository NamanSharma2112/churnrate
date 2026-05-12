"""
Database setup and ORM models using SQLAlchemy.
Stores user profiles, uploaded files metadata, and prediction results.
"""

from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Text, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime, timezone
from config import get_settings

settings = get_settings()

engine = create_engine(
    settings.database_url,
    connect_args={"check_same_thread": False}  # Needed for SQLite
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# ─── ORM Models ──────────────────────────────────────────────────────────

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    clerk_id = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, nullable=True)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    avatar_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    uploads = relationship("FileUpload", back_populates="user")


class FileUpload(Base):
    __tablename__ = "file_uploads"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    filename = Column(String, nullable=False)
    original_filename = Column(String, nullable=False)
    file_type = Column(String, nullable=False)  # csv or xml
    file_size = Column(Integer, nullable=True)
    file_path = Column(String, nullable=False)
    row_count = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relationships
    user = relationship("User", back_populates="uploads")
    predictions = relationship("PredictionResult", back_populates="upload")


class PredictionResult(Base):
    __tablename__ = "prediction_results"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    upload_id = Column(Integer, ForeignKey("file_uploads.id"), nullable=False)
    customer_index = Column(Integer, nullable=False)
    customer_data = Column(JSON, nullable=True)  # Store original row as JSON
    churn_prediction = Column(String, nullable=False)  # "Yes" or "No"
    churn_probability = Column(Float, nullable=False)
    risk_level = Column(String, nullable=False)  # "Low", "Medium", "High"
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relationships
    upload = relationship("FileUpload", back_populates="predictions")


# ─── Database Initialization ─────────────────────────────────────────────

def init_db():
    """Create all database tables."""
    Base.metadata.create_all(bind=engine)


def get_db():
    """Dependency that provides a database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
