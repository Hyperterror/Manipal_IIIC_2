import os
from typing import Optional

class SecurityConfig:
    Secret_key: str = os.getenv("Secret_key", "In Production")
    Algorithm: str = "HS256"
    Access_Token_exp_min: int = 30
    Refresh_Token_exp_days: int = 7

    # policy
    Min_length: int = 8
    Require_Special_Char: bool = True
    Require_Numbers: bool = True
    Require_Uppercase: bool = True

    # Header
    Cors_origin: list = ["http://localhost:3000", "http://127.0.0.1:3000"]


security_config = SecurityConfig()

# Database settings
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://myuser:mypassword@localhost:5432/mydb"
)