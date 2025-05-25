import db

def register(userid, password):
    if db.add_user(userid, password):
        print(f"[AUTH] User '{userid}' registered successfully.")
    else:
        print(f"[AUTH] Registration failed: User '{userid}' exists.")

def login(userid, password):
    if db.verify_user(userid, password):
        print(f"[AUTH] User '{userid}' logged in successfully.")
        return True
    print(f"[AUTH] Login failed for user '{userid}'.")
    return False
