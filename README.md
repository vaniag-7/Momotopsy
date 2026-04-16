# Momotopsy

## Problem Statement
Every day, thousands of individuals and small businesses sign contracts—ranging from Terms of Service and rental agreements to employment contracts—without fully understanding the legal jargon. This leaves them vulnerable to predatory clauses such as unilateral rights to seize assets, irrevocable perpetual IP licenses, forced arbitration, and class-action waivers. Traditional legal review is expensive and slow, meaning most people simply consent to these unbalanced terms without realizing the risks.

## Understanding of the Solution
Momotopsy is an AI-powered legal contract analyzer designed to automatically detect and rectify predatory contract language. The system operates as a comprehensive backend pipeline:
1. **Multi-Modal Ingestion:** It accepts PDFs, Word documents, and images of contracts, extracting clean text using layout parsing and OCR.
2. **Semantic Graph Generation:** Each extracted clause is embedded into a dense semantic vector space (768-dim). The system analyzes the relationships between clauses using graph theory (NetworkX) to connect semantically similar conditions.
3. **Risk Detection:** A trained and optimized ML classifier (`HistGradientBoosting`) evaluates clauses against ~19,400 examples. Using hyperparameter tuning and a boosted 0.15 threshold, it achieves 84% recall on predatory content.
4. **LLM-Powered Rectification:** When flagged, a Llama-3.3-70b agent explains the danger and generates a rewritten, fair version of the clause.

## Tech Stack
- **API Framework:** FastAPI, Uvicorn
- **Document Ingestion:** PyMuPDF, python-docx, EasyOCR
- **Machine Learning & NLP:** SentenceTransformers (`all-mpnet-base-v2`), scikit-learn (RandomizedSearchCV), imbalanced-learn (SMOTETomek)
- **Graph Theory Algorithms:** NetworkX
- **LLM / Generative AI:** Groq SDK, Llama-3.3-70b, Pydantic (Strict JSON Validation)