import { navItems } from "@/helpers";
import { Avatar, Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { AppLogo } from "../AppLogo";
import { Cart } from "../Cart/Cart";
import { Wishlist } from "../Wishlist/Wishlist";
import { Search } from "../Search/Search";
import { UserButton, auth, clerkClient, useUser } from "@clerk/nextjs";
import { BsBoxSeam, BsCart4 } from "react-icons/bs";
import { useAuth } from "@clerk/nextjs";

export function DesktopNav() {
  const { user } = useUser();

  return (
    <>
      {/* <Flex
        justify="space-between"
        alignItems="center"
        display={{ base: "none", lg: "flex" }}
        px="2rem"
        py="1rem"
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Stack direction="row" gap={6} flex={1} alignItems="center">
          <Box mr="1rem">
            <AppLogo />
          </Box>

          {navItems.map((navItem) => (
            <Box key={navItem.label}>
              <Link href={navItem.href}>{navItem.label}</Link>
            </Box>
          ))}

          <Search />
        </Stack>

        <Stack direction="row" spacing={2}>
          <Wishlist />
          <Cart />
          <Link href={"/orders"}>
            <Button
              variant="ghost"
              color="brand.primary"
              _hover={{
                bgColor: "transparent",
              }}
              pos="relative"
            >
              <BsBoxSeam /> <Text mx="1"> Orders</Text>
            </Button>
          </Link>
          <Avatar size="sm" src={user?.imageUrl} />
        </Stack>
      </Flex> */}
      <div className=" bg-black">
      <div className="container grid grid-cols-1">
        <div className="flex">
          <AppLogo />
        </div>
      </div></div>
    </>
  );
}
