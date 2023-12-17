"use client";
import { auth, clerkClient, currentUser, useUser } from "@clerk/nextjs";
import ProfileDetails from "../../../features/profile/index";

import { Loading } from "@src/components/Loading/Loading";
import AccountHeader from "../../../components/AccountHeader";

export default function Layout({children}) {

  return (
    <div>
      <AccountHeader />
      {children}
    </div>
  );
}
