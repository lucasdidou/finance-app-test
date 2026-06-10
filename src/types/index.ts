export type Person = "eu" | "irma";

export interface Expense {
  id: number;
  paid_by: Person;
  amount: number;
  description: string;
  category: string;
  expense_date: string; // YYYY-MM-DD
  created_at: string;
}

export interface NewExpense {
  paid_by: Person;
  amount: number;
  description: string;
  category: string;
  expense_date: string;
}

export interface MonthSummary {
  eu_total: number;
  irma_total: number;
  grand_total: number;
}

export interface Settlement {
  debtor: Person | null;
  creditor: Person | null;
  amount: number;
  label: string;
}

export const CATEGORIES = [
  { id: "mercado", label: "Mercado", emoji: "🛒" },
  { id: "padaria", label: "Padaria", emoji: "🥖" },
  { id: "mae", label: "Mãe", emoji: "💸" },
  { id: "luz", label: "Conta de Luz", emoji: "💡" },
  { id: "internet", label: "Internet", emoji: "📡" },
  { id: "gas", label: "Gás", emoji: "🔥" },
  { id: "agua", label: "Água", emoji: "💧" },
  { id: "limpeza", label: "Limpeza", emoji: "🧹" },
  { id: "farmacia", label: "Farmácia", emoji: "💊" },
  { id: "transporte", label: "Transporte", emoji: "🚌" },
  { id: "restaurante", label: "Restaurante", emoji: "🍽️" },
  { id: "outro", label: "Outro", emoji: "📦" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];
