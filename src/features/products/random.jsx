"use client";
import { client } from "@utils/sanity.client";
import "lightbox.js-react/dist/index.css";
import { groq } from "next-sanity";
import { useEffect, useState } from "react";
import "yet-another-react-lightbox/styles.css";
import { ProductsSlider } from "./ProductsSlider";

const query = groq`
*[_type == 'product'] {
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

function getRandomItems(array, numberOfItems) {
  let newArray = array.slice();
  let randomItems = [];
  while (randomItems.length < numberOfItems && newArray.length > 0) {
    let randomIndex = Math.floor(Math.random() * newArray.length);
    randomItems.push(newArray[randomIndex]);
    newArray.splice(randomIndex, 1);
  }

  return randomItems;
}

export const RandomProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    client.fetch(query).then((res) => {
      setProducts(res);
    });
  }, []);
  const randomProducts = getRandomItems(products, 4);

  return (
    <div className=" px-2">
      <p className="  uppercase text-xl font-semibold">Related Products</p>
      <ProductsSlider products={randomProducts} />
    </div>
  );
};
