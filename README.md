# Momotopsy

## Problem Statement
Every day, thousands of individuals and small businesses sign contracts—ranging from Terms of Service and rental agreements to employment contracts—without fully understanding the legal jargon. This leaves them vulnerable to predatory clauses such as unilateral rights to seize assets, irrevocable perpetual IP licenses, forced arbitration, and class-action waivers. Traditional legal review is expensive and slow, meaning most people simply consent to these unbalanced terms without realizing the risks.

## Understanding of the Solution
Momotopsy is an AI-powered legal contract analyzer designed to automatically detect and rectify predatory contract language. The system operates as a comprehensive backend pipeline:
1. **Multi-Modal Ingestion:** It accepts PDFs, Word documents, and images of contracts, extracting clean text using layout parsing and OCR.
2. **Semantic Graph Generation:** Each extracted clause is embedded into a dense semantic vector space. The system analyzes the relationships between clauses using graph theory (NetworkX) to connect semantically similar conditions.
3. **Risk Detection:** A trained ML classifier (`HistGradientBoosting`) evaluates every clause against a diverse dataset of ~19,400 established safe and predatory examples to assign a concrete risk score. 
4. **LLM-Powered Rectification:** When a clause is flagged as predatory, the system concurrently queries a Llama-3 agent. The LLM explains exactly *why* the clause is dangerous, highlights key legal issues, and generates a rewritten, legally fair version of the clause without destroying the underlying intent of the contract.

## Tech Stack
- **API Framework:** FastAPI, Uvicorn
- **Document Ingestion:** PyMuPDF (PDFs), python-docx (Word), EasyOCR (Images)
- **Machine Learning & NLP:** SentenceTransformers (`all-MiniLM-L6-v2`), scikit-learn, imbalanced-learn (SMOTETomek)
- **Graph Theory Algorithms:** NetworkX
- **LLM / Generative AI:** Groq SDK, Llama-3.3-70b, Pydantic (Strict JSON Validation)