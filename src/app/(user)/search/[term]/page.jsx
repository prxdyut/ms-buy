"use client";
import { client } from "@utils/sanity.client";
import { groq } from "next-sanity";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProductCard } from "../../../../components/ProductCard";
import { SectionHeading } from "../../../../components/SectionHeading";
import { GoArrowRight } from "react-icons/go";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loading } from "../../../../components/Loading/Loading";

import MultiRangeSlider from "multi-range-slider-react";

export const revalidate = 2; // revalidate this page every 60 seconds

const query = groq`
    *[_type == "product" && (name match $searchText || description match $searchText) ] {
      ...,
      "id": _id,
      "slug": slug.current,
        "mainImage": mainImage.asset->url,
        category->{
            name,
            "id": _id,
            "image": image.asset->url,
            "slug": slug.current,
        },
        "gallery": gallery[].asset->url
    }
`;

export default function SearchPage({ params: { term } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [sidebarIsOpen, setSidebarisOpen] = useState(false);

  const fetchProducts = async (term) => {
    setIsLoading(true);
    const products = await client.fetch(query, {
      searchText: `*${term}*`,
    });
    setProducts(products);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts(decodeURI(term));
  }, [term]);

  const categories = Object.values(
    products.reduce((uniqueMap, obj) => {
      uniqueMap[obj?.category?.name] = obj;
      return uniqueMap;
    }, {})
  ).map(({ category }) => category);
  console.log(categories);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const filteredProducts = products.filter(
    (p) =>
      (searchParams.has("category")
        ? searchParams.get("category") != ""
          ? p.category.slug == searchParams.get("category")
          : true
        : true) &&
      (searchParams.has("min")
        ? searchParams.get("min") != ""
          ? parseInt(p.price) > parseInt(searchParams.get("min"))
          : true
        : true) &&
      (searchParams.has("max")
        ? searchParams.get("max") != ""
          ? parseInt(p.price) < parseInt(searchParams.get("max"))
          : true
        : true)
  );
  const [minValue, setMinValue] = useState(false);
  const [maxValue, setMaxValue] = useState(false);

  useEffect(() => {
    setMinValue(`${Math.min(...filteredProducts.map(({ price }) => price))}`);
    setMaxValue(`${Math.max(...filteredProducts.map(({ price }) => price))}`);
  }, [products]);

  const sidebar = (
    <div
      className={`bg-white w-full  overflow-hidden flex flex-col p-4 gap-4 ${
        sidebarIsOpen ? " h-full" : " h-0"
      }`}
    >
      <div className="">
        <p className=" text-xl font-semibold">Categories</p>
        <ul className="pt-2">
          {categories.map((category, i) => (
            <li
              onClick={(e) => {
                if (searchParams.get("category") == category.slug) {
                  router.push(
                    pathname + "?" + createQueryString("category", "")
                  );
                } else {
                  router.push(
                    pathname +
                      "?" +
                      createQueryString("category", category.slug)
                  );
                }
              }}
              className={` cursor-pointer ${
                searchParams.get("category") == category?.slug && "font-semibold"
              }`}
              key={i}
            >
              {category?.name}
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div>
        <p className=" text-xl font-semibold mb-2">Price</p>
        <div className=" mb-2">
          <label>Min : </label>
          <input
            className="  bg-grey rounded w-20 px-2"
            type="number"
            value={minValue}
            onChange={(e) => {
              setMinValue(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key == "Enter") {
                router.push(
                  pathname + "?" + createQueryString("min", e.target.value)
                );
              }
            }}
          />
        </div>
        <div>
          <label>Max : </label>
          <input
            className="  bg-grey rounded w-20 px-2"
            type="number"
            value={maxValue}
            onChange={(e) => {
              setMaxValue(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key == "Enter") {
                router.push(
                  pathname + "?" + createQueryString("max", e.target.value)
                );
              }
            }}
          />
        </div>
      </div>
      <hr />
      <div className="flex justify-end">
        <Link
          href={pathname}
          onClick={() => {
            setMinValue(
              `${Math.min(...filteredProducts.map(({ price }) => price))}`
            );
            setMaxValue(
              `${Math.max(...filteredProducts.map(({ price }) => price))}`
            );
            setSidebarisOpen(false);
          }}
          className="text-sm bg-black text-white px-3 py-2 rounded "
        >
          Clear Filters
        </Link>
      </div>
    </div>
  );

  if (isLoading) return <Loading />;
  return (
    <div className="container mx-auto">
      <div className="text-center py-4 mt-4">
        <SectionHeading title={"Search Results"} />
      </div>
      <div className=" flex justify-end">
        <button
          onClick={() => setSidebarisOpen(!sidebarIsOpen)}
          className="bg-grey uppercase   text-black pl-4 pr-12 pb-4 py-2 text-left flex flex-row items-center justify-center gap-4"
        >
          Filters <GoArrowRight />
        </button>
      </div>
      <hr />
      <div className="flex flex-col lg:flex-row">
        <div
          className={` hidden max-lg:block bg-white  transition-all  ${
            sidebarIsOpen
              ? "w-full h-full p-4"
              : "w-full h-0 p-0 mr-[-8px] opacity-0"
          }`}
        >
          {sidebar}
        </div>
        <div
          className={`transition-all ${
            sidebarIsOpen ? "w-full lg:w-5/6" : "w-full"
          }`}
        >
          <SearchedProductList products={filteredProducts} />
        </div>
        <div
          className={` hidden lg:block bg-white  transition-all  ${
            sidebarIsOpen ? "w-1/6 p-4" : "w-0 p-0 mr-[-8px] opacity-0"
          }`}
        >
          {sidebar}
        </div>
      </div>
    </div>
  );
}

const SearchedProductList = ({ products }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 bg-white  gap-4 p-4 lg:p-8">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard product={product} key={product.id} variant={"compact"} />
        ))
      ) : (
        <p>
          No Results{" "}
          <Link href={pathname} className=" underline capitalize">
            {" "}
            {(searchParams.has("category") ||
              searchParams.has("min") ||
              searchParams.has("max")) &&
              "clear filters"}{" "}
          </Link>
        </p>
      )}
    </div>
  );
};
