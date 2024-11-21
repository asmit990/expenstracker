import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BarChart3 } from "lucide-react";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { ExpenseChart } from "./components/ExpenseChart";
import { ExpenseSummary } from "./components/ExpenseSummary";
import { useExpenses } from "./hooks/useExpenses";
import { Hero } from "./components/Hero";
import { Notification } from "./components/Notification";
import { Wallet } from "./components/Wallet";
import { useWallet } from "./hooks/useWallet";

function App() {
  const { expenses, addExpense, deleteExpense } = useExpenses();
  const { balance, addMoney, addWalletExpense, transactions } = useWallet();

  const handleAddExpense = (expense: { amount: number; category: string; description: string; date: string }) => {
    addExpense(expense);
    addWalletExpense(expense.amount);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-100">
              {/* Navbar */}
              <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                      <BarChart3 className="h-8 w-8 text-indigo-600" />
                      <h1 className="ml-2 text-xl font-bold text-gray-900">expenSYNC</h1>
                    </div>
                  </div>
                </div>
              </nav>

              {/* Hero Section */}
              <Hero />

              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-8">
                  {/* Wallet Section */}
                  <div className="flex flex-col lg:flex-row gap-4">
                    <Wallet
                      balance={balance}
                      transactions={transactions}
                      onAddMoney={addMoney}
                      onAddExpense={addWalletExpense}
                    />
                  </div>

                  {/* Summary Section */}
                  <ExpenseSummary expenses={expenses} />

                  {/* Expense Form and List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="col-span-1">
                      <ExpenseForm onSubmit={handleAddExpense} />
                    </div>
                    <div className="col-span-2">
                      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
                    </div>
                  </div>

                  {/* Expense Chart */}
                  {expenses.length > 0 && (
                    <div className="mt-8">
                      <ExpenseChart expenses={expenses} />
                    </div>
                  )}
                </div>
              </main>

              {/* Notification Component */}
              {expenses.length > 0 && (
                <div className="fixed bottom-4 right-4">
                  <Notification expenses={expenses} />
                </div>
              )}
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
