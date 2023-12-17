"use client";
import { AppLogo } from "../AppLogo";
import { AccountIcon, SearchIcon } from "../Icons";
import React, { useEffect, useState } from "react";
import { HiOutlineMenuAlt2 as HamIcon } from "react-icons/hi";
import { CgClose as CloseIcon } from "react-icons/cg";
import Search from "./Search";
import { Cart } from "../Cart/Cart";
import Link from "next/link";
const CATEGORIES = [
  { title: "Concealer" },
  { title: "Eyeshadow" },
  { title: "Eyeliner" },
  { title: "Mascara" },
  { title: "Blush" },
  { title: "Bronzer" },
  { title: "Highlighter" },
  { title: "Primer" },
  { title: "Sponges" },
];

export function MobileNav({ categories: CATEGORIES, topText }) {
  const [SearchisFocused, setSearchisFocused] = useState(false);
  const [MenuisFocused, setMenuisFocused] = useState(false);
  const [input, setInput] = useState("");


  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((prevCounter) =>
        prevCounter >= topText?.length-1 ? 0 : prevCounter + 1
      );
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <React.Fragment>
      <div className="sticky bg-white inset-x-0 p-4 top-0 z-10 bg-opacity-90 ">
        <div className="container grid grid-cols-1 gap-y-4 mx-auto">
          <p className="flex-grow bg-black text-white text-xs font-medium text-center p-2 rounded-full">
            {topText[counter]}
          </p>

          <div className="flex w-100 items-center gap-2 ">
            
            <AppLogo />
            <div className="flex-grow" />
            <div
              className={`cursor-pointer ${
                SearchisFocused && "bg-grey"
              } p-2 rounded-lg mr-[-4px] `}
              onClick={() => setSearchisFocused(!SearchisFocused)}
            >
              <SearchIcon size={20} />
            </div>
            <Link
              href={"/account"}
              className="cursor-pointer hover:bg-grey p-2 rounded-lg mr-[-4px]"
            >
              <AccountIcon size={20} />
            </Link>
            <Cart />
            <div
              onClick={() => setMenuisFocused(!MenuisFocused)}
              className="ml-2"
            >
              <HamIcon size={24} />
            </div>
          </div>
          <div class={` ${!SearchisFocused && "hidden"} `}>
            <Search
              device="mobile"
              SearchisFocused={SearchisFocused}
              setSearchisFocused={setSearchisFocused}
              input={input}
              setInput={setInput}
            />
          </div>
        </div>
      </div>
      <div
        className={`fixed z-20 right-0 top-0 h-screen w-screen bg-black bg-opacity-50 ${
          MenuisFocused ? "block" : "hidden"
        }`}
        onClick={() => setMenuisFocused(false)}
      />
      <div
        className={`fixed z-30 left-0 top-0 bg-white h-screen w-2/3 p-4 transition-all duration-300 ${
          MenuisFocused ? "translate-x-0" : " translate-x-[-100vw]"
        }`}
      >
        <div className="flex justify-end mb-4">
          <CloseIcon size={24} onClick={() => setMenuisFocused(false)} />
        </div>
        <div className="mb-4">
          <AppLogo />
        </div>
        <br />
        <ul className="flex flex-col gap-6 items-left justify-center" onClick={() => setMenuisFocused(false)}>
          {CATEGORIES.map(({ slug, name }, index) => (
            <React.Fragment>
              <Link
                href={"/category/" + slug}
                className="cursor-pointer font-medium text-sm uppercase"
              >
                {name}
              </Link>
            </React.Fragment>
          ))}
          <hr />
          <Link
            href={"/account"}
            className="cursor-pointer font-medium text-sm uppercase"
          >
            My Account
          </Link>
          <Link
            href={"/order-history"}
            className="cursor-pointer font-medium text-sm uppercase"
          >           
            My Orders
          </Link>
          <hr />
          <Link
            href={"/privacy-policy"}
            className="cursor-pointer font-medium text-sm uppercase"
          >
            Privacy Policy
          </Link>
          <Link
            href={"/terms-and-conditions"}
            className="cursor-pointer font-medium text-sm uppercase"
          >
            Terms Of Use
          </Link>
          <Link
            href={"/return-policy"}
            className="cursor-pointer font-medium text-sm uppercase"
          >
            Return Policy
          </Link>
          <Link
            href={"/cancellation-policy"}
            className="cursor-pointer font-medium text-sm uppercase"
          >
            Cancellation Policy
          </Link>
        </ul>
      </div>
    </React.Fragment>
  );
}
