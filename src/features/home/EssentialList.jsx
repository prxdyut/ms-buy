"use client";
import { SectionHeading } from "@src/components/SectionHeading";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function EssentialList({ essentials, title }) {
  const [] = useState();
  console.log(essentials);
  return (
    <div className="flex flex-col gap-8  px-4 py-8 lg:p-8 container mx-auto">
      {title && (
        <p className="text-center">
          <SectionHeading title={"Essentials"} />
        </p>
      )}
      <div className="w-100 grid grid-cols-2 lg:grid-cols-4 lg:px-16 justify-center gap-8">
        {essentials?.map(({ name, image, slug }, i) => (
          <Link 
          href={"/category/" + slug} className="" key={i}>
            <div className="h-100 w-100 mb-4">
              <div
                src={image}
                className=" relative aspect-square h-full w-full"
              >
                <Image src={image} fill objectFit="contain" />
                {/* {JSON.stringify(image)} */}
              </div>
            </div>
            <p className="text-2xl font-semibold uppercase mb-2"> {name}</p>
            <p
              className="hover:underline underline-offset-2 uppercase cursor-pointer"
            >
              Shop Now
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
