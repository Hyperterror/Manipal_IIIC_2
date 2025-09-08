from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import DATABASE_URL  # e.g., "postgresql+asyncpg://user:pass@localhost/dbname"

engine = create_async_engine(DATABASE_URL, echo=True, future=True)

AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

Base = declarative_base()

# Dependency for FastAPI routes
async def get_db_session():
    async with AsyncSessionLocal() as session:
        yield session
