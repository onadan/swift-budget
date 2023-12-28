// @ts-nocheck
import { Expense } from "@/app/types";
import { useState } from "react";
import PriceInput from "./price-input";

export default function EditModal({ selectedExpense, onClose, onSave }) {
  const [data, setData] = useState<Expense>(selectedExpense);

  return (
    <div className="w-screen h-screen flex px-3 justify-center items-center top-0 left-0 py-5 fixed backdrop-blur-[2px] bg-neutral-400/10">
      <div className="max-w-[400px] border bg-white w-full min-h-[200px] rounded-2xl flex flex-col gap-4 p-4">
        <h2 className="text-xl text-main font-semibold">Edit Expense</h2>
        <div className="gap-3 flex flex-col">
          <input
            type="text"
            name="name"
            className="h-12 border outline-none focus:border-main rounded-lg px-4 w-full"
            placeholder="Expense Title"
            value={data.name}
            onChange={(e) => {
              setData((prev) => ({ ...prev, name: e.target.value }));
            }}
            required
          />
          <PriceInput
            value={data.price}
            onChange={(price: string) => {
              setData((prev) => ({ ...prev, price }));
            }}
          />

          <div className="flex gap-3 text-xs font-semibold justify-end">
            <button
              type="submit"
              className="borde rounded-full px-3 py-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-neutral-300 text-white px-3 py-2 rounded-full hover:bg-main "
              onClick={() => {
                onSave(data);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
