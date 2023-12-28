"use client";

import React, { useState } from "react";

interface PriceInputProps {
  value: number;
  onChange?: (value: number) => void;
}

const PriceInput: React.FC<PriceInputProps> = ({ value, onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    if (onChange) {
      onChange(Number(numericValue));
    }
  };

  const formattedValue = value ? Number(value).toLocaleString() : "";

  return (
    <div className="relative">
      {/* <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-700">
        $
      </span> */}
      <input
        type="text"
        name="price"
        value={formattedValue}
        onChange={handleInputChange}
        placeholder="Expense Price*"
        className="h-12  border outline-none focus:border-main rounded-lg px-4"
        required
      />
    </div>
  );
};

export default PriceInput;
