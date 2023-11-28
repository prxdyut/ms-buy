import { auth, currentUser } from "@clerk/nextjs";
import { Hero } from "@src/components/Hero/Hero";
import { AllProducts } from "@src/features/products";
import { IProduct } from "@src/model";
import { client } from "@utils/sanity.client";
import { groq } from "next-sanity";

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function ProductsPage({ params: { id } }) {
  const { userId } = auth();
  const getAllProductsQueries = `
    *[_type == "allOrders" && userId == "${userId}" ][0]
`;

  const getProductsAsync = () => {
    return client.fetch(groq`${getAllProductsQueries}`, { _id: id });
  };
  const products = await getProductsAsync();

  return <p>{JSON.stringify(products)}</p>;
}
