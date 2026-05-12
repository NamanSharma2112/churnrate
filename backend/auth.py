"""
Clerk Authentication Middleware.
Verifies JWT tokens from Clerk using JWKS (JSON Web Key Sets).
Extracts user information from the token claims.
"""

import httpx
import jwt
from jwt import PyJWKClient
from fastapi import HTTPException, Security, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from functools import lru_cache
from config import get_settings

security = HTTPBearer()


def _get_clerk_domain() -> str:
    """Extract the Clerk domain from the publishable key."""
    settings = get_settings()
    pk = settings.clerk_publishable_key
    # Clerk publishable keys follow format: pk_test_XXXXX or pk_live_XXXXX
    # The JWKS URL is based on the Clerk frontend API domain
    # We need to derive it from the key or use the secret key to find it
    
    # For development, we'll construct the JWKS URL from the publishable key
    # The publishable key contains the instance identifier after pk_test_ or pk_live_
    parts = pk.split("_")
    if len(parts) >= 3:
        instance_id = "_".join(parts[2:])
        # Remove any trailing dots
        instance_id = instance_id.rstrip(".")
        return instance_id
    return ""


@lru_cache()
def _get_jwks_client() -> PyJWKClient:
    """
    Create and cache a JWKS client for Clerk token verification.
    The JWKS endpoint is derived from the Clerk publishable key.
    """
    settings = get_settings()
    pk = settings.clerk_publishable_key
    
    # Extract the frontend API URL from the publishable key
    # pk_test_<base64_encoded_frontend_api>
    import base64
    parts = pk.split("_")
    if len(parts) >= 3:
        encoded = parts[2]
        # Add padding if needed
        padding = 4 - len(encoded) % 4
        if padding != 4:
            encoded += "=" * padding
        try:
            frontend_api = base64.b64decode(encoded).decode("utf-8").rstrip("$")
            jwks_url = f"https://{frontend_api}/.well-known/jwks.json"
        except Exception:
            # Fallback: use a common pattern
            jwks_url = f"https://clerk.{_get_clerk_domain()}.com/.well-known/jwks.json"
    else:
        raise ValueError("Invalid Clerk publishable key format")
    
    return PyJWKClient(jwks_url)


async def verify_clerk_token(
    credentials: HTTPAuthorizationCredentials = Security(security),
) -> dict:
    """
    Verify a Clerk JWT token and return the decoded claims.
    
    Returns a dict with at least:
        - sub: The Clerk user ID
        - email: User email (if available)
    
    Raises HTTPException(401) if the token is invalid.
    """
    token = credentials.credentials
    
    try:
        jwks_client = _get_jwks_client()
        signing_key = jwks_client.get_signing_key_from_jwt(token)
        
        decoded = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            options={
                "verify_exp": True,
                "verify_aud": False,  # Clerk doesn't always set audience
            },
        )
        
        return decoded
        
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=401,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.InvalidTokenError as e:
        raise HTTPException(
            status_code=401,
            detail=f"Invalid token: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail=f"Authentication failed: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )


async def get_current_user_id(
    claims: dict = Depends(verify_clerk_token),
) -> str:
    """
    Extract the Clerk user ID from verified token claims.
    Use this as a dependency in protected routes.
    """
    user_id = claims.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="User ID not found in token")
    return user_id


async def get_current_user_claims(
    claims: dict = Depends(verify_clerk_token),
) -> dict:
    """
    Return full verified claims for routes that need more user info.
    """
    return claims
