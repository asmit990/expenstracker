import React from 'react';
import { Expense } from '../types/expense';
import { motion } from 'framer-motion';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export const ExpenseSummary = ({ expenses }: ExpenseSummaryProps) => {
  const totalAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <motion.div
      className="bg-gradient-to-r from-indigo-600 to-teal-500 p-8 rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl font-semibold text-white mb-6 text-center">Expense Summary</h3>

      {/* Total Expenses */}
      <motion.div
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p className="text-lg text-gray-100">Total Expenses:</p>
        <p className="font-bold text-2xl text-white">₹{totalAmount.toFixed(2)}</p>
      </motion.div>

      {/* Category Breakdown */}
      <div className="space-y-4">
        {Object.keys(categoryTotals).map((category) => (
          <motion.div
            key={category}
            className="flex justify-between items-center p-4 rounded-lg bg-white shadow-md transition-transform transform hover:scale-105"
            style={{ boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)" }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category Name */}
            <p className="text-lg font-medium text-gray-800">{category}</p>
            {/* Category Amount */}
            <p className="font-semibold text-xl text-indigo-600">₹{categoryTotals[category].toFixed(2)}</p>
          </motion.div>
        ))}
      </div>

      {/* Footer/Notes */}
      <div className="mt-8 text-center text-sm text-gray-300">
        <p>Track your spending smartly and stay on top of your budget.</p>
      </div>
    </motion.div>
  );
};
