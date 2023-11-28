import { NextResponse } from "next/server";
import { client } from "../../../../utils/sanity.client";
import { auth } from "@clerk/nextjs";

export async function POST(req) {
  const newTodo = await req.json();

  try {
    const { userId } = auth();
    await client.create({ ...newTodo, userId }).then((res) => {
      console.log(`Todo was created, document ID is ${res._id}`);
    });

    return NextResponse.json({
      msg: `Todo was created`,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: "Error, check console" });
  }
}
