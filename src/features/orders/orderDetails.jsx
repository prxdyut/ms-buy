"use client";
import {
  Box,
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

export default function OrderDetails({ order }) {
  console.log(order);
  return (
    <Box width="75vw" mx="auto">
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
            <Link href={"/products/" + productReference.slug}>
              <Image
                src={productReference.mainImage}
                boxSize="128px"
                rounded="full"
                borderWidth="1px"
                borderColor="gray.300"
              />
            </Link>
          </GridItem>
          <GridItem colSpan={4}>
            <Link href={"/products/" + productReference.slug}>
              <Text title={productReference.name}>
                {getSubstring(productReference.name, 17)}
              </Text>
            </Link>
          </GridItem>

          <GridItem>
            <Text fontWeight="bold" >
              $ {product.price}
            </Text>
          </GridItem>
          <GridItem>
            <Text fontWeight="bold" align={"end"}>
              {product.quantity}
            </Text>
          </GridItem>
        </Grid>
      ))}
      <Text fontWeight={"bold"}>Timestamp : {new Date(order.timestamp).toString()}</Text>
      <br/>
      <Text fontWeight={"bold"}>Phone : {order.phoneNumber}</Text>
      <Text fontWeight={"bold"}>Email : {order.email}</Text>
      <Text fontWeight={"bold"}>Address : {order.address}</Text>
      <br/>
      <Text fontWeight={"bold"}>Subtotal : $ {order.subtotal}</Text>
      <Text fontWeight={"bold"}>Tax : $ {order.tax}</Text>
      <Text fontWeight={"bold"}>Total : $ {order.total}</Text>
      <Link href={`/orders/${order.id}`}>
        <Button>View</Button>
      </Link>
    </Box>
  );
}
