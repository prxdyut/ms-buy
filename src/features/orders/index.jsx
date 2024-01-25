"use client";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import { auth } from "@clerk/nextjs";
import { formatPrice, getSubstring } from "@src/helpers";
import { client } from "@utils/sanity.client";
import { groq } from "next-sanity";
import Link from "next/link";

export default function AllOrders({ orders }) {

  return (
    <div className=" grid lg:grid-cols-4 gap-4 p-4">
      {orders.length == 0 && (
        <div className=" flex flex-col justify-center align-center py-8">
          <p className=" mx-auto pt-8 text-xl text-center mb-8">
            You Havent Placed any Order
          </p>
          <Link
            href={"/"}
            className=" mx-auto w-max bg-black text-white px-8 py-4"
          >
            Go to Homepage
          </Link>
        </div>
      )}
      {orders.map((order, index) => (
        <div>
          <Link href={`/order-history/${order.id}`} className="" key={index}>
            <div className="p-4 pb-2 bg-grey  rounded">
              <p className=" font-semibold mb-4 text-end">
                {new Date(order.timestamp).toLocaleDateString()}
              </p>
              <div className=" flex gap-1 flex-col">
                {order.products.map(
                  ({ productReference, ...product }, index) => (
                    <div className=" grid grid-flow-col">
                      <div colSpan={4}>
                        <p>{getSubstring(productReference.name, 15)}</p>
                      </div>

                      <div>
                        <p className="text-end">{product.quantity}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
              <p className=" text-xl font-semibold mt-4 text-end">
                Total : ₹ {order.total}
              </p>
            </div>
            <p className=" rounded p-2 bg-black text-white font-semibold text-end">
              Status : {order.fulfilled ? "Fulfilled" : "Yet to Fulfill"}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
