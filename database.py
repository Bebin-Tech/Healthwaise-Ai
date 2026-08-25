import json
import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent.parent / "healthwise.db"


def init_db():
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS plans (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                location TEXT NOT NULL,
                language TEXT NOT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                payload TEXT NOT NULL
            )
            """
        )


def save_plan(plan):
    init_db()
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.execute(
            "INSERT INTO plans (name, location, language, payload) VALUES (?, ?, ?, ?)",
            (
                plan["profile"]["name"],
                plan["weather"]["location"],
                plan["profile"]["language"],
                json.dumps(plan, ensure_ascii=False)
            )
        )
        return cursor.lastrowid


def recent_plans(limit=10):
    init_db()
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        rows = conn.execute(
            "SELECT id, name, location, language, created_at, payload FROM plans ORDER BY id DESC LIMIT ?",
            (limit,)
        ).fetchall()
    return [
        {
            "id": row["id"],
            "name": row["name"],
            "location": row["location"],
            "language": row["language"],
            "created_at": row["created_at"],
            "plan": json.loads(row["payload"])
        }
        for row in rows
    ]
