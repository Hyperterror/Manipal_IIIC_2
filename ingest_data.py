import pandas as pd
import json
from langchain_chroma import Chroma
from langchain_ollama import OllamaEmbeddings  

def load_and_ingest(path: str, collection_name: str, persist_directory: str):
    if path.endswith('.csv'):
        df = pd.read_csv(path)
    elif path.endswith('.json'):
        df = pd.read_json(path)
    else:
        raise ValueError("Unsupported file format. Provide .csv or .json")

    texts, metadatas = [], []
    for _, row in df.iterrows():
        doc_text = (
            f"EmployeeID: {row['EEID']}\n"
            f"Name: {row['Full Name']}\n"
            f"Job Title: {row['Job Title']}\n"
            f"Department: {row['Department']}\n"
            f"Business Unit: {row['Business Unit']}\n"
            f"Country: {row['Country']}\n"
            f"City: {row['City']}\n"
            f"Annual Salary: {row['Annual Salary']}\n"
            f"Bonus %: {row['Bonus %']}"
        )
        texts.append(doc_text)
        metadatas.append({
            "employee_id": row['EEID'],
            "department": row['Department'],
            "role": "employee"
        })

    embeddings = OllamaEmbeddings(model="mxbai-embed-large")
    vector_db = Chroma.from_texts(
        texts=texts,
        embedding=embeddings,
        metadatas=metadatas,
        collection_name=collection_name,
        persist_directory=persist_directory
    )
    vector_db.persist()

if __name__ == "__main__":
    load_and_ingest("Employee Sample Data.csv", "org_employees", "./chroma_persist")
