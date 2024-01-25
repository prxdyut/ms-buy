"use client";
import {
  RedirectToSignIn,
  SignIn,
  SignInButton,
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
    <div className=" ">
      {isSignedIn ? (
        <>
          {children}
        </>
      ) : (
        <div className="  w-full flex flex-col justify-center items-center pt-40">
          <p className=" ">You are Not Signed in!</p>
          <SignInButton><button className="bg-black mt-4 text-white px-4 py-2 rounded">Sign In</button></SignInButton>
        </div>
      )}
    </div>
  );
}
