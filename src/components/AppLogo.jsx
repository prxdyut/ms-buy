import { Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../public/logos/main.png";

export const AppLogo = () => {
  return (
    <Link href="/">
      <Image src={logo} className="h-20 w-20 object-contain" />
    </Link>
  );
};
