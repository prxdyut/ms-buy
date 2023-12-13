"use client";
import { Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import logo from "../../public/logos/main.svg";
import { AppContext } from "@src/context/AppContext";

export const AppLogo = ({ inverted = false }) => {
  const { store } = useContext(AppContext);
  return (
    <Link
      href="/"
      className="flex h-8 lg:h-10 w-min  "
      style={{
        aspectRatio: store?.logo?.header?.width + ' / ' + store?.logo?.header?.height
      }}
    >
      {console.log(store.logo)}
      <Image
        src={store?.logo?.header?.url}
        height={store?.logo?.header?.height}
        width={store?.logo?.header?.width}
        className={`object-contain object-left ${inverted && "invert"}`}
      />
    </Link>
  );
};
