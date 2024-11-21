import React from 'react';
import { motion } from 'framer-motion'; // Corrected import
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Expense } from '../types/expense';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ExpenseChartProps {
  expenses: Expense[];
}

export function ExpenseChart({ expenses }: ExpenseChartProps) {
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const categories = Object.keys(categoryTotals);
  const amounts = Object.values(categoryTotals);

  const colors = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
  ];

  const barData = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses by Category',
        data: amounts,
        backgroundColor: colors,
      },
    ],
  };

  const doughnutData = {
    labels: categories,
    datasets: [
      {
        data: amounts,
        backgroundColor: colors,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Expense Distribution',
      },
    },
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Animated Bar Chart with Framer Motion */}
      <motion.div
        className="bg-white p-4 rounded-lg shadow-md"
        initial={{ opacity: 0, scale: 0.9 }} // Start from small size and invisible
        animate={{ opacity: 1, scale: 1 }} // Animate to full size and visible
        exit={{ opacity: 0, scale: 0.9 }} // Exit animation (shrink and fade)
        transition={{ duration: 0.8, type: 'spring', stiffness: 200 }} // Smooth and springy animation
      >
        <Bar data={barData} options={options} />
      </motion.div>

      {/* Animated Doughnut Chart with Framer Motion */}
      <motion.div
        className="bg-white p-4 rounded-lg shadow-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
      >
        <Doughnut data={doughnutData} options={options} />
      </motion.div>
    </div>
  );
}
