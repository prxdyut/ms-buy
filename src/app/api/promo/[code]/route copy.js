import { NextResponse } from "next/server";
import { client } from "../../../../../utils/sanity.client";
import { groq } from "next-sanity";

export async function GET(req, { params }) {
  const { code } = params;
  const query = groq`*[ _type == "promo" && code == $code ][0] {code, max, percentage}`;
  const request = await req;
  const total = await request.nextUrl.searchParams.get("total");

  try {
    const res = await client.fetch(query, { code });
    if (res == null) return NextResponse.json({ discount: 0, total });
    const { max, percentage } = res;
    let discount = parseInt(total) / parseInt(percentage);
    let discountedPrice = parseInt(total);
    if (discount > max) {
      discountedPrice = total - max;
      discount = max;
    } else discountedPrice = total - discount;

    return NextResponse.json({ discount, total });
  } catch (err) {
    console.error(err);
    return NextResponse.json(err);
  }
}
