"use client";
import {
  RedirectToSignIn,
  auth,
  clerkClient,
  currentUser,
  useUser,
} from "@clerk/nextjs";
import ProfileDetails from "../../../features/profile/index";

import { Loading } from "@src/components/Loading/Loading";
import AccountHeader from "../../../components/AccountHeader";

export default function Layout({ children }) {
  const { isSignedIn } = useUser();
  return (
    <div>
      {isSignedIn ? (
        <>
          <AccountHeader />
          {children}
        </>
      ) : (
        <RedirectToSignIn />
      )}
    </div>
  );
}
