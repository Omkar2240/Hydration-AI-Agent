import sqlite3
import datetime

DB_NAME = "water_intake.db"

def create_table():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    cursor.execute("""
                   CREATE TABLE IF NOT EXISTS intake_history (
                       id INTEGER PRIMARY KEY AUTOINCREMENT,
                       user_id TEXT,
                       date TEXT,
                       intake_ml INTEGER,
                       age INTEGER,
                       gender TEXT,
                       activity_level TEXT,
                       curr_temp TEXT
                   )
                   """)
    conn.commit()
    conn.close()
    
    
def log_intake(user_id, intake_ml):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    date_today = datetime.date.today().isoformat()
    
    cursor.execute("""
                   INSERT INTO intake_history (user_id, date, intake_ml)
                   VALUES (?, ?, ?)
                   """, (user_id, date_today, intake_ml))
    conn.commit()
    conn.close()
    
    
def get_intake_history(user_id):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    cursor.execute("""
                   SELECT date, intake_ml FROM intake_history
                   WHERE user_id = ?
                   ORDER BY date DESC
                   """, (user_id,))
    
    history = cursor.fetchall()
    conn.close()
    return history
    
    
create_table()