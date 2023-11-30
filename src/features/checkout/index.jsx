"use client";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AppContext } from "@src/context/AppContext";
import { calculateItemsTotal, formatPrice, getSubstring } from "@src/helpers";
import { useRouter } from "next/navigation";
import Script from "next/script";
import React, { useContext, useEffect, useState } from "react";
import { taxPercentage } from "@/config";

export const Checkout = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [inputData, setInputData] = useState({});

  const user = { email: "daspradyut516@gmail.com" };
  const total = subTotal + tax;

  const router = useRouter();
  const {
    state: { checkout },
    resetItems,
  } = useContext(AppContext);

  useEffect(() => {
    const subTotal = calculateItemsTotal(checkout);
    const tax = taxPercentage * subTotal;
    setSubTotal(subTotal);
    setTax(tax);
  }, [checkout]);

  const makePayment = async () => {
    const data = await fetch("/api/checkout", {
      method: "POST",
      headers: {},
      body: JSON.stringify({
        allOrderedProducts: checkout,
        allOrderData: {
          note: "note",
          subtotal: subTotal,
          tax,
          total,
          timestamp: new Date().toISOString(),
          ...inputData,
        },
      }),
    }).then((t) => t.json());

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
      name: "IMA",
      currency: "INR",
      amount: data.payment.amount,
      order_id: data.payment.id,
      description: "Payment Fees",
      handler: async function (response) {
        let res = await fetch("/api/checkout", {
          method: "PUT",
          body: JSON.stringify({
            _id: data.order._id,
            razorpayId: response.razorpay_order_id,
            paid: true,
            successfull: true,
          }),
        }).then((res) => res.json());
        console.log(res)
        resetItems("checkout");
        resetItems("cart");
        router.replace("/orders/" + res._id);
      },
      prefill: {
        name: "Pradyut Das",
        email: "daspradyut516@gmail.com",
        contact: "9323232961",
      },
    };
    console.log(options);
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      console.log(response);
      alert(response.description);
    });
  };
  return (
    <Flex
      w={{ base: "100%", lg: "90%" }}
      mx="auto"
      flexDir={{ base: "column", lg: "row" }}
      gap="2rem"
    >
      <Stack spacing={10} w={{ base: "100%", lg: "60%" }}>
        <Card borderWidth="1px" borderColor="gray.200" shadow="none">
          <CardHeader>
            <Heading size="md">Review Items</Heading>
          </CardHeader>

          <CardBody>
            <Stack spacing="2rem">
              {checkout.map((item) => (
                <Flex key={item.id} align="center" justify="space-between">
                  <Flex align="center">
                    <Image
                      src={item.mainImage}
                      boxSize="100px"
                      bgSize="contain"
                    />
                    <Box mx="1rem">
                      <Text
                        fontWeight="bold"
                        fontSize={{ base: "sm", lg: "lg" }}
                        maxW="500px"
                      >
                        {item.name}
                      </Text>
                      <Text color="gray.500">
                        {getSubstring(item.description, 50)}
                      </Text>
                    </Box>
                  </Flex>
                  <Box textAlign="right">
                    <Text fontWeight="bold" fontSize={{ base: "md", lg: "lg" }}>
                      ${formatPrice(item.price)}
                    </Text>
                    <Text fontSize={{ base: "sm", lg: "md" }}>
                      Quantity: {item.count}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </Stack>
          </CardBody>
        </Card>

        <Card borderWidth="1px" borderColor="gray.200" shadow="none">
          <CardHeader>
            <Heading size="md">Delivery Information</Heading>
          </CardHeader>

          <CardBody>
            <Stack spacing="2rem">
              <Box>
                <FormLabel>Full Name</FormLabel>
                <Input type="text" placeholder="Full name" />
              </Box>

              <Box>
                <FormLabel>Address</FormLabel>
                <Input
                  type="text"
                  placeholder="address"
                  name="address"
                  onChange={(e) =>
                    setInputData({
                      ...inputData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Box>

              <Box>
                <FormLabel>Phone</FormLabel>
                <Input
                  type="text"
                  placeholder="phone number"
                  name="phoneNumber"
                  onChange={(e) =>
                    setInputData({
                      ...inputData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Box>

              <Box>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="email"
                  name="email"
                  onChange={(e) =>
                    setInputData({
                      ...inputData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Stack>

      <Box w={{ base: "100%", lg: "40%" }}>
        <Card borderWidth="1px" borderColor="gray.200" shadow="none" p="2rem">
          <CardHeader>
            <Heading size="md">Payment Details</Heading>
          </CardHeader>

          <CardBody>
            <Stack spacing="2rem">
              <Flex>
                <Input
                  type="text"
                  placeholder="Enter Coupon Code"
                  rounded="full"
                />
                <Button
                  bgColor="brand.primary"
                  color="white"
                  rounded="full"
                  ml="-40px"
                  px="2rem"
                  _hover={{
                    bgColor: "brand.primaryDark",
                  }}
                  _active={{
                    bgColor: "brand.primaryDark",
                  }}
                >
                  Apply Coupon
                </Button>
              </Flex>
              <Divider mt="1rem" />

              <Box>
                <Heading size="xs" my="1rem">
                  Payment Option
                </Heading>
                <RadioGroup>
                  <Stack>
                    <Radio value="cashOnDelivery">Cash On Delivery</Radio>
                    <Radio value="momo">Mobile Money Payment</Radio>
                    <Radio value="3">Credit Card (Master/Visa)</Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </Stack>
            <Divider mt="1rem" />

            <Box>
              <Flex justify="space-between" align="center" my="1rem">
                <Text fontWeight="bold">Sub Total</Text>
                <Text fontWeight="bold">${formatPrice(subTotal)}</Text>
              </Flex>

              <Flex justify="space-between" align="center" my="1rem">
                <Text fontWeight="bold">Tax(10%)</Text>
                <Text fontWeight="bold">${formatPrice(tax)}</Text>
              </Flex>

              <Flex justify="space-between" align="center" my="1rem">
                <Text fontWeight="bold">Coupon Discount</Text>
                <Text fontWeight="bold">-${formatPrice(tax)}</Text>
              </Flex>

              <Flex justify="space-between" align="center" my="1rem">
                <Text fontWeight="bold">Shipping Cost</Text>
                <Text fontWeight="bold">-${formatPrice(0)}</Text>
              </Flex>
              <Divider />
              <Flex justify="space-between" align="center" my="1rem">
                <Text fontWeight="bold">Sub total</Text>
                <Text fontWeight="bold">${formatPrice(subTotal)}</Text>
              </Flex>
            </Box>

            <Script
              id="razorpay-checkout-js"
              src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <Button
              bgColor="brand.primary"
              color="white"
              w="100%"
              rounded="full"
              _hover={{
                bgColor: "brand.primaryDark",
              }}
              _active={{
                bgColor: "brand.primaryDark",
              }}
              onClick={() => {
                makePayment();
                console.log("making payment");
              }}
            >
              Pay ${formatPrice(total)}
            </Button>
          </CardBody>
        </Card>
      </Box>
    </Flex>
  );
};
