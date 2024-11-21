// src/components/BudgetForm.tsx
import React, { useState } from 'react';

export const BudgetForm = ({ onSetBudget }: { onSetBudget: (amount: number) => void }) => {
  const [budget, setBudget] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSetBudget(budget);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="budget">Set Budget</label>
      <input
        id="budget"
        type="number"
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
      />
      <button type="submit">Set Budget</button>
    </form>
  );
};
// src/components/BudgetForm.tsx
import React, { useState } from 'react';

export const BudgetForm = ({ onSetBudget }: { onSetBudget: (amount: number) => void }) => {
  const [budget, setBudget] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSetBudget(budget);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="budget">Set Budget</label>
      <input
        id="budget"
        type="number"
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
      />
      <button type="submit">Set Budget</button>
    </form>
  );
};
