"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/types";
import type { Person } from "@/types";
import { format } from "date-fns";

export default function AddExpenseForm() {
  const router = useRouter();
  const [person, setPerson] = useState<Person>("eu");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const amountRef = useRef<HTMLInputElement>(null);

  function handleCategory(id: string, label: string) {
    setCategory(id);
    setDescription(id === "outro" ? "" : label);
    amountRef.current?.focus();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const parsed = parseFloat(amount.replace(",", "."));
    if (isNaN(parsed) || parsed <= 0) {
      setError("Informe um valor válido");
      return;
    }
    if (!category) {
      setError("Selecione uma categoria");
      return;
    }
    if (!description.trim()) {
      setError("Informe uma descrição");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paid_by: person,
        amount: parsed,
        description: description.trim(),
        category,
        expense_date: date,
      }),
    });

    setLoading(false);
    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError("Erro ao salvar. Tente novamente.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Person picker */}
      <div>
        <p className="text-sm font-semibold text-gray-500 mb-2">Quem pagou?</p>
        <div className="grid grid-cols-2 gap-3">
          {(["eu", "irma"] as Person[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPerson(p)}
              className={`py-4 rounded-2xl text-lg font-bold transition-all ${
                person === p
                  ? "bg-emerald-500 text-white shadow-md scale-[1.02]"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {p === "eu" ? "👤 Eu" : "👩 Irmã"}
            </button>
          ))}
        </div>
      </div>

      {/* Category picker */}
      <div>
        <p className="text-sm font-semibold text-gray-500 mb-2">Categoria</p>
        <div className="grid grid-cols-4 gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategory(cat.id, cat.label)}
              className={`flex flex-col items-center py-2 rounded-xl text-xs transition-all ${
                category === cat.id
                  ? "bg-emerald-500 text-white shadow-sm scale-[1.04]"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <span className="text-xl mb-1">{cat.emoji}</span>
              <span className="leading-tight text-center">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="text-sm font-semibold text-gray-500 mb-2">Descrição</p>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex: Pão francês"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-emerald-400"
        />
      </div>

      {/* Amount */}
      <div>
        <p className="text-sm font-semibold text-gray-500 mb-2">Valor (R$)</p>
        <input
          ref={amountRef}
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0,00"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-2xl font-bold text-gray-800 focus:outline-none focus:border-emerald-400"
        />
      </div>

      {/* Date */}
      <div>
        <p className="text-sm font-semibold text-gray-500 mb-2">Data</p>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-emerald-400"
        />
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl text-lg transition-colors disabled:opacity-60"
      >
        {loading ? "Salvando..." : "Salvar Despesa"}
      </button>
    </form>
  );
}
