# backend/app.py
from fastapi import FastAPI
from pydantic import BaseModel
from vector_db import VectorDB
from llm_chain import CustomOrgChatChain
from fastapi.middleware.cors import CORSMiddleware

# Initialize DB + chatbot
vector_db = VectorDB("org_employees", "./chroma_persist")
chat_chain = CustomOrgChatChain(vector_db)

app = FastAPI()

class QueryRequest(BaseModel):
    question: str
    role: str

@app.post("/ask")
def ask_question(request: QueryRequest):
    response = chat_chain.ask(
        question=request.question,
        user_role=request.role,
        user_department=request.department
    )
    return {"answer": response}
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class QueryRequest(BaseModel):
    question: str
    role: str
    department: str

@app.post("/ask")
def ask_question(request: QueryRequest):
    response = chat_chain.ask(
        question=request.question,
        user_role=request.role,
        user_department=request.department
    )
    return {"answer": response}