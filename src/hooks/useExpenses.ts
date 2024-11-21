import { useState, useEffect } from 'react';
import { Expense } from '../types/expense';
import { v4 as uuidv4 } from 'uuid';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses');
    try {
      const parsedExpenses = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsedExpenses) ? parsedExpenses : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (expenses.length > 0) {
      try {
        localStorage.setItem('expenses', JSON.stringify(expenses));
      } catch (error) {
        console.error('Error saving expenses to localStorage', error);
      }
    }
  }, [expenses]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = {
      ...expense,
      id: uuidv4(),
    };
    setExpenses(prev => [...prev, newExpense]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const clearExpenses = () => {
    localStorage.removeItem('expenses');
    setExpenses([]);
  };

  return { expenses, addExpense, deleteExpense, clearExpenses };
};
