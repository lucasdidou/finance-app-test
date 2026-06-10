import AddExpenseForm from "@/components/AddExpenseForm";

export default function AddPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-800">Nova Despesa</h1>
      <AddExpenseForm />
    </div>
  );
}
