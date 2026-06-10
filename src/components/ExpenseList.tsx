import type { Expense } from "@/types";
import ExpenseItem from "./ExpenseItem";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

function groupByDate(expenses: Expense[]): Record<string, Expense[]> {
  return expenses.reduce(
    (acc, e) => {
      if (!acc[e.expense_date]) acc[e.expense_date] = [];
      acc[e.expense_date].push(e);
      return acc;
    },
    {} as Record<string, Expense[]>
  );
}

export default function ExpenseList({ expenses }: { expenses: Expense[] }) {
  if (expenses.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        <p className="text-4xl mb-2">🧾</p>
        <p>Nenhuma despesa este mês</p>
      </div>
    );
  }

  const grouped = groupByDate(expenses);
  const dates = Object.keys(grouped).sort((a, b) => (a > b ? -1 : 1));

  return (
    <div className="space-y-4">
      {dates.map((date) => (
        <div key={date}>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
            {format(parseISO(date), "d 'de' MMMM", { locale: ptBR })}
          </p>
          <div className="bg-white rounded-xl px-3 shadow-sm">
            {grouped[date].map((e) => (
              <ExpenseItem key={e.id} expense={e} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
