import React from 'react';
import { motion } from 'framer-motion';

export function Hero() {
  const handleButtonClick = () => {
    const section = document.getElementById("expense-tracker-section");
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-blue-700 to-teal-600 text-white h-screen flex items-center">
      <div className="container mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center justify-between">
        
        {/* Text Section */}
        <motion.div
          className="text-center md:text-left md:w-1/2"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <h1 className="text-6xl sm:text-7xl font-extrabold leading-tight mb-8 text-shadow-lg">
            Take Control of Your Expenses
          </h1>
          <p className="text-xl sm:text-2xl mb-10 max-w-lg mx-auto md:mx-0">
            Empower your financial future with advanced tools to track, categorize, and visualize your spending like never before.
          </p>

          {/* Get Started Button */}
          <motion.button
            onClick={handleButtonClick}
            className="bg-teal-800 hover:bg-teal-900 active:bg-teal-950 text-white font-bold py-4 px-10 rounded-full text-xl transition duration-300 transform hover:scale-110 focus:outline-none active:scale-95"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="mt-12 md:mt-0 md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <img
            src="https://via.placeholder.com/700x600"
            alt="Expense Tracker Illustration"
            className="max-w-full h-auto rounded-xl shadow-xl transform hover:scale-105 transition duration-300"
          />
        </motion.div>
      </div>

      {/* Optional Overlay for better contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
    </section>
  );
}
