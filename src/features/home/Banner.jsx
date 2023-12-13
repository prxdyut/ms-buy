"use client";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

export const Banner = ({ banners }) => {
  const IMAGES = banners?.map(({asset}) => ({src: asset.url, alt: '' }))
  return (
    <div className="container mx-auto">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        className={` aspect-wide lg:aspect-extra `}
      >
        {IMAGES?.map(({src, alt}, index) => (
          <SwiperSlide key={index} style={{ position: "relative" }}>
            <Image src={src} alt={alt} fill className="object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
