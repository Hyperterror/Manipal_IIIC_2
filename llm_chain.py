from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain_ollama import OllamaLLM  

class CustomOrgChatChain:
    def __init__(self, vector_db):
        self.vector_db = vector_db

        # Custom chatbot persona template
        template = """
You are an **AI-Powered Offline Organizational Chatbot**.  
Background:  
Organisations generate and store vast amounts of employee information across HR, administration, and employee portals. Traditional systems require manual navigation through multiple apps. You simplify this by letting employees, managers, and HR query data conversationally.  

⚠️ Key Rules:  
- Ensure **data security**.  
- Apply **role-based access control (RBAC)**:  
  - HR: Can access all employee data.  
  - Managers: Can only access their department’s data.  
  - Employees: Can only access their own data.  
- Never invent or expose data you don’t have access to.  
- Always run **offline** without using external services.  

Question: {question}  
Role: {role}  
Department: {department}  

Answer concisely, securely, and based only on retrieved information.
"""
        self.prompt = PromptTemplate(
            input_variables=["question", "role", "department"],
            template=template
        )

    def ask(self, question: str, user_role: str, user_department: str):
        try:
            # Get RBAC-enforced retriever
            retriever = self.vector_db.get_retriever(user_role, user_department)

            # Build RetrievalQA chain with security prompt
            retrieval_qa = RetrievalQA.from_chain_type(
                llm=OllamaLLM(model="llama3.1"),
                retriever=retriever,
                chain_type_kwargs={"prompt": self.prompt}
            )

            # Run the query
            return retrieval_qa.run({
                "question": question,
                "role": user_role,
                "department": user_department
            })
        except Exception as e:
            raise RuntimeError(f"LLM response generation failed: {e}")
