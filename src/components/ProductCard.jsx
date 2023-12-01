"use client";
import { IProduct } from "@src/model";
import { AddToWishlistButton } from "./AddToWishlistButton";
import { Rating } from "./Rating";
import Image from "next/image";
import { getSubstring } from "@src/helpers";

export const ProductCard = ({ product }) => {
  console.log(product);
  return (
    <div className="bg-white py-4 px-6">
      <div className="flex justify-between items-center mb-4">
        <Rating rating={product.rating} />
        <AddToWishlistButton product={product} />
      </div>
      <div className="relative aspect-square mb-4">
        <Image src={product.mainImage} alt={product.name} fill />
      </div>
      <p className="text-center uppercase text-md font-semibold mb-2">
        {getSubstring(product.name, 20)}
      </p>
      <p className="text-center text-xl font-poppins mb-2">
        {" "}
        ₹ {product.price}
      </p>
      <p className="text-center text-sm text-dark mb-4"> {product.category.name}</p>
      <div className="text-center text-sm">
        <button className="bg-black text-white uppercase font-semibold px-4 py-2 rounded-full">
          add to bag
        </button>
      </div>
    </div>
    // <Card w="xs" pos="relative" m="0.5rem">
    //
    //   <CardBody>
    //     <Link href={`/products/${product.slug}`}>
    //       <Box
    //         bg={`center / contain no-repeat url(${product.mainImage})`}
    //         borderRadius="lg"
    //         boxSize="200px"
    //         mx="auto"
    //       />
    //     </Link>
    //     <Stack mt="6" spacing="3">
    //       <Flex justify="space-between" align="center">
    //         <Link href={`/products/${product.slug}`}>
    //           <Heading size="sm">{getSubstring(product.name, 20)}</Heading>
    //         </Link>
    //         <Flex color="brand.primaryDark" fontWeight="bold">
    //           <Text fontSize="sm">$ </Text>
    //           <Text fontSize="lg">{product.price}</Text>
    //         </Flex>
    //       </Flex>
    //       <Text fontSize="sm"> {getSubstring(product.description, 30)} </Text>
    //

    //       <AddToCartButton product={product} />
    //     </Stack>
    //   </CardBody>
    // </Card>
  );
};
