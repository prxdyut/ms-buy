"use client";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

export const GridBanner = ({ banners }) => {
  const IMAGES = banners?.map(({asset}) => ({src: asset.url, alt: '' }))
  return (
    <div className={`w-100 grid grid-cols-1 lg:grid-cols-3 gap-4 px-2 py-8 lg:p-8`}>
        {IMAGES.map(({src}, index) => (
          <div key={index} className="relative aspect-wide">
            <Image src={src} fill className="object-cover" />
          </div>
        ))}
    </div>
  );
};
