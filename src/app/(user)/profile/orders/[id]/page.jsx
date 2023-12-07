import { auth } from "@clerk/nextjs";
import { client } from "@utils/sanity.client";
import { groq } from "next-sanity";
import Orderdetails from "@/features/orders/orderDetails";

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function ProductsPage({ params: { id } }) {
  const { userId } = auth();
  const getAllProductsQueries = `
    *[_type == "allOrders" && _id == "${id}" && userId == "${userId}" ][0] {
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
      }, firstname, lastname,
      address1, address1, city, state, country, pincode, phone1, phone2, email, timestamp,
        subtotal, shipping, total, trackingCode
    }
`;

  const getOrderAsync = () => {
    return client.fetch(groq`${getAllProductsQueries}`, { _id: id });
  };
  const order = await getOrderAsync();
console.log(order)
  return <Orderdetails order={order} />;
}
