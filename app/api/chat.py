from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from app.security.dependencies import get_current_user, get_db_session as get_db
from datetime import datetime
from app.models.users import User
from vector_db import VectorDB
from llm_chain import CustomOrgChatChain
import logging

router = APIRouter(prefix="/api", tags=["Chat"])

# Initialize vector DB and chat chain globally
vector_db = VectorDB(collection_name="org_employees", persist_directory="./chroma_persist")
chat_chain = CustomOrgChatChain(vector_db)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    source: str = "Local AI Knowledge Base"
    timestamp: str
    access_granted: bool = True

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(
    request: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    try:
        # Role-based access control check
        restricted_queries = {
            "employee": ["team salaries", "employee directory", "payroll", "salary", "wage"],
            "manager": [],
            "admin": []
        }
        
        user_restrictions = restricted_queries.get(current_user.role.value, [])
        
        # Check if query contains restricted terms
        if any(restriction in request.message.lower() for restriction in user_restrictions):
            return ChatResponse(
                response=f"Access Denied — Your role ({current_user.role.value}) does not permit this query. Please contact your administrator for access to this information.",
                source="Access Control System",
                timestamp=datetime.now().isoformat(),
                access_granted=False
            )
        
        # Process the chat request
        response = chat_chain.ask(
            question=request.message,
            user_role=current_user.role.value,
            user_department=current_user.department or "Unknown"
        )
        
        return ChatResponse(
            response=response,
            source="Local AI Knowledge Base",
            timestamp=datetime.now().isoformat(),
            access_granted=True
        )
        
    except Exception as e:
        logging.error(f"Chat endpoint error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while processing your request."
        )

@router.get("/chat/history")
async def get_chat_history(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Mock chat history for now - you can implement database storage
    return {
        "history": [
            {
                "id": "1",
                "query": "How many vacation days do I have left?",
                "response": "You have 7 vacation days remaining as of today.",
                "timestamp": "2025-09-08T10:00:00Z",
                "status": "success"
            }
        ]
    }
