"use client";

// const sampleExpensesList: Expense[] = [
//   { id: 1, name: "Groceries", price: 5000 },
//   { id: 2, name: "Dinner with friends", price: 10000 },
//   { id: 3, name: "Gasoline", price: 3000 },
//   { id: 4, name: "Movie tickets", price: 2500 },
// ];

import { createContext, ReactNode, useState } from "react";
import { Expense } from "@/app/types";

// type ExpensesContextType = {
//   expenses: Expense[];
//   addExpense: (name: string, price: number) => void;
//   removeExpense: (id: string) => void;
//   editExpense: (newData: Expense) => void;
//   clearAllExpenses: () => void;
//   totalPrice: () => number;
// };

// const ExpensesContext = createContext<ExpensesContextType | null>(null);
const ExpensesContext = createContext(null);

// const sampleExpensesList: Expense[] = [];

function getUID(): string {
  return Date.now().toString(36);
}

type ExpensesProviderProps = {
  children: ReactNode;
};

const ExpensesProvider = ({ children }: ExpensesProviderProps) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (name: string, price: number): void => {
    setExpenses((prev) => [
      ...prev,
      { id: getUID(), name: name, price: price },
    ]);
  };

  const clearAllExpenses = (): void => {
    setExpenses([]);
  };

  const removeExpense = (id: string): void => {
    setExpenses((oldExpenses) =>
      oldExpenses.filter((expense) => expense.id !== id)
    );
  };

  const editExpense = (newData: Expense): void => {
    setExpenses((oldExpenses) =>
      oldExpenses.map((expense) =>
        expense.id === newData.id
          ? { ...newData, price: Number(newData.price) }
          : expense
      )
    );
  };

  const totalPrice = (): number => {
    return expenses
      .map((expense) => Number(expense.price))
      .reduce((cur, acc) => cur + acc, 0);
  };

  const contextValue: ExpensesContextType = {
    expenses,
    addExpense,
    removeExpense,
    editExpense,
    clearAllExpenses,
    totalPrice,
  };

  return (
    <ExpensesContext.Provider value={contextValue}>
      {children}
    </ExpensesContext.Provider>
  );
};

export { ExpensesProvider };
export default ExpensesContext;
