import { useDisclosure } from "@chakra-ui/react";
import { AppContext } from "@src/context/AppContext";
import {
  calculateItemsTotal,
  calculateShipping,
  formatPrice,
  getSubstring,
} from "@src/helpers";
import Link from "next/link";
import { useContext, useRef, useState } from "react";
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
    state: { cart },
    resetItems,
    addItem,
    increaseCount,
    decreaseCount,
    removeItem,
    forceUpdate,
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

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
      onClose();
      router.push("/checkout/");
    }
  };

  const Item = ({ item }) => {
    const [loading, setLoading] = useState(false);
    console.log(loading);
    return (
      <div className=" relative">
        <Link
          href={`/products/${item.slug}`}
          onClick={onClose}
          className="  cursor-default  hover:bg-grey bg-opacity-50 flex gap-4 p-4"
        >
          <div className=" relative aspect-square rounded h-20">
            <Image src={item.mainImage} fill />
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
        <span class="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-black text-white text-xs  flex justify-center items-center items">
          <span>{cart.length}</span>
        </span>
      </div>

      <div
        className={`fixed top-0 right-0 h-screen w-screen flex flex-col lg:w-[36rem] py-4 z-50 bg-white transition-all ${
          isOpen ? "translate-x-0" : " translate-x-full"
        }`}
      >
        <div className=" cursor-pointer flex justify-end px-4 mb-2">
          <CloseIcon size={24} onClick={onClose} />
        </div>
        <p className=" text-2xl font-bold mb-4  px-4 ">
          Your Bag <span className=" text-base"> {`( ${cart.length} )`}</span>
        </p>
        <div className=" flex-grow overflow-y-auto">
          {cart.length === 0 ? (
            <p className="px-4">Your Bag is Empty</p>
          ) : (
            cart.map((item, index) => <Item key={index} item={item} />)
          )}
        </div>
        {cart.length !== 0 && (
          <div className="px-4 py-2 pb-0">
            <div className="grid grid-cols-3 gap-2">
              <div className=" col-span-2 uppercase   font-semibold">
                Subtotal
              </div>
              <div className="   text-right font-semibold">
                ₹ {formatPrice(calculateItemsTotal(cart))}
              </div>
              <div className=" col-span-2 uppercase   font-semibold ">
                Shipping
              </div>
              <div className="  text-right font-semibold">
                ₹ {formatPrice(calculateShipping(calculateItemsTotal(cart)))}
              </div>
              <hr className=" col-span-3 my-1 opacity-50 border-1" />
              <div className=" col-span-2 uppercase   font-semibold opacity-60"></div>
              <div className="  text-lg text-right font-semibold">
                ₹{" "}
                {calculateItemsTotal(cart) +
                  calculateShipping(calculateItemsTotal(cart))}{" "}
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
      {/* <Button
        ref={btnRef}
        onClick={onOpen}
        variant="ghost"
        color="brand.primary"
        _hover={{
          bgColor: 'transparent',
        }}
        pos="relative"
      >
        <BsCart4 /> <Text mx="1">Cart</Text>
        {cart.length !== 0 && (
          <Flex
            pos="absolute"
            top="0px"
            right="5px"
            bgColor="brand.primaryLight"
            boxSize="15px"
            rounded="full"
            color="white"
            fontSize="0.6rem"
            align="center"
            justify="center"
          >
            {cart.length}
          </Flex>
        )}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader color="brand.primary">
            Cart ( {cart.length} Items )
          </DrawerHeader>
          <DrawerBody>
            {cart.length === 0 ? (
              <>Your Cart is Empty</>
            ) : (
              cart.map((item) => <CartItem key={item.id} item={item} />)
            )}
          </DrawerBody>
          {cart.length !== 0 && (
            <DrawerFooter justifyContent="space-between">
              <Box>
                <Button
                  variant="outline"
                  mr={3}
                  onClick={() => resetItems('cart')}
                >
                  Clear Cart
                </Button>
                <Link href="/checkout">
                  <Button
                    bgColor="brand.primary"
                    color="white"
                    _hover={{
                      bgColor: 'brand.primaryLight',
                    }}
                    _active={{
                      bgColor: 'brand.primaryLight',
                    }}
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                </Link>
              </Box>
              <Box fontWeight="bold">Total: ₹ {calculateItemsTotal(cart)}</Box>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer> */}
    </>
  );
};
