from sqlalchemy import Column, String, Boolean, DateTime, Enum, Integer, ForeignKey
from sqlalchemy.orm import relationship
import enum
from datetime import datetime
from app.databases.session import Base

class UserRoleEnum(str, enum.Enum):
    employee = "employee"
    manager = "manager"
    admin = "HR"

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(UserRoleEnum), default=UserRoleEnum.employee)
    department = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime, nullable=True)
    failed_login_attempts = Column(Integer, default=0)
    locked_until = Column(DateTime, nullable=True)
