"use client";
import { AppLogo } from "../AppLogo";
import { useUser } from "@clerk/nextjs";
import { AccountIcon, BagIcon, SearchIcon } from "@/components/icons";
import React, { useEffect, useRef, useState } from "react";

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

export function DesktopNav() {
  const [SearchisFocused, setSearchisFocused] = useState(false);

  const [MenuItemisFocused, setMenuItemisFocused] = useState(null);
  const [MenuBarisFocused, setMenuBarisFocused] = useState(false);
  const [MenuDropdownisFocused, setMenuDropdownisFocused] = useState(false);

  const MenuisFocused =
    Boolean(MenuItemisFocused) && (MenuBarisFocused || MenuDropdownisFocused);

  useEffect(() => {
    if (!(MenuBarisFocused || MenuDropdownisFocused)) {
      setMenuItemisFocused(null);
    }
  }, [MenuBarisFocused, MenuDropdownisFocused]);

  return (
    <React.Fragment>
      <div className="sticky bg-white inset-x-0 p-4 top-0 z-10 bg-opacity-90 ">
        <div className="container flex gap-4 mx-auto px-4">
          <div className="flex-grow grid grid-cols-1 gap-4">
            <div className="flex w-100 items-center gap-4 ">
              <AppLogo />
              <p className=" flex-grow bg-black text-white text-xs font-medium text-center p-2 rounded-full">
                UPCOMING OFFER ALERTS!
              </p>

              <div class="relative">
                <input
                  className={`bg-gray-200 rounded-full h-10 pl-10 px-4 text-sm focus:outline-none transition-all ${
                    SearchisFocused ? "w-96" : "w-40"
                  }`}
                  type="search"
                  name="search"
                  placeholder="SEARCH"
                  onFocus={() => setSearchisFocused(true)}
                  onBlur={() => setSearchisFocused(false)}
                />
                <button type="submit" class="absolute left-0 top-0 mt-3 ml-4">
                  <SearchIcon />
                </button>
              </div>
              <div className="cursor-pointer flex flex-row gap-2 hover:bg-gray-200 px-3 py-2 rounded-lg mr-[-4px]">
                <AccountIcon size={20} />
                <p>Pradyut Das</p>
              </div>
              <div className="cursor-pointer hover:bg-gray-200 px-3 py-2 rounded-lg">
                <BagIcon size={20} />
              </div>
            </div>
            <ul
              className="flex gap-6 w-100 align-middle items-center justify-center"
              onMouseEnter={() => setMenuBarisFocused(true)}
              onMouseLeave={() => setMenuBarisFocused(false)}
            >
              <li className="cursor-pointer font-medium text-sm uppercase	text-red-800">
                Bestsellers
              </li>
              {CATEGORIES.map((category, index) => (
                <React.Fragment>
                  <li
                    className={`cursor-pointer font-medium text-sm uppercase hover:underline underline-offset-4 decoration-[1.5px] decoration-gray-700 ${
                      MenuItemisFocused -1 == index && "underline"
                    }`}
                    onMouseEnter={() => setMenuItemisFocused(index + 1)}
                  >
                    {category.title}
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
        <div
          className={`container transition-all duration-200 grid grid-cols-5 pt-8 ${
            MenuisFocused ? "h-60" : "h-0 hidden"
          }`}
          onMouseEnter={() => setMenuDropdownisFocused(true)}
          onMouseLeave={() => setMenuDropdownisFocused(false)}
        >
          <div className=""></div>
          <div className="cols-span-4">{CATEGORIES[MenuItemisFocused -1]?.title}</div>
        </div>
      </div>
      <div
        className={`fixed z-8 right-0 top-0 h-screen w-screen bg-black bg-opacity-50 ${
          MenuisFocused ? "block" : "hidden"
        }`}
      />
    </React.Fragment>
  );
}
