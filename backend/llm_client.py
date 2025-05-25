import requests
import json
from config import GROQ_API_KEY, GROQ_MODEL

GROQ_API_URL = "https://api.groq.ai/v1/llm/predict"

def generate_llm_response(prompt: str):
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": GROQ_MODEL,
        "prompt": prompt,
        "temperature": 0.7,
        "max_new_tokens": 512
    }
    print(f"[LLM] Sending prompt to Groq API (truncated): {prompt[:200]}...")
    response = requests.post(GROQ_API_URL, headers=headers, data=json.dumps(data))
    if response.status_code == 200:
        result = response.json()
        text = result.get("results", [{}])[0].get("text", "")
        print("[LLM] Received response from Groq API.")
        return text
    else:
        print(f"[LLM ERROR] Status: {response.status_code}, {response.text}")
        return "Sorry, I couldn't generate a response."
