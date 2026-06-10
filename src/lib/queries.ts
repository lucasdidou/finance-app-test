import { getDb } from "./db";
import type { Expense, NewExpense, MonthSummary } from "@/types";

export function getExpensesByMonth(month: string): Expense[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT * FROM expenses
       WHERE strftime('%Y-%m', expense_date) = ?
       ORDER BY expense_date DESC, created_at DESC`
    )
    .all(month) as Expense[];
}

export function insertExpense(data: NewExpense): Expense {
  const db = getDb();
  const result = db
    .prepare(
      `INSERT INTO expenses (paid_by, amount, description, category, expense_date)
       VALUES (@paid_by, @amount, @description, @category, @expense_date)`
    )
    .run(data);
  return db
    .prepare("SELECT * FROM expenses WHERE id = ?")
    .get(result.lastInsertRowid) as Expense;
}

export function deleteExpense(id: number): void {
  const db = getDb();
  db.prepare("DELETE FROM expenses WHERE id = ?").run(id);
}

export function getMonthSummary(month: string): MonthSummary {
  const db = getDb();
  const row = db
    .prepare(
      `SELECT
         COALESCE(SUM(CASE WHEN paid_by = 'eu' THEN amount ELSE 0 END), 0) AS eu_total,
         COALESCE(SUM(CASE WHEN paid_by = 'irma' THEN amount ELSE 0 END), 0) AS irma_total,
         COALESCE(SUM(amount), 0) AS grand_total
       FROM expenses
       WHERE strftime('%Y-%m', expense_date) = ?`
    )
    .get(month) as MonthSummary;
  return row;
}

export function getDistinctMonths(): string[] {
  const db = getDb();
  const rows = db
    .prepare(
      `SELECT DISTINCT strftime('%Y-%m', expense_date) AS month
       FROM expenses
       ORDER BY month DESC`
    )
    .all() as { month: string }[];
  return rows.map((r) => r.month);
}
