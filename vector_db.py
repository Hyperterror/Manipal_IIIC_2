from langchain_chroma import Chroma
from langchain_ollama import OllamaEmbeddings

class VectorDB:
    def __init__(self, collection_name: str, persist_directory: str):
        self.embeddings = OllamaEmbeddings(model="mxbai-embed-large")
        self.vector_db = Chroma(
            collection_name=collection_name,
            persist_directory=persist_directory,
            embedding_function=self.embeddings
        )

    def get_retriever(self, user_role: str, user_department: str, top_k: int = 5):
        """
        Returns a retriever that enforces RBAC filters.
        - HR: Full access
        - Manager: Access only to their department
        - Employee: Access only to their own record
        """
        filter_meta = {}

        if user_role == "HR":
            filter_meta = {}  # full access
        elif user_role == "Manager":
            filter_meta = {"department": user_department}
        else:  # Employee (default)
            # For employees, filter by both role and department if needed
            filter_meta = {"department": user_department, "role": "employee"}

        return self.vector_db.as_retriever(search_kwargs={"k": top_k, "filter": filter_meta})
