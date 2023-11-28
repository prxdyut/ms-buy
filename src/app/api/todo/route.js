import { NextResponse } from "next/server";
import {client} from "../../../../utils/sanity.client";

export async function POST(req) {
  try {
    await client
      .create({
        _type: "todo",
        text: 'newTodo.text',
        isCompleted: false,
        createdAt: new Date().toISOString(),
        dueDate: new Date().toISOString(),
        userEmail: 'newTodo.user',
      })
      .then((res) => {
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
