import React, { useState } from "react";

interface Transaction {
  type: "Credit" | "Debit";
  amount: number;
}

interface WalletProps {
  balance: number;
  transactions: Transaction[];
  onAddMoney: (amount: number) => void;
  onAddExpense: (amount: number) => void;
}

export const Wallet: React.FC<WalletProps> = ({
  balance,
  transactions,
  onAddMoney,
  onAddExpense,
}) => {
  const [amount, setAmount] = useState<string>("");
  const [debitedAmount, setDebitedAmount] = useState<number | null>(null);

  const handleAddMoney = () => {
    if (amount && parseFloat(amount) > 0) {
      onAddMoney(parseFloat(amount));
      setAmount(""); // Reset amount after adding
    }
  };

  const handleAddExpense = () => {
    if (amount && parseFloat(amount) > 0) {
      const expAmount = parseFloat(amount);
      if (balance >= expAmount) {
        onAddExpense(expAmount);
        setDebitedAmount(expAmount); // Set debited amount for animation
        setAmount(""); // Reset amount after expense
      } else {
        alert("Insufficient balance!");
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-teal-500 p-8 rounded-3xl shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105">
      <h2 className="text-3xl font-extrabold text-white text-center mb-6">Your Wallet</h2>
      <p className="text-2xl font-semibold text-white text-center mb-6">
        Balance: ₹{balance.toFixed(2)}
      </p>

      {/* Show debited amount with inline animation */}
      {debitedAmount !== null && (
        <div
          className="text-red-500 text-xl font-semibold mt-4 p-3 rounded-lg bg-red-100 transition-transform duration-500 ease-in-out transform scale-105"
          style={{
            opacity: 1,
            animation: "fadeOut 1s forwards", // Adding fade-out effect directly here
          }}
        >
          - ₹{debitedAmount.toFixed(2)} (Expense)
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-6">
        {/* Input for amount */}
        <input
          type="number"
          className="border-2 border-indigo-500 rounded-xl p-4 w-full sm:w-2/5 text-lg focus:ring-4 focus:ring-teal-400"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Add Money Button */}
        <button
          className="bg-teal-600 text-white text-lg px-8 py-3 rounded-xl w-full sm:w-auto shadow-lg hover:bg-teal-700 transition-all duration-200 transform hover:scale-105"
          onClick={handleAddMoney}
        >
          Add Money
        </button>

        {/* Spend Button */}
        <button
          className="bg-red-600 text-white text-lg px-8 py-3 rounded-xl w-full sm:w-auto shadow-lg hover:bg-red-700 transition-all duration-200 transform hover:scale-105"
          onClick={handleAddExpense}
        >
          Spend Money
        </button>
      </div>

      <h3 className="text-xl font-semibold text-white mt-8">Transaction History</h3>
      <ul className="mt-4 space-y-4">
        {transactions.map((txn, index) => (
          <li
            key={index}
            className={`p-4 rounded-xl shadow-lg text-white ${
              txn.type === "Credit" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            <div className="flex justify-between">
              <span className="text-lg font-bold">{txn.type}</span>
              <span className="text-lg">₹{txn.amount.toFixed(2)}</span>
            </div>
            <div className="text-sm opacity-75 mt-1">
              {txn.type === "Credit" ? "Money added to wallet" : "Money spent"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
