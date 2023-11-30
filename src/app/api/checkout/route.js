import { NextResponse } from "next/server";
import { client } from "../../../../utils/sanity.client";
import { groq } from "next-sanity";
import { calculateItemsTotal } from "../../../helpers";
import { taxPercentage } from "@/config";
import { auth } from "@clerk/nextjs";

const Razorpay = require("razorpay");
const shortid = require("shortid");

export async function POST(req) {
  const reqData = await req.json();
  const { userId } = auth();
  const { allOrderedProducts, allOrderData } = reqData;

  const orderProductsOnly = allOrderedProducts
    .map(({ id }) => `"${id}"`)
    .join(", ");
  const products =
    await client.fetch(groq`*[_type == "product" && _id in [ ${orderProductsOnly} ]] {
    _id,
    price
}`);
  const orderedProducts = products.map((data) => ({
    ...data,
    count: allOrderedProducts.find(({ id }) => id == data._id).count,
  }));
  const tax = taxPercentage * calculateItemsTotal(orderedProducts);
  const total = tax + calculateItemsTotal(orderedProducts);

  const data = await client.create({
    _type: "allOrders",
    userId,
    paid: false,
    successfull: false,
    products: allOrderedProducts.map(({ _id, count, price }, index) => ({
      _key: `${index + 1}`,
      productReference: { _type: "reference", _ref: _id },
      price,
      quantity: count,
    })),
    ...allOrderData,
  });

  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_KEY,
  });

  const payment_capture = 1;
  const price = parseInt(total);
  const currency = "INR";

  const options = {
    amount: (price * 100).toString(),
    currency,
    receipt: "receipt#" + shortid.generate(),
    payment_capture,
    notes: { id: data._id, total, tax, userId },
  };
  try {
    const response = await razorpay.orders.create(options);
    return NextResponse.json({ payment: response, order: data });
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function PUT(req) {
  const { _id, ...reqData } = await req.json();

  try {
    const result = await client.patch(_id).set(reqData).commit();

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: "Error, check console" });
  }
}
