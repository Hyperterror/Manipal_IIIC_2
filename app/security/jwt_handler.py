from datetime import datetime, timedelta,timezone
from typing import Optional, Dict, Any
import jwt
from fastapi import HTTPException, status
from app.config import security_config

class JWTManager:
    def __init__(self):
        self.secret_key = security_config.Secret_key
        self.algorithm = security_config.Algorithm
        self.access_token_expire_minutes = security_config.Access_Token_exp_min
    
    def create_access_token(self, data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
        """
        Create a JWT access token with user data
        """
        to_encode = data.copy()
        
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc)    + timedelta(minutes=self.access_token_expire_minutes)
        
        # Add standard JWT claims[25]
        to_encode.update({
            "exp": expire,
            "iat": datetime.now(timezone.utc),
            "type": "access"
        })
        
        try:
            encoded_jwt = jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
            return encoded_jwt
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Token creation failed: {str(e)}"
            )
    
    def create_refresh_token(self, data: Dict[str, Any]) -> str:
        """
        Create a refresh token for token renewal
        """
        to_encode = data.copy()
        expire = datetime.now(timezone.utc)+ timedelta(days=security_config.Refresh_Token_exp_days)
        
        to_encode.update({
            "exp": expire,
            "iat": datetime.now(timezone.utc),
            "type": "refresh"
        })
        
        return jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
    
    def verify_token(self, token: str) -> Dict[str, Any]:
        """
        Verify and decode a JWT token
        Raises HTTPException for invalid tokens
        """
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            
            # Verify token type
            if payload.get("type") != "access":
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token type"
                )
            
            return payload
            
        except jwt.ExpiredSignatureError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token expired",
                headers={"WWW-Authenticate": "Bearer"}
            )
        except jwt.JWTError as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Invalid token: {str(e)}",
                headers={"WWW-Authenticate": "Bearer"}
            )
    
    def refresh_access_token(self, refresh_token: str) -> str:
        """
        Create new access token from refresh token
        """
        try:
            payload = jwt.decode(refresh_token, self.secret_key, algorithms=[self.algorithm])
            
            if payload.get("type") != "refresh":
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid refresh token"
                )
            
            # Create new access token
            new_token_data = {
                "user_id": payload["user_id"],
                "username": payload["username"],
                "role": payload["role"]
            }
            
            return self.create_access_token(new_token_data)
            
        except jwt.ExpiredSignatureError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Refresh token expired"
            )
        except jwt.JWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token"
            )

# Global instance
jwt_manager = JWTManager()
