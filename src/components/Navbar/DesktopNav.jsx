"use client";
import { AppLogo } from "../AppLogo";
import { AccountIcon } from "../Icons";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import Link from "next/link";
import { Cart } from "@/components/Cart/Cart";
import { useUser } from "@clerk/nextjs";

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

export function DesktopNav({ categories: CATEGORIES, topText }) {
  const [SearchisFocused, setSearchisFocused] = useState(false);
  const [input, setInput] = useState("");
  const { user, isSignedIn } = useUser();

  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((prevCounter) =>
        prevCounter >= topText?.length - 1 ? 0 : prevCounter + 1
      );
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <React.Fragment>
      <div className="sticky bg-white inset-x-0 p-4 top-0 z-10 ">
        <div className=" flex gap-4 mx-auto px-4">
          <div className="flex-grow grid grid-cols-1 gap-4">
            <div className="flex w-100 items-center gap-4 ">
              <AppLogo />
              <p className=" flex-grow bg-black text-white text-xs font-medium text-center p-2 rounded-full">
                {topText[counter]}
              </p>

              <Search
                SearchisFocused={SearchisFocused}
                setSearchisFocused={setSearchisFocused}
                input={input}
                setInput={setInput}
              />
              <Link
                href={"/account"}
                className="cursor-pointer flex flex-row gap-2 hover:bg-grey px-3 py-2 rounded-lg mr-[-4px]"
              >
                <AccountIcon size={20} />
                {isSignedIn ? (
                  <>
                    <p className=" text-sm">{user.fullName}</p>{" "}
                  </>
                ) : (
                  <p className=" ">Sign in</p>
                )}
              </Link>
              <Cart />
            </div>
            <ul className="container flex gap-6 w-100 align-middle items-center justify-center">
              {CATEGORIES.slice(0,5).map(({ name, slug }, index) => {
                const [hover, setHover] = useState(false);
                return (
                  <React.Fragment key={index}>
                    <Link
                      className={`relative cursor-pointer font-medium text-sm uppercase hover:underline underline-offset-2 decoration-[1.5px] decoration-gray-700 ${
                        hover && "underline"
                      }`}
                      href={"/category/" + slug}
                      // onMouseEnter={() => setHover(true)}
                      // onMouseLeave={() => setHover(false)}
                    >
                      {name}
                      {/* <div
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        className={`absolute top-5 pb-2 transition-all overflow-x-hidden overflow-y-auto rounded text-dark bg-white capitalize shadow-xl ${
                          hover
                            ? "py-2 pt-4 w-40 h-56 opacity-100"
                            : "h-0 w-0 p-0 opacity-0"
                        } ${
                          CATEGORIES.length / 2 < index ? "right-0" : "left-0"
                        }`}
                      >
                        {[...Array(10)].map((product) => (
                          <li>
                            <Link
                              href={`/products/${input}`}
                              className=" px-4 py-2 w-full hover:bg-grey flex gap-2 items-center"
                            >
                              <p>Product Name</p>
                            </Link>
                          </li>
                        ))}
                      </div> */}
                    </Link>
                  </React.Fragment>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
