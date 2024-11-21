import { Expense } from '../types/expense';

const downloadCSV = (expenses: Expense[]) => {
  const headers = ['ID', 'Date', 'Category', 'Description', 'Amount'];
  const rows = expenses.map(expense => [
    expense.id,
    expense.date,
    expense.category,
    expense.description,
    expense.amount.toFixed(2),
  ]);

  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += headers.join(',') + '\n';
  rows.forEach(row => {
    csvContent += row.join(',') + '\n';
  });

  const link = document.createElement('a');
  link.href = encodeURI(csvContent);
  link.download = 'expenses.csv';
  link.click();
};

export function ExportExpensesButton({ expenses }: { expenses: Expense[] }) {
  return (
    <button
      onClick={() => downloadCSV(expenses)}
      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md"
    >
      Export to CSV
    </button>
  );
}
