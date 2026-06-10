import { Suspense } from "react";
import { format } from "date-fns";
import { getExpensesByMonth, getMonthSummary } from "@/lib/queries";
import { calculateSettlement } from "@/lib/settlement";
import SettlementBanner from "@/components/SettlementBanner";
import ExpenseList from "@/components/ExpenseList";
import MonthPicker from "@/components/MonthPicker";
import Link from "next/link";
import { Plus } from "lucide-react";

interface Props {
  searchParams: Promise<{ month?: string }>;
}

export default async function HomePage({ searchParams }: Props) {
  const { month: monthParam } = await searchParams;
  const month = monthParam ?? format(new Date(), "yyyy-MM");

  const expenses = getExpensesByMonth(month);
  const summary = getMonthSummary(month);
  const settlement = calculateSettlement(summary.eu_total, summary.irma_total);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-800">🏠 Racha Contas</h1>

      <Suspense>
        <MonthPicker month={month} />
      </Suspense>

      <SettlementBanner settlement={settlement} summary={summary} />

      <ExpenseList expenses={expenses} />

      <Link
        href="/add"
        className="fixed bottom-20 right-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-4 shadow-lg transition-colors"
        aria-label="Adicionar despesa"
      >
        <Plus size={24} />
      </Link>
    </div>
  );
}
