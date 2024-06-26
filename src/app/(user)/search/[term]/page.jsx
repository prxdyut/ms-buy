"use client";
import { client } from "@utils/sanity.client";
import { groq } from "next-sanity";
import { FaSort } from "react-icons/fa";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProductCard } from "../../../../components/ProductCard";
import { SectionHeading } from "../../../../components/SectionHeading";
import { GoArrowRight } from "react-icons/go";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loading } from "../../../../components/Loading/Loading";
import { Sort } from "@/components/Search/Sort";

import MultiRangeSlider from "multi-range-slider-react";

export const revalidate = 2; // revalidate this page every 60 seconds

export default function SearchPage({
  params: { term },
  searchParams: sParams,
}) {
  console.log(sParams);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filterIsOpen, setfilterIsOpen] = useState(false);
  const [sortIsOpen, setSortIsOpen] = useState(false);

  const query = groq`
*[_type == "product" && (name match $searchText || description match $searchText) ] ${
    sParams.sort == "price_low_to_high"
      ? "| order(price asc)"
      : sParams.sort == "price_high_to_low"
      ? "| order(price desc)"
      : sParams.sort == "alphabetical_a_to_z"
      ? "| order(name asc)"
      : sParams.sort == "alphabetical_z_to_a"
      ? "| order(name desc)"
      : ""
  } {
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
  }, [term, sParams]);

  const categories = Object.values(
    products.reduce((uniqueMap, obj) => {
      uniqueMap[obj?.category?.name] = obj;
      return uniqueMap;
    }, {})
  ).map(({ category }) => category);

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
        filterIsOpen ? " h-full" : " h-0"
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
                searchParams.get("category") == category?.slug &&
                "font-semibold"
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
            setfilterIsOpen(false);
          }}
          className="text-sm bg-black text-white px-3 py-2 rounded "
        >
          Clear Filters
        </Link>
      </div>
    </div>
  );

  const sortItems = [
    "Price: Low to High",
    "Price: High to Low",
    "Relevance: Product Search",
    "Alphabetical: A to Z",
    "Alphabetical: Z to A",
  ];

  const sort = (
    <div
      className={`bg-white w-full   overflow-hidden flex flex-col p-4 gap-4 ${
        sortIsOpen ? " h-full" : " h-0"
      }`}
    >
      <div className="">
        <p className=" text-xl font-semibold">Sort</p>
        <ul className="pt-2">
          {sortItems.map((item, i) => (
            <li
              onClick={(e) => {
                router.push(
                  pathname +
                    "?" +
                    createQueryString(
                      "sort",
                      item
                        .toLowerCase()
                        .replaceAll(" ", "_")
                        .replaceAll(":_", "_")
                    )
                );
              }}
              className={` cursor-pointer ${
                searchParams.get("sort") == item && "font-semibold"
              }`}
              key={i}
            >
              {item}
            </li>
          ))}
        </ul>
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
          onClick={() => setSortIsOpen(!sortIsOpen)}
          className="bg-grey uppercase   text-black pl-4 pr-12 pb-4 py-2 text-left flex flex-row items-center justify-center gap-4"
        >
          Sort <FaSort />
        </button>
        <button
          onClick={() => setfilterIsOpen(!filterIsOpen)}
          className="bg-grey uppercase   text-black pl-4 pr-12 pb-4 py-2 text-left flex flex-row items-center justify-center gap-4"
        >
          Filters <GoArrowRight />
        </button>
      </div>
      <hr />
      <div className="flex flex-col lg:flex-row">
        <div
          className={` hidden max-lg:block bg-white  transition-all  ${
            filterIsOpen || sortIsOpen
              ? "w-full h-full p-4"
              : "w-full h-0 p-0 mr-[-8px] opacity-0"
          }`}
        >
          {sortIsOpen && sort}
          {filterIsOpen && sidebar}
        </div>
        <div
          className={`transition-all ${
            filterIsOpen || sortIsOpen ? "w-full lg:w-5/6" : "w-full"
          }`}
        >
          <SearchedProductList products={filteredProducts} />
        </div>
        <div
          className={` hidden lg:block bg-white  transition-all  ${
            filterIsOpen || sortIsOpen
              ? "w-1/6 p-4"
              : "w-0 p-0 mr-[-8px] opacity-0"
          }`}
        >
          {sortIsOpen && sort}
          {filterIsOpen && sidebar}
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
          product.price ? <ProductCard product={product} key={product.id} variant={"compact"} /> : null
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
