import { NextResponse } from "next/server";
import { client } from "../../../../utils/sanity.client";
import { groq } from "next-sanity";
import { calculateItemsTotal, calculateShipping } from "../../../helpers";
import { auth } from "@clerk/nextjs";
import { sendMail } from "../../../../utils/sendMail";

const Razorpay = require("razorpay");
const shortid = require("shortid");

export async function POST(req) {
  const reqData = await req.json();
  const { userId } = auth();
  const { allOrderedProducts, allOrderData } = reqData;
  const { orderData } = allOrderData;

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
  const subtotal = calculateItemsTotal(orderedProducts);
  const shipping = calculateShipping(subtotal);

  let total = shipping + subtotal;
  let discount = 0;
  let discountedPrice = total;

  if (allOrderData?.promo?.code) {
    const promo = await client.fetch(
      groq`*[ _type == "promo" && code == $code ][0] {code, max, percentage}`,
      { code: allOrderData.promo.code.trim() }
    );
    if (promo !== null) {
      const { max, percentage } = promo;
      discount = parseInt(total) / parseInt(percentage);
      if (discount > max) {
        total = total - max;
        discount = max;
      } else total = total - discount;
    }
  }

  const data = await client.create({
    _type: "allOrders",
    userId,
    paid: false,
    successfull: false,
    timestamp: new Date().toISOString(),
    products: allOrderedProducts.map(({ id, count, price }, index) => ({
      _key: `${index + 1}`,
      productReference: { _type: "reference", _ref: id },
      price,
      quantity: count,
    })),
    subtotal,
    shipping,
    total,
    promo: allOrderData?.promo,
    ...orderData,
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
    notes: { id: data._id, total, userId, promo: allOrderData.promo.code },
  };
  try {
    const response = await razorpay.orders.create(options);
    return NextResponse.json({ payment: response, order: data });
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function PUT(req) {
  const data = await req.json();
  const {
    update: { _id, ...reqData },
  } = data;

  try {
    const result = await client.patch(_id).set(reqData).commit();
    console.log(JSON.stringify(data));
    await sendMail(data)

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: "Error, check console" });
  }
}
