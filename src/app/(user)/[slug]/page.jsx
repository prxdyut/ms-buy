'use client'
import { client } from "@utils/sanity.client";
import { groq } from "next-sanity";
import React from "react";
import { PortableText } from "@portabletext/react";
export const revalidate = 0;

export default async function Page({ params: { slug } }) {
  const query = groq`
*[_type == "pages" && slug.current == $slug ][0].content
`;
  const content = await client.fetch(query, {slug});

  return (
    <div className=" container px-4 py-8 lg:px-16 policies">
      <PortableText value={content} />
    </div>
  );
}
