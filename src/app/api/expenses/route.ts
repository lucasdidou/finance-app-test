import { NextRequest, NextResponse } from "next/server";
import { getExpensesByMonth, insertExpense, getMonthSummary } from "@/lib/queries";
import type { NewExpense } from "@/types";
import { format } from "date-fns";

export async function GET(req: NextRequest) {
  const month =
    req.nextUrl.searchParams.get("month") ?? format(new Date(), "yyyy-MM");

  const expenses = getExpensesByMonth(month);
  const summary = getMonthSummary(month);

  return NextResponse.json({ expenses, summary });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { paid_by, amount, description, category, expense_date } = body;

  if (!paid_by || !amount || !description || !category || !expense_date) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!["eu", "irma"].includes(paid_by)) {
    return NextResponse.json({ error: "Invalid paid_by" }, { status: 400 });
  }

  const parsed = parseFloat(amount);
  if (isNaN(parsed) || parsed <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const data: NewExpense = {
    paid_by,
    amount: parsed,
    description: String(description).trim(),
    category: String(category),
    expense_date: String(expense_date),
  };

  const expense = insertExpense(data);
  return NextResponse.json({ expense }, { status: 201 });
}
