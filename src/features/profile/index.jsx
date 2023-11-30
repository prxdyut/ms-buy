"use client";
import { Box, Button, FormLabel, Input } from "@chakra-ui/react";
import { currentUser, useUser } from "@clerk/nextjs";
import { Loading } from "@src/components/Loading/Loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileDetails() {
  const { user, isLoaded } = useUser();
  const [data, setData] = useState({ ...user });
  const router = useRouter();
  useEffect(() => {
    setData(user);
  }, [router]);

  console.log(user);
  if (!isLoaded) return <Loading />;
  return (
    <Box width={"75vw"} mx={"auto"}>
      <FormLabel>Username</FormLabel>
      <Input
        value={data?.username}
        onChange={(e) => {
          setData({ ...data, username: e.target.value });
        }}
      />
      <br />
      <br />
      <FormLabel>First Name</FormLabel>
      <Input
        value={data?.firstName}
        onChange={(e) => {
          setData({ ...data, firstName: e.target.value });
        }}
      />
      <br />
      <br />
      <FormLabel>First Name</FormLabel>
      <Input
        value={data?.lastName}
        onChange={(e) => {
          setData({ ...data, lastName: e.target.value });
        }}
      />
      <br />
      <br />
      <Button
        onClick={() =>
          fetch("/api/user", { method: "PUT", body: JSON.stringify(data) })
            .then((res) => res.json())
            .then((res) => {
              if (res.clerkError) {
                alert(res.errors.map(({ message }) => message).join(". "));
                setData(user);
              } else console.log(res);
            })
            .finally(() => router.refresh())
        }
      >
        Save
      </Button>
    </Box>
  );
}
