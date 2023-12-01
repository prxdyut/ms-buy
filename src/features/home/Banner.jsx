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

export const Banner = () => {
  return (
    <div className="px-2">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        className="container mt-2 rounded h-48 lg:h-[80vh]"
      >
        {IMAGES.map((src, index) => (
          <SwiperSlide key={index} style={{ position: "relative" }}>
            <Image src={src} fill className="object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
