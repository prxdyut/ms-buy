"use client";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

const IMAGES = [
  "https://images.pexels.com/photos/1377034/pexels-photo-1377034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/208052/pexels-photo-208052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1115128/pexels-photo-1115128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

export const GridBanner = ({  }) => {
  return (
    <div className={`w-100 grid grid-cols-1 lg:grid-cols-3 gap-4 p-8`}>
        {IMAGES.map((src, index) => (
          <div key={index} className="relative aspect-wide">
            <Image src={src} fill className="object-cover" />
          </div>
        ))}
    </div>
  );
};
