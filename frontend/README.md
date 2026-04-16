# Momotopsy — Frontend

This is the React-based frontend for Momotopsy, a legal contract analysis tool. It provides a highly interactive and visual interface for reviewing document risks.

## Key Features
- **3D Document Visualization**: Uses D3.js and React-Force-Graph to visualize legal contracts as semantic networks of clauses.
- **Real-Time Risk Scoring**: Displays concrete risk percentages and predatory labeling for every section of the contract.
- **AI Sidebar**: Interactive analysis panel that explains predatory clauses and provides GPT-powered rewrites.
- **OCR-Ready Upload**: Seamless drag-and-drop ingestion for PDFs, Word files, and images.

## Architecture
- **Framework**: React 18 + Vite
- **Styling**: Vanilla CSS (Tailwind-compatible)
- **Data Visualization**: D3.js, NetworkX-compat (Node-Link format)
- **State Management**: React Context & Hooks

## Tech Stack
- **API Communication**: Axios (consuming the FastAPI `/analyze` endpoint)
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Ensure the backend is running on `localhost:8000` to enable full analysis features.
