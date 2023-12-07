import { ProductDetails } from "@src/features/products/ProductDetails";
import { IProduct } from "@src/model";
import { client } from "@utils/sanity.client";
import { groq } from "next-sanity";
import React from "react";
import { PortableText } from "@portabletext/react";
export const revalidate = 2;

export default async function ProductDetailsPage({ params: { title } }) {
  const query = groq`
*[_type == "policies"][0]
`;
  const content = await client.fetch(query, { title });
  console.log(content);
  return (
    <div className=" container px-4 py-8 lg:px-16 policies">
      {" "}
      <PortableText value={content[title]} />{" "}
    </div>
  );
}
