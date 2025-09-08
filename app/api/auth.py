from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import timedelta, datetime
from pydantic import BaseModel
from app.crud.user import user_crud
from app.security.jwt_handler import jwt_manager
from app.security.dependencies import get_db_session as get_db
from app.models.users import UserRoleEnum

router = APIRouter(prefix="/auth", tags=["Authentication"])

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict

class UserCreate(BaseModel):
    username: str
    email: str
    full_name: str
    password: str
    department: str
    role: UserRoleEnum = UserRoleEnum.employee

@router.post("/login", response_model=LoginResponse)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db)
):
    user = await user_crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    token_data = {"user_id": user.id, "username": user.username, "role": user.role.value}
    access_token = jwt_manager.create_access_token(token_data, timedelta(hours=8))
    
    return LoginResponse(
        access_token=access_token,
        token_type="bearer",
        user={
            "id": user.id,
            "name": user.full_name,
            "employeeId": user.username,
            "role": user.role.value,
            "department": user.department
        }
    )

@router.post("/register")
async def register(
    user_data: UserCreate,
    db: AsyncSession = Depends(get_db)
):
    # Check if user exists
    existing_user = await user_crud.get_user_by_username(db, user_data.username)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    user = await user_crud.create_user(
        db=db,
        username=user_data.username,
        email=user_data.email,
        full_name=user_data.full_name,
        password=user_data.password,
        department=user_data.department,
        role=user_data.role
    )
    
    return {"message": "User created successfully", "user_id": user.id}
