"use client";
import "lightbox.js-react/dist/index.css";
import { CustomBreadcrumb } from "@src/components/CustomBreadcrumb";
import { AppContext } from "@src/context/AppContext";
import { getSubstring } from "@src/helpers";
import { useContext, useState } from "react";
import Image from "next/image";
import "yet-another-react-lightbox/styles.css";
import { Quantity } from "@src/components/Quantity/Quantity";
import { AddToCartButton } from "@src/components/Cart/AddToCartButton";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { RandomProducts } from "./random";
const items = [
  {
    name: "Products",
    link: "/products",
  },
  {
    name: "Categories",
    link: "/category",
  },
];

export const ProductDetails = ({ product, variants }) => {
  const [quantity, setQuantity] = useState(1);
  const { isAdded, addItem, resetItems, store } = useContext(AppContext);
  const variantsNoDuplicates = (
    Array.from(new Set(variants.map((a) => a.slug))).map((slug) => {
      return variants.find((a) => a.slug === slug);
    })
  );
  return (
    <>
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="hidden lg:block ">
          <CustomBreadcrumb
            items={[
              ...items,
              {
                name: product?.category?.name,
                link: `/category/${product?.category?.slug.current}`,
              },
              {
                name: getSubstring(product?.name, 20),
                link: `/products/${product?.slug}`,
              },
            ]}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className=" grid max-lg:overflow-x-auto max-lg:grid-flow-col lg:grid-cols-2 lg:col-span-2 gap-4">
            {product?.mainImage && (
              <Link
                href={product?.mainImage || ""}
                target="_blank"
                className="relative w-[75vw] lg:w-full aspect-square rounded"
              >
                <Image
                  src={product?.mainImage}
                  alt={product?.name}
                  fill
                  objectFit="cover"
                  className="bg-grey"
                />
              </Link>
            )}
            {product?.gallery?.length > 0 &&
              product?.gallery?.map((image, i) => (
                <Link
                  href={image?.asset?.url || ""}
                  target="_blank"
                  className="relative w-[75vw] lg:w-full aspect-square rounded"
                >
                  <Image
                    key={i}
                    src={image?.asset?.url}
                    alt={product.name}
                    fill
                    objectFit="cover"
                    className="bg-grey"
                  />
                </Link>
              ))}
          </div>
          <div className="px-0 lg:px-12 mt-4">
            <div className="sticky top-32">
              <p className=" text-sm opacity-75 uppercase w-3/4 mb-1">Gala</p>
              {/* <div className="mb-2 lg:mb-6">
                  <Rating rating={product?.rating} />
                </div> */}
              <p className=" text-2xl  w-3/4 mb-3">{product?.name}</p>
              <div className=" flex items-end gap-2">
                <div className=" text-3xl">₹ {product?.price}</div>
                <div className=" text-xl opacity-60 line-through">
                  ₹ {product?.mrp}
                </div>
                <div className=" font-semibold">
                  {parseInt(100 - (product?.price / product?.mrp) * 100)}% Off
                </div>
              </div>
              <div className=" py-4 flex gap-2 flex-wrap">
                {variantsNoDuplicates.length > 0 &&
                  variantsNoDuplicates.map((variant) => {
                    const variantName = variant?.name
                      ?.replace(variant?.mainName, "")
                      ?.trim();

                    const productVariantName = product?.name
                      ?.replace(variant?.mainName, "")
                      ?.trim();

                    const active = variantName == productVariantName;
                    return (
                      <Link
                        href={"/products/" + variant?.slug}
                        className={`" uppercase  text-sm shadow  px-2 rounded py-1 ${
                          active && "border-2"
                        } "`}
                      >
                        {variantName}
                      </Link>
                    );
                  })}
              </div>{" "}
              <div className=" opacity-75 text-xs mb-2">
                MRP inclusive of all taxes
              </div>
              <div
                className={` max-lg:hidden transition-all opacity-75 duration-500 overflow-auto pb-2`}
              >
                <PortableText value={product?.description} />
              </div>
              <div className=" flex flex-row lg:flex-col  max-lg:gap-4">
                <Link
                  href={"/checkout"}
                  className="lg:px-8 text-center text-sm uppercase max-lg:w-full font-semibold  bg-white border text-black py-2 rounded-full mb-6"
                  onClick={() => {
                    resetItems("checkout");
                    addItem("checkout", product?.id, quantity);
                  }}
                >
                  Buy Now
                </Link>
                <div className=" max-lg:hidden">
                  <Quantity
                    setQuantity={setQuantity}
                    quantity={quantity}
                    disabled={isAdded("cart", product?.id)}
                  />
                </div>
                <AddToCartButton
                  product={product}
                  count={quantity}
                  instock={product?.instock || 100}
                />
              </div>
              <div className=" text-dark text-sm mb-2 text-center">
                Shipping Charges are calculated at checkout
              </div>
            </div>
          </div>
        </div>

        <div className=" mb-4 pt-4">
          <p className=" lg:hidden cursor-pointer uppercase mb-1 text-sm font-semibold">
            Description
          </p>
          <div
            className={` lg:hidden transition-all duration-500 overflow-auto`}
          >
            <PortableText value={product?.description} />
          </div>
          <div
            className={` transition-all mt-4 duration-500 overflow-auto pt-2`}
          >
            <PortableText
              value={store?.productInfo}
              components={{ block: {} }}
            />
          </div>
        </div>
      </div>
      <RandomProducts />
    </>
  );
};
