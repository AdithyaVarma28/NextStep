import db

def save_user_preferences(userid, skills, domain, career, best_choice, explanation):
    db.save_preferences(userid, skills, domain, career, best_choice, explanation)
    print(f"[PREF] Preferences saved for user {userid}")

def load_user_preferences(userid):
    prefs = db.get_preferences(userid)
    if prefs:
        print(f"[PREF] Loaded preferences for {userid}: {prefs}")
    else:
        print(f"[PREF] No preferences found for {userid}")
    return prefs
