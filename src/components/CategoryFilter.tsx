// src/components/CategoryFilter.tsx

import React from 'react';

interface CategoryFilterProps {
  onChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onChange }) => {
  const categories = ['All', 'Food', 'Transportation', 'Entertainment', 'Bills', 'Other'];

  return (
    <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
      <h2 className="text-lg font-bold">Filter by Category</h2>
      <div className="flex space-x-4 mt-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onChange(category)}
            className="px-4 py-2 rounded border"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
