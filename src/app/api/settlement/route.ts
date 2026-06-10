import { NextRequest, NextResponse } from "next/server";
import { getMonthSummary } from "@/lib/queries";
import { calculateSettlement } from "@/lib/settlement";
import { format } from "date-fns";

export async function GET(req: NextRequest) {
  const month =
    req.nextUrl.searchParams.get("month") ?? format(new Date(), "yyyy-MM");

  const { eu_total, irma_total } = getMonthSummary(month);
  const settlement = calculateSettlement(eu_total, irma_total);

  return NextResponse.json(settlement);
}
