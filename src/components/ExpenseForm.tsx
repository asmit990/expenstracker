import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExpenseFormProps {
  onSubmit: (expense: {
    amount: number;
    category: string;
    description: string;
    date: string;
  }) => void;
}

const categories = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other'
];

export function ExpenseForm({ onSubmit }: ExpenseFormProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      amount: parseFloat(amount),
      category,
      description,
      date
    });
    setAmount('');
    setDescription('');
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 50 }} // Start from below and fade in
      animate={{ opacity: 1, y: 0 }} // Move to normal position and become visible
      transition={{ duration: 0.8, ease: 'easeOut' }} // Smooth transition
    >
      <div className="space-y-8">
        {/* Amount Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-white">Amount</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-white sm:text-sm">₹</span>
            </div>
            <motion.input
              type="number"
              required
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md shadow-md"
              placeholder="0.00"
              whileFocus={{ scale: 1.05, boxShadow: '0 0 5px rgba(67, 56, 202, 0.6)' }} // Focus effect
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </div>
        </motion.div>

        {/* Category Select */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-white">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-md"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </motion.div>

        {/* Description Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <label className="block text-sm font-medium text-white">Description</label>
          <motion.input
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            whileFocus={{ scale: 1.05, boxShadow: '0 0 5px rgba(67, 56, 202, 0.6)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </motion.div>

        {/* Date Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <label className="block text-sm font-medium text-white">Date</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full flex justify-center items-center space-x-2 py-3 px-5 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          whileHover={{ y: -5 }} // Slight bounce effect on hover
          whileTap={{ scale: 0.95 }} // Shrink the button on click
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <PlusCircle className="w-6 h-6" />
          <span>Add Expense</span>
        </motion.button>
      </div>
    </motion.form>
  );
}
