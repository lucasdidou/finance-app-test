"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { format, addMonths, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function MonthPicker({ month }: { month: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function navigate(delta: number) {
    const current = parseISO(`${month}-01`);
    const next = addMonths(current, delta);
    const nextMonth = format(next, "yyyy-MM");
    const params = new URLSearchParams(searchParams.toString());
    params.set("month", nextMonth);
    router.push(`${pathname}?${params.toString()}`);
  }

  const label = format(parseISO(`${month}-01`), "MMMM yyyy", { locale: ptBR });

  return (
    <div className="flex items-center justify-between py-2">
      <button
        onClick={() => navigate(-1)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <span className="font-semibold text-gray-700 capitalize">{label}</span>
      <button
        onClick={() => navigate(1)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
