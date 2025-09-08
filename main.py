from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.security.dependencies import get_current_user

from app.models.users import User
from vector_db import VectorDB
from llm_chain import CustomOrgChatChain
from app.api.auth import router as auth_router
from app.api.chat import router as chat_router

app = FastAPI(title="AI Organizational Chatbot", version="1.0.0")

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)
app.include_router(chat_router)

@app.get("/")
async def root():
    return {"message": "AI Organizational Chatbot API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "offline_chatbot"}
