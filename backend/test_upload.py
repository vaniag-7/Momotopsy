import httpx
import os
import sys

API_URL = "http://localhost:8000/analyze"
TEST_DIR = "testing-pdfs"

def test_api(file_path):
    print(f"\n[{file_path}]")
    print(f"Reading PDF from {file_path}...")
    with open(file_path, "rb") as f:
        pdf_bytes = f.read()
    filename = os.path.basename(file_path)

    import mimetypes
    mime_type, _ = mimetypes.guess_type(file_path)
    if not mime_type:
        mime_type = "application/octet-stream"

    print("Sending to Momotopsy API...")
    try:
        response = httpx.post(
            API_URL,
            files={"file": (filename, pdf_bytes, mime_type)},
            timeout=None  # Disabled timeout because CPU-based OCR is heavily dependent on document size
        )
        
        if response.status_code == 200:
            print("API Response SUCCESS!")
            data = response.json()
            print(f"Filename: {data.get('filename')}")
            print(f"Total Clauses Extracted: {data.get('total_clauses')}")
            print(f"Document Risk Score: {data.get('document_risk_score')}")
            
            print("\nNodes:")
            for node in data.get('graph', {}).get('nodes', []):
                print("-" * 50)
                print(f"Text: {node.get('text')}")
                print(f"Label: {node.get('label')} (Risk: {node.get('risk_score')})")
                if node.get('label') == 'Predatory':
                    print(f"Reason: {node.get('reason_flagged')}")
        else:
            print(f"API Error: {response.status_code}")
            print(response.text)
            
    except httpx.ConnectError:
        print(f"Could not connect to {API_URL}.")
        print("Make sure the FastAPI server is running! (python main.py)")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        test_api(sys.argv[1])
    else:
        if not os.path.exists(TEST_DIR):
            print(f"Directory '{TEST_DIR}' does not exist. Creating it...")
            os.makedirs(TEST_DIR)
            print(f"Please place some sample PDFs in '{TEST_DIR}' and run again.")
            sys.exit(0)
            
        supported_exts = {".pdf", ".docx", ".png", ".jpg", ".jpeg"}
        test_files = [f for f in os.listdir(TEST_DIR) if os.path.splitext(f)[1].lower() in supported_exts]
        
        if not test_files:
            print(f"No supported files found in '{TEST_DIR}'. Please download sample PDFs or DOCXs into this folder.")
            sys.exit(0)
            
        print(f"Found {len(test_files)} file(s) in '{TEST_DIR}'. Starting batch tests...")
        for f in test_files:
            test_api(os.path.join(TEST_DIR, f))
