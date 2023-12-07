"use client";
import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import logo from "../../../public/logos/main.svg";

export const Loading = () => {
  return (
    <div className="h-[60vh]  flex justify-center items-center">
      <div className=" relative bg-black w-max aspect-square flex justify-center p-2 rounded-full h-14">
        <Image
          src={logo}
          height={56}
          width={56}
          className={`object-contain invert z-10`}
        />
        {/* <div className=" "> */}
          <div className=" animate-ping absolute  rounded-full h-14 -top-1 aspect-square bg-grey"></div>
        {/* </div>{" "} */}
      </div>
    </div>
  );
};
