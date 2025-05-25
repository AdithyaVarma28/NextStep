import auth
import preferences
import rag
import llm_client
import ocr_resume
import db

def main():
    print("[APP] Initializing database...")
    db.init_db()

    print("\n[APP] Registering test user...")
    auth.register("alice", "password123")

    print("\n[APP] Logging in test user...")
    if not auth.login("alice", "password123"):
        print("[APP] Login failed. Exiting.")
        return

    print("\n[APP] Simulating user preference save...")
    skills = ["Python", "Machine Learning", "Data Analysis"]
    domain = "Data Science"
    career = ["Data Scientist", "ML Engineer", "Data Analyst"]
    best_choice = "Data Scientist"
    explanation = "Strong Python and ML skills align well with Data Scientist roles."
    preferences.save_user_preferences("alice", skills, domain, career, best_choice, explanation)

    print("\n[APP] Loading preferences and generating RAG context...")
    context = rag.retrieve_user_context("alice")

    print("\n[APP] Performing OCR on resumes folder...")
    resumes_text = ocr_resume.process_resumes()

    print("\n[APP] Preparing prompt for LLaMA 3...")
    prompt = f"""
    You are a career guidance assistant.
    Use the user context below for reference ONLY:
    {context}

    Also consider the following resumes extracted text (briefly):
    {list(resumes_text.keys())}

    Now answer the following user question with your own intelligence, NOT only copying the above:

    What career should I pursue and why?
    """

    print("\n[APP] Generating LLaMA 3 response...")
    answer = llm_client.generate_llm_response(prompt)

    print("\n[APP] LLaMA 3 Answer:")
    print(answer)

if __name__ == "__main__":
    main()
