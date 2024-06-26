"use client";
import { Image } from "@chakra-ui/react";
import { useUser } from "@clerk/nextjs";
import { Loading } from "@src/components/Loading/Loading";
import { inputGroup } from "@src/components/Search/Style";
import { AppContext } from "@src/context/AppContext";
import {
  calculateItemsTotal,
  calculateShipping,
  formatPrice,
  getSubstring,
} from "@src/helpers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useContext, useEffect, useState } from "react";

export const Checkout = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  const [loadingPayment, setLoadingPayment] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [inputData, setInputData] = useState({});
  const total = subTotal > 0 ? subTotal + calculateShipping(subTotal) : 0;

  useEffect(() => {
    if (isSignedIn) {
      setInputData({
        email: user?.primaryEmailAddress?.emailAddress || "",
        phone1: user?.primaryPhoneNumber?.phoneNumber || "",
        firstname: user?.firstName || "",
        lastname: user?.lastName || "",
      });
    }
  }, [isLoaded]);

  const router = useRouter();

  const {
    state: { checkout, cart, promo },
    resetItems,
    resetPromo,
  } = useContext(AppContext);

  useEffect(() => {
    const subTotal = calculateItemsTotal(checkout);
    setSubTotal(subTotal);
  }, [checkout]);

  const makePayment = async () => {
    setLoadingPayment(true);
    const data = await fetch("/api/checkout", {
      method: "POST",
      headers: {},
      body: JSON.stringify({
        allOrderedProducts: checkout,
        allOrderData: {
          promo,
          note: "note",
          subtotal: subTotal,
          shipping: calculateShipping(subTotal),
          total,
          timestamp: new Date().toISOString(),
          orderData: inputData,
        },
      }),
    })
      .then((t) => t.json())
      .finally(() => resetPromo());

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
      image: "https://galaeyelashes.in/email/logo.jpg",
      name: "Gala Eyelashes",
      currency: "INR",
      amount: data.payment.amount,
      order_id: data.payment.id,
      customer: {
        name: user?.firstName + ' ' + user?.lastName,
        contact: inputData?.phone1,
        email: inputData?.email,
      },
      description: "Pay for Order",
      handler: async function (response) {
        let res = await fetch("/api/checkout", {
          method: "PUT",
          body: JSON.stringify({
            update: {
              _id: data.order._id,
              razorpayId: response.razorpay_order_id,
              paid: true,
              successfull: true,
            },
            orderData: inputData,
            orderSummary: data.transaction,
          }),
        }).then((res) => res.json());
        resetPromo();
        resetItems("checkout");
        resetItems("cart");
        router.replace("/order-history/" + res._id);
      },
      prefill: {
        name: user.fullName,
        email: user.primaryEmailAddress,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setLoadingPayment(false);
    paymentObject.on("payment.failed", function (response) {
      alert(response.description);
    });
  };
  const isValid =
    inputData?.firstname &&
    inputData?.lastname &&
    inputData?.email &&
    inputData?.address1 &&
    inputData?.address2 &&
    inputData?.city &&
    inputData?.state &&
    inputData?.country &&
    inputData?.pincode;
  if (!isLoaded) return <Loading />;

  return (
    <>
      {total <= 0 ? (
        <div className=" flex flex-col justify-center align-center h-[80vh]">
          <p className=" mx-auto pt-8 text-xl text-center mb-8">
            Please add products to continue
          </p>
          <Link
            href={"/"}
            className=" mx-auto w-max bg-black text-white px-8 py-4"
          >
            Go to Homepage
          </Link>
        </div>
      ) : (
        <div className="container grid grid-cols-3 py-8 gap-8 max-lg:px-4">
          <p className="my-0 lg:my-4 col-span-3   font-bold uppercase text-xl text-center">
            Checkout
          </p>
          <div className=" col-span-3 lg:col-span-2 flex flex-col gap-4 lg:pl-32">
            <input
              className=" border-2 px-3 py-4 focus:outline-none placeholder:font-light border-grey"
              value={inputData?.email || ""}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <input
                placeholder="FIRST NAME"
                className=" border-2 px-3 py-4 focus:outline-none placeholder:font-light border-grey"
                onChange={(e) =>
                  setInputData({ ...inputData, firstname: e.target.value })
                }
                value={inputData?.firstname || ""}
              />
              <input
                placeholder="LAST NAME"
                className=" border-2 px-3 py-4 focus:outline-none placeholder:font-light border-grey"
                onChange={(e) =>
                  setInputData({ ...inputData, lastname: e.target.value })
                }
                value={inputData?.lastname || ""}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <input
                placeholder="PHONE NO. 1"
                className=" border-2 px-3 py-4 w-full focus:outline-none placeholder:font-light border-grey"
                onChange={(e) =>
                  setInputData({ ...inputData, phone1: e.target.value })
                }
                value={inputData?.phone1 || ""}
              />
              <input
                placeholder="PHONE NO. 2"
                className=" border-2 px-3 py-4 w-full focus:outline-none placeholder:font-light border-grey"
                onChange={(e) =>
                  setInputData({ ...inputData, phone2: e.target.value })
                }
                value={inputData?.phone2 || ""}
              />
            </div>
            <div className="col-span-2 flex flex-col gap-4 ">
              <input
                placeholder="ADDRESS LINE 1"
                className=" border-2 px-3 py-4 w-full focus:outline-none placeholder:font-light border-grey"
                onChange={(e) =>
                  setInputData({ ...inputData, address1: e.target.value })
                }
                value={inputData?.address1 || ""}
              />
              <input
                placeholder="ADDRESS LINE 2"
                className=" border-2 px-3 py-4 w-full focus:outline-none placeholder:font-light border-grey"
                onChange={(e) =>
                  setInputData({ ...inputData, address2: e.target.value })
                }
                value={inputData?.address2 || ""}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <input
                placeholder="CITY"
                className=" border-2 px-3 py-4 w-full focus:outline-none placeholder:font-light border-grey"
                onChange={(e) =>
                  setInputData({ ...inputData, city: e.target.value })
                }
                value={inputData?.city || ""}
              />
              <input
                placeholder="STATE"
                className=" border-2 px-3 py-4 w-full focus:outline-none placeholder:font-light border-grey"
                onChange={(e) =>
                  setInputData({ ...inputData, state: e.target.value })
                }
                value={inputData?.state || ""}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <input
                placeholder="COUNTRY"
                className=" border-2 px-3 py-4 w-full focus:outline-none placeholder:font-light border-grey"
                onChange={(e) =>
                  setInputData({ ...inputData, country: e.target.value })
                }
                value={inputData?.country || ""}
              />
              <input
                placeholder="PINCODE"
                className=" border-2 px-3 py-4 w-full focus:outline-none placeholder:font-light border-grey"
                onChange={(e) =>
                  setInputData({ ...inputData, pincode: e.target.value })
                }
                value={inputData?.pincode || ""}
              />
            </div>
            <textarea
              id="message"
              rows="4"
              className="border-2 px-3 py-4 col-span-2 w-full focus:outline-none placeholder:font-light border-grey"
              placeholder="DELIVERY INSTRUCTIONS"
              onChange={(e) =>
                setInputData({ ...inputData, instructions: e.target.value })
              }
              value={inputData?.instructions || ""}
            />
            <div>
              <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
              />
              <button
                disabled={!isValid}
                className={`" px-4 py-4 bg-black text-white w-full ${
                  !isValid && "opacity-75"
                } "`}
                onClick={() => {
                  isValid && (total > 0 ? makePayment() : null);
                }}
              >
                Pay ₹ {formatPrice(total - (promo?.discount || 0))}
                {loadingPayment && (
                  <div className=" fixed w-screen top-0 right-0 z-50  flex justify-center items-center bg-opacity-50 h-screen bg-black">
                    <div className="flex space-x-2 justify-center items-center">
                      <span className="sr-only">Loading...</span>
                      <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="h-4 w-4 bg-white rounded-full animate-bounce"></div>
                    </div>{" "}
                  </div>
                )}
              </button>
            </div>
          </div>
          <div className=" lg:pr-32 max-lg:col-span-3">
            <p className="   text-lg uppercase font-semibold mb-2">Summary</p>
            <div className="grid grid-cols-3 gap-2">
              <div className=" col-span-2 uppercase   font-semibold opacity-60">
                Subtotal
              </div>
              <div className="   text-right font-semibold">
                ₹ {formatPrice(subTotal)}
              </div>
              <div className=" col-span-2 uppercase   font-semibold opacity-60">
                Shipping
              </div>
              <div className="  text-right font-semibold">
                ₹ {formatPrice(calculateShipping(subTotal))}
              </div>
              <div className=" col-span-2 uppercase   font-semibold opacity-60">
                Discount
              </div>
              <div className="  text-right font-semibold">
                ₹ {formatPrice(promo?.discount || 0)}
              </div>
              <hr className=" col-span-3 my-1 opacity-50 border-1" />
              <div className=" col-span-2 uppercase   font-semibold opacity-60"></div>
              <div className="  text-lg text-right font-semibold">
                ₹ {formatPrice(total - (promo?.discount || 0))}{" "}
              </div>
            </div>
            <div className="my-8" />
            <p className="   text-lg uppercase font-semibold mb-2">
              shopping Bag
            </p>
            {checkout.map((item, index) => (
              <div key={index} className=" grid grid-cols-4 px-4 py-2">
                <div className=" relative aspect-square rounded">
                  <Image src={item.mainImage} fill />
                </div>
                <div className=" flex flex-col col-span-3 px-2">
                  <p className=" uppercase font-semibold text-sm mb-1">
                    {getSubstring(item.name, 22)}
                  </p>
                  <p className="  text-xs">
                    {getSubstring(item.category?.name, 22)}
                  </p>
                  <p className=" uppercase text-xs">QTY: {item.count}</p>
                  <div className="flex-grow" />
                  <div className="flex flex-row justify-between">
                    <p className="   text-sm ">₹ {item.price}</p>
                    <p className="   text-sm font-semibold ">
                      ₹ {item.price * item.count}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
