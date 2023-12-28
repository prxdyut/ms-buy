"use client";
import { Rating } from "./Rating";
import Image from "next/image";
import { getSubstring } from "@src/helpers";
import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "@src/context/AppContext";
import { AddToCartButton } from "./Cart/AddToCartButton";

export const ProductCard = ({ product, variant }) => {
  const { addItem, removeItem, isAdded, store } = useContext(AppContext);

  const small = (
    <div className="bg-white flex flex-row gap-4 p-4">
      <Link href={`/products/${product?.slug}`} className=" w-36">
      {product?.mainImage ? (
          <div className="relative aspect-square mb-4">
            <Image
              src={product?.mainImage}
              alt={product?.name}
              fill
              objectFit="cover"
            />
          </div>
        ) : (
          <div className="relative aspect-square mb-4">
            <Image
              src={store?.logo?.header?.url}
              alt={product?.name}
              fill
              objectFit="contain"
              className="p-4 animate-pulse"
            />
          </div>
        )}
      </Link>
      <div className=" flex flex-col justify-between flex-grow">
        <div>
          <p className=" uppercase text-sm font-semibold mb-2">
            {getSubstring(product?.name, 22)}
          </p>
        <div className=" flex mb-1 items-center gap-2">
          <p className=" text-md  ">₹ {product?.price}</p>
          <p className=" text-sm  opacity-60 line-through">₹ {product?.mrp}</p>
          <p className=" text-xs font-semibold  ">
            {parseInt(100 - (product?.price / product?.mrp) * 100)}% Off
          </p>

        </div>

          <p className=" text-xs text-dark mb-0">{product?.category?.name}</p>
        </div>
        <div className="text-right cursor-pointer">
          {isAdded("cart", product?.id) ? (
            <button
              className="  text-[.6rem]   px-4 py-2 uppercase w-max bg-grey text-black rounded-full"
              onClick={() => removeItem("cart", product.id)}
            >
              Remove
            </button>
          ) : (
            <button
              className=" text-[.6rem]  px-4 py-2 uppercase w-max border-2 bg-black text-white rounded-full"
              onClick={() => addItem("cart", product.id, 1)}
            >
              Add to bag
            </button>
          )}
        </div>
      </div>
    </div>
  );
  const big = (
    <div className="bg-white py-4 px-4 lg:px-6">
      <Link href={`/products/${product?.slug}`}>
        <div className="flex justify-between items-center mb-4 ">
          <Rating rating={product.rating} />
          {product?.badge && (
            <p className=" uppercase text-xs border pt-1 px-2 rounded-full font-semibold border-dark">
              {product?.badge}
            </p>
          )}{" "}
        </div>
        {product?.mainImage ? (
          <div className="relative aspect-square mb-4">
            <Image
              src={product?.mainImage}
              alt={product?.name}
              fill
              objectFit="cover"
            />
          </div>
        ) : (
          <div className="relative aspect-square mb-4">
            <Image
              src={store?.logo?.header?.url}
              alt={product?.name}
              fill
              objectFit="contain"
              className="p-8 animate-pulse"
            />
          </div>
        )}
        <p className="text-center uppercase text-md font-semibold mb-2">
          {getSubstring(product?.name, 20)}
        </p>
        <div className=" flex mb-1 items-center gap-2 justify-center">
          <p className=" text-md  ">₹ {product?.price}</p>
          <p className=" text-sm  opacity-60 line-through">₹ {product?.mrp}</p>
          <p className=" text-xs font-semibold  ">
            {parseInt(100 - (product?.price / product?.mrp) * 100)}% Off
          </p>

        </div>
        <p className="text-center text-sm text-dark mb-4">
          {product?.category?.name}
        </p>
      </Link>
      <div className="text-center text-sm cursor-pointer">
        <AddToCartButton
          product={product}
          count={1}
          instock={product?.instock || 100}
        />
      </div>
    </div>
  );
  const related = (
    <div className="bg-white py-4 px-4 lg:px-6">
      <Link href={`/products/${product?.slug}`}>
      {product?.mainImage ? (
          <div className="relative aspect-square mb-4">
            <Image
              src={product?.mainImage}
              alt={product?.name}
              fill
              objectFit="cover"
            />
          </div>
        ) : (
          <div className="relative aspect-square mb-4">
            <Image
              src={store?.logo?.header?.url}
              alt={product?.name}
              fill
              objectFit="contain"
              className="p-8 animate-pulse"
            />
          </div>
        )}
        <p className="text-center uppercase text-md font-semibold mb-2">
          {getSubstring(product?.name, 14)}
        </p>
        <div className=" flex mb-1 items-center gap-2 justify-center">
          <p className=" text-md  ">₹ {product?.price}</p>
          <p className=" text-sm  opacity-60 line-through">₹ {product?.mrp}</p>
          <p className=" text-xs font-semibold  ">
            {parseInt(100 - (product?.price / product?.mrp) * 100)}% Off
          </p>

        </div>
        <p className="text-center text-sm text-dark mb-4">
          {product?.category?.name}
        </p>
      </Link>
    </div>
  );

  if (variant == "compact") {
    return (
      <div className="">
        <div className=" lg:hidden">{small}</div>
        <div className=" max-lg:hidden">{big}</div>
      </div>
    );
  }
  if (variant == "related") return related;
  return big;
};
