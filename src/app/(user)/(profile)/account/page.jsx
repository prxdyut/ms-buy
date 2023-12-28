"use client";
import {
  RedirectToSignIn,
  UserProfile,
  auth,
  clerkClient,
  currentUser,
  useUser,
} from "@clerk/nextjs";

export default async function ProfilePage() {

  return <UserProfile /> ;
}
