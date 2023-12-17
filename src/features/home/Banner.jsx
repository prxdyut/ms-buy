"use client";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

import { Navigation } from "swiper";
import { useRef, useState } from "react";
export const Banner = ({ banners }) => {
  const [index, setIndex] = useState(0);
  const [swiper, setSwiper] = useState();

  const sliderRef = useRef();
  const IMAGES = banners?.map(({ asset }) => ({ src: asset.url, alt: "" }));
  return (
    <div className="container mx-auto flex flex-row relative">
      <div className="z-20 w-0 h-full">
        <svg
          onClick={() => swiper.slidePrev()}
          className=" h-10 w-10 absolute top-[40%]  left-0 lg:left-10 max-lg:scale-75 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          id="left-arrow"
        >
          <g data-name="Layer 2">
            <path
              d="M22 12a10 10 0 1 0-10 10 10 10 0 0 0 10-10zm-11.86 3.69-2.86-3a.49.49 0 0 1-.1-.15.54.54 0 0 1-.1-.16.94.94 0 0 1 0-.76 1 1 0 0 1 .21-.33l3-3a1 1 0 0 1 1.42 1.42L10.41 11H16a1 1 0 0 1 0 2h-5.66l1.25 1.31a1 1 0 0 1-1.45 1.38z"
              data-name="arrow-circle-left"
            ></path>
          </g>
        </svg>
      </div>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        initialSlide={index}
        // onSwiper={(it) => (sliderRef.current = it)}
        onSwiper={(swiper) => setSwiper(swiper)}
        onSlideChange={(e) => setIndex(e.activeIndex)}
        className={` flex-grow aspect-wide lg:aspect-extra `}
      >
        {IMAGES?.map(({ src, alt }, index) => (
          <SwiperSlide key={index} style={{ position: "relative" }}>
            <Image src={src} alt={alt} fill className="object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="z-20 w-0 h-full">
        <svg
          onClick={() => swiper.slideNext()}
          className=" cursor-pointer h-10 w-10 absolute top-[40%] right-0 lg:right-10 max-lg:scale-75 rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          id="left-arrow"
        >
          <g data-name="Layer 2">
            <path
              d="M22 12a10 10 0 1 0-10 10 10 10 0 0 0 10-10zm-11.86 3.69-2.86-3a.49.49 0 0 1-.1-.15.54.54 0 0 1-.1-.16.94.94 0 0 1 0-.76 1 1 0 0 1 .21-.33l3-3a1 1 0 0 1 1.42 1.42L10.41 11H16a1 1 0 0 1 0 2h-5.66l1.25 1.31a1 1 0 0 1-1.45 1.38z"
              data-name="arrow-circle-left"
            ></path>
          </g>
        </svg>
      </div>
    </div>
  );
};
