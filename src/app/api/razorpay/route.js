import { NextResponse } from "next/server";

const Razorpay = require("razorpay");
const shortid = require("shortid");

export async function POST(req) {
  const reqData = await req.json();

  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_KEY,
  });

  const payment_capture = 1;
  const price = parseInt(reqData.total);
  const currency = "INR";

  const options = {
    amount: (price * 100).toString(),
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };
  try {
    const response = await razorpay.orders.create(options);
    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json(err);
  }
}
