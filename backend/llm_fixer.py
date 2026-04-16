from __future__ import annotations

import logging
from typing import Any

from groq import AsyncGroq
from pydantic import BaseModel, Field

logger = logging.getLogger(__name__)

_LLM_MODEL: str = "llama-3.3-70b-versatile"

_SYSTEM_PROMPT: str = (
    "You are a senior legal contract analyst. The user will provide a single "
    "predatory contract clause. Analyze it and respond with ONLY a JSON object "
    "matching this exact schema — no markdown, no explanation outside the JSON:\n\n"
    "{\n"
    '  "reason_flagged": "One sentence explaining why this clause is predatory.",\n'
    '  "key_issues": ["Issue 1", "Issue 2"],\n'
    '  "improved_clause": "A rewritten, legally fair version of the clause."\n'
    "}\n\n"
    "Rules:\n"
    "- reason_flagged: exactly 1 sentence.\n"
    "- key_issues: 2-5 concise bullet points.\n"
    "- improved_clause: a complete, standalone clause — not a diff or fragment.\n"
    "- Output valid JSON only. No trailing commas. No comments."
)


class ClauseAnalysis(BaseModel):
    reason_flagged: str = Field(
        description="One sentence explaining why the clause is predatory",
    )
    key_issues: list[str] = Field(
        description="List of key legal issues",
    )
    improved_clause: str = Field(
        description="Rewritten safe version of the clause",
    )


_EMPTY_RESULT: dict[str, Any] = {
    "reason_flagged": "",
    "key_issues": [],
    "improved_clause": "",
}


class ClauseFixer:
    def __init__(self, model: str = _LLM_MODEL) -> None:
        self.client: AsyncGroq = AsyncGroq()  # reads GROQ_API_KEY from env
        self.model: str = model

    async def analyze_clause(self, text: str) -> dict[str, Any]:
        """Send a predatory clause to the LLM and return structured analysis.

        Returns a dict with keys: reason_flagged, key_issues, improved_clause.
        On any failure, returns empty/default fields instead of raising.
        """
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": _SYSTEM_PROMPT},
                    {"role": "user", "content": text},
                ],
                response_format={"type": "json_object"},
                temperature=0.2,
                max_tokens=512,
            )
            raw: str = response.choices[0].message.content or ""
            analysis = ClauseAnalysis.model_validate_json(raw)
            return analysis.model_dump()

        except Exception as exc:
            logger.warning(
                "LLM analysis failed for clause: %.80s — %s", text, exc,
            )
            return dict(_EMPTY_RESULT)
