import type { Settlement } from "@/types";

function fmt(amount: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
}

export function calculateSettlement(
  euTotal: number,
  irmaTotal: number
): Settlement {
  const grandTotal = euTotal + irmaTotal;

  if (grandTotal === 0) {
    return { debtor: null, creditor: null, amount: 0, label: "Nenhuma despesa este mês" };
  }

  const diff = euTotal - irmaTotal;
  const amount = Math.abs(diff) / 2;

  if (Math.abs(diff) < 0.01) {
    return { debtor: null, creditor: null, amount: 0, label: "Estamos quites! 🎉" };
  }

  if (diff > 0) {
    // Eu paid more → Irmã owes Eu
    return {
      debtor: "irma",
      creditor: "eu",
      amount,
      label: `Irmã deve ${fmt(amount)} para Você`,
    };
  } else {
    // Irmã paid more → Eu owes Irmã
    return {
      debtor: "eu",
      creditor: "irma",
      amount,
      label: `Você deve ${fmt(amount)} para Irmã`,
    };
  }
}
