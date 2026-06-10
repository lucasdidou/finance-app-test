import Link from "next/link";
import { getDistinctMonths, getMonthSummary } from "@/lib/queries";
import { calculateSettlement } from "@/lib/settlement";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronRight } from "lucide-react";

function fmt(n: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(n);
}

export default function HistoryPage() {
  const months = getDistinctMonths();

  if (months.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-bold text-gray-800">Histórico</h1>
        <div className="text-center text-gray-400 py-12">
          <p className="text-4xl mb-2">📅</p>
          <p>Nenhum mês anterior</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-800">Histórico</h1>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {months.map((month) => {
          const summary = getMonthSummary(month);
          const settlement = calculateSettlement(
            summary.eu_total,
            summary.irma_total
          );
          const label = format(parseISO(`${month}-01`), "MMMM yyyy", {
            locale: ptBR,
          });

          return (
            <Link
              key={month}
              href={`/?month=${month}`}
              className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-800 capitalize">{label}</p>
                <p className="text-sm text-gray-400">
                  Total: {fmt(summary.grand_total)}
                </p>
              </div>
              <p
                className={`text-sm font-medium ${
                  settlement.amount < 0.01
                    ? "text-emerald-500"
                    : "text-orange-500"
                }`}
              >
                {settlement.amount < 0.01
                  ? "Quites"
                  : fmt(settlement.amount)}
              </p>
              <ChevronRight size={16} className="text-gray-300" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
