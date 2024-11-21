import React, { createContext, useContext, useState, ReactNode } from 'react';

// Type for expense item
interface Expense {
  amount: number;
  category: string;
  description: string;
  date: string;
}

// Expense context and provider
interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
}



// Custom hook to access expenses context
export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};
