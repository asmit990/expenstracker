import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [expenses, setExpenses] = useState<any[]>([]);

  // Fetch user expenses after login
  const fetchExpenses = async (userId: number) => {
    try {
      const response = await axios.get(`http://localhost:5000/expenses/${userId}`);
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        // Assuming we get userId back from response for the logged-in user
        const userId = 1; // Replace with actual user ID from response
        fetchExpenses(userId);
        onLogin();
      }
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", {
        email,
        password,
      });

      if (response.status === 201) {
        alert("Registration successful! You can now log in.");
        setIsRegistering(false);
      }
    } catch (error) {
      alert("Error during registration.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {isRegistering ? (
          <>
            <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
              Register
            </h2>
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <motion.button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                whileHover={{ y: -2 }}
              >
                Register
              </motion.button>
            </form>
            <p className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <button
                className="text-indigo-600 hover:underline"
                onClick={() => setIsRegistering(false)}
              >
                Login
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">
              Login
            </h2>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <motion.button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                whileHover={{ y: -2 }}
              >
                Login
              </motion.button>
            </form>
            <p className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <button
                className="text-green-600 hover:underline"
                onClick={() => setIsRegistering(true)}
              >
                Register
              </button>
            </p>

            <div className="mt-6">
              <h3 className="text-xl font-bold">Your Expenses</h3>
              <ul>
                {expenses.map((expense) => (
                  <li key={expense.id}>
                    {expense.description} - ${expense.amount}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
