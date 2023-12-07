"use client";
import { client } from "@utils/sanity.client";
import { groq } from "next-sanity";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ProductCard } from "../../../../components/ProductCard";
import { SectionHeading } from "../../../../components/SectionHeading";
import { GoArrowRight } from "react-icons/go";

export const revalidate = 2; // revalidate this page every 60 seconds

const query = groq`
*[_type == 'product' && defined(category._ref) && category._ref in *[_type == 'category' && slug.current == $slug]._id]{
      ...,
      "id": _id,
      "slug": slug.current,
        "mainImage": mainImage.asset->url,
        category->{
            name,
            "id": _id,
            "image": image.asset->url
        },
        "gallery": gallery[].asset->url
    }
`;

export default function SearchPage({ params: { slug } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [sidebarIsOpen, setSidebarisOpen] = useState(false);

  const fetchProducts = async (slug) => {
    setIsLoading(true);
    const products = await client.fetch(query, {
      slug: `${decodeURI(slug)}`,
    });
    setProducts(products);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts(decodeURI(slug));
  }, [slug]);

  console.log(products);
  return (
    <div className="container mx-auto">
      <div className="text-center py-4 mt-4">
        <SectionHeading title={products[0]?.category.name} />
      </div>
      <hr />
      <div className="flex flex-row">
        <div className={`transition-all ${sidebarIsOpen ? "w-5/6" : "w-full"}`}>
          <SearchedProductList products={products} />
        </div>
        <div
          className={`bg-grey  transition-all  ${
            sidebarIsOpen ? "w-1/6 p-4" : "w-0 p-0 mr-[-8px]"
          }`}
        >
          <div className=" bg-white w-full h-auto overflow-hidden">
            <div></div>
          </div>
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
