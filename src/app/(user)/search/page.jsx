"use client";
import { client } from "@utils/sanity.client";
import { groq } from "next-sanity";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProductCard } from "../../../components/ProductCard";
import { SectionHeading } from "../../../components/SectionHeading";
import { GoArrowRight } from "react-icons/go";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const revalidate = 2; // revalidate this page every 60 seconds

const query = groq`
    *[_type == "product" ] {
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

export default function SearchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [sidebarIsOpen, setSidebarisOpen] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    const products = await client.fetch(query);
    setProducts(products);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = Object.values(
    products.reduce((uniqueMap, obj) => {
      uniqueMap[obj.category.name] = obj;
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
  return (
    <div className="container mx-auto">
      <div className="text-center py-4 mt-4">
        <SectionHeading title={"Search Results"} />
      </div>
      <hr />
      <div className="flex flex-row">
        <div className={`transition-all ${sidebarIsOpen ? "w-5/6" : "w-full"}`}>
          <SearchedProductList products={products} />
        </div>
      </div>
    </div>
  );
}

const SearchedProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 bg-grey  gap-4 p-8">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} variant={"compact"} />
      ))}
    </div>
  );
};
