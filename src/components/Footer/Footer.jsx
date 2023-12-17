"use client";
import { BiMailSend } from "react-icons/bi";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { AppLogo } from "../AppLogo";
import paymentMethods from "../../../public/payment-methods.png";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { AppContext } from "@src/context/AppContext";

export const Footer = () => {
  const { store } = useContext(AppContext);

  return (
    <div className=" flex flex-col ">
      <div className=" grid grid-cols-2 lg:grid-cols-5 gap-4 py-8 pt-12 bg-black text-white px-8">
        <div>
          <Link href="/" className="flex w-[60] lg:w-[-webkit-fill-available] lg:h-10 relative h-6">
            <Image
              src={store?.logo?.footer?.url}
              fill
              className={`object-contain object-left invert`}
            />
          </Link>        
        </div>
        <div className=" lg:hidden" />
        <div className=" flex flex-col">
          <p className="uppercase font-semibold mb-2">Gala Eyelashes</p>
          <Link
            className=" text-sm mb-1 opacity-60 hover:opacity-90"
            href={"/"}
          >
            Trending
          </Link>
          <Link
            className=" text-sm mb-1 opacity-60 hover:opacity-90"
            href={"/category"}
          >
            BestSellers
          </Link>
          <Link
            className=" text-sm mb-1 opacity-60 hover:opacity-90"
            href={"/about"}
          >
            Featured
          </Link>
          <Link
            className=" text-sm mb-1 opacity-60 hover:opacity-90"
            href={"/testimonials"}
          >
            Essentials
          </Link>
        </div>
        <div className=" flex flex-col">
          <p className="uppercase font-semibold mb-2">Know Us</p>
          <Link
            className=" text-sm mb-1 opacity-60 hover:opacity-90"
            href={"/"}
          >
            Explore
          </Link>
          <Link
            className=" text-sm mb-1 opacity-60 hover:opacity-90"
            href={"/category"}
          >
            Categories
          </Link>
          <Link
            className=" text-sm mb-1 opacity-60 hover:opacity-90"
            href={"/about"}
          >
            About us
          </Link>
          <Link
            className=" text-sm mb-1 opacity-60 hover:opacity-90"
            href={"/testimonials"}
          >
            Testimonials
          </Link>
        </div>
        <div className=" flex flex-col">
          <p className="uppercase font-semibold mb-2">Policy Info</p>
          <Link
            className=" text-sm mb-1 opacity-60 hover:opacity-90"
            href={"/privacy-policy"}
          >
            Privacy Policy
          </Link>
          <Link
            className=" text-sm mb-1 opacity-60 hover:opacity-90"
            href={"/terms-and-conditions"}
          >
            Terms Of Use
          </Link>
          <Link
            className=" text-sm mb-1 opacity-60 hover:opacity-90"
            href={ "/return-policy"}
          >
            Return Policy
          </Link>
          <Link
            className=" text-sm mb-1 opacity-60 hover:opacity-90"
            href={"/cancellation-policy"}
          >
            Cancellation Policy
          </Link>
        </div>
        <div className=" flex flex-col">
          <p className="uppercase font-semibold mb-2">Need Help?</p>
          <Link
            className=" text-sm mb-1 opacity-60 hover:opacity-90"
            href={"/faq"}
          >
            FAQ's
          </Link>
          <Link
            className=" text-sm mb-1 opacity-60 hover:opacity-90"
            href={"/contact"}
          >
            Contact Us
          </Link>
          <Link
            className=" text-sm mb-1 opacity-60 hover:opacity-90"
            href={"/contact"}
          >
            Write A Mail
          </Link>
          <Link
            className=" text-sm mb-1 opacity-60 hover:opacity-90"
            href={"/contact"}
          >
            Chat on WhatsApp
          </Link>
        </div>
      </div>
      <div className=" grid grid-cols-1 lg:grid-cols-3 py-1 px-4 justify-between items-center">
        <div className=" py-3 text-xs">
          Copyright © 2023 Gala Eyelashes. All rights reserved.
        </div>{" "}
        <div className=" hidden relative h-12 w-full lg:flex justify-center aspect-extra "></div>
        <div className=" relative max-lg:hidden h-12 w-full flex justify-end items-center aspect-extra ">
          <p className="text-xs font-semibold uppercase">Sitemap</p>
        </div>
      </div>
    </div>
  );
};
