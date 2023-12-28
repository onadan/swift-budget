// @ts-nocheck
"use client";

// Import necessary dependencies and components
import PriceInput from "@/components/price-input";
import { useContext, useState, ReactNode } from "react";
import ExpensesContext from "@/contexts/expense-context";
import WidthWrapper from "@/components/width-wrapper";
import EditModal from "@/components/edit-modal";
import { Expense } from "./types";
import { useRouter } from "next/navigation";

// Define types for your component props
type PageProps = {};

type ExpensesCardProps = {
  children: ReactNode;
};

// Define the Page component
const Page: React.FC<PageProps> = () => {
  // State for current expense details, edit modal status, and selected expense
  const [currExpensePrice, setCurrExpensePrice] = useState<string>("");
  const [currExpenseName, setCurrExpenseName] = useState<string>("");

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const router = useRouter();

  // Access context methods and data
  const { expenses, clearAllExpenses, addExpense, removeExpense, editExpense } =
    useContext(ExpensesContext);

  // Functions to handle edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedExpense(null);
  };

  const openEditModal = (data: Expense) => {
    setSelectedExpense(data);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (data: Expense) => {
    editExpense(data);
    closeEditModal();
  };

  return (
    <>
      {isEditModalOpen && (
        <EditModal
          selectedExpense={selectedExpense}
          onClose={closeEditModal}
          onSave={handleSaveEdit}
        />
      )}

      {/* Main content */}
      <main className="my-3  mt-10">
        <WidthWrapper customStyle={"max-w-[1000px]"}>
          <h1 className="text-3xl font-semibold text-main">Swift Budget</h1>
          <p className="text-sm text-neutral-500">
            What are you planning today?
          </p>

          {/* Form for adding expenses */}
          <form
            className="flex flex-col gap-4 items-start mt-10"
            onSubmit={(e) => {
              e.preventDefault();
              addExpense(currExpenseName, parseFloat(currExpensePrice));
              setCurrExpenseName("");
              setCurrExpensePrice("");
            }}
          >
            {/* Expense Title input */}
            <input
              type="text"
              name="expense_name"
              className="h-12 border outline-none focus:border-main rounded-lg px-4 w-full"
              placeholder="Expense Title*"
              value={currExpenseName}
              onChange={(e) => {
                setCurrExpenseName(e.target.value);
              }}
              required
            />
            {/* Expense Price input */}
            <div className="flex gap-4 flex-wrap w-full">
              <PriceInput
                value={currExpensePrice}
                onChange={(value) => setCurrExpensePrice(value)}
              />
              {/* Submit button */}
              <button
                type="submit"
                className="w-max h-12 px-4 bg-main rounded-full text-white font-semibold text-xs"
              >
                Add to List
              </button>
            </div>
          </form>

          {/* Budget List */}
          <div className="mt-10">
            {/* Clear All button */}
            <div className="mt-10 my-5 flex items-end justify-between w-full">
              <h1 className="font-semibold text-main text-xl">BUDGET LIST</h1>
              <button
                onClick={clearAllExpenses}
                className="text-xs text-red-500 text-neutra-500 font-semibold "
              >
                CLEAR ALL
              </button>
            </div>

            {/* Expense items */}
            <div className="flex flex-col gap-2">
              {expenses.length > 0 ? (
                <>
                  {expenses.map((expense: Expense, idx: number) => (
                    <div
                      key={idx}
                      className="rounded-lg grid grid-cols-[36px_1fr_100px] grid-rows-2 sm:grid-rows-none sm:grid-cols-[36px_1fr_100px_100px] gap-3 min-h-12 h-full py-2 border shadow place-items-center place-content-cente px-3"
                    >
                      {/* Expense index */}
                      <p className="text-xs text-neutral-500">{idx + 1}</p>
                      {/* Expense name */}
                      <p className="text-sm justify-self-start ">
                        {expense.name}{" "}
                      </p>
                      {/* Expense price */}
                      <p className="font-semibold  text-sm justify-self-end">
                        {Number(expense.price).toLocaleString()}
                      </p>
                      {/* Edit and Delete buttons */}
                      <div className="flex gap-2 h-max text-xs justify-self-end sm:justify-s col-start-3 sm:col-auto">
                        <button onClick={() => openEditModal(expense)}>
                          edit
                        </button>
                        <button
                          className="text-red-600"
                          onClick={() => removeExpense(expense.id)}
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Generate Budget Card button */}
                  <button
                    className="mt-5 bg-main rounded-full h-12 shadow-[4px_4px_1px_black] text-white sm:w-max text-sm px-4 font-medium"
                    onClick={() => router.push("/generate-card")}
                  >
                    Generate Budget Card
                  </button>
                </>
              ) : (
                // Displayed when there are no expenses
                <div className="w-full flex justify-center text-neutral-500 text-sm my-1 border border-dashed py-10 rounded-lg">
                  You have no expenses yet
                </div>
              )}
            </div>
          </div>
        </WidthWrapper>
      </main>
    </>
  );
};

export default Page;
