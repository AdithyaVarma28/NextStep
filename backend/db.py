import sqlite3
import json
from config import DB_PATH
import os

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userid TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )""")
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS preferences (
        userid TEXT PRIMARY KEY,
        skills TEXT,
        domain TEXT,
        career TEXT,
        best_choice TEXT,
        explanation TEXT,
        FOREIGN KEY(userid) REFERENCES users(userid)
    )""")
    conn.commit()
    conn.close() 

def add_user(userid, password):
    conn = get_connection()
    try:
        conn.execute("INSERT INTO users (userid, password) VALUES (?, ?)", (userid, password))
        conn.commit()
        print(f"[DB] Added user {userid}")
        return True
    except sqlite3.IntegrityError:
        print(f"[DB] User {userid} already exists")
        return False
    finally:
        conn.close()

def verify_user(userid, password):
    conn = get_connection()
    cursor = conn.execute("SELECT * FROM users WHERE userid=? AND password=?", (userid, password))
    user = cursor.fetchone()
    conn.close()
    return user is not None

def save_preferences(userid, skills, domain, career, best_choice, explanation):
    conn = get_connection()
    career_json = json.dumps(career)
    skills_json = json.dumps(skills)
    try:
        conn.execute("""
        INSERT OR REPLACE INTO preferences(userid, skills, domain, career, best_choice, explanation)
        VALUES (?, ?, ?, ?, ?, ?)
        """, (userid, skills_json, domain, career_json, best_choice, explanation))
        conn.commit()
        print(f"[DB] Saved preferences for {userid}")
    except Exception as e:
        print(f"[DB ERROR] {e}")
    finally:
        conn.close()

def get_preferences(userid):
    conn = get_connection()
    cursor = conn.execute("SELECT * FROM preferences WHERE userid=?", (userid,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return {
            "userid": row["userid"],
            "skills": json.loads(row["skills"]),
            "domain": row["domain"],
            "career": json.loads(row["career"]),
            "best_choice": row["best_choice"],
            "explanation": row["explanation"],
        }
    return None
