"""
User Routes — manage user profiles synced with Clerk.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

from database import get_db, User
from auth import get_current_user_id, get_current_user_claims

router = APIRouter(prefix="/api/users", tags=["Users"])


class UserProfileUpdate(BaseModel):
    email: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    avatar_url: Optional[str] = None


@router.get("/me")
async def get_current_user_profile(
    clerk_id: str = Depends(get_current_user_id),
    claims: dict = Depends(get_current_user_claims),
    db: Session = Depends(get_db),
):
    """
    Get or create the current user's profile.
    Syncs basic info from Clerk token claims on each request.
    """
    user = db.query(User).filter(User.clerk_id == clerk_id).first()

    # Extract info from Clerk claims
    email = claims.get("email") or claims.get("email_address")
    first_name = claims.get("first_name")
    last_name = claims.get("last_name")
    avatar_url = claims.get("image_url") or claims.get("profile_image_url")

    if not user:
        # Create new user
        user = User(
            clerk_id=clerk_id,
            email=email,
            first_name=first_name,
            last_name=last_name,
            avatar_url=avatar_url,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    else:
        # Update user info from Clerk (sync on each login)
        updated = False
        if email and user.email != email:
            user.email = email
            updated = True
        if first_name and user.first_name != first_name:
            user.first_name = first_name
            updated = True
        if last_name and user.last_name != last_name:
            user.last_name = last_name
            updated = True
        if avatar_url and user.avatar_url != avatar_url:
            user.avatar_url = avatar_url
            updated = True
        if updated:
            db.commit()
            db.refresh(user)

    return {
        "id": user.id,
        "clerk_id": user.clerk_id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "avatar_url": user.avatar_url,
        "created_at": user.created_at.isoformat() if user.created_at else None,
    }


@router.put("/me")
async def update_user_profile(
    profile: UserProfileUpdate,
    clerk_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    """Update the current user's profile."""
    user = db.query(User).filter(User.clerk_id == clerk_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if profile.email is not None:
        user.email = profile.email
    if profile.first_name is not None:
        user.first_name = profile.first_name
    if profile.last_name is not None:
        user.last_name = profile.last_name
    if profile.avatar_url is not None:
        user.avatar_url = profile.avatar_url

    db.commit()
    db.refresh(user)

    return {
        "id": user.id,
        "clerk_id": user.clerk_id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "avatar_url": user.avatar_url,
    }
