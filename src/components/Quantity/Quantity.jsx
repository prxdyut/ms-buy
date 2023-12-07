import { useNumberInput } from "@chakra-ui/react";
import React from "react";
import { LuMinus } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
export const Quantity = ({ setQuantity, quantity, disabled = false }) => {
  const inc = () => {
    setQuantity(quantity + 1);
  };
  const dec = () => {
    quantity > 1 && setQuantity(quantity - 1);
  };
  return (
    <div className={`  ${disabled && 'opacity-0'}  mb-2 flex justify-end mt-2`}>
      <button
        disabled={disabled}
        onClick={dec}
        className={`bg-black  text-white rounded-full`}
      >
        <LuMinus className="h-4 w-4 m-1" />
      </button>
      <input readOnly={true} value={quantity} className="w-8 text-center" />
      <button
        disabled={disabled}
        onClick={inc}
        className={`bg-black  text-white rounded-full`}
      >
        <LuPlus className="h-4 w-4 m-1" />
      </button>
    </div>
  );
};
