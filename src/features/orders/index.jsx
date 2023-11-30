"use client";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import { auth } from "@clerk/nextjs";
import { formatPrice, getSubstring } from "@src/helpers";
import { client } from "@utils/sanity.client";
import { groq } from "next-sanity";
import Link from "next/link";

export default function AllOrders({ orders }) {
  console.log(orders);
  return (
    <div>
      <Flex
        flexWrap="wrap"
        w={{ base: "100%", lg: "90%" }}
        mx="auto"
        justify={{ base: "center", lg: "space-between" }}
      >
        {orders.map((order, index) => (
          <Card w="xs" pos="relative" key={index}>
            <CardBody>
              {order.products.map(({ productReference, ...product }, index) => (
                <Grid
                  key={index}
                  alignItems="center"
                  templateColumns="repeat(8, 1fr)"
                  borderBottomWidth="1px"
                  borderBottomColor="gray.200"
                  my="2"
                  py="1"
                >
                  <GridItem>
                    <Link href={'/products/' + productReference.slug}>
                      <Image
                        src={productReference.mainImage}
                        boxSize="20px"
                        rounded="full"
                        borderWidth="1px"
                        borderColor="gray.300"
                      />
                    </Link>
                  </GridItem>
                  <GridItem colSpan={4}>
                    <Link href={'/products/' + productReference.slug}>
                      <Text fontSize="sm" title={productReference.name}>
                        {getSubstring(productReference.name, 17)}
                      </Text>
                    </Link>
                  </GridItem>

                  <GridItem>
                    <Text fontWeight="bold" fontSize="xs">
                      $ {product.price}
                    </Text>
                  </GridItem>
                  <GridItem>
                    <Text fontWeight="bold" fontSize="xs" align={"end"}>
                      {product.quantity}
                    </Text>
                  </GridItem>
                </Grid>
              ))}
            </CardBody>
            <CardBody>
              <Text fontWeight={"bold"}>Total : $ {order.total}</Text>
              <Link href={`/orders/${order.id}`}>
                <Button>View</Button>
              </Link>
            </CardBody>
          </Card>
        ))}
      </Flex>
    </div>
  );
}
