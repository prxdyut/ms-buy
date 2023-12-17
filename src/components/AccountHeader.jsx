"use client";
import { SignOutButton, useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { VscSignOut } from "react-icons/vsc";

export default function AccountHeader(params) {
  const { user, isLoaded } = useUser();
const {signOut} = useClerk()
  return (
    <div className=" container mx-auto bg-black text-white py-8">
      <div className=" grid grid-cols-1 lg:grid-cols-5 max-lg:px-4 gap-4">
        <div />
        <div className="relative w-40 aspect-square rounded-full">
          <Image className="rounded-full" src={user?.imageUrl} fill />
        </div>
        <div className="   uppercase flex flex-col gap-2 ">
          <p className=" text-xl font-bold mb-1">Profile</p>
          <Link
            className="hover:underline cursor-pointer "
            href="/account"
          >
            My Account
          </Link>
          <Link
            className="hover:underline cursor-pointer "
            href="/order-history"
          >
            My Orders
          </Link>

          <button onClick={signOut} className=" flex uppercase gap-2 justify-center items-center bg-white  text-black font-bold px-4 py-2 w-max hover:underline cursor-pointer text-xs mt-4">
            <VscSignOut className="" fontSize={20} /> Signout
          </button>
        </div>
        <div className=" max-lg:hidden col-span-2" />
      </div>
    </div>
  );
}
