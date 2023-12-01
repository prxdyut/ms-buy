"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { ProductCard } from "@src/components/ProductCard";

export const ProductsSlider = ({ products }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      grabCursor={true}
      breakpoints={{
        640: {
          slidesPerView: 2.2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3.2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4.2,
          spaceBetween: 20,
        },
      }}
      loop={true}
      className="mySwiper mx=[-16px]"
    >
      {products?.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductCard product={product} variant={'long'} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
