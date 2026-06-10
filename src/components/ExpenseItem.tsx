"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/types";
import type { Expense } from "@/types";

function fmt(n: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(n);
}

export default function ExpenseItem({ expense }: { expense: Expense }) {
  const router = useRouter();
  const cat = CATEGORIES.find((c) => c.id === expense.category);

  async function handleDelete() {
    await fetch(`/api/expenses/${expense.id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
      <span className="text-2xl w-9 text-center">{cat?.emoji ?? "📦"}</span>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-800 truncate">{expense.description}</p>
        <p className="text-xs text-gray-400">
          {expense.paid_by === "eu" ? "Você" : "Irmã"}
        </p>
      </div>
      <p className="font-semibold text-gray-800 shrink-0">{fmt(expense.amount)}</p>
      <button
        onClick={handleDelete}
        className="text-gray-300 hover:text-red-400 transition-colors p-1"
        aria-label="Deletar despesa"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
