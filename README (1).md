# AI-Powered Organizational Assistant

🚀 **Ask Anything. Get Answers Instantly. Offline.**

An intelligent organizational assistant that transforms HR, policy, and employee data into a conversational AI experience. Built with local LLM, vector database, and enterprise-grade security - all running completely offline.

## ✨ Features

### 🔒 **Role-Based Access Control (RBAC)**
- **HR**: Full access to all organizational data
- **Manager**: Department-specific access 
- **Employee**: Personal data access only

### 🧠 **AI-Powered Intelligence**
- **Local LLM**: Llama 3.1 model running on-premises
- **Vector Database**: Semantic search through organizational data using Chroma DB
- **Offline First**: No external API calls or cloud dependencies

### 🎯 **Smart Query Processing**
- Natural language understanding for HR queries
- Intelligent context-aware responses
- Secure data filtering based on user permissions

## 🏗️ Architecture

### Backend (Python/FastAPI)
- **FastAPI**: High-performance API server
- **LangChain**: LLM orchestration and chaining
- **Chroma DB**: Vector database for semantic search
- **Ollama**: Local LLM inference

### Frontend (Next.js/TypeScript)
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Radix UI**: Modern, accessible components
- **Tailwind CSS**: Utility-first styling
- **Shadcn/ui**: Beautiful pre-built components

## 📁 Project Structure

```
Manipal_IIIC_2/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Dashboard interface
│   ├── login/              # Authentication pages
│   ├── settings/           # User settings
│   └── api/                # API routes
├── components/             # Reusable UI components
├── lib/                    # Utility libraries
├── public/                 # Static assets
├── styles/                 # CSS styling
├── chroma_persist/         # Vector database storage
├── app.py                  # FastAPI backend server
├── vector_db.py           # Vector database operations
├── llm_chain.py           # LLM chain configuration
├── ingest_data.py         # Data ingestion pipeline
└── main.py                # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- **Python 3.8+**
- **Node.js 18+**
- **Ollama** (for local LLM)

### 1. Install Ollama and Models
```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull required models
ollama pull llama3.1
ollama pull mxbai-embed-large
```

### 2. Backend Setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# Ingest sample data (optional)
python ingest_data.py

# Start FastAPI server
uvicorn app:app --reload --port 8000
```

### 3. Frontend Setup
```bash
# Install Node dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm dev
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 💡 Use Cases

### For Employees
- "How many vacation days do I have left?"
- "What's the remote work policy?"
- "How do I submit expense reports?"
- "What are the health insurance options?"

### For Managers & HR
- "Show team performance metrics"
- "Who's on leave next week?"  
- "Generate compliance reports"
- "Review salary benchmarks"

## 🔧 Key Technologies

| Category | Technology | Purpose |
|----------|------------|---------|
| **Backend** | FastAPI | High-performance API server |
| **LLM** | Llama 3.1 | Local language model |
| **Vector DB** | Chroma | Semantic search & retrieval |
| **Embeddings** | mxbai-embed-large | Text vectorization |
| **Frontend** | Next.js 14 | React framework |
| **UI** | Radix UI + Tailwind | Modern component system |
| **Type Safety** | TypeScript | Static type checking |

## 🔐 Security Features

- **100% Offline Operation** - No data leaves your infrastructure
- **Role-Based Access Control** - Granular permission system  
- **Data Encryption** - Secure storage and transmission
- **Zero Trust Architecture** - Verify every request
- **Local Processing** - All AI inference on-premises

## 📊 Data Pipeline

1. **Data Ingestion** (`ingest_data.py`)
   - Converts CSV/JSON employee data to vector format
   - Stores in Chroma DB with metadata

2. **Query Processing** (`llm_chain.py`)
   - Applies RBAC filters based on user role
   - Retrieves relevant documents via semantic search
   - Generates contextual responses using Llama 3.1

3. **API Layer** (`app.py`)
   - Handles authentication and authorization
   - Processes chat requests via REST API
   - Returns secure, filtered responses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Voice query interface
- [ ] Mobile application
- [ ] Advanced reporting system
- [ ] Integration with existing HR systems

## 🏢 Enterprise Ready

This solution is designed for organizations that prioritize:
- **Data Privacy**: All processing happens on-premises
- **Security**: Enterprise-grade access controls
- **Compliance**: No external data transmission
- **Scalability**: Modular architecture for growth
- **Customization**: Fully customizable for specific needs

---

**Built for Manipal IIIC 2025** | **100% Offline** | **Enterprise Security**