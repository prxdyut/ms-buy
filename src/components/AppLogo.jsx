import { Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../public/logos/main.svg";

export const AppLogo = ({ inverted = false }) => {
  return (
    <Link href="/" className="flex w-16 lg:w-auto lg:h-10">
      <Image src={logo} className={`object-contain ${inverted && "invert"}`} />
    </Link>
  );
};
