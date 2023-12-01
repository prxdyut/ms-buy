import { Button } from "@chakra-ui/react";
import { AppContext } from "@src/context/AppContext";
import { IProduct } from "@src/model";
import React, { useContext } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

interface IAddToWishlistButtonProps {
  product: IProduct;
}

export const AddToWishlistButton = ({ product }: IAddToWishlistButtonProps) => {
  const { addItem, removeItem, isAdded } = useContext(AppContext);

  return (
    <>
      {isAdded("wishlist", product.id) ? (
        <div onClick={() => removeItem("wishlist", product.id)}>
          <BsHeartFill />
        </div>
      ) : (
        <div onClick={() => addItem("wishlist", product)}>
          <BsHeart />
        </div>
      )}
    </>
  );
};
