import asyncio
import json
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).with_name(".env"))

from graph_engine import LegalGraphBuilder

async def main():
    print("Loading Graph Builder...")
    builder = LegalGraphBuilder()

    test_clauses = [
        "The tenant agrees to pay rent on the 1st of each month.",
        "The company reserves the right to terminate this agreement at any time, without notice, and seize all user assets."
    ]

    print(f"Analyzing {len(test_clauses)} clauses...")
    graph = await builder.build_graph(test_clauses)

    print("\nResulting Graph Nodes:")
    for node in graph["nodes"]:
        print("-" * 50)
        print(f"Clause: {node['text']}")
        print(f"Risk Score: {node['risk_score']} (Label: {node['label']})")
        if node['label'] == 'Predatory':
            print(f"Reason Flagged: {node.get('reason_flagged')}")
            print(f"Key Issues: {node.get('key_issues')}")
            print(f"Improved Clause: {node.get('improved_clause')}")
        else:
            print("Clause is safe. No LLM modifications needed.")

if __name__ == "__main__":
    asyncio.run(main())
