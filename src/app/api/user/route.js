import { NextResponse } from "next/server";
import { client } from "../../../../utils/sanity.client";
import { auth, clerkClient } from "@clerk/nextjs";

export async function PUT(req) {
  const reqData = await req.json();
  const { firstName, lastName, username } = reqData;

  try {
    const { userId } = auth();
    await clerkClient.users.updateUser(userId, {
      firstName,
      lastName,
      username,
    });
    console.log(reqData);
    return NextResponse.json(reqData);
  } catch (err) {
    console.error(err);
    return NextResponse.json(err);
  }
}
