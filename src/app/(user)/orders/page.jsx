import { auth } from "@clerk/nextjs";
import { client } from "@utils/sanity.client";
import { groq } from "next-sanity";
import AllOrders from "@/features/orders/index";

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function OrdersPage() {
  const { userId } = auth();
  const getAllOrdersQueries = `
    *[_type == "allOrders" && userId == "${userId}"] {
      "id": _id, products[]{
      productReference -> {
        "id": _id,
          name,
          price,   
          "slug": slug.current,
          "mainImage": mainImage.asset->url,
      },
      price, 
      quantity
    }, total }
`;

  const getOrdersAsync = () => {
    return client.fetch(groq`${getAllOrdersQueries}`);
  };
  const orders = await getOrdersAsync();

  return (
    <div>
      <AllOrders orders={orders} />
    </div>
  );
}
