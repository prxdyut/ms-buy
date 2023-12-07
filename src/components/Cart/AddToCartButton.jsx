"use client";
import { Button } from "@chakra-ui/react";
import { AppContext } from "@src/context/AppContext";
import { IProduct } from "@src/model";
import React, { useContext } from "react";

export const AddToCartButton = ({ product, count, instock }) => {
  const { addItem, removeItem, isAdded } = useContext(AppContext);
  // console.log(
  //   "product",
  //   product,
  //   "count",
  //   count,
  //   "instock",
  //   instock,
  //   "Addtocart"
  // );

  return (
    <>
      {isAdded("cart", product.id) ? (
        <button
          className=" font-poppins px-4 uppercase font-semibold w-full bg-grey text-black py-2 rounded-full mb-6"
          onClick={() => removeItem("cart", product.id)}
        >
          Remove from cart
        </button>
      ) : (
        <button
          className=" font-poppins px-4 uppercase font-semibold w-full border-2 bg-black text-white py-2 rounded-full mb-6"
          onClick={() => addItem("cart", product.id, count)}
        >
          Add to cart
        </button>
      )}
    </>
  );
};
