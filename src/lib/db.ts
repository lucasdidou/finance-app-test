import Database from "better-sqlite3";
import { mkdirSync } from "fs";
import path from "path";

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    const dataDir = path.join(process.cwd(), "data");
    mkdirSync(dataDir, { recursive: true });
    const dbPath = path.join(dataDir, "expenses.db");
    db = new Database(dbPath);
    db.pragma("journal_mode = WAL");
    db.exec(`
      CREATE TABLE IF NOT EXISTS expenses (
        id           INTEGER PRIMARY KEY AUTOINCREMENT,
        paid_by      TEXT NOT NULL CHECK(paid_by IN ('eu', 'irma')),
        amount       REAL NOT NULL CHECK(amount > 0),
        description  TEXT NOT NULL,
        category     TEXT NOT NULL,
        expense_date TEXT NOT NULL,
        created_at   TEXT NOT NULL DEFAULT (datetime('now'))
      );
      CREATE INDEX IF NOT EXISTS idx_expense_date ON expenses(expense_date);
    `);
  }
  return db;
}
