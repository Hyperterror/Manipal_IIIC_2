from passlib.context import CryptContext
from passlib.hash import bcrypt
import re
from typing import Optional

class PasswordManager:
  def __init__(self):
    #configure bcrypt 
    self.pwd_context=CryptContext(
      schemes=["bcrypt"],
      deprecated="auto",
      bcrypt__rounds=12
    )
  def hash_pass(self,password:str)-> str:
    "Hash a pass using bcrypt with salt "
    return self.pwd_context.hash(password)
  
  def verify_password(self,plain_password:str, hashed_password:str)-> bool:
    "verify plain password against its hash"
    "Returns: True if matches"
    try:
      return self.pwd_context.verify(plain_password,hashed_password)
    except Exception as e:
      print(f"Password Verfication error:{e}")
      return False
  def validate_pass_str(self,password:str)-> tuple[bool,list[str]]:
    "validate against security policies"
    errors=[]
    if len(password)<8:
      errors.append("Password must at least 8 characters long ")
    if not re.search(r"[A-Z]", password):
            errors.append("Password must contain at least one uppercase letter")
        
    if not re.search(r"[a-z]", password):
            errors.append("Password must contain at least one lowercase letter")
        
    if not re.search(r"\d", password):
            errors.append("Password must contain at least one number")
        
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
            errors.append("Password must contain at least one special character")
        
        # Check for common weak passwords
    weak_patterns = ["password", "12345678", "qwerty", "admin"]
    if any(pattern in password.lower() for pattern in weak_patterns):
            errors.append("Password contains common weak patterns")
        
    return len(errors) == 0, errors

# Global instance
password_manager = PasswordManager()