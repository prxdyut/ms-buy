"use client";
import { getSubstring } from "@src/helpers";
import Image from "next/image";
import Link from "next/link";

export default function OrderDetails({ order }) {
  console.log(order);
  return (
    <div className="container px-4 lg:px-16 py-8 grid lg:grid-cols-2">
      <div className=" lg:col-span-2 bg-grey py-2 text-center mb-4">
        Order Id: <b> #{order.id}</b>
      </div>
      <div className="p-2">
        <Link href={`http://www.smespl.in/Frm_DocTrackWeb.aspx?docno=${order.trackingCode}`} target="_blank">
        <button className="px-2 py-1 bg-black text-white text-sm uppercase rounded">Track Package</button></Link>
        <br />
        <br />
        <p>Fulfilled : {order.fulfilled ? "Fulfilled" : "Yet to Fulfill"}</p>
        <br />
        <p>Email : {order.email}</p>
        <p>First Name : {order.firstname}</p>
        <p>Last Name : {order.lastname}</p>
        <br />
        <p>Timestamp : {new Date(order.timestamp).toLocaleDateString()}</p>
        <p>Phone No. 1 : {order.phone1}</p>
        <p>Phone No. 2 : {order.phone2}</p>
        <p>Address Line 1 : {order.address1}</p>
        <p>Address Line 2 : {order.address2}</p>
        <p>City : {order.city}</p>
        <p>State : {order.state}</p>
        <p>Country : {order.country}</p>
        <p>Pincode : {order.pincode}</p>
        <br />
      </div>
      <div className="px-4 items-center justify-center">
        {order.products.map(({ productReference, ...product }, index) => (
          <Link href={"/products/" + productReference.slug}>
            <div className="flex items-center gap-4">
              <div className="relative w-12 aspect-square">
                <Image src={productReference.mainImage} fill />
              </div>
              <p className="flex-grow">
                {getSubstring(productReference.name, 17)}
              </p>
              <p align={"end"}>{product.quantity}</p>
            </div>
            <p className=" font-semibold text-right">₹ {product.price}</p>
          </Link>
        ))}
        <div className="mt-4 flex flex-col gap-1 text-end font-semibold lg:text-xl">
          <p>Subtotal : ₹ {order.subtotal}</p>
          <p>Shipping : ₹ {order.shipping}</p>
          <p>Total : ₹ {order.total}</p>
        </div>
      </div>
    </div>
  );
}
