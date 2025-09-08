import uuid
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.users import User, UserRoleEnum
from app.security.password import password_manager
from datetime import datetime, timedelta,timezone

class UserCRUD:
    def __init__(self):
        pass

    async def get_user_by_username(self, db: AsyncSession, username: str) -> User | None:
        result = await db.execute(select(User).where(User.username == username))
        return result.scalars().first()

    async def get_user_by_id(self, db: AsyncSession, user_id: str) -> User | None:
        result = await db.execute(select(User).where(User.id == user_id))
        return result.scalars().first()

    async def create_user(self, db: AsyncSession, username: str, email: str, full_name: str,
                          password: str, department: str, role: UserRoleEnum = UserRoleEnum.employee) -> User:
        # Check username uniqueness outside for brevity
        user = User(
            id=str(uuid.uuid4()),
            username=username,
            email=email,
            full_name=full_name,
            hashed_password=password_manager.hash_password(password),
            department=department,
            role=role,
            is_active=True,
            created_at=datetime.now(timezone.utc),
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)
        return user

    async def authenticate_user(self, db: AsyncSession, username: str, password: str) -> User | None:
        user = await self.get_user_by_username(db, username)
        if not user:
            return None
        
        # Check lockout
        if user.locked_until and datetime.now(timezone.utc) < user.locked_until:
            return None

        if not password_manager.verify_password(password, user.hashed_password):
            # Increment lockout logic here (optional)
            return None

        # Successful login, reset failed attempts
        user.failed_login_attempts = 0
        user.last_login = datetime.now(timezone.utc)
        await db.commit()
        await db.refresh(user)
        return user


user_crud = UserCRUD()
