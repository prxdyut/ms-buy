import { ProductDetails } from "@src/features/products/ProductDetails";
import { IProduct } from "@src/model";
import { client } from "@utils/sanity.client";
import { groq } from "next-sanity";
import React from "react";

export const revalidate = 2;
import { getVariantsFor } from "../../../../helpers";
import Link from "next/link";

export async function generateMetadata({ params }, parent) {
  const slug = params.slug;
  const query1 = groq`
  *[_type == "product" && slug.current == $slug][0].name
  `;
  const product = await client.fetch(query1, { slug });

  return {
    title: "Gala " + product,
  };
}

export default async function ProductDetailsPage({ params: { slug }, searchParams }) {
  const query1 = groq`
*[_type == "product" && slug.current == $slug][0] {
  ...,
  "id": _id,
  "slug": slug.current,
    "mainImage": mainImage.asset->url,
    category->{
        name,
        slug,
        "id": _id,
        "image": image.asset->url
    },
    "gallery": gallery[] {asset -> {...}},
    instock
}
`;
  const product = await client.fetch(query1, { slug });

  if (!product)
    return (
      <div className=" h-[80vh] flex flex-col justify-center items-center gap-4">
        <p className=" text-xl">{`Product doesn't exist!`}</p>
        <Link href={'/products'} className=" px-4 py-3 bg-black text-white">Explore Products</Link>
      </div>
    );

  const query2 = groq`
*[_type == "product" && name match $variant + "*"]{
 name,
  "slug": slug.current,
    "mainName": $variant
}
`;

  const variants = getVariantsFor(product)
    ? await client.fetch(query2, { variant: getVariantsFor(product) })
    : [];
    
  return <ProductDetails product={product} variants={variants} variant={getVariantsFor(product)} />;
}
