import { ProductDetails } from "@src/features/products/ProductDetails";
import { IProduct } from "@src/model";
import { client } from "@utils/sanity.client";
import { groq } from "next-sanity";
import React from "react";

export default async function ProductDetailsPage({ params: { slug } }) {
  const query = groq`
*[_type == "product" && slug.current == $slug][0] {
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
  const product = await client.fetch(query, { slug });

  return <ProductDetails product={product} />;
}