import type { Settlement, MonthSummary } from "@/types";

function fmt(n: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(n);
}

interface Props {
  settlement: Settlement;
  summary: MonthSummary;
}

export default function SettlementBanner({ settlement, summary }: Props) {
  const isOwed = settlement.debtor === "irma";
  const isEven = settlement.amount < 0.01 && summary.grand_total > 0;
  const isEmpty = summary.grand_total === 0;

  let bg = "bg-emerald-50 border-emerald-200";
  let textColor = "text-emerald-700";
  if (!isEmpty && !isEven && !isOwed) {
    bg = "bg-orange-50 border-orange-200";
    textColor = "text-orange-700";
  }

  return (
    <div className={`rounded-2xl border p-4 ${bg}`}>
      <p className={`text-center text-lg font-bold ${textColor}`}>
        {settlement.label}
      </p>

      {!isEmpty && (
        <div className="mt-3 flex justify-around text-sm text-gray-600">
          <div className="text-center">
            <p className="font-semibold text-gray-800">{fmt(summary.eu_total)}</p>
            <p className="text-xs text-gray-500">Você pagou</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-800">{fmt(summary.irma_total)}</p>
            <p className="text-xs text-gray-500">Irmã pagou</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-800">{fmt(summary.grand_total)}</p>
            <p className="text-xs text-gray-500">Total</p>
          </div>
        </div>
      )}
    </div>
  );
}
