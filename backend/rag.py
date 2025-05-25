from preferences import load_user_preferences

def retrieve_user_context(userid):
    prefs = load_user_preferences(userid)
    if not prefs:
        print("[RAG] No user preferences found for context retrieval.")
        return ""
    
    context_parts = []
    context_parts.append(f"User skills: {', '.join(prefs['skills'])}")
    context_parts.append(f"Domain of interest: {prefs['domain']}")
    context_parts.append(f"Recommended careers: {', '.join(prefs['career'])}")
    context_parts.append(f"Best career choice: {prefs['best_choice']}")
    context_parts.append(f"Explanation: {prefs['explanation']}")
    rag_context = "\n".join(context_parts)
    print("[RAG] Retrieved user context for RAG:\n" + rag_context)
    return rag_context
