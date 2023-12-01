"use client";
import { AppLogo } from "../AppLogo";
import { useUser } from "@clerk/nextjs";
import { AccountIcon, BagIcon, SearchIcon } from "@/components/icons";
import React, { useRef, useState } from "react";
import { HiOutlineMenuAlt2 as HamIcon } from "react-icons/hi";
import { CgClose as CloseIcon } from "react-icons/cg";

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

export function MobileNav() {
  const [SearchisFocused, setSearchisFocused] = useState(false);

  const [MenuisFocused, setMenuisFocused] = useState(false);

  const SearchBar = ({ visibility }) => (
    <div class={`relative  ${!visibility && "hidden"} `}>
      <input
        className={`bg-gray-200 rounded-full h-10 pl-10 px-4 text-sm focus:outline-none transition-all w-[-webkit-fill-available] ${
          !visibility && "hidden"
        }`}
        type="search"
        name="search"
        placeholder="SEARCH"
      />
      <button
        type="submit"
        class={`absolute left-0 top-0 mt-3 ml-4 ${!visibility && "hidden"}`}
      >
        <SearchIcon />
      </button>
    </div>
  );

  return (
    <React.Fragment>
      <div className="sticky bg-white inset-x-0 p-4 top-0 z-10 bg-opacity-90 ">
        <div className="container grid grid-cols-1 gap-y-4">
          <p className="flex-grow bg-black text-white text-xs font-medium text-center p-2 rounded-full">
            UPCOMING OFFER ALERTS!
          </p>

          <div className="flex w-100 items-center gap-2 ">
            <div
              onClick={() => setMenuisFocused(!MenuisFocused)}
              className="mr-2"
            >
              <HamIcon size={24} />
            </div>
            <AppLogo />
            <div className="flex-grow" />
            <div
              className={`cursor-pointer ${
                SearchisFocused && "bg-gray-200"
              } p-2 rounded-lg mr-[-4px] `}
              onClick={() => setSearchisFocused(!SearchisFocused)}
            >
              <SearchIcon size={20} />
            </div>
            <div className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg mr-[-4px]">
              <AccountIcon size={20} />
            </div>
            <div className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg">
              <BagIcon size={20} />
            </div>
          </div>

          <SearchBar visibility={SearchisFocused} />
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
          <p className="mt-2 font-semibold text-sm">Beauty Accessories</p>
        </div>
        <div className="mb-8 mx-[-4px]">
          <SearchBar visibility={true} />
        </div>
        <ul className="flex flex-col gap-6 items-left justify-center">
          <li className="cursor-pointer font-medium text-sm uppercase	text-red-800">
            Bestsellers
          </li>
          {CATEGORIES.map((category, index) => (
            <React.Fragment>
              <li className="cursor-pointer font-medium text-sm uppercase">
                {category.title}
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
}
