"use client";
import { AppLogo } from "./AppLogo";
import { Heading } from "@chakra-ui/react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const SigninPrompt = () => {
  const { isSignedIn } = useUser();
  const [show, updateShow] = useState();
  useEffect(() => {
    updateShow(!isSignedIn);
  }, [isSignedIn]);

  if (show)
    return (
      <div className=" fixed top-20 right-10 lg:w-80 p-4 z-50 bg-white">
        <div className=" w-full text-right absolute px-4 py-1 flex justify-end ">
          <svg
          onClick={() => updateShow(false)}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            id="cancel"
          >
            <path
              fill="#212121"
              d="M2.58859116,2.7156945 L2.64644661,2.64644661 C2.82001296,2.47288026 3.08943736,2.45359511 3.2843055,2.58859116 L3.35355339,2.64644661 L8,7.293 L12.6464466,2.64644661 C12.8417088,2.45118446 13.1582912,2.45118446 13.3535534,2.64644661 C13.5488155,2.84170876 13.5488155,3.15829124 13.3535534,3.35355339 L8.707,8 L13.3535534,12.6464466 C13.5271197,12.820013 13.5464049,13.0894374 13.4114088,13.2843055 L13.3535534,13.3535534 C13.179987,13.5271197 12.9105626,13.5464049 12.7156945,13.4114088 L12.6464466,13.3535534 L8,8.707 L3.35355339,13.3535534 C3.15829124,13.5488155 2.84170876,13.5488155 2.64644661,13.3535534 C2.45118446,13.1582912 2.45118446,12.8417088 2.64644661,12.6464466 L7.293,8 L2.64644661,3.35355339 C2.47288026,3.17998704 2.45359511,2.91056264 2.58859116,2.7156945 L2.64644661,2.64644661 L2.58859116,2.7156945 Z"
            ></path>
          </svg>
        </div>
        <div className=" flex  gap-4 flex-col">
          <AppLogo sameSize />
          <p className=" mb-2">Sign up to receive 10% off</p>{" "}
          <input
            className=" px-4 py-2 border-2 border-black border-opacity-20 outline-none"
            placeholder="Email"
          />
          <Link
            href={"/sign-up"}
            className=" text-sm uppercase w-full py-2 text-center bg-black text-white rounded-full"
          >
            Sign up
          </Link>
          <Link
            href={"/terms-and-conditions"}
            className=" underline underline-offset-2 opacity-70"
          >
            Terms and conditions
          </Link>
        </div>
      </div>
    );
    return <div></div>
};
