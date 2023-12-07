"use client";
import { Box, Button, FormLabel, Input } from "@chakra-ui/react";
import { currentUser, useUser } from "@clerk/nextjs";
import { Loading } from "@src/components/Loading/Loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AccountHeader from "../../components/AccountHeader";

export default function ProfileDetails() {
  const { user, isLoaded } = useUser();
  const [data, setData] = useState({ ...user });
  const router = useRouter();

  useEffect(() => {
    setData(user);
  }, [router]);

  const save = () =>
    fetch("/api/user", { method: "PUT", body: JSON.stringify(data) })
      .then((res) => res.json())
      .then((res) => {
        if (res.clerkError) {
          alert(res.errors.map(({ message }) => message).join(". "));
          setData(user);
        } else alert("Data updated Successfully");
      })
      .finally(() => {
        router.refresh();
      });

  if (!isLoaded) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8 lg:px-32 lg:py-16 flex w-full flex-col  lg:grid lg:grid-cols-2 gap-8">
      <div className=" flex flex-col gap-2">
        <label className="text-sm font-poppins uppercase">
          email {"( non editable )"}
        </label>
        <input
          value={data?.primaryEmailAddress.emailAddress}
          className=" border-2 px-3 py-4 focus:outline-none placeholder:font-light border-grey"
        />
      </div>
      <div className=" flex flex-col gap-2">
        <label className="text-sm font-poppins uppercase">Username</label>
        <input
          value={data?.username}
          className=" border-2 px-3 py-4 focus:outline-none placeholder:font-light border-grey"
          onChange={(e) => {
            setData({ ...data, username: e.target.value });
          }}
        />
      </div>
      <div className=" flex flex-col gap-2">
        <label className="text-sm font-poppins uppercase">First Name</label>
        <input
          className=" border-2 px-3 py-4 focus:outline-none placeholder:font-light border-grey"
          value={data?.firstName}
          onChange={(e) => {
            setData({ ...data, firstName: e.target.value });
          }}
        />
      </div>
      <div className=" flex flex-col gap-2">
        <label className="text-sm font-poppins uppercase">Last Name</label>
        <input
          className=" border-2 px-3 py-4 focus:outline-none placeholder:font-light border-grey"
          value={data?.lastName}
          onChange={(e) => {
            setData({ ...data, lastName: e.target.value });
          }}
        />
      </div>
      <button
        onClick={save}
        className=" col-span-2 bg-black w-full text-white py-4"
      >
        Save
      </button>
    </div>
  );
}
