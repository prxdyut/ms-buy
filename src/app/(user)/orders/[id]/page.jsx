import { auth } from "@clerk/nextjs";
import { client } from "@utils/sanity.client";
import { groq } from "next-sanity";
import Orderdetails from "@/features/orders/orderDetails";

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function ProductsPage({ params: { id } }) {
  const { userId } = auth();
  const getAllProductsQueries = `
    *[_type == "allOrders" && userId == "${userId}" ][0] {
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
      },
      address, phoneNumber, email, timestamp,
        subtotal, tax, total 
    }
`;

  const getOrderAsync = () => {
    return client.fetch(groq`${getAllProductsQueries}`, { _id: id });
  };
  const order = await getOrderAsync();

  return (
    <p>
      <Orderdetails order={order} />
    </p>
  );
}
