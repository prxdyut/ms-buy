import { auth, currentUser } from "@clerk/nextjs";
import { Hero } from "@src/components/Hero/Hero";
import { AllProducts } from "@src/features/products";
import { IProduct } from "@src/model";
import { client } from "@utils/sanity.client";
import { groq } from "next-sanity";

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function OrdersPage() {
  const { userId } = auth();
  const getAllOrdersQueries = `
    *[_type == "allOrders" && userId == "${userId}"]
`;

  const getOrdersAsync = () => {
    return client.fetch(groq`${getAllOrdersQueries}`);
  };
  const orders = await getOrdersAsync();

  return (
    <p>
      {orders.map((order) => (
        <>
          {JSON.stringify(order)}
          <hr />
        </>
      ))}
    </p>
  );
}
