"use client";
import "lightbox.js-react/dist/index.css";
import { CustomBreadcrumb } from "@src/components/CustomBreadcrumb";
import { AppContext } from "@src/context/AppContext";
import { getSubstring } from "@src/helpers";
import { useContext, useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import NextJsImage from "@/components/NextJsImage";
import { Rating } from "@src/components/Rating";
import { Quantity } from "@src/components/Quantity/Quantity";
import { AddToCartButton } from "@src/components/Cart/AddToCartButton";
import Link from "next/link";
const items = [
  {
    name: "Products",
    link: "/products",
  },
  {
    name: "Categories",
    link: "/categories",
  },
];

export const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { isAdded, addItem, resetItems } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  // console.log(product, 'productdetails')

  return (
    <>
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="hidden lg:block ">
          <CustomBreadcrumb
            items={[
              ...items,
              {
                name: product?.category?.name,
                link: `/categories/${product?.category?.id}`,
              },
              {
                name: getSubstring(product?.name, 20),
                link: `/products/${product?.slug}`,
              },
            ]}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className=" grid max-lg:overflow-x-auto max-lg:grid-flow-col lg:grid-cols-2 lg:col-span-2 gap-4">
            <Link href={product?.mainImage} target="_blank" className="relative w-[75vw] lg:w-full aspect-square rounded">
              <Image
                src={product?.mainImage}
                alt={product?.name}
                fill
                objectFit="cover"
                className="bg-grey"
              />
            </Link>
            {product?.gallery?.map((image, i) => (
              <Link href={image.asset.url} target="_blank"  className="relative w-[75vw] lg:w-full aspect-square rounded">
                <Image
                  key={i}
                  src={image.asset.url}
                  alt={product.name}
                  fill
                  objectFit="cover"
                  className="bg-grey"
                />
              </Link>
            ))}
          </div>
          <div className="px-0 lg:px-12">
            <div className="sticky top-32">
              <div className="mb-2 lg:mb-6">
                <Rating rating={product?.rating} />
              </div>
              <p className=" text-2xl uppercase font-semibold w-3/4 mb-3">
                {product?.name}
              </p>
              <div className=" lg:text-right font-poppins font-semibold mb-2 lg:mb-6">
                ₹ {product?.price}
              </div>
              <hr className="mb-2 lg:mb-6" />
              <div className=" text-dark mb-4">{product?.description}</div>
              <div className=" text-dark text-sm uppercase mb-6">
                {product?.category?.name}
              </div>
              <div className=" text-dark text-xs mb-2">
                MRP inclusive of all taxes
              </div>
              <button
                onClick={() => {
                  resetItems("checkout");
                  addItem("checkout", product, product.instock, quantity);
                }}
                className=" font-poppins uppercase font-semibold w-full border-2 border-dark text-dark py-2 rounded-full mb-2"
              >
                Buy Now
              </button>
              <Quantity
                setQuantity={setQuantity}
                quantity={quantity}
                disabled={isAdded("cart", product?.id)}
              />
              <AddToCartButton product={product} count={quantity} instock={product.instock} />
              <div className=" text-dark text-sm mb-2 text-center">
                Shipping Charges are calculated at checkout
              </div>
            </div>
          </div>
        </div>
        {/* <CustomBreadcrumb
        items={[
          ...items,
          {
            name: product?.category.name,
            link: `/categories/${product?.category.id}`,
          },
          {
            name: getSubstring(product.name, 20),
            link: `/products/${product.slug}`,
          },
        ]}
      />
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
        w={{ base: '100%', lg: '90%' }}
        mx="auto"
        p="2rem"
        gap="20"
      >
        <GridItem p="1rem" pos="relative">
          <AddToWishlistButton product={product} />
          <Image src={product?.mainImage} alt={product?.name} mx="auto" />
         
          <Flex>
            {product.gallery?.length !== 0 &&
              product.gallery?.map((image, i) => (
                <Image
                  key={i}
                  src={image}
                  alt={product.name}
                  mx="auto"
                  boxSize="70px"
                  rounded="md"
                  shadow="sm"
                  borderWidth="1px"
                  borderColor="gray.100"
                />
              ))}
          </Flex>
        </GridItem>
        <GridItem p="1rem">
          <Heading>{product?.name}</Heading>
          <Text my="1rem">{product.description}</Text>
          <Rating rating={product.rating} />

          <Text fontWeight="bold" fontSize="2rem">
            ${product.price}
          </Text>
          <Divider my="1rem" />
          <Quantity
            setQuantity={(_valueAsString, valueAsNumber) =>
              setQuantity(valueAsNumber)
            }
            disabled={isAdded('cart', product.id)}
          />
          <Divider my="1rem" />
          <Box>
            <Link href="/checkout">
              <Button
                variant="outline"
                bgColor="brand.primary"
                color="white"
                borderRadius="50px"
                size="sm"
                w="160px"
                mr="1rem"
                my="0.5rem"
                _hover={{ bgColor: 'none' }}
                onClick={() => {
                  resetItems('checkout');
                  addItem('checkout', product, quantity);
                }}
              >
                Buy Now
              </Button>
            </Link>
            <AddToCartButton product={product} count={quantity} />
          </Box>

          <Stack py="2rem">
            <Box borderWidth={1} borderColor="gray.100" p="1rem">
              <Text fontWeight="bold">Free Deliver</Text>
              <Link textDecor="underline" color="gray.500">
                Enter Your postal Code for Delivery Availability
              </Link>
            </Box>

            <Box borderWidth={1} borderColor="gray.100" p="1rem">
              <Text fontWeight="bold">Return Delivery</Text>
              <Text color="gray.500">
                Free 30 Days Delivery Returns
                <Link textDecor="underline"> Details</Link>
              </Text>
            </Box>
          </Stack>
        </GridItem>
      </Grid> */}
      </div>
    </>
  );
};
