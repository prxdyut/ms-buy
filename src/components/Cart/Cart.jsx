import { useDisclosure } from "@chakra-ui/react";
import { AppContext } from "@src/context/AppContext";
import {
  calculateItemsTotal,
  calculateShipping,
  formatPrice,
  getSubstring,
} from "@src/helpers";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { CgClose as CloseIcon } from "react-icons/cg";
import { BagIcon } from "../Icons";
import Image from "next/image";
import { LuMinus } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { client } from "@utils/sanity.client";
import { groq } from "next-sanity";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { Loading } from "../Loading/Loading";

export const Cart = () => {
  const {
    state: { cart: cartItems, promo: promoData },
    resetItems,
    addItem,
    increaseCount,
    decreaseCount,
    removeItem,
    forceUpdate,
    setPromoCode,
  } = useContext(AppContext);
  const cart = [...new Set(cartItems.map(({ id }) => id))].map((id) =>
    cartItems.find(({ id: cartId }) => cartId == id)
  );
  const [loading, setLoading] = useState(false);
  const [promo, setPromo] = useState(false);
  const [promoLoading, setPromoLoading] = useState(false);
  const [discount, setDiscount] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const total =
    calculateItemsTotal(cart) + calculateShipping(calculateItemsTotal(cart));
  const handleCheckout = async () => {
    resetItems("checkout");
    let CAN_CHECKOUT = true;
    let PRODUCTS_CANNOT_CHECKOUT = [];
    const cartIds = cart.map(({ id }) => `"${id}"`).join(", ");
    const FETCHED_PRODUCTS_FROM_DATABASE =
      await client.fetch(groq`*[_type == "product" && _id in [ ${cartIds} ]] {
      "id" : _id,
      instock,
      price,
      name,
      }`);

    FETCHED_PRODUCTS_FROM_DATABASE.map((product) => {
      const addedItem = cart.find(({ id }) => product.id == id);
      const ITEM_IS_ELIGIBLE_FOR_CHECKOUT = product.instock >= addedItem.count;
      if (!ITEM_IS_ELIGIBLE_FOR_CHECKOUT) {
        CAN_CHECKOUT = false;
        PRODUCTS_CANNOT_CHECKOUT.push({
          id: product.id,
          name: product.name,
          added: addedItem.count,
          available: product.instock,
        });
        if (product.instock <= 0) removeItem("cart", product.id);
        else forceUpdate("cart", product.id);
      }
    });

    PRODUCTS_CANNOT_CHECKOUT.map(({ name, added, available }) =>
      alert(
        `Your requested quantity for '${name}' is not available. Only ${available} ${
          available == 1 ? "is" : "are"
        } in stock!`
      )
    );

    if (CAN_CHECKOUT) {
      cart.forEach((cartItem) => {
        addItem("checkout", cartItem.id, cartItem.count);
      });
      setPromoCode({ code: promo || "", discount: discount || 0 });
      onClose();
      router.push("/checkout/");
    }
  };
  useEffect(() => {
    if (!promo || promo.trim() == "") setDiscount(0);
  }, [promo]);

  const checkPromo = () => {
    setPromoLoading(true);
    fetch(`/api/promo/${promo.trim()}?total=${total}`)
      .then((res) => res.json())
      .then((res) => setDiscount(res.discount || 0))
      .catch(() => setDiscount(0))
      .finally(() => setPromoLoading(false));
  };

  useEffect(() => {
    setPromo(promoData?.code || false);
    if (promoData?.code) {
      setPromoLoading(true);
      fetch(`/api/promo/${promoData.code.trim()}?total=${total}`)
        .then((res) => res.json())
        .then((res) => setDiscount(res.discount || 0))
        .finally(() => setPromoLoading(false));
    } else setDiscount(0);
  }, [promoData]);

  useEffect(() => {
    if (isOpen) {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("body")[0].style.overflow = "";
    }
  }, [isOpen]);

  const Item = ({ item }) => {
    const [loading, setLoading] = useState(false);
    return (
      <div className=" relative">
        <Link
          href={`/products/${item.slug}`}
          onClick={onClose}
          className="  cursor-default  hover:bg-grey bg-opacity-50 flex gap-4 p-4"
        >
          <div className=" relative aspect-square rounded h-20">
            <Image src={item.mainImage} fill objectFit="cover" />
          </div>
          <div className=" flex flex-col  flex-grow col-span-3 px-2">
            <p className=" uppercase font-semibold">
              {getSubstring(item.name, 30)}
            </p>
            <p className=" text-sm">{getSubstring(item.category?.name, 22)}</p>
            <div className=" flex-grow" />

            <p className="   flex justify-between ">
              <p>₹ {item.price}</p>
              <p className=" lg:hidden font-semibold">
                ₹ {item.price * item.count}
              </p>
            </p>
          </div>
        </Link>
        <div className="mb-4 mr-4 ml-4  lg:absolute right-0 items-center bottom-0 flex gap-4 w-max">
          <p className=" max-lg:hidden font-semibold">
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "₹ " + item.price * item.count
            )}
          </p>
          <div className="bg-black text-white flex gap-4 w-max p-2">
            <LuMinus
              onClick={() => {
                if (!loading) {
                  decreaseCount("cart", item.id);
                }
              }}
              className=" cursor-pointer"
            />
            <p className=" uppercase text-xs">QTY: {item.count}</p>
            <LuPlus
              onClick={() => {
                if (!loading) {
                  setLoading(true);
                  increaseCount("cart", item.id, () => setLoading(false));
                }
              }}
              className=" cursor-pointer"
            />
          </div>
        </div>
        <div className="mt-4 mr-4  absolute top-0 right-0">
          <CloseIcon
            className=" cursor-pointer"
            fontSize={20}
            onClick={() => removeItem("cart", item.id)}
          />
        </div>
      </div>
    );
  };
  if (loading) return <Loading />;
  return (
    <>
      <div
        onClick={onOpen}
        className="cursor-pointer hover:bg-grey p-2 rounded-lg  relative"
      >
        <BagIcon size={20} />
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-black text-white text-xs  flex justify-center items-center items">
          <span>{cart.length}</span>
        </span>
      </div>

      <div
        className={`fixed top-0 m-0  min-h-screen right-0 h-screen overflow-y-auto w-screen lg:w-[36rem] z-50 bg-white transition-all ${
          isOpen ? "translate-x-0" : " translate-x-full"
        }`}
      >
        <div className=" sticky bg-white z-50 top-0 py-4 flex flex-row justify-between">
          <p className=" text-xl font-bold  px-4 ">
            Your Bag <span className=" text-base"> {`( ${cart.length} )`}</span>
          </p>
          <div className=" cursor-pointer flex justify-end px-4 mb-2">
            <CloseIcon size={24} onClick={onClose} />
          </div>
        </div>
        <div className="">
          {cart.length === 0 ? (
            <p className="px-4">Your Bag is Empty</p>
          ) : (
            cart.map((item, index) => <Item key={index} item={item} />)
          )}
        </div>
        {cart.length !== 0 && (
          <div className=" sticky bottom-0 px-4 py-2 pb-8 bg-white">
            {!promo ? (
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setPromo(" ");
                }}
                className=" opacity-75 text-sm pb-4 py-2 underline cursor-pointer underline-offset-2"
              >
                Have a Promo Code?{" "}
              </a>
            ) : (
              <div className=" py-2 flex gap-4">
                <input
                  className="  bg-grey px-2 py-1 rounded outline-none"
                  placeholder="Promo Code"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key == "Enter") {
                      checkPromo();
                    }
                  }}
                />
                <button
                  className=" bg-black px-4 rounded py-1 text-white"
                  onClick={checkPromo}
                >
                  check
                </button>
                {promoLoading && (
                  <div role="status">
                    <svg
                      class="animate-spin w-6 h-6 fill-slate-800"
                      viewBox="3 3 18 18"
                    >
                      <path
                        class="opacity-20"
                        d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                      ></path>
                      <path d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
                    </svg>
                  </div>
                )}
              </div>
            )}
            <div
              className={`grid pt-2 grid-cols-3 gap-2 ${
                promoLoading && "animate-pulse"
              }`}
            >
              <div className=" opacity-50 col-span-2 uppercase   font-semibold">
                Subtotal
              </div>
              <div className="   text-right font-semibold">
                ₹ {formatPrice(calculateItemsTotal(cart))}
              </div>
              <div className=" opacity-50 text-sm  col-span-2 uppercase   font-semibold ">
                Shipping
              </div>
              <div className="  text-right font-semibold">
                ₹ {formatPrice(calculateShipping(calculateItemsTotal(cart)))}
              </div>
              <div className=" opacity-50  text-sm col-span-2 uppercase   font-semibold ">
                Discount
              </div>
              <div className="  text-right font-semibold">
                ₹ {formatPrice(discount || 0)}
              </div>
              <hr className=" col-span-3 my-1 opacity-50 border-1" />
              <div className=" col-span-2 uppercase   font-semibold opacity-60"></div>
              <div className="  text-lg text-right font-semibold">
                ₹ {total}{" "}
              </div>
            </div>
            <div className=" flex flex-row">
              <p
                href={"/checkout"}
                className=" cursor-pointer w-max bg-black text-white px-8 py-2 rounded mr-2   text-sm uppercase"
                onClick={handleCheckout}
              >
                Checkout
              </p>
              <button
                onClick={() => resetItems("cart")}
                className=" bg-grey text-black px-8 py-2 rounded mr-2   text-sm uppercase"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        className={`fixed z-20 right-0 top-0 h-screen w-screen bg-black bg-opacity-50 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      />
    </>
  );
};
