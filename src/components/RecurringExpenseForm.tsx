// src/components/RecurringExpenseForm.tsx

import React, { useState } from 'react';

interface RecurringExpenseFormProps {
  onSubmit: (expense: { amount: number; category: string; description: string; date: string }) => void;
}

const RecurringExpenseForm: React.FC<RecurringExpenseFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>('Other');
  const [description, setDescription] = useState<string>('');
  const [interval, setInterval] = useState<number>(1); // Monthly by default

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expense = {
      amount,
      category,
      description,
      date: new Date().toISOString(),
    };
    onSubmit(expense); // Submit recurring expense
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
      <h2 className="text-lg font-bold">Add Recurring Expense</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded"
            placeholder="Amount"
            min="0"
          />
        </div>
        <div>
          <label className="block text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option>Food</option>
            <option>Transportation</option>
            <option>Entertainment</option>
            <option>Bills</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Description"
          />
        </div>
        <div>
          <label className="block text-gray-700">Repeat Every (Months)</label>
          <input
            type="number"
            value={interval}
            onChange={(e) => setInterval(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded"
            min="1"
          />
        </div>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
          Add Recurring Expense
        </button>
      </form>
    </div>
  );
};

export default RecurringExpenseForm;
