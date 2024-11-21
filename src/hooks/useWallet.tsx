import { useState } from "react";

// Define types for transaction
interface Transaction {
  type: "Credit" | "Debit";
  amount: number;
}

export const useWallet = () => {
  const [balance, setBalance] = useState<number>(1000); // Initial balance as a number
  const [transactions, setTransactions] = useState<Transaction[]>([]); // Empty array of transactions

  // Function to add money to the wallet
  const addMoney = (amount: number): void => {
    if (amount > 0) {
      setBalance((prevBalance) => prevBalance + amount);
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        { type: "Credit", amount },
      ]);
    }
  };

  // Function to add an expense from the wallet
  const addWalletExpense = (amount: number): void => {
    if (amount > 0 && balance >= amount) {
      setBalance((prevBalance) => prevBalance - amount);
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        { type: "Debit", amount },
      ]);
    } else {
      alert("Insufficient balance!");
    }
  };

  return { balance, addMoney, addWalletExpense, transactions };
};
