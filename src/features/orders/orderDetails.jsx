"use client";
import { getSubstring } from "@src/helpers";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function OrderDetails({ order }) {

  const param = useParams();
  return (
    <>
      {order == null ? (
        <div className=" flex flex-col justify-center align-center py-8">
          <p className=" mx-auto pt-8 text-xl text-center mb-8">
            Invalid Order ID{" "}
            <span className="  text-base">{`( ${param.id} )`}</span>
          </p>
          <Link
            href={"/order-history"}
            className=" mx-auto w-max bg-black text-white px-8 py-4"
          >
            Go to Orders
          </Link>
        </div>
      ) : (
        <div className="container px-4 lg:px-16 py-8 grid lg:grid-cols-2">
          <div className=" lg:col-span-2 bg-grey py-2 text-center mb-4">
            Order Id: <b> #{order.id}</b>
          </div>
          <div className="p-2">
            {!!order.trackingCode && (
              <Link
                href={`http://www.smespl.in/Frm_DocTrackWeb.aspx?docno=${order.trackingCode}`}
                target="_blank"
              >
                <button className="px-2 py-1 bg-black text-white text-sm uppercase rounded">
                  Track Package
                </button>
              </Link>
            )}

            <br />
            <br />
            <div className=" text-xl">
              <p>
                Status :
                <span className=" font-bold ">
                  {order.successfull ? " Successfull" : " Failed"}
                </span>
              </p>
              <p>
                Payment :
                <span className=" font-bold ">
                  {order.paid ? " Paid" : " Not Paid"}
                </span>
              </p>
              <p>
                Fulfilled :
                <span className=" font-bold ">
                  {order.fulfilled ? " Fulfilled" : " Yet to Fulfill"}
                </span>
              </p>
            </div>
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
            <div className="mt-4 grid grid-cols-2 gap-1   ">
              <p className=" ">Subtotal :</p> <p className="text-end  lg:text-xl">₹ {order.subtotal}</p>
              <p>Shipping :</p><p className="text-end lg:text-xl"> ₹ {order.shipping} </p>
              <p>Discount :</p> <p className="text-end lg:text-xl">- ₹ {order.promo.discount}</p>
              <p className="font-semibold">Total :</p> <p className="text-end font-semibold lg:text-xl">₹ {order.total}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
