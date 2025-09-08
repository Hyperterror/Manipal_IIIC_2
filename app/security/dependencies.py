from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from app.security.jwt_handler import jwt_manager
from app.databases.session import get_db_session
from app.crud.user import user_crud
from app.models.users import User, UserRoleEnum

security = HTTPBearer(auto_error=False)

async def get_db_session() -> AsyncSession:
    """
    Dependency to get SQLAlchemy Async DB session
    """
    async for session in get_db_session():
         yield session

async def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
    db: AsyncSession = Depends(get_db_session)
) -> User:
    """
    Validate JWT token from Authorization header and fetch user from DB.
    Raises 401 if invalid or missing.
    """
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication credentials required",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = credentials.credentials
    payload = jwt_manager.verify_token(token)
    user = await user_crud.get_user_by_id(db, payload.get("user_id"))
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User inactive or not found"
        )
    return user

async def get_current_active_user(
    current_user: User = Depends(get_current_user)
) -> User:
    """
    Ensure user account is active
    """
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

async def get_admin_user(
    current_user: User = Depends(get_current_user)
) -> User:
    """
    Ensure user is admin
    """
    if current_user.role != UserRoleEnum.admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Administrator access required"
        )
    return current_user

async def get_manager_or_admin_user(
    current_user: User = Depends(get_current_user)
) -> User:
    """
    Ensure user is manager or admin
    """
    if current_user.role not in [UserRoleEnum.manager, UserRoleEnum.admin]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Manager or administrator access required"
        )
    return current_user

async def get_optional_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
    db: AsyncSession = Depends(get_db_session)
) -> Optional[User]:
    """
    Optional authentication dependency — returns user if authenticated, else None.
    """
    if not credentials:
        return None
    try:
        token = credentials.credentials
        payload = jwt_manager.verify_token(token)
        user = await user_crud.get_user_by_id(db, payload.get("user_id"))
        if user and user.is_active:
            return user
        return None
    except Exception:
        return None
